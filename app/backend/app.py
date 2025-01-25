from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")


load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)




user_profiles = {}



@app.route('/profile', methods=['POST'])
def update_profile():
    try:
        # Parse JSON data from the request
        data = request.json
        
        # Validate required fields
        required_fields = ["name", "email", "budgetPreference", "allergies", "favoriteActivities"]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Extract the user's email to identify the profile
        email = data["email"]

        # Update or create the profile in the dictionary
        user_profiles[email] = {
            "name": data["name"],
            "budgetPreference": data["budgetPreference"],
            "allergies": data["allergies"],
            "favoriteActivities": data["favoriteActivities"]
        }

        return jsonify({"message": "Profile updated successfully!", "profile": user_profiles[email]}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    #TODO


'''

@app.route('/plan', methods=['POST', 'OPTIONS'])
def generate_plan():
   #TODO
   try{
        data = request.json

        openai.api_key = openai_api_key

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": data["query"]}
            ]
        )

        # Extract the generated response
        generated_text = response["choices"][0]["message"]["content"]

        return jsonify({"response": generated_text}), 200
   }
   except Exception as e:
        return jsonify({"error": str(e)}), 500
   
   



@app.route('/diet', methods=['POST'])
def analyze_diet():
    #TODO'''
    
    
if __name__ == '__main__':
    app.run(debug=True)