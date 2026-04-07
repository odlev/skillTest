package main

import (
	"go-service/config"
	"go-service/internal/handler"
	"go-service/internal/service"
	"log"
	"net/http"
)

func main() {
	cfg, err := config.NewFromEnv()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	httpClient := &http.Client{}
	svc := service.New(cfg, httpClient)
	h := handler.New(svc)

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/v1/students/{id}/report", h.GenStudentPdf)

	log.Printf("Go service running on :%s", cfg.Port)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, mux))
}
