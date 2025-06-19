from flask import Blueprint, request, jsonify
from ..database import db
from ..models import Login, Predictions

account_bp = Blueprint('account', __name__)

@account_bp.route('/account/delete/<accountid>', methods=['DELETE'])
def delete_account(accountid):
    user = Login.query.get(accountid)
    if not user:
        return jsonify(), 401

    # delete history first
    Predictions.query.filter_by(AccountID=accountid).delete()
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

@account_bp.route('/account/<id_acc>', methods=['GET'])
def account_info(id_acc):
    user = Login.query.get(id_acc)
    if not user:
        return jsonify(), 404

    return jsonify({
        "AccountID": user.ID,
        "Username":  user.username,
        "Password":  user.password
    }), 200
