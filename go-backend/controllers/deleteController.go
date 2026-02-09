package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/services"

	"github.com/gin-gonic/gin"
)

func DeleteUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		API_KEY := c.Param("API_KEY")
		userID := c.Query("user_id")

		if !services.DeleteUser(db, &userID, &API_KEY) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid Credentials"})
		} else {
			c.IndentedJSON(http.StatusOK, gin.H{"success": "Delete Successful"})
		}

	}
}
