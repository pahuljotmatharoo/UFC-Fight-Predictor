package servicesAccount

import (
	"database/sql"
	"ufcfightpredictor/backend/database"
	servicesGeneral "ufcfightpredictor/backend/services/general"
)

func Results(db *sql.DB, userID *string, API_KEY *string) (bool, []database.UFC_HISTORY) {
	if !servicesGeneral.ValidateAPIKEY(API_KEY, db, userID) {
		return false, []database.UFC_HISTORY{}
	}
	rows, errors := db.Query("SELECT * FROM UFC_HISTORY WHERE AccountID = ?", *userID)
	var result []database.UFC_HISTORY
	if errors != nil {
		return false, []database.UFC_HISTORY{}
	}
	for i := 0; rows.Next(); {
		var row database.UFC_HISTORY
		error := rows.Scan(&row.ID, &row.AccountID, &row.Fighter1, &row.Fighter2)
		if error != nil {
			return false, []database.UFC_HISTORY{}
		}
		result = append(result, row)
		i++
	}
	return true, result
}
