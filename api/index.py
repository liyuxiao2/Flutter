from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add the project root to the path
project_root = os.path.dirname(os.path.dirname(__file__))
sys.path.insert(0, project_root)

# Import the FastAPI app from backend
from app.backend.app import app as backend_app

# This is the app instance that Vercel will use
app = backend_app
