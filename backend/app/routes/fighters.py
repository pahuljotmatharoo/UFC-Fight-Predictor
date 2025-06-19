from flask import Blueprint, jsonify
from ..data_loader import get_names_by_weight

fighters_bp = Blueprint('fighters', __name__)

@fighters_bp.route('/get_names/<weightt>', methods=['GET'])
def get_names(weightt):
    names = get_names_by_weight(weightt)
    return jsonify(names), 200
