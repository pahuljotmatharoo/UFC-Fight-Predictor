package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/services"

	"github.com/gin-gonic/gin"
)

func GetAccountInfo(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		API_KEY := c.Param("API_KEY")
		userID := c.Query("user_id")

		success, login := services.GetAccount(db, &userID, &API_KEY)

		if !success {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}

		c.IndentedJSON(http.StatusBadRequest, gin.H{"AccountID": userID, "Username": login.Username,
			"Password": login.Password,
			"API_KEY":  login.Api_key})
	}
}
