from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from . serializer import *
# Create your views here. 

class PublisherView(APIView): 
	
	serializer_class = ReactPublisherSerializer 
	def get(self, request, id=None):
		if id:
            # Fetch a single company by id
			publisher_instance = get_object_or_404(publishers, id=id)
			serializer = self.serializer_class(publisher_instance)
		else:
		# Fetch all companies
			company_list = publishers.objects.all()
			serializer = self.serializer_class(company_list, many=True)
        
		return Response(serializer.data)


	def put(self, request, id=None):
		publisher = get_object_or_404(publishers, id=id)
		serializer = self.serializer_class(publisher, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, id=None):
		publisher = get_object_or_404(publishers, id=id)
		publisher.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			publisher = serializer.save()
			token = PublisherAuthToken.objects.create(user=publisher)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PublisherSignInView(APIView):

    def post(self, request):
        serializer = PublisherSignInSerializer(data=request.data)
        if serializer.is_valid():
            publisher = serializer.validated_data['publisher']
            
            # Manually create a session
            request.session['publisher_id'] = publisher.id
            request.session['publisher_name'] = publisher.name
            request.session['is_authenticated'] = True
        # Create an auth token for the user
            token, created = PublisherAuthToken.objects.get_or_create(user=publisher)
            if not token.is_valid():
                token.delete()
                token = PublisherAuthToken.objects.create(user=publisher)
            return Response({
                'id': publisher.id,
                'name': publisher.name,
                'email': publisher.email,
                'contact': publisher.contact,
                'image': publisher.image.url if publisher.image else None,
                'token':token.token
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublisherProfileView(APIView):

    def get(self, request):
        token = request.headers.get('Authorization')
        try:
            auth_token = PublisherAuthToken.objects.get(token=token)
            if auth_token.is_valid():
                publisher = publishers.objects.get(id=auth_token.user.id)
                return Response({
                'id': publisher.id,
                'name': publisher.name,
                'email': publisher.email,
                'contact': publisher.contact,
                'image': publisher.image.url if publisher.image else None,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'user not foune'}, status=403)
        else:
            return Response({'error': 'Not authenticated'}, status=403)
        
class PublsiherSignOutView(APIView):

    def post(self, request):
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

