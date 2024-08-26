from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
# Create your views here. 

class PublisherView(APIView): 
	
	serializer_class = ReactPublisherSerializer 

	def get(self, request): 
		detail = [ {'id' :pub.id,'name':pub.name,'email':pub.email,'password':pub.password,'contact':pub.contact}
		for pub in publishers.objects.all()] 

		return Response(detail) 

	def post(self, request): 

		serializer = ReactPublisherSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 

