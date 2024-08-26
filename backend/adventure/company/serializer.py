from rest_framework import serializers 
from . models import *
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password



class ReactCompanySerializer(serializers.ModelSerializer): 
	class Meta: 
		model = companies
		fields = ('__all__')
		extra_kwargs = {'password': {'write_only': True}}
  
	def create(self, validated_data):
		validated_data['password'] = make_password(validated_data['password'])
		return super(ReactCompanySerializer, self).create(validated_data)

class CompanySignInSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=254)
    password = serializers.CharField(max_length=100, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        try:
            company = companies.objects.get(email=email)
        except companies.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        if not check_password(password, company.password):
            raise serializers.ValidationError("Invalid email or password.")

        data['company'] = company
        return data