from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
# Create your views here. 

class BillBoardView(APIView): 
	
	serializer_class = ReactBillBoardSerializer 

	def get(self, request): 
		detail = [ {'id': bb.id,'publisher_id':bb.publisher_id,'coordinates':bb.coordinates,'price':bb.price,'locality':bb.locality,'type':bb.type,'area':bb.area,'height':bb.height,'width':bb.width,'num_of_boards':bb.num_of_boards,'image':bb.image}
		for bb in billboards.objects.all()] 
		return Response(detail) 

	def post(self, request): 

		serializer = ReactBillBoardSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 

# class BillboardView(APIView):
#     def get(self,req):
#         BillBoardData = []
        
#         for bb in billboards.objects.all():
#             BillBoardData.append({id: bb.id,
#                        publisher_id:bb.publisher_id,
#                        coordinates:bb.coordinates,
#                        price:bb.price,
#                        locality:bb.locality,
#                        type:bb.type,
#                        area:bb.area,
#                        height:bb.height,
#                        width:bb.width,
#                        num_of_boards:bb.num_of_boards,
#                        image:bb.image })
        
#         return Response(BillBoardData)
        