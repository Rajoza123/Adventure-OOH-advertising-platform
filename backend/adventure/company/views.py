from django.shortcuts import render 
from rest_framework.views import APIView 
from rest_framework.response import Response 
from django.shortcuts import get_object_or_404
from rest_framework import status
from . models import *
from . serializer import *


# Create your views here. 

class CompanyView(APIView): 
	
	serializer_class = ReactCompanySerializer 
	def get(self, request, id=None):
		if id:
            # Fetch a single company by id
			company_instance = get_object_or_404(companies, id=id)
			serializer = self.serializer_class(company_instance)
		else:
            # Fetch all companies
			company_list = companies.objects.all()
			serializer = self.serializer_class(company_list, many=True)
        
		return Response(serializer.data)

	def post(self, request):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def put(self, request, id=None):
		company = get_object_or_404(companies, id=id)
		serializer = self.serializer_class(company, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, id=None):
		company = get_object_or_404(companies, id=id)
		company.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class CompanySignInView(APIView):

    def post(self, request):
        serializer = CompanySignInSerializer(data=request.data)
        if serializer.is_valid():
            company = serializer.validated_data['company']
            
            # Manually create a session
            request.session['company_id'] = company.id
            request.session['company_name'] = company.name
            request.session['is_authenticated'] = True
            
            return Response({
                'id': company.id,
                'name': company.name,
                'email': company.email,
                'contact': company.contact,
                'image': company.image.url if company.image else None,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompanyProfileView(APIView):

    def get(self, request):
        if request.session.get('is_authenticated'):
            company_id = request.session.get('company_id')
            company_name = request.session.get('company_name')
            # Fetch additional company data if needed
            return Response({
                'message': f'Welcome {company_name}!',
                'company_id': company_id,
            })
        else:
            return Response({'error': 'Not authenticated'}, status=403)
        
class CompanySignOutView(APIView):

    def post(self, request):
        request.session.flush()  # Clears all session data
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)