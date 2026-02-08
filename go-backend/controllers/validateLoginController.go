package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"
	"ufcfightpredictor/backend/services"

	"github.com/gin-gonic/gin"
)

func ValidateLogin(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req database.Login

		if !services.ValidateLoginRequestBodyService(&req, c) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}
		err, id, api_key := services.ValidateLoginService(db, &req)
		if err {
			c.IndentedJSON(http.StatusUnauthorized, gin.H{})
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{
			"accountID": id,
			"API_KEY":   api_key,
		})

	}
}
