from flask import Flask, jsonify
from flask_cors import CORS
from routes import alumni_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(alumni_routes)

@app.route("/")
def home():
    return jsonify({"message": "Alumni backend is running!"})

if __name__ == "__main__":
    app.run(debug=True)
