from django.shortcuts import render 
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from publisher.models import PublisherAuthToken
from company.models import CompanyAuthToken
from . models import *
from . serializer import *
from datetime import timedelta

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

	# def post(self, request): 
	# 	serializer = ReactBillxCompSerializer(data=request.data) 
	# 	if serializer.is_valid(raise_exception=True): 
	# 		serializer.save() 
	# 		return Response(serializer.data) 

<<<<<<< HEAD
class Bookings(APIView):

    def get(self, request):
        # Retrieve the Authorization token from headers
        token = request.headers.get('Authorization')

        # Check if the token is provided
        if not token:
            return Response({'error': 'Authorization token missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the auth token and the company
            auth_token = CompanyAuthToken.objects.get(token=token)
            if not auth_token.is_valid():
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

            company = companies.objects.get(id=auth_token.user.id)
        except CompanyAuthToken.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except companies.DoesNotExist:
            return Response({'error': 'Company not found'}, status=status.HTTP_404_NOT_FOUND)

        # Get all billxcomp records related to this company
        billxcomp_records = billxcomp.objects.filter(company_id=company.id)

        # Prepare a list to hold the combined serialized data
        data = []

        # Iterate over billxcomp records to include billboard data
        for record in billxcomp_records:
            # Serialize the billxcomp record
            serializer = ReactBillxCompSerializer(record)

            # Get the corresponding billboard data
            try:
                billboard_instance = billboards.objects.get(id=record.billboard_id.id)  # Ensure you're getting the ID
                billboard_serializer = ReactBillBoardSerializer(billboard_instance)

                # Combine the serialized data
                combined_data = serializer.data
                combined_data['billboard'] = billboard_serializer.data
            except billboards.DoesNotExist:
                combined_data = serializer.data
                combined_data['billboard'] = None  # Handle missing billboard

            data.append(combined_data)

        # Return the combined serialized data
        return Response(data, status=status.HTTP_200_OK)
=======
# class Bookings(APIView):
#     def get(self,request):
>>>>>>> 27fc297375cf9fd9b1fe61c41742c3e3e5824d0d
        


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
	

	def get(self, request, id=None):
		def generate_disabled_dates(start_date, end_date):
			date_list = []
			current_date = start_date
			while current_date <= end_date:
				date_list.append(current_date)
				current_date += timedelta(days=1)
			return date_list
		if id:
			try:
				# Fetch the single billboard by id
				billboard_instance = billboards.objects.get(id=id)
				
				# Serialize the billboard data
				serializer = self.serializer_class(billboard_instance)
				data = serializer.data

				# Extract and add latitude and longitude from coordinates
				data['lat'] = data['coordinates'].split(',')[0]
				data['lng'] = data['coordinates'].split(',')[1]

				# Get and serialize the billboard type
				type_instance = billboard_type.objects.get(id=data['type'])
				type_serializer = ReactBillBoardTypeSerializer(type_instance)
				data['type'] = type_serializer.data

				# Get and serialize the publisher data
				publisher_instance = publishers.objects.get(id=data['publisher_id'])
				publisher_serializer = ReactPublisherSerializer(publisher_instance)
				data['publisher'] = publisher_serializer.data

				# Fetch the booking dates from billxcomp for this billboard
				bookings = billxcomp.objects.filter(billboard_id=billboard_instance).values('start_date', 'end_date')

				# Prepare disabled dates by extracting start_date and end_date
				disabled_dates = []
				for booking in bookings:
					start_date = booking['start_date']
					end_date = booking['end_date']
					# Add all dates between start_date and end_date to the disabled_dates list
					disabled_dates.extend(generate_disabled_dates(start_date, end_date))
				
				# Add disabled dates to the response
				data['disabled_dates'] = disabled_dates

				return Response(data, status=status.HTTP_200_OK)

			except billboards.DoesNotExist:
				return Response({'error': 'Billboard not found'}, status=status.HTTP_404_NOT_FOUND)
			except Exception as e:
				return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		
		# Fetch all billboards if no specific id is provided
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

		return Response(serializer.data, status=status.HTTP_200_OK)

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
