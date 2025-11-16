import google.generativeai as genai
import os
import json
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))


def getLongLat(location):
    prompt = f"Get the exact latitude and longitude of {location}"

    # Generate a response using Gemini API
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(
        f"You are a helpful assistant specialized in geographic locations.\n\n{prompt}"
    )

    generated_text = response.text
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


def generate_date_plan(budget, time, style, location, dietary, inspiration):
    """Generate a date plan based on user preferences."""

    if not isinstance(inspiration, list):
        inspiration = [inspiration]

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

    # Generate a response using Gemini API
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(
        f"You are a helpful assistant specialized in planning personalized dates.\n\n{prompt}"
    )

    # Access the response content
    generated_text = response.text
    print("Generated Text:", generated_text)

    # Clean and validate the generated text
    clean_json = re.sub(r"^```(json)?|```$", "", generated_text.strip(), flags=re.MULTILINE).strip()
    parsed_response = json.loads(clean_json)

    # Modify the restaurant addresses in the parsed response
    for restaurant in parsed_response.get("restaurants", []):
        full_address = restaurant.get("address", "")
        # Extract the shortened address using regex
        match = re.search(r"^\d+\s[\w\s]+(?:\s(?:[A-Z]|[a-z])+\b)?", full_address)
        if match:
            restaurant["address"] = match.group(0)
        else:
            restaurant["address"] = "Address not provided"

    print("Modified Response with Shortened Addresses:", parsed_response)
    return parsed_response
