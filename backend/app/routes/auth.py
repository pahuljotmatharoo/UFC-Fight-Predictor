from flask import Blueprint, request, jsonify
from ..database import db
from ..models import Login

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    user = request.form.get('username')
    password = request.form.get('password')

    data = Login.query.filter_by(username=user).first()
    if not data:
        return jsonify(), 404
    if data.password != password:
        return jsonify(), 401

    return jsonify({"accountID": data.ID}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    user = request.form.get('username')
    password = request.form.get('password')
    password_confirm = request.form.get('confirmpassword')

    if password != password_confirm:
        return jsonify(), 206

    if len(user) <= 5 or len(password) <= 5:
        return jsonify(), 401

    if Login.query.filter_by(username=user).first():
        return jsonify(), 302

    new_user = Login(username=user, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(), 200
