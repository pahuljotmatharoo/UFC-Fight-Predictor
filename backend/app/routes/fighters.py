from flask import Blueprint, jsonify, request
from .. import API_KEY_VERIFY
from ..data_loader import get_names_by_weight
from ..models import Login

fighters_bp = Blueprint('fighters', __name__)

@fighters_bp.route('/get_names/<API_KEY>/<weightt>', methods=['GET'])
def get_names(API_KEY, weightt):
    if not API_KEY_VERIFY(API_KEY):
        return 400
    names = get_names_by_weight(weightt)
    return jsonify(names), 200
