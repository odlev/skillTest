package handler

import (
	"fmt"
	"go-service/models"
	"net/http"
	"strconv"
)

type service interface {
	FetchStudent(id int) (*models.Student, error)
	GeneratePDF(student *models.Student) ([]byte, error)
}

type Handler struct {
	svc service
}

func New(svc service) *Handler {
	return &Handler{svc: svc}
}

func (h *Handler) GenStudentPdf(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid student id", http.StatusBadRequest)
		return
	}

	student, err := h.svc.FetchStudent(id)
	if err != nil {
		if err.Error() == "student not found" {
			http.Error(w, "student not found", http.StatusNotFound)
			return
		}
		http.Error(w, "failed to fetch student: "+err.Error(), http.StatusInternalServerError)
		return
	}

	pdfBytes, err := h.svc.GeneratePDF(student)
	if err != nil {
		http.Error(w, "failed to generate PDF", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition",
		fmt.Sprintf(`attachment; filename="student_%d_report.pdf"`, id))
	w.Header().Set("Content-Length", strconv.Itoa(len(pdfBytes)))
	w.Write(pdfBytes)
}
