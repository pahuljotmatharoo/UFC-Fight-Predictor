package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"
	servicesAccount "ufcfightpredictor/backend/services/account"
	servicesGeneral "ufcfightpredictor/backend/services/general"

	"github.com/gin-gonic/gin"
)

func UpdatePassword(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req database.UpdatePassword
		API_KEY := c.Param("API_KEY")
		userID := c.Query("user_id")
		if !servicesGeneral.ValidateRequestBody(&req, c) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}
		if !servicesAccount.UpdatePassword(&API_KEY, db, &userID, &req) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{})
	}
}
