from flask import Blueprint, request, jsonify

from .. import encrypt
from ..database import db
from ..models import Login
import random
import string

auth_bp = Blueprint('auth', __name__)

def generate_random_string(length):
    """
    Generates a random string of a specified length using alphanumeric characters.
    """
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

@auth_bp.route('/login', methods=['POST'])
def login():
    user = request.form.get('username')
    password = request.form.get('password')
    password = encrypt(password)
    data = Login.query.filter_by(username=user).first()
    if not data:
        return jsonify(), 404
    if data.password != password:
        return jsonify(), 401

    return jsonify({"accountID": data.ID, "API_KEY" : data.API_KEY}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    user = request.form.get('username')
    password = request.form.get('password')
    password_confirm = request.form.get('confirmpassword')
    api_key = generate_random_string(10) #generate API_KEY
    if password != password_confirm:
        return jsonify(), 206

    if len(user) <= 5 or len(password) <= 5:
        return jsonify(), 401

    if Login.query.filter_by(username=user).first():
        return jsonify(), 302
    password = encrypt(password)
    new_user = Login(username=user, password=password, API_KEY = api_key)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(), 200
