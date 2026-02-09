package main

import (
	"os"
	"time"
	"ufcfightpredictor/backend/database"
	"ufcfightpredictor/backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://" + os.Getenv("FRONTEND_URL"), "http://" + os.Getenv("BACKEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PATCH", "OPTIONS", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	db := database.InitDataBase()
	routes.DefineEndpoints(router, db)
	router.Run(os.Getenv("BACKEND_URL"))
}
