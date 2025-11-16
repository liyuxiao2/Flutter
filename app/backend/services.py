import google.generativeai as genai
import googlemaps
import os
import json
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# Initialize Google Maps client
gmaps = googlemaps.Client(key=os.environ.get("GOOGLE_API_KEY"))



def generate_ai_suggestions(budget, time, style, location_str, dietary, inspiration):
    """Generate date suggestions using Gemini AI."""
    prompt = f"""Plan a date based on the following preferences:
    - Budget: {budget}
    - Time Constraint: {time}
    - Style Preference: {style}
    - Location: {location_str}
    - Dietary Preferences/Allergies: {dietary}
    - Inspiration: {inspiration}

    Provide a detailed plan with at least **5 distinct activities** and **3 distinct restaurants**.
    For each suggestion, provide ONLY the name and a brief description. Output in valid JSON format:
    {{
        "activities": [
            {{
                "name": "Exact activity/venue name",
                "description": "Brief description",
                "time": "Suggested time"
            }}
        ],
        "restaurants": [
            {{
                "name": "Exact restaurant name",
                "description": "Brief description",
                "cuisine": "Type of cuisine"
            }}
        ]
    }}"""

    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(
        f"You are a helpful assistant specialized in planning personalized dates.\n\n{prompt}"
    )

    generated_text = response.text
    print("Generated Text:", generated_text)

    # Clean and parse the JSON
    clean_json = re.sub(r"^```(json)?|```$", "", generated_text.strip(), flags=re.MULTILINE).strip()
    return json.loads(clean_json)


def enrich_activity_with_google_places(activity, location_str):
    """Enrich an activity with Google Places data."""
    try:
        search_query = f"{activity['name']} {location_str}"
        places_result = gmaps.places(query=search_query)

        if places_result.get('results'):
            place = places_result['results'][0]
            place_id = place.get('place_id')

            # Get detailed info
            details = gmaps.place(place_id)['result']

            activity['address'] = details.get('formatted_address', 'Address not available')
            activity['rating'] = details.get('rating')
            activity['GoogleReview'] = details.get('url', f"https://www.google.com/maps/search/?api=1&query={place.get('name', '').replace(' ', '+')}")
            activity['place_id'] = place_id
    except Exception as e:
        print(f"Error enriching activity {activity['name']}: {e}")
        activity['address'] = "Not found"
        activity['rating'] = None
        activity['GoogleReview'] = f"https://www.google.com/maps/search/?api=1&query={activity['name'].replace(' ', '+')}"

    return activity


def enrich_restaurant_with_google_places(restaurant, location_str):
    """Enrich a restaurant with Google Places data."""
    try:
        search_query = f"{restaurant['name']} restaurant {location_str}"
        places_result = gmaps.places(query=search_query)

        if places_result.get('results'):
            place = places_result['results'][0]
            place_id = place.get('place_id')

            # Get detailed info
            details = gmaps.place(place_id)['result']

            restaurant['address'] = details.get('formatted_address', 'Address not available')
            restaurant['rating'] = details.get('rating')
            restaurant['price_level'] = details.get('price_level')
            restaurant['GoogleReview'] = details.get('url', f"https://www.google.com/maps/search/?api=1&query={place.get('name', '').replace(' ', '+')}")
            restaurant['place_id'] = place_id

            # Shorten address to street address only
            full_address = restaurant['address']
            match = re.search(r"^\d+\s[\w\s]+(?:\s(?:[A-Z]|[a-z])+\b)?", full_address)
            if match:
                restaurant['address'] = match.group(0)
    except Exception as e:
        print(f"Error enriching restaurant {restaurant['name']}: {e}")
        restaurant['address'] = "Not found"
        restaurant['rating'] = None
        restaurant['GoogleReview'] = f"https://www.google.com/maps/search/?api=1&query={restaurant['name'].replace(' ', '+')}"

    return restaurant


def generate_date_plan(budget, time, style, location, dietary, inspiration):
    """Generate a date plan based on user preferences."""
    if not isinstance(inspiration, list):
        inspiration = [inspiration]

    # Handle location - convert list to string or use default
    location_str = ", ".join(location) if location else "New York City"


    # Generate AI suggestions
    parsed_response = generate_ai_suggestions(budget, time, style, location_str, dietary, inspiration)

    # Enrich activities with Google Places data
    for activity in parsed_response.get("activities", []):
        enrich_activity_with_google_places(activity, location_str)

    # Enrich restaurants with Google Places data
    for restaurant in parsed_response.get("restaurants", []):
        enrich_restaurant_with_google_places(restaurant, location_str)

    print("Enriched Response with Google Places Data:", parsed_response)
    return parsed_response
