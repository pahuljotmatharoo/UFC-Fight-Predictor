package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"
	"ufcfightpredictor/backend/services"

	"github.com/gin-gonic/gin"
)

func RegisterUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req database.Login

		if !services.ValidateRequestBody(&req, c) {
			c.IndentedJSON(http.StatusUnauthorized, gin.H{})
			return
		}

		if !services.RegisterUser(db, &req) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{})

	}
}
