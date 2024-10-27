# utils/pdf_processing.py
import fitz  # PyMuPDF

def extract_text_from_pdf(file):
    text = ""
    pdf_document = fitz.open(stream=file, filetype="pdf")
    for page_num in range(pdf_document.page_count):
        page = pdf_document[page_num]
        text += page.get_text()
    return text
