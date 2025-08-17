-- =========================================
-- Create FileTable template
-- =========================================

 CREATE TABLE UFC_HISTORY(
	ID INT PRIMARY KEY IDENTITY(1,1),
	AccountID INT,
	Fighter1 NVARCHAR(256),
	Fighter2 NVARCHAR(256),
	Percentage1 float,
	Percentage2 float,
	Winner NVARCHAR(256),
	)

CREATE TABLE login_info(
	ID INT PRIMARY KEY IDENTITY(1,1),
	username NVARCHAR(256),
	password NVARCHAR(256),
	API_KEY NVARCHAR(10)
	)
