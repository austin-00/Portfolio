from django.urls import path
from .views import create_contact_message, get_csrf_token
    


urlpatterns = [
    path("csrf/", get_csrf_token, name="get-csrf-token"),
    path("contact/", create_contact_message, name="create-contact-message"),
]