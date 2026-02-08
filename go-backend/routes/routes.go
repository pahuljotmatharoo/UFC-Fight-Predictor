package routes

import (
	"database/sql"
	"ufcfightpredictor/backend/controllers"

	"github.com/gin-gonic/gin"
)

func DefineEndpoints(router *gin.Engine, db *sql.DB) {
	router.POST("/login", controllers.ValidateLogin(db))
	router.POST("/register", controllers.RegisterUser(db))
	router.DELETE("account/delete/:API_KEY", controllers.DeleteUser(db))
}
