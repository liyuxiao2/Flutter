from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import json
import re

# Load environment variables
load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True
)

# Global variable to store addresses
global_addresses = []

@app.route('/plan', methods=['POST'])
def generate_plan():
    global global_addresses  # Declare global_addresses as global within the function
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
        location = data.get("location", [])
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

        Provide a detailed plan, where each activity and restaurant is an individual entry. Include at least ** 5 distinct activities** and ** 3 distinct restaurants**. Output the response in valid JSON format with the following structure:
        {{
            "activities": [
                {{
                    "name": "Activity name",
                    "description": "A brief description of the activity, including its location or purpose.",
                    "time": "Suggested time for this activity (if applicable).",
                    "GoogleReview": "link to google review"
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
                    "GoogleReview": "link to google review"
                }},
                ...
            ]
        }}

        Ensure the JSON format is valid, concise, and includes all necessary details for each entry."""

        # Generate a response using OpenAI API
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant specialized in planning personalized dates."},
                {"role": "user", "content": prompt}
            ]
        )

        # Access the response content
        generated_text = response.choices[0].message.content
        print("Generated Text:", generated_text)

        try:
            # Clean and validate the generated text
            clean_json = re.sub(r"^```(json)?|```$", "", generated_text.strip(), flags=re.MULTILINE).strip()
            parsed_response = json.loads(clean_json)

            # Modify the restaurant addresses in the parsed response
            for restaurant in parsed_response.get("restaurants", []):
                full_address = restaurant.get("address", "")
                # Extract the shortened address using regex
                match = re.search(r"^\d+\s[\w\s]+(?:\s(?:[A-Z]|[a-z])+\b)?", full_address)
                if match:
                    restaurant["address"] = match.group(0)  # Update the address field
                else:
                    restaurant["address"] = "Address not provided"  # Fallback if regex fails

            print("Modified Response with Shortened Addresses:", parsed_response)

            return jsonify(parsed_response), 200
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            return jsonify({"error": "Failed to parse JSON response", "details": str(e)}), 500

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
        # Updated regex to match latitude and longitude in various formats
        match = re.search(
            r"([-+]?\d{1,2}\.\d+)\s*°?\s*[NnSs]?\s*(?:latitude)?[^\d]*([-+]?\d{1,3}\.\d+)\s*°?\s*[EeWw]?\s*(?:longitude)?",
            generated_text
        )
        if match:
            latitude = float(match.group(1))
            longitude = float(match.group(2))
            print("Extracted Coordinates:", latitude, longitude)
            return latitude, longitude
        else:
            print("Regex failed to match. Full text:", generated_text)
            raise ValueError("Could not extract coordinates from the text.")
    except Exception as e:
        print(f"Error extracting coordinates: {e}")
        return None



@app.route('/get-addresses', methods=['GET'])
def get_addresses():
    global global_addresses
    return jsonify(global_addresses), 200


if __name__ == '__main__':
    app.run(debug=True)
