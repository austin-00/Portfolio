import requests

session = requests.Session()

BASE_URL = "http://127.0.0.1:8000"

CSRF_ENDPOINT = f"{BASE_URL}/api/csrf/"
SUBMIT_ENDPOINT = f"{BASE_URL}/api/contact/"

# 1. Get the CSRF token
print("1. Sending GET request to fetch CSRF token...")
get_response = session.get(CSRF_ENDPOINT)
print(f"   Status Code: {get_response.status_code}")

if get_response.status_code != 200:
    print(f"   Response Body: {get_response.text}")
    print("\n❌ Failed to get CSRF token.")
    exit(1)

# Extract token from session cookies
csrf_token = session.cookies.get("csrftoken")
print(f"   Extracted CSRF Token: {csrf_token}")

if not csrf_token:
    print("\n❌ 'csrftoken' cookie not found in response.")
    exit(1)

# 2. Send the POST request
headers = {
    "X-CSRFToken": csrf_token,
    "Content-Type": "application/json"
}
payload = {
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing CSRF POST endpoint"
}

print("\n2. Sending POST request with CSRF header...")
post_response = session.post(SUBMIT_ENDPOINT, json=payload, headers=headers)

print(f"   Status Code: {post_response.status_code}")
try:
    print(f"   Response Body: {post_response.json()}")
except Exception:
    print(f"   Response Body: {post_response.text}")