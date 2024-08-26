# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variable for OpenAI API key
ENV OPENAI_API_KEY="sk-proj-OD0gKNQzUElRnO1KajH6T3BlbkFJ7N8maDp0lKUvSG471GHm"

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir openai

# Run ask_gpt.py when the container launches
ENTRYPOINT ["python", "./ask_gpt.py"]
CMD ["Hello, how are you?"]
