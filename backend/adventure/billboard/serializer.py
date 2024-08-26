from rest_framework import serializers 
from . models import *

class ReactBillBoardSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = billboards
		fields = ('__all__') 

class ReactBillBoardTypeSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = billboard_type
		fields = ('__all__') 
