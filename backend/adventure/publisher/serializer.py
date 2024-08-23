from rest_framework import serializers 
from . models import *

class ReactPublisherSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = publishers
		fields = ('__all__') 
