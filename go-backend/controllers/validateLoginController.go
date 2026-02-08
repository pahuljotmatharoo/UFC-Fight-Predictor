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
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid Credentials"})
			return
		}

		if !services.ValidateLoginService(db, &req) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid Credentials"})
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{
			"accountID": accountID,
			"API_KEY":   apiKey,
		})

	}
}
