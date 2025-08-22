# UFC Fight Predictor
A full-stack application that predicts UFC fight outcomes using a Flask-based Python backend and a React frontend.

![login](https://github.com/user-attachments/assets/6a6218d1-fead-41f0-8940-a21cc0b00b1e)
![register](https://github.com/user-attachments/assets/14aad096-5aa7-4539-a8e9-77d495b455b9)
![register_ex](https://github.com/user-attachments/assets/e968b5f8-321e-456f-9008-23cac98c1674)
![loginexample](https://github.com/user-attachments/assets/68a5a1c4-08dc-4cb3-a1e3-91e323f54487)
![predictor](https://github.com/user-attachments/assets/4f158705-2e70-4d6c-8fe0-3b39f3d0e348)
![weight_class](https://github.com/user-attachments/assets/582b2319-ed9e-4e14-b203-398caa93be46)
![pick_fighter](https://github.com/user-attachments/assets/b31aa219-12b7-4418-acf4-ec7bc695f7ad)
![loading](https://github.com/user-attachments/assets/79b32ef5-9025-45df-97f5-5ffc6cb01ffc)
![winner](https://github.com/user-attachments/assets/f5ecc739-a73e-4371-91ac-28becc6377b3)
![results](https://github.com/user-attachments/assets/0629c17c-9fd7-4715-be43-9c5c25d553f5)
<img width="2560" height="1399" alt="image" src="https://github.com/user-attachments/assets/b6abd5a8-6869-463b-860c-16b60d732081" />
![changeuser](https://github.com/user-attachments/assets/acbf9327-0e39-4ccb-98c3-a43bfa89e1c9)
![changepass](https://github.com/user-attachments/assets/f8295433-7eb7-43f7-9c4a-5c4b9dfc6a59)

# Features
- **Authentication:** User registration and login

- **Fight Prediction:** Submit two fighters and receive win probabilities

- **History:** View past predictions per account

- **Fighter Directory:** Browse fighters by weight class

- **Account Management:** Change username, change password, delete account

# Tech Stack
- **Backend:** Flask · SQLAlchemy · pyodbc · pandas · scikit-learn

- **Frontend:** React · React Router

- **Database:** Microsoft SQL Server (via ODBC Driver 17)

# Prerequisites
- Python ≥3.8 (python.org)

- Node.js ≥14.x & npm or yarn (nodejs.org)

- Microsoft SQL Server instance with a database named UFC (Microsoft SQL Server)

- ODBC Driver 17 for SQL Server installed

# Installation

### Backend Setup

Clone the repo

```bash
git clone https://github.com/yourusername/ufc-fight-predictor.git
cd ufc-fight-predictor
```

Create & activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate       # Windows
```

Install Python dependencies

```bash
pip install -r requirements.txt
```

Configure database connection

Edit config.py or set the env var SQLALCHEMY_DATABASE_URI.

Example URI:

```pgsql
mssql+pyodbc://@<SERVER_NAME>/UFC?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes
Place the fighter data CSV
Ensure ufc_master_data.csv is in the project root.
```

### Frontend Setup

Navigate to the React app folder

```bash
Copy
Edit
cd frontend
```

Install JavaScript dependencies

```bash
npm install
# or
yarn install
```

Configure API base URL
In your React app’s .env file, set:
```
REACT_APP_API_URL=http://localhost:5000
```

# Running the App

### Start Backend

From the project root:

```bash
# Option A: using Flask CLI
export FLASK_APP=run.py
export FLASK_ENV=development
flask run

# Option B: direct
python run.py
```

The backend serves at http://localhost:3000 by default.

### Start Frontend

From the frontend/ directory:

```bash
npm start
# or
yarn start
```

The React app opens at http://localhost:3000.

# API Endpoints
### Authentication
- POST	/login	Log in with username & password

- POST	/register	Register new user with username, password & confirmpassword

### Predictions
- POST	/predictor	Predict fight (fighter1, fighter2, accountid)
  
- GET	/results/<accountID>	Retrieve past predictions for accountID

### Fighters
- GET	/get_names/<weightt>	List fighter names in weight class weightt

### Account Management
- GET	/account/<accountID>	Get account info (ID, username, password)
  
- DELETE	/account/delete/<accountID>	Delete user & their prediction history
  
- PATCH	/account/change_user/<accountID>	Change username (old_username, new_username, old_password)
  
- PATCH	/account/change_password/<accountID>	Change password (username, old_password, new_password)

# Project Structure
```bash
├── run.py
├── config.py
├── model.py
├── ufc_master_data.csv
├── requirements.txt
└── app/
    ├── __init__.py         # App factory
    ├── database.py         # SQLAlchemy instance
    ├── models.py           # DB table definitions
    ├── data_loader.py      # CSV loading & lookup
    └── routes/
        ├── auth.py         # /login, /register
        ├── predictor.py    # /predictor, /results
        ├── fighters.py     # /get_names
        └── account.py      # /account/*
```
