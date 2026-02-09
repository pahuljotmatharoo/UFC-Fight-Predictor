package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"
	"ufcfightpredictor/backend/services"

	"github.com/gin-gonic/gin"
)

func UpdatePassword(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req database.UpdatePassword
		API_KEY := c.Param("API_KEY")
		userID := c.Query("user_id")
		if !services.ValidateRequestBody(&req, c) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}
		if !services.UpdatePassword(&API_KEY, db, &userID, &req) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{})
	}
}
