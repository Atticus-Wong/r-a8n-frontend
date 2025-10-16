package main 

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		fmt.Println("Failed to load .env files")
	}
	project_id := os.Getenv("GCP_PROJECT_ID")
	response, err := optimizeTours(project_id)
	if err != nil {
		fmt.Println("This is broken somewhere")
	}
	fmt.Println(response)
}

