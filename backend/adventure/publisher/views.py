from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
# Create your views here. 

class PublisherView(APIView): 
	
	serializer_class = ReactPublisherSerializer 

	def get(self, request): 
		publisher_list =  publishers.objects.all()
		serializer = self.serializer_class(publisher_list,many=True)
		return Response(serializer.data) 

	def post(self, request): 

		serializer = ReactPublisherSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 

