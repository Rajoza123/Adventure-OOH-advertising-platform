from django.shortcuts import render 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from publisher.models import PublisherAuthToken
from company.models import CompanyAuthToken
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
		token = request.headers.get('Authorization')

		# Check if token is provided
		if not token:
			return Response({'error': 'Authorization token missing'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			# Retrieve auth token and company
			auth_token = CompanyAuthToken.objects.get(token=token)
			if not auth_token.is_valid():
				return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

			company = companies.objects.get(id=auth_token.user.id)
		except CompanyAuthToken.DoesNotExist:
			return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
		except companies.DoesNotExist:
			return Response({'error': 'Company not found'}, status=status.HTTP_404_NOT_FOUND)

		# Modify the request data to inject publisher_id
		request_data = request.data.copy()
		request_data['company_id'] = company.id

		# Pass modified data to the serializer
		serializer = ReactBillxCompSerializer(data=request_data)

		# Validate and save the data
		try:
			if serializer.is_valid(raise_exception=True):
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		except serializers.ValidationError as e:
			print(e)  # Log serializer errors
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
		token = request.headers.get('Authorization')

		# Check if token is provided
		if not token:
			return Response({'error': 'Authorization token missing'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			# Retrieve auth token and publisher
			auth_token = PublisherAuthToken.objects.get(token=token)
			if not auth_token.is_valid():
				return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

			publisher = publishers.objects.get(id=auth_token.user.id)
		except PublisherAuthToken.DoesNotExist:
			return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
		except publishers.DoesNotExist:
			return Response({'error': 'Publisher not found'}, status=status.HTTP_404_NOT_FOUND)

		# Modify the request data to inject publisher_id
		request_data = request.data.copy()
		request_data['publisher_id'] = publisher.id

		# Pass modified data to the serializer
		serializer = ReactBillBoardSerializer(data=request_data)

		# Validate and save the data
		try:
			if serializer.is_valid(raise_exception=True):
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		except serializers.ValidationError as e:
			print(e)  # Log serializer errors
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)