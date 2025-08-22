from flask import Flask, request
from flask_cors import CORS
from .database import db
from config import Config
from .models import Login
import string

results_cache = {} # cache for results
pass_map = {}

def API_KEY_VERIFY(API_KEY):
    user = Login.query.get(request.args.get('user_id'))
    if user.API_KEY != API_KEY:
        return False
    return True

def API_KEY_VERIFY_WITH_USER(API_KEY, user):
    if user.API_KEY != API_KEY:
        return False
    return True

def init_pass_map():
    # Get uppercase and lowercase letters
    uppercase = string.ascii_uppercase  # 'A'...'Z'
    lowercase = string.ascii_lowercase  # 'a'...'z'
    digits = string.digits  # "0123456789"
    symbols = string.punctuation

    # Uppercase mapping
    for i in range(26):
        pass_map[uppercase[i]] = uppercase[25 - i]

    # Lowercase mapping
    for i in range(26):
        pass_map[lowercase[i]] = lowercase[25 - i]

    # Digit mapping
    for i in range(10):
        pass_map[digits[i]] = digits[9 - i]

    # Symbol mapping (reverse the string.punctuation order)
    for i in range(len(symbols)):
        pass_map[symbols[i]] = symbols[len(symbols) - 1 - i]

def encrypt(password):
    new_pass = ""
    for i in password:
        new_pass += pass_map[i]
    return new_pass

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    #Tell CORS where we should be getting our requests from
    CORS(app, supports_credentials=True, origins=Config.CORS_ORIGINS)
    db.init_app(app)

    # import and register all route-blueprints
    from .routes.auth      import auth_bp
    from .routes.predictor import predictor_bp
    from .routes.fighters  import fighters_bp
    from .routes.account   import account_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(predictor_bp)
    app.register_blueprint(fighters_bp)
    app.register_blueprint(account_bp)

    init_pass_map()

    return app
