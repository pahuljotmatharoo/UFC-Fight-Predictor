from flask import Flask, request
from flask_cors import CORS
from .database import db
from config import Config
from .models import Login

results_cache = {} # cache for results

def API_KEY_VERIFY(API_KEY):
    user = Login.query.get(request.args.get('user_id'))
    if user.API_KEY != API_KEY:
        return False
    return True

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

    return app
