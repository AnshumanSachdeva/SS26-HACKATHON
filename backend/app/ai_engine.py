import os
from dotenv import load_dotenv
from PIL import Image
from google import genai
from google.genai import types

from app.models import BlueprintInspection
from app.prompts import PROMPT

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def analyze_blueprint(image_path: str) -> BlueprintInspection:
    image = Image.open(image_path)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[PROMPT, image],
        config=types.GenerateContentConfig(
            temperature=0.2,
            response_mime_type="application/json",
            response_schema=BlueprintInspection
        )
    )

    return response.parsed