import openai
import os
import sys

# Set your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def ask_gpt(question):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=question,
        max_tokens=150
    )
    return response.choices[0].text.strip()

if __name__ == "__main__":
    question = sys.argv[1]
    answer = ask_gpt(question)
    print(answer)
