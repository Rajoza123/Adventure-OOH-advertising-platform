from django.contrib import admin
from .models import *
from company.models import CompanyAuthToken as companyAuth
# Register your models here.
admin.site.register(publishers)
admin.site.register(companyAuth)
admin.site.register(PublisherAuthToken)
