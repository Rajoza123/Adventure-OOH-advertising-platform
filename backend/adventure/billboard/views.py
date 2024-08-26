from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
# Create your views here. 

class BillxCompView(APIView): 
	
	serializer_class = ReactBillxCompSerializer 

	def get(self, request): 
		detail = [ {'id' :bc.id,'billboard_id':bc.billboard_id,'company_id':bc.company_id,'booking_date':bc.booking_date,'start_date':bc.start_date,'end_date':bc.end_date,'price':bc.price}
		for bc in billxcomp.objects.all()] 
		return Response(detail) 

	def post(self, request): 

		serializer = ReactBillxCompSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 

class BillboardTypeView(APIView): 
	
	serializer_class = ReactBillBoardTypeSerializer 

	def get(self, request): 
		detail = [ {'id' :type.id,'name':type.name}
		for type in billboard_type.objects.all()] 

		return Response(detail) 

	def post(self, request): 

		serializer = ReactBillBoardTypeSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 


class BillBoardView(APIView): 
	
	serializer_class = ReactBillBoardSerializer 

	def get(self, request): 
		detail = [ {'id': bb.id,'coordinates':bb.coordinates,'price':bb.price,'locality':bb.locality,'area':bb.area,'height':bb.height,'width':bb.width,'num_of_boards':bb.num_of_boards}
		for bb in billboards.objects.all()] 
		return Response(detail) 

	def post(self, request):

		serializer = ReactBillBoardSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 
        