from mangum import Mangum
import sys
import os

# Add the app/backend directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app', 'backend'))

from app import app

handler = Mangum(app)
