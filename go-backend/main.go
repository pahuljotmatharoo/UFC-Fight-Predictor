package main

import (
	"ufcfightpredictor/backend/database"
	"ufcfightpredictor/backend/routes"

	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	router := gin.Default()
	db := database.InitDataBase()
	routes.DefineEndpoints(router, db)
	router.Run("127.0.0.1:5000")
}
