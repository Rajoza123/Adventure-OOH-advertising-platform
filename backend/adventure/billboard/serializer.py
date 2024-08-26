from rest_framework import serializers 
from . models import *
from publisher.models import publishers



class ReactBillBoardSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = billboards
		fields = ('__all__')
 	

class ReactBillBoardTypeSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = billboard_type
		fields = ('__all__')

class ReactBillxCompSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = billxcomp
		fields = ('__all__') 