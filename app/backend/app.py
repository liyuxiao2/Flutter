from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

from . import models
from . import services 


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store addresses
global_addresses = []


@app.post('/plan')
async def generate_plan(data: models.PlanRequest):
    global global_addresses
    try:
        print("Request received at /plan")
        print(f"Payload received: {data}")

        parsed_response = services.generate_date_plan(
            data.budget,
            data.time,
            data.style,
            data.location,
            data.dietary,
            data.inspiration
        )

        return parsed_response

    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse JSON response: {str(e)}")
    except Exception as e:
        print(f"Unhandled Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.get('/get-addresses')
async def get_addresses():
    global global_addresses
    return global_addresses


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
