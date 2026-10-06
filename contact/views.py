import json

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from .models import ContactMessage

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"message": "CSRF cookie set."})

@require_POST
def create_contact_message(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON."},
            status=400
        )

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    errors = {}

    if not name:
        errors["name"] = "Name is required."
    elif len(name) > 100:
        errors["name"] = "Name must be 100 characters or less."

    if not email:
        errors["email"] = "Email is required."
    else:
        try:
            validate_email(email)
        except ValidationError:
            errors["email"] = "Enter a valid email address."

    if not message:
        errors["message"] = "Message is required."
    elif len(message) > 10000:
        errors["message"] = "Message must be 10,000 characters or less."

    if errors:
        return JsonResponse(
            {"errors": errors},
            status=400
        )

    contact_message = ContactMessage.objects.create(
        name=name,
        email=email,
        message=message
    )

    return JsonResponse(
        {
            "message": "Your message has been sent successfully.",
            "id": contact_message.id
        },
        status=201
    )