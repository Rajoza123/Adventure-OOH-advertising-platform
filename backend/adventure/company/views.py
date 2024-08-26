from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
# Create your views here. 

class CompanyView(APIView): 
	
	serializer_class = ReactCompanySerializer 

	def get(self, request): 
		company_list =  companies.objects.all()
		serializer = self.serializer_class(company_list,many=True)
		return Response(serializer.data) 

	def post(self, request): 

		serializer = ReactCompanySerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 

