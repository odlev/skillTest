package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	BackendURL string
	AdminUsername string
    AdminPassword string
    Port          string
}

func NewFromEnv() (*Config, error) {
    _ = godotenv.Load()
    backendURL := os.Getenv("BACKEND_URL")
    if backendURL == "" {
        backendURL = "http://localhost:5007"
    }
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    return &Config{
        BackendURL:    backendURL,
        AdminUsername: os.Getenv("ADMIN_USERNAME"),
        AdminPassword: os.Getenv("ADMIN_PASSWORD"),
        Port:          port,
    }, nil
}
