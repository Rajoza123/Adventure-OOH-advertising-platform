from django.db import models


# Create your models here.

class companies(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=100)
    contact = models.IntegerField()
    image = models.ImageField(upload_to='company/image')
    
    def __str__(self):
        return self.name