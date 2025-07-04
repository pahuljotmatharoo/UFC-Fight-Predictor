from flask import Flask
from flask_cors import CORS
from .database import db
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

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
