from rest_framework import serializers 
from . models import *

class ReactCompanySerializer(serializers.ModelSerializer): 
	class Meta: 
		model = companies
		fields = ('__all__') 
