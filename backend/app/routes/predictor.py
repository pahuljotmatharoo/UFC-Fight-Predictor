from flask import Blueprint, request, jsonify
from ..database import db
from ..models import Predictions, Login
from model import get_fighter_data, data_builder, predict_fight_outcome, lr

predictor_bp = Blueprint('predictor', __name__)

@predictor_bp.route('/results/<idd>', methods=['GET'])
def results(idd):
    if idd == '0':
        return jsonify(), 400

    entries = Predictions.query.filter_by(AccountID=idd).all()
    return jsonify({"result": [e.to_dict() for e in entries]}), 200

@predictor_bp.route('/<API_KEY>/predictor', methods=['POST'])
def predictor(API_KEY):
    f1 = request.form['fighter1']
    f2 = request.form['fighter2']
    accountid = request.form['accountid']
    user = Login.query.get(accountid)

    if user.API_KEY != API_KEY:
        return 400

    f1_data = get_fighter_data(*f1.split())
    f2_data = get_fighter_data(*f2.split())
    fight_data = data_builder(f1_data, f2_data)

    probs, _ = predict_fight_outcome(fight_data, lr)

    # note: original logic inverted percentages
    percent1, percent2 = probs[1] * 100, probs[0] * 100
    winner = f1 if probs[1] > probs[0] else f2

    new_entry = Predictions(
        AccountID=accountid,
        Fighter1=f1,
        Fighter2=f2,
        Percentage1=percent1,
        Percentage2=percent2,
        Winner=winner
    )
    db.session.add(new_entry)
    db.session.commit()

    resp = {
        "Winner":           winner,
        "percentage_winner": max(probs),
        "percentage_loser":  min(probs),
        "R_height":         fight_data['R_Height_cms'],
        "B_height":         fight_data['B_Height_cms'],
        "R_wins":           fight_data['R_wins'],
        "B_wins":           fight_data['B_wins'],
        "R_losses":         fight_data['R_losses'],
        "B_losses":         fight_data['B_losses'],
        "R_draws":          fight_data['R_draw'],
        "B_draws":          fight_data['B_draw'],
        "R_reach":          fight_data['R_Reach_cms'],
        "B_reach":          fight_data['B_Reach_cms'],
        "R_age":            fight_data['R_age'],
        "B_age":            fight_data['B_age'],
        "R_strikes":        fight_data['R_avg_SIG_STR_landed'],
        "B_strikes":        fight_data['B_avg_SIG_STR_landed'],
        "R_takedowns":      fight_data['R_avg_TD_landed'],
        "B_takedowns":      fight_data['B_avg_TD_landed']
    }
    return jsonify(resp), 200
