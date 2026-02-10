package servicesAccount

import (
	"database/sql"
	"ufcfightpredictor/backend/database"
)

//basically use row.Next to loop through the rows, row.scan to assign a columns to variables
//needs to be called before accessing first data

func ValidateLogin(db *sql.DB, info *database.Login) (bool, int, string) {
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
