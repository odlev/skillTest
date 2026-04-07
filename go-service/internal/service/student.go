package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"go-service/config"
	"go-service/models"
	"net/http"
	"strings"
	"sync"

	"github.com/go-pdf/fpdf"
)

type authSession struct {
	mu        sync.Mutex
	cookieStr string
	csrfToken string
}

type Service struct {
	cfg        *config.Config
	httpClient *http.Client
	session    authSession
}

func New(cfg *config.Config, httpClient *http.Client) *Service {
	return &Service{
		cfg:        cfg,
		httpClient: httpClient,
	}
}

func (s *Service) FetchStudent(id int) (*models.Student, error) {
	return s.fetchStudent(id, false)
}

func (s *Service) fetchStudent(id int, isRetry bool) (*models.Student, error) {
	if s.session.csrfToken == "" {
		if err := s.login(); err != nil {
			return nil, fmt.Errorf("auth failed: %w", err)
		}
	}

	url := fmt.Sprintf("%s/api/v1/students/%d", s.cfg.BackendURL, id)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Cookie", s.session.cookieStr)
	req.Header.Set("x-csrf-token", s.session.csrfToken)

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if (resp.StatusCode == http.StatusUnauthorized || resp.StatusCode == http.StatusForbidden) && !isRetry {
		s.session.csrfToken = ""
		if err := s.login(); err != nil {
			return nil, fmt.Errorf("re-auth failed: %w", err)
		}
		return s.fetchStudent(id, true)
	}

	if resp.StatusCode == http.StatusNotFound {
		return nil, fmt.Errorf("student not found")
	}
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("backend error: status %d", resp.StatusCode)
	}

	var student models.Student
	if err := json.NewDecoder(resp.Body).Decode(&student); err != nil {
		return nil, fmt.Errorf("decode student: %w", err)
	}
	return &student, nil
}

func (s *Service) GeneratePDF(student *models.Student) ([]byte, error) {
	pdf := fpdf.New("P", "mm", "A4", "")
	pdf.AddPage()

	pdf.SetFont("Arial", "B", 18)
	pdf.Cell(190, 12, "Student Report")
	pdf.Ln(16)

	pdf.SetFont("Arial", "B", 12)
	pdf.Cell(60, 8, "Field")
	pdf.Cell(130, 8, "Value")
	pdf.Ln(8)

	pdf.SetFont("Arial", "", 11)
	rows := [][]string{
		{"ID", fmt.Sprintf("%d", student.ID)},
		{"Name", student.Name},
		{"Email", student.Email},
		{"Phone", deref(student.Phone)},
		{"Gender", deref(student.Gender)},
		{"Date of Birth", deref(student.DOB)},
		{"Class", deref(student.Class)},
		{"Section", deref(student.Section)},
		{"Roll", deref(student.Roll)},
		{"Admission Date", deref(student.AdmissionDate)},
		{"Father Name", deref(student.FatherName)},
		{"Father Phone", deref(student.FatherPhone)},
		{"Mother Name", deref(student.MotherName)},
		{"Mother Phone", deref(student.MotherPhone)},
		{"Guardian Name", deref(student.GuardianName)},
		{"Guardian Phone", deref(student.GuardianPhone)},
		{"Guardian Relation", deref(student.RelationOfGuardian)},
		{"Current Address", deref(student.CurrentAddress)},
		{"Permanent Address", deref(student.PermanentAddress)},
		{"Class Teacher/Reporter", deref(student.ReporterName)},
	}
	for _, row := range rows {
		pdf.Cell(60, 7, row[0])
		pdf.Cell(130, 7, row[1])
		pdf.Ln(7)
	}

	var buf bytes.Buffer
	if err := pdf.Output(&buf); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func (s *Service) login() error {
	s.session.mu.Lock()
	defer s.session.mu.Unlock()

	body, err := json.Marshal(map[string]string{
		"username": s.cfg.AdminUsername,
		"password": s.cfg.AdminPassword,
	})
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST",
		s.cfg.BackendURL+"/api/v1/auth/login",
		bytes.NewBuffer(body),
	)
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("login failed: status %d", resp.StatusCode)
	}

	// take last cookie value per name (login response clears old cookies first)
	cookieMap := make(map[string]string)
	var cookieOrder []string
	for _, c := range resp.Cookies() {
		if _, seen := cookieMap[c.Name]; !seen {
			cookieOrder = append(cookieOrder, c.Name)
		}
		cookieMap[c.Name] = c.Value
	}

	var parts []string
	for _, name := range cookieOrder {
		parts = append(parts, name+"="+cookieMap[name])
	}

	s.session.cookieStr = strings.Join(parts, "; ")
	s.session.csrfToken = cookieMap["csrfToken"]
	return nil
}
