from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .forms import ContactForm
import json

@csrf_exempt
@require_POST
def contact_api(request):
    try:
        data = json.loads(request.body)
        form = ContactForm(data)
        
        if form.is_valid():
            form.save()
            return JsonResponse({"message": "Your message has been sent successfully!"}, status=200)
        else:
            return JsonResponse({"errors": form.errors}, status=400)
            
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format."}, status=400)