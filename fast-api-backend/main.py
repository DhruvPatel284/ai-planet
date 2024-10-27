from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from prisma import Prisma
from routes.upload_pdf import router as upload_router
from routes.ask_question import router as question_router

prisma = Prisma()

async def lifespan(app):
    # Connect to the database at startup
    await prisma.connect()
    
    yield  # This will allow the app to run

    # Disconnect from the database at shutdown
    await prisma.disconnect()

app = FastAPI(lifespan=lifespan)

# CORS configuration
origins = [
    "http://localhost:5173",  # Frontend URL, adjust this as needed
    "https://your-frontend-domain.com",  # Add any other allowed domains
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(upload_router, prefix="/pdf", tags=["PDF Upload"])
app.include_router(question_router, prefix="/question", tags=["Questions"])
