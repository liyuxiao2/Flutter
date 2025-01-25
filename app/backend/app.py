from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import json
import re

load_dotenv()

app = Flask(__name__)

CORS(app,
     resources={r"/*": {
         "origins": ["http://localhost:3000"],
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization"],
         "supports_credentials": True
     }})



user_profiles = {}



@app.route('/profile', methods=['POST'])
def update_profile():
    
    #TODO


@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze_injury():
    #TODO
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response



@app.route('/diet', methods=['POST'])
def analyze_diet():
    #TODO
    
    
if __name__ == '__main__':
    app.run(debug=True)