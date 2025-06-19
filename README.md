# UFC Fight Predictor
A full-stack application that predicts UFC fight outcomes using a Flask-based Python backend and a React frontend.

# Features
- Authentication: User registration and login

- Fight Prediction: Submit two fighters and receive win probabilities

- History: View past predictions per account

- Fighter Directory: Browse fighters by weight class

- Account Management: Change username, change password, delete account

# Tech Stack
- Backend: Flask · SQLAlchemy · pyodbc · pandas · scikit-learn

- Frontend: React · Axios · React Router

- Database: Microsoft SQL Server (via ODBC Driver 17)

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
