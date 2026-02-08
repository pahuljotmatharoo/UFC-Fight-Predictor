package services

import (
	"database/sql"
)

func validateAPIKEY(rows *sql.Rows, API_KEY *string) bool {
	rows.Next()
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

func DeleteUserService(db *sql.DB, userID *string, API_KEY *string) bool {
	rows, errors := db.Query("SELECT API_KEY FROM login_info WHERE id = ?", userID)
	if errors == nil {
		if !validateAPIKEY(rows, API_KEY) {
			return false
		}
	} else {
		return false
	}

	_, err := db.Exec("DELETE FROM login_info WHERE id = ?", *userID)
	return err == nil
}
