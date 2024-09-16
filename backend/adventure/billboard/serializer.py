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
	
	# def create(self, validated_data):
	# 	# Extract the publisher from validated_data
	# 	publisher = validated_data.pop('publisher', None)
	# 	# Create the billboard object, passing the publisher explicitly
	# 	return billboards.objects.create(publisher_id=publisher.id, **validated_data)
	
 	

class ReactBillxCompSerializer(serializers.ModelSerializer): 
	# billboard_id = ReactBillBoardSerializer(read_only=True)
	# company_id = CompanySerializer(read_only=True)
	class Meta: 
		model = billxcomp
		fields = ('__all__')