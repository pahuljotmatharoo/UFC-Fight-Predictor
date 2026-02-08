package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"
	"ufcfightpredictor/backend/services"

	"github.com/gin-gonic/gin"
)

func DeleteUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req database.Login

		if !services.ValidateLoginRequestBodyService(&req, c) {
			return
		}

		if !services.DeleteUserService(db, &req) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid Credentials"})
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{"success": "Delete Successful"})

	}
}
