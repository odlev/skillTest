# go-service

golang microservice for generating pdf student reports.
done as part of skill test task (Problem 4 - Golang Developer Challenge).

## what it does

fetches student data from the node.js backend api and generates a pdf report.
thats it, nothing fancy. no direct db connection, just http calls to the backend.

endpoint: `GET /api/v1/students/:id/report`
returns: pdf file

## how it works

1. recieves request with student id
2. logs into the node.js backend using admin credentials from .env
3. fetches student data from `/api/v1/students/:id`
4. generates pdf using fpdf library
5. returns pdf as response

auth is cookie-based with csrf token, so the service handles login and session automatically.
if session expires it re-logins once and retries.

## project structure

```
go-service/
├── cmd/main.go           - entry point, wires everything together
├── config/config.go      - reads config from .env file
├── models/student.go     - student struct matching backend json
├── internal/
│   ├── handler/report.go - http handler
│   └── service/
│       ├── student.go    - core logic: auth, fetch, pdf generation
│       └── helper.go     - small utility
└── .env                  - local config (commited on purpose)
```

## to test

prerequisites:
- postgresql running with school_mgmt database seeded (see seed_db/ folder)
- node.js backend running on port 5007 (see backend/ folder)

create .env in go-service/:
```
BACKEND_URL=http://localhost:5007
ADMIN_USERNAME=admin@school-admin.com
ADMIN_PASSWORD=3OU4zn3q6Zh9
PORT=8080
```

run:
```
go run ./cmd/main.go
```

test:
```
curl -o report.pdf http://localhost:8080/api/v1/students/1/report
```

should get a valid pdf file back.

## dependencies

- github.com/go-pdf/fpdf - pdf generation
- github.com/joho/godotenv - loading .env file
