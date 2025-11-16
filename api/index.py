from mangum import Mangum
import sys
import os

# Add the project root to the path
project_root = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, project_root)
sys.path.insert(0, os.path.join(project_root, 'app', 'backend'))

# Import the FastAPI app
from app.backend.app import app

# Create the handler for Vercel
handler = Mangum(app, lifespan="off")
