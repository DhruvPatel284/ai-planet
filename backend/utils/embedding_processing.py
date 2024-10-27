import os
import asyncio
from fastapi import HTTPException
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from supabase import create_client

async def create_embeddings(content: str):
    try:
        # Initialize the splitter
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            separators=['\n\n', '\n', ' ', '']
        )
        
        output = await splitter.create_documents([content])

        # Load environment variables (make sure these are set in your environment)
        sb_api_key = os.getenv("SUPABASE_API_KEY", "")
        sb_url = os.getenv("SUPABASE_URL", "")
        openai_key = os.getenv("OPENAI_API_KEY", "")

        # Create Supabase client
        client = create_client(sb_url, sb_api_key)

        # Use SupabaseVectorStore to embed documents
        await SupabaseVectorStore.from_documents(
            output,
            OpenAIEmbeddings(openai_api_key=openai_key),
            {
                "client": client,
                "tableName": "documents"
            }
        )
        return  "Embedded successfully"
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Embedding error")