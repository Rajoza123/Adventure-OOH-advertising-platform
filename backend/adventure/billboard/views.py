from django.shortcuts import render 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
import json

from . models import *
from . serializer import *
# Create your views here.

class BillxCompView(APIView): 
	
	serializer_class = ReactBillxCompSerializer 

	def get(self, request): 
		billxcomp_list = billxcomp.objects.all()
		serializer = self.serializer_class(billxcomp_list,many=True)
		return Response(serializer.data)

	def post(self, request): 
		serializer = ReactBillxCompSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 


class BillboardTypeView(APIView): 

	serializer_class = ReactBillBoardTypeSerializer	
		

	def get(self, request):
		billboardtype_list = billboard_type.objects.all()
		serializer = self.serializer_class(billboardtype_list,many=True)
		return Response(serializer.data) 

	def post(self, request): 

		serializer = ReactBillBoardTypeSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 


class BillBoardView(APIView):

    serializer_class = ReactBillBoardSerializer

    def get(self, request):
        billboards_list = billboards.objects.all()
        serializer = self.serializer_class(billboards_list, many=True)
        for b in serializer.data:
            b['lat'] = b['coordinates'].split(',')[0]
            b['lng'] = b['coordinates'].split(',')[1]
            
            type_instance = billboard_type.objects.get(id=b['type'])
            type_serializer = ReactBillBoardTypeSerializer(type_instance)
            b['type'] = type_serializer.data
            
            publisher_instance = publishers.objects.get(id=b['publisher_id'])
            publisher_serializer = ReactPublisherSerializer(publisher_instance)
            b['publisher'] = publisher_serializer.data
        return Response(serializer.data)

    def post(self, request):
        serializer = ReactBillBoardSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)