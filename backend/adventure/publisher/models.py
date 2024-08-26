from django.db import models
from django.core.serializers.json import DjangoJSONEncoder
import json

# Create your models here.

class publishers(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=100)
    contact = models.IntegerField()
    image = models.ImageField(upload_to='publisher/image')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'contact': self.contact,
            'image_url': self.image.url if self.image else None,
        }

    def to_json(self):
        return json.dumps(self.to_dict(), cls=DjangoJSONEncoder)
    
    def __str__(self):
        return self.name

    
    