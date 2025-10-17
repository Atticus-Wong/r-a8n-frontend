package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)


func main() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Printf("warn: load .env: %v", err)
	}

	projectID := os.Getenv("GCP_PROJECT_ID")
	if projectID == "" {
		log.Fatal("GCP_PROJECT_ID not set")
	}

	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.POST("/optimizeRoutes", func(c echo.Context) error {
		resp, err := optimizeTours(projectID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": err.Error(),
			})
		}
		return c.JSON(http.StatusOK, resp)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
