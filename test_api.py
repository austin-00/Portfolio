import requests

session = requests.Session()

# 1. Hit the GET view to receive the 'csrftoken' cookie
csrf_url = "http://127.0.0.1:8000/contact/csrf/"
get_resp = session.get(csrf_url)
print("GET Status:", get_resp.status_code)

# 2. Grab the token from the session cookies
csrf_token = session.cookies.get("csrftoken")
print("Retrieved Token:", csrf_token)

# 3. Send POST request with the 'X-CSRFToken' header
submit_url = "http://127.0.0.1:8000/contact/submit/"
headers = {
    "X-CSRFToken": csrf_token,
    "Content-Type": "application/json"
}
payload = {"name": "Test", "message": "Hello Django"}

post_resp = session.post(submit_url, json=payload, headers=headers)
print("POST Status:", post_resp.status_code)
print("POST Response:", post_resp.json())