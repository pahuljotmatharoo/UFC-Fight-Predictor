package controllers

import (
	"database/sql"
	"net/http"
	servicesAccount "ufcfightpredictor/backend/services/account"

	"github.com/gin-gonic/gin"
)

func Results(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		API_KEY := c.Param("API_KEY")
		userID := c.Query("user_id")

		boolean, results := servicesAccount.Results(db, &userID, &API_KEY)

		if !boolean {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{"result": results})

	}
}
