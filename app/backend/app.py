from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
from openai import OpenAI
import json


load_dotenv()



openai.api_key = os.environ.get("OPENAI_API_KEY")


app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True
)





user_profiles = {}

    

@app.route('/plan', methods=['POST'])
def generate_plan():
    try:
        print("Request received at /plan")
        
        # Parse the JSON payload
        data = request.json
        print(f"Payload received: {data}")

        if not data:
            return jsonify({"error": "No data provided in the request"}), 400


        required_fields = ["budget", "time", "style", "location", "dietary", "inspiration"]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
        
        
        budget = data.get("budget", "100")
        time = data.get("time", "3 hours")
        style = data.get("style", [])
        location = data.get("location", "Markham ON")
        dietary = data.get("dietary", [])
        inspiration = data.get("inspiration", [])
        
        if not isinstance(inspiration, list):
            inspiration = [inspiration]  # Convert to list if it's a single string

        
        
        exact_location = getLongLat(location)
        
        # Construct the prompt
        prompt = f"""Plan a date based on the following preferences:
        - Budget: {budget}
        - Time Constraint: {time}
        - Style Preference: {style}
        - Location: {exact_location}
        - Dietary Preferences/Allergies: {dietary}
        - Inspiration: {inspiration}


        Provide a detailed plan, where each activity and restaurant is an individual entry. Output the response in valid JSON format with the following structure:
        {{
            "activities": [
                {{
                    "name": "Activity name",
                    "description": "A brief description of the activity, including its location or purpose.",
                    "time": "Suggested time for this activity (if applicable).",
                    "GoogleReview: link to google review"
                }},
                ...
            ],
            "restaurants": [
                {{
                    "name": "Restaurant name",
                    "description": "A brief description of the restaurant, why it fits the theme, or what makes it unique.",
                    "address": "Restaurant address",
                    "cuisine": "Type of cuisine",
                    "rating": "Rating (if available).",
                    "GoogleReview: link to google review"
                }},
                ...
            ]
        }}

        Ensure the JSON format is valid, concise, and includes all necessary details for each entry."""


        # Generate a response using OpenAI API
        response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant specialized in planning personalized dates."},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt + " Use the image links to help style the theme around the date"},
                    # Add multiple image links dynamically
                    *[
                        {
                            "type": "image_url",
                            "image_url": {"url": image_url},
                        }
                        for image_url in inspiration  # `image_links` is a list of URLs
                    ],
                ],
            },
        ],
)

        


        # Access the response content
        generated_text = response.choices[0].message.content
        
        
        print(generated_text)
        
        
        try:
            # Remove triple backticks and ensure it's valid JSON
            clean_json = generated_text.strip("```").strip("json").strip()
            parsed_response = json.loads(clean_json)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            return jsonify({"error": "Failed to parse JSON response"}), 500

        # Return the parsed JSON as the response
        return jsonify(parsed_response), 200

    except KeyError as e:
        print(f"KeyError: {e}")
        return jsonify({"error": f"Missing key: {str(e)}"}), 400

    except Exception as e:
        print(f"Unhandled Exception: {e}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500



import re

def getLongLat(location):
    prompt = f"Get the exact latitude and longitude of {location}"

    # Generate a response using OpenAI API
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant specialized in geographic locations."},
            {"role": "user", "content": prompt}
        ]
    )

    generated_text = response.choices[0].message.content
    print("Generated Text:", generated_text)
    
    try:
        # Updated regex to handle negative longitudes
        match = re.search(
            r"([\d.]+)°?\s*[Nn](?:orth)?[,\s]+([-]?[\d.]+)°?\s*([EeWw])?", 
            generated_text
        )
        if match:
            latitude = float(match.group(1))
            longitude = float(match.group(2))
            # Adjust longitude if it's West and not already negative
            if match.group(3) and match.group(3).upper() == "W" and longitude > 0:
                longitude = -longitude
            return latitude, longitude  # Return as a tuple
        else:
            raise ValueError("Could not extract coordinates from the text.")
    except Exception as e:
        print(f"Error extracting coordinates: {e}")
        return None

# Test the function
print(getLongLat("Markham, Ontario, Canada"))


      
if __name__ == '__main__':
    app.run(debug=True)