from django.db import models
import uuid
from datetime import datetime, timedelta, timezone

# Create your models here.

class publishers(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=100)
    contact = models.IntegerField()
    image = models.ImageField(upload_to='publisher/image')

    def __str__(self):
        return self.email
    
class PublisherAuthToken(models.Model):
    user = models.OneToOneField(publishers, on_delete=models.CASCADE)
    token = models.CharField(max_length=40, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = uuid.uuid4().hex
        return super().save(*args, **kwargs)

    def is_valid(self):
    # Token valid for 1 hour
        now = datetime.now(timezone.utc)
        created_at_aware = self.created_at.replace(tzinfo=timezone.utc)
        return created_at_aware >= now - timedelta(hours=1)

    def __str__(self):
        return f'Token for {self.user.id}'

    
