from rest_framework import serializers 
from . models import *
from publisher.serializer import *
from company.serializer import *



class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = companies
        fields = ('__all__')
        
class ReactBillBoardTypeSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = billboard_type
		fields = ('__all__')

class ReactBillBoardSerializer(serializers.ModelSerializer):
	class Meta: 
		model = billboards
		fields = ('__all__')
	# publisher_id = ReactPublisherSerializer(read_only=True)
	# type = ReactBillBoardTypeSerializer(read_only=True)
 	

class ReactBillxCompSerializer(serializers.ModelSerializer): 
	# billboard_id = ReactBillBoardSerializer(read_only=True)
	# company_id = CompanySerializer(read_only=True)
	class Meta: 
		model = billxcomp
		fields = ('__all__') 