from django.db import models

# Create your models here.

class billboards(models.Model):
    id = models.AutoField(primary_key=True)
    publisher_id= models.ForeignKey("publisher.publishers", on_delete=models.CASCADE)
    coordinates= models.TextField(max_length=5000)
    price = models.DecimalField( max_digits=7, decimal_places=2)
    locality = models.CharField(max_length=50)
    type = models.ForeignKey("billboard.billboard_type", on_delete=models.CASCADE)
    area = models.CharField(max_length=50)
    height = models.IntegerField()
    width = models.IntegerField()
    num_of_boards = models.IntegerField()
    image = models.ImageField()
    
    def __str__(self):
        return self.area
    
# class billxcomp(models.Model):
#     id = models.AutoField(primary_key=True)
#     billboard_id = models.ForeignKey("billboard.billboards", on_delete=models.CASCADE)
#     company_id=models.ForeignKey("company.companies", on_delete=models.CASCADE)
    
class billboard_type(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='types/image')
    
    def __str__(self):
        return self.name