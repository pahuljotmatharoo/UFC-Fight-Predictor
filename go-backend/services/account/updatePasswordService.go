package servicesAccount

import (
	"database/sql"
	"ufcfightpredictor/backend/database"
	servicesGeneral "ufcfightpredictor/backend/services/general"
)

func UpdatePassword(API_KEY *string, db *sql.DB, userID *string, req *database.UpdatePassword) bool {
	if !servicesGeneral.ValidateAPIKEY(API_KEY, db, userID) {
		return false
	}
	info := database.Login{Username: req.Username, Password: req.OldPassword, Api_key: *API_KEY}
	checkLogin, _, _ := ValidateLogin(db, &info)
	if checkLogin {
		return false
	}
	_, err := db.Exec("UPDATE login_info SET password = ? WHERE id = ?", req.NewPassword, *userID)
	return err == nil
}
