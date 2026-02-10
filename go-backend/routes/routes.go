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
	router.PATCH("account/change_password/:API_KEY", controllers.UpdatePassword(db))
	router.PATCH("account/change_user/:API_KEY", controllers.UpdateUsername(db))
	router.GET("account/:API_KEY", controllers.GetAccountInfo(db))
}
