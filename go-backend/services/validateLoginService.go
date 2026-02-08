package services

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"

	"github.com/gin-gonic/gin"
)

//basically use row.Next to loop through the rows, row.scan to assign a columns to variables
//needs to be called before accessing first data

func ValidateLoginService(db *sql.DB, info *database.Login) bool {
	rows, errors := db.Query("SELECT password FROM login WHERE username = ?", info.Username)
	if errors != nil {
		return false
	}
	// fmt.Print(errors)
	var password_db string
	if rows.Next() {
		error := rows.Scan(&password_db)
		if error != nil {
			return false
		}
		return password_db == info.Password
	} else {
		return false
	}
}

func ValidateLoginRequestBodyService(req *database.Login, c *gin.Context) bool {
	if err := c.ShouldBind(req); err != nil {
		c.IndentedJSON(http.StatusBadRequest, nil)
		return false
	}
	return true
}
