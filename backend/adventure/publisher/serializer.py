from rest_framework import serializers 
from . models import *
from django.contrib.auth.hashers import make_password, check_password


class ReactPublisherSerializer(serializers.ModelSerializer): 
	class Meta: 
		model = publishers
		fields = ('__all__')
		extra_kwargs = {'password': {'write_only': True}}
    	
	def create(self, validated_data):
		validated_data['password'] = make_password(validated_data['password'])
		return super(ReactPublisherSerializer, self).create(validated_data) 

class PublisherSignInSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=254)
    password = serializers.CharField(max_length=100, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        try:
            publisher = publishers.objects.get(email=email)
        except publishers.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        if not check_password(password, publisher.password):
            raise serializers.ValidationError("Invalid email or password.")

        data['publisher'] = publisher
        return data