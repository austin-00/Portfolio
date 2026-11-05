from django import forms
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    # Honeypot field for spam protection
    website = forms.CharField(required=False, widget=forms.HiddenInput)

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']

    def clean_website(self):
        website = self.cleaned_data.get('website')
        if website:
            raise forms.ValidationError("Spam detected.")
        return website