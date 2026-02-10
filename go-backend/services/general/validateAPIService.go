package servicesGeneral

import (
	"database/sql"
)

func ValidateAPIKEY(API_KEY *string, db *sql.DB, userID *string) bool {
	rows, errors := db.Query("SELECT API_KEY FROM login_info WHERE id = ?", userID)
	if errors != nil {
		return false
	}
	if !rows.Next() {
		return false
	}
	var API_KEY_FOUND string
	error := rows.Scan(&API_KEY_FOUND)
	if error != nil {
		return false
	}
	if API_KEY_FOUND != *API_KEY {
		return false
	} else {
		return true
	}
}
