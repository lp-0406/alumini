from flask import Blueprint, jsonify

alumni_routes = Blueprint('alumni', __name__, url_prefix='/api')

@alumni_routes.route("/events")
def get_events():
    return jsonify({"events": ["Event 1", "Event 2"]})

@alumni_routes.route("/jobs")
def get_jobs():
    return jsonify({"jobs": ["Job 1", "Job 2"]})
