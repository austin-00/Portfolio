from django.db import models
from django.db.models.functions import Now


class ContactMessage(models.Model):

    class Status(models.TextChoices):
        NEW = "new", "New"
        READ = "read", "Read"
        REPLIED = "replied", "Replied"
        ARCHIVED = "archived", "Archived"

    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=255)
    message = models.TextField()
    status = models.CharField(
        max_length=9,
        choices=Status.choices,
        default=Status.NEW
    )
    created_at = models.DateTimeField(db_default=models.functions.Now())
    updated_at = models.DateTimeField(db_default=models.functions.Now())

    class Meta:
        managed = False
        db_table = "contact_messages"