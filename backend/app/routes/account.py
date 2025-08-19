from flask import Blueprint, request, jsonify

from .. import API_KEY_VERIFY
from ..database import db
from ..models import Login, Predictions

account_bp = Blueprint('account', __name__)

@account_bp.route('/account/delete/<API_KEY>', methods=['DELETE'])
def delete_account(API_KEY):
    user = Login.query.get(request.args.get("user_id"))
    if API_KEY_VERIFY(API_KEY) == 400:
        return 400

    # delete history first
    Predictions.query.filter_by(AccountID=request.args.get("user_id")).delete()
    db.session.delete(user)
    db.session.commit()

    return jsonify(), 200

@account_bp.route('/account/change_user/<accountid>', methods=['PATCH'])
def change_user(accountid):
    old_user = request.form['old_username']
    new_user = request.form['new_username']
    old_pw   = request.form['old_password']

    user = Login.query.get(accountid)
    if not user or user.username != old_user or user.password != old_pw:
        return jsonify(), 401

    user.username = new_user
    db.session.commit()
    return jsonify(), 200

@account_bp.route('/account/change_password/<accountid>', methods=['PATCH'])
def change_password(accountid):
    username  = request.form['username']
    old_pw    = request.form['old_password']
    new_pw    = request.form['new_password']

    user = Login.query.get(accountid)
    if not user or user.username != username or user.password != old_pw:
        return jsonify(), 401

    user.password = new_pw
    db.session.commit()
    return jsonify(), 200

@account_bp.route('/account/<API_KEY>', methods=['GET'])
def account_info(API_KEY):
    if API_KEY_VERIFY(API_KEY) == 400:
        return 400
    user = Login.query.get(request.args.get("user_id"))
    if not user:
        return jsonify(), 404

    return jsonify({
        "AccountID": user.ID,
        "Username":  user.username,
        "Password":  user.password,
        "API_KEY": user.API_KEY
    }), 200
