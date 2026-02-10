package controllers

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"
	servicesAccount "ufcfightpredictor/backend/services/account"
	servicesGeneral "ufcfightpredictor/backend/services/general"

	"github.com/gin-gonic/gin"
)

func RegisterUser(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req database.Login

		if !servicesGeneral.ValidateRequestBody(&req, c) {
			c.IndentedJSON(http.StatusUnauthorized, gin.H{})
			return
		}

		if !servicesAccount.RegisterUser(db, &req) {
			c.IndentedJSON(http.StatusBadRequest, gin.H{})
			return
		}

		c.IndentedJSON(http.StatusOK, gin.H{})

	}
}
