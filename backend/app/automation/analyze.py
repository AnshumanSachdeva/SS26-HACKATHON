import os
import fitz  # PyMuPDF

from app.ai_engine import analyze_blueprint


def analyze_building(file_path: str):

    ext = os.path.splitext(file_path)[1].lower()

    # If a PDF was uploaded, render its first page to a PNG first,
    # since the AI model needs an image, not a PDF.
    if ext == ".pdf":
        doc = fitz.open(file_path)
        page = doc.load_page(0)
        pix = page.get_pixmap()

        image_path = os.path.join(os.path.dirname(file_path), "page1.png")
        pix.save(image_path)
        doc.close()
    else:
        # Already an image (png/jpg/jpeg) - use it directly.
        image_path = file_path

    result = analyze_blueprint(image_path)

    return result.model_dump()
