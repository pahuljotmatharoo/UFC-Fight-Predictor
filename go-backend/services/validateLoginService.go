package services

import (
	"database/sql"
	"net/http"
	"ufcfightpredictor/backend/database"

	"github.com/gin-gonic/gin"
)

//basically use row.Next to loop through the rows, row.scan to assign a columns to variables
//needs to be called before accessing first data

func ValidateLoginService(db *sql.DB, info *database.Login) (bool, int, string) {
	rows, errors := db.Query("SELECT password, id, API_KEY FROM login_info WHERE username = ?", info.Username)
	if errors != nil {
		return true, 0, ""
	}
	var password_db string
	var id_db int
	var API_KEY string
	if rows.Next() {
		error := rows.Scan(&password_db, &id_db, &API_KEY)
		if error != nil {
			return false, 0, ""
		}
		return !(password_db == info.Password), id_db, API_KEY
	} else {
		return true, 0, ""
	}
}

func ValidateLoginRequestBodyService(req *database.Login, c *gin.Context) bool {
	if err := c.ShouldBind(req); err != nil {
		c.IndentedJSON(http.StatusBadRequest, nil)
		return false
	}
	return true
}
