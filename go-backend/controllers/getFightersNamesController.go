package controllers

import (
	"database/sql"
	"encoding/csv"
	"net/http"
	servicesAccount "ufcfightpredictor/backend/services/account"

	"github.com/gin-gonic/gin"
)

func GetFightersNames(reader *csv.Reader, db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		API_KEY := c.Param("API_KEY")
		weight_class := c.Param("weight")
		userID := c.Query("user_id")
		success, arr := servicesAccount.GetFightersName(db, reader, &weight_class, &userID, &API_KEY)
		if !success {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}
		c.IndentedJSON(http.StatusOK, gin.H{"names": arr})
	}
}
