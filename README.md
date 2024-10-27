# Document Question Answering Application

Welcome to the **Document Question Answering Application**, a full-stack platform allowing users to upload PDF documents and ask questions about the document's content. The application uses natural language processing (NLP) to provide accurate answers to user queries in real-time.

## 📚 Table of Contents
- [Project Demo](#-project-demo)
- [Project Overview](#-project-overview)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Features in Detail](#-features-in-detail)

## 🎥 Project Demo
[Watch the Demo Video](https://youtu.be/JRI6X9QZrOg)  

## 🚀 Project Overview

The **Document Question Answering Application** is designed for users to interact with PDF documents through questions based on document content. Users upload a PDF file, ask questions, and the backend processes the questions using NLP to deliver accurate responses. Document metadata is also stored, facilitating efficient tracking and retrieval.

### Key Features:
- **PDF Upload**: Users can upload PDF documents to the platform.
- **NLP-Driven Q&A**: Users can pose questions, and the backend processes them using NLP.
- **Real-Time Response**: Questions are answered quickly, leveraging document data.
- **Metadata Storage**: Metadata for each document is stored for easier management.

## 🛠️ Technologies Used

### Frontend:
- **React.js**: For building the interactive user interface

### Backend:
- **FastAPI**: A modern, fast web framework for building RESTful APIs
- **LangChain**: A framework for NLP processing and generating answers based on document content
- **PostgreSQL**: Stores metadata about uploaded documents
- **Local Filesystem**: Used for storing PDF files

## 🚀 Getting Started

### Prerequisites:
- **Python 3.8+**
- **Node.js 14+**
- **PostgreSQL**

### Step-by-Step Setup:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DhruvPatel284/ai-planet.git
   cd ai-planet
2. **Backend Setup:**
-   Navigate to the backend directory:
    ```bash
    cd backend
- Install the required Python packages:
    ```bash
    pip install -r requirements.txt
- Set up Environment Variables :
    ```
    SUPABASE_API_KEY = 
    SUPABASE_URL = 
    OPENAI_API_KEY = 
    DATABASE_URL=postgresql://user:password@localhost:5432/your-database-name
- Run the backend server:
    ```bash
    uvicorn main:app --reload

3. **Frontend Setup:**
-   Navigate to the frontend directory:
    ```bash
    cd ../frontend
-   Install the frontend dependencies:
    ```bash
    npm install
-   Configure the backend URL in the frontend config.ts file:
    ```bash
    export const BACKEND_URL = 'http://localhost:8000'
-   Run the frontend server:
    ```bash
    npm run dev
4. **Access the application:**
-   Open your web browser and navigate to `http://localhost:5173` to access the application

### **📝 Features in Details**:
   1.**PDF Upload:** Users can easily upload PDFs, which are stored in the local filesystem.

   2.**Question and Answer:** The backend processes questions using LangChain, returning answers based on document content.

   3.**Real-Time Interaction:** Answers are provided promptly, allowing seamless interaction.
   
   4.**Metadata Management:** PostgreSQL stores document metadata for easy tracking and search.