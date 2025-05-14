import requests

API_KEY = "AIzaSyCPTIfFjLPpRetd9p_UZZqIYEBsiC1FVto"
url = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key={API_KEY}"

headers = {
    "Content-Type": "application/json"
}

data = {
    "contents": [
        {
            "parts": [
                {"text": "tell me about walmart"}
            ]
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())