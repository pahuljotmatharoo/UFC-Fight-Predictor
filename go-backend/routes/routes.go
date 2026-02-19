package routes

import (
	"database/sql"
	"encoding/csv"
	"ufcfightpredictor/backend/controllers"

	"github.com/gin-gonic/gin"
)

func DefineEndpoints(router *gin.Engine, db *sql.DB, reader *csv.Reader) {
	router.POST("/login", controllers.ValidateLogin(db))
	router.POST("/register", controllers.RegisterUser(db))
	router.DELETE("account/delete/:API_KEY", controllers.DeleteUser(db))
	router.PATCH("account/change_password/:API_KEY", controllers.UpdatePassword(db))
	router.PATCH("account/change_user/:API_KEY", controllers.UpdateUsername(db))
	router.GET("account/:API_KEY", controllers.GetAccountInfo(db))
	router.GET("results/:API_KEY", controllers.Results(db))
	router.GET("get_names/:API_KEY/:weight", controllers.GetFightersNames(reader, db))
}
