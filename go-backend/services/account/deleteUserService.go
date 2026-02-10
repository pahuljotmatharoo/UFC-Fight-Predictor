package servicesAccount

import (
	"database/sql"
	servicesGeneral "ufcfightpredictor/backend/services/general"
)

func DeleteUser(db *sql.DB, userID *string, API_KEY *string) bool {
	if !servicesGeneral.ValidateAPIKEY(API_KEY, db, userID) {
		return false
	}
	_, err := db.Exec("DELETE FROM login_info WHERE id = ?", *userID)
	return err == nil
}
