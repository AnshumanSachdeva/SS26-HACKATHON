# 🏗️ Blueprint Cop

> **AI-Powered Building Plan Review System**

Blueprint Cop is an AI-powered web application that automates the preliminary review of building blueprint PDFs. The system uses **Google Gemini Vision** to analyze uploaded building plans, identify potential compliance issues, and generate structured inspection reports with recommendations.

---

## ✨ Features

- 📄 Upload Blueprint PDFs
- 🤖 AI-powered Blueprint Analysis
- 📊 Compliance Score Generation
- ⚠️ Building Code Violation Detection
- 🏢 Building Information Extraction
- ✅ Inspection Status
- 💡 AI-generated Recommendations
- 📑 Structured JSON Response
- ⚡ FastAPI Backend
- 🌐 Simple & Interactive Frontend

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | FastAPI |
| AI Model | Google Gemini 2.5 Flash |
| PDF Processing | PyMuPDF |
| Image Processing | Pillow |
| Data Validation | Pydantic |

---

# 📂 Project Structure

```text
Blueprint-Cop/
│
├── backend/
│   ├── app/
│   │   ├── automation/
│   │   │   ├── analyze.py
│   │   │   └── __init__.py
│   │   │
│   │   ├── routes/
│   │   │   ├── upload.py
│   │   │   └── __init__.py
│   │   │
│   │   ├── uploads/
│   │   ├── ai_engine.py
│   │   ├── models.py
│   │   ├── prompts.py
│   │   ├── main.py
│   │   └── __init__.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── result.html
│   ├── script.js
│   ├── style.css
│   └── SaaS_website_display.mp4
│
└── README.md
```

---

# 🧠 How It Works

```text
            User
              │
              ▼
      Upload Blueprint PDF
              │
              ▼
        FastAPI Backend
              │
              ▼
   PDF → Image Conversion
              │
              ▼
      Gemini Vision AI
              │
              ▼
  Structured JSON Response
              │
              ▼
 Compliance Report Display
```

---

# ⚙️ Workflow

1. Upload a building blueprint PDF.
2. The backend stores the uploaded file.
3. The first page of the PDF is converted into an image.
4. Google Gemini Vision analyzes the blueprint.
5. AI extracts building information and identifies potential issues.
6. The response is validated using Pydantic models.
7. FastAPI returns a structured JSON response.
8. The frontend displays the inspection report.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Blueprint-Cop.git

cd Blueprint-Cop
```

---

## 2. Set Up the Backend

Navigate to the backend folder:

```bash
cd backend
```

If you already have a virtual environment, activate it.

Otherwise, create one:

```bash
python -m venv venv
```

Activate the virtual environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install all required dependencies:

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

Add your Google Gemini API Key:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 4. Start the Backend

```bash
python -m uvicorn app.main:app --reload
```

The backend will start at:

```
http://127.0.0.1:8000
```

FastAPI Documentation:

```
http://127.0.0.1:8000/docs
```

---

## 5. Start the Frontend

Navigate to the frontend folder.

Open `index.html` directly in your browser, or use **VS Code Live Server**.

```
frontend/
    index.html
```

---

# 📡 API

## Upload Blueprint

**POST**

```
/upload
```

### Request

Multipart Form Data

```
file = blueprint.pdf
```

### Sample Response

```json
{
  "building_details": {},
  "inspection_result": {},
  "summary": "",
  "inspection_checks": [],
  "violations": [],
  "recommendations": []
}
```


---

# 📁 Folder Description

| File/Folder | Description |
|-------------|-------------|
| frontend | User Interface |
| routes/upload.py | Handles file upload requests |
| automation/analyze.py | Controls blueprint analysis workflow |
| ai_engine.py | Google Gemini Vision integration |
| prompts.py | AI prompt templates |
| models.py | Pydantic response models |
| uploads | Stores uploaded blueprint PDFs |
| main.py | FastAPI application entry point |

---

# 🎯 Future Enhancements

- Multi-page blueprint analysis
- DWG/DXF support
- Building code database integration
- Blueprint annotation
- Downloadable PDF inspection reports
- Authentication and User Dashboard
- Project History
- Cloud Deployment

---

# 🤝 Contributors

Developed as part of a Hackathon project.

- **Anshuman Sachdeva**
- **Swayam Sachdeva**

---

# 📄 License

This project is intended for educational and hackathon purposes.