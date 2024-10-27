# routes/ask_question.py
from fastapi import APIRouter, HTTPException, Query
from prisma import Prisma
from utils.nlp_processing import generate_answer

router = APIRouter()
prisma = Prisma()

@router.post("/ask")
async def ask_question(
    id: int ,
    question: str
):
    await prisma.connect()  # Connect to the Prisma client
    
    try:
        # Retrieve the document by its filename
        if id :
            document = await prisma.document.find_unique(where={"id": id})
        else :
            document = await prisma.document.find_many()

        
        if not document:
            raise HTTPException(status_code=404, detail="Document not found.")
        
        # Use the document's content to generate the answer
        answer = generate_answer(document.content, question)
        
        return {"answer": answer}
    
    except Exception as e:
        print(f"Error occurred: {e}")  # Log the error for debugging
        raise HTTPException(status_code=500, detail="An error occurred while processing the question.")
    
    finally:
        await prisma.disconnect()  # Ensure to disconnect from the Prisma client
