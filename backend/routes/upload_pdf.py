# routes/upload_pdf.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
from datetime import datetime
import shutil
from prisma import Prisma
from utils.pdf_processing import extract_text_from_pdf
from utils.embedding_processing import create_embeddings  # Ensure you import the create_embeddings function

router = APIRouter()
prisma = Prisma()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)  # Ensure uploads directory exists

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    print(file)
    await prisma.connect()  # Connect to Prisma client
    try:
        print("Uploading file...")  # Debugging print

        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Invalid file format. Please upload a PDF.")

        if not file.filename:
            raise HTTPException(status_code=400, detail="Filename is required")

        # Generate a unique file path for the uploaded file
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        file_path = UPLOAD_DIR / f"{timestamp}_{file.filename}"

        # Save the uploaded PDF file locally
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Read the PDF data and extract text content
        pdf_data = file_path.read_bytes()
        content = extract_text_from_pdf(pdf_data)

        # Store metadata and content in the database
        document = await prisma.document.create({
            "filename": file.filename,
            "filepath": str(file_path),
            "content": content,
            "uploadDate": datetime.now()
        })

        # Create embeddings for the document content

        return {
            "message": "File uploaded and embedded successfully",
            "document_id": document.id,
            "file_path": str(file_path),
            "status": 200
        }

    except Exception as e:
        print(f"Error occurred: {e}")  # Log the error for debugging
        raise HTTPException(status_code=500, detail="An error occurred during file upload.")
    
    finally:
        await prisma.disconnect()  # Disconnect from Prisma client
