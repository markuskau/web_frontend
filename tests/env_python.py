import os
from dotenv import load_dotenv
from pathlib import Path

# Haetaan .env projektin juuresta
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
BASE_URL = os.getenv("BASE_URL")
