# utils/nlp_processing.py
import os
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda

def generate_answer(document_content: str, question: str):
    # Create a prompt template to structure the input for the LLM
    prompt = PromptTemplate.from_template(
        "You are a helpful and enthusiastic support bot who can answer a given question based on the context provided. "
        "Your answer should summarize or define the topic based on the context. If you do not find the answer in the content, "
        "then provide an answer based on your knowledge.\n"
        "context: {document_content}\n"
        "question: {question}\n"
        "answer: "
    )

    # Initialize the OpenAI LLM with the API key from the environment variables
    openai_api_key = os.getenv("OPENAI_API_KEY")

    # Create an instance of the OpenAI language model
    llm = ChatOpenAI(
        openai_api_key=openai_api_key,  # Use the API key for authentication
        temperature=0,  # Adjust the temperature as needed
        model="gpt-4o"  # Specify the model you want to use
    )

    # Define a runnable that generates answers based on the formatted prompt
    answer_generator = RunnableLambda(
        lambda inputs: llm(prompt.format(document_content=inputs['document_content'], question=inputs['question']))
    )

    # Generate the answer using the answer generator
    answer = answer_generator.invoke({
        'document_content': document_content,
        'question': question
    })

    return answer  # Return the generated answer
