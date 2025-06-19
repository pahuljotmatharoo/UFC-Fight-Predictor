import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'some_sample_key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = (
        'your_sql_sever'
    )
    CORS_ORIGINS = ["http://localhost:3000"]
