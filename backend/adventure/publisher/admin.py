from django.contrib import admin
from .models import publishers
from company.models import CompanyAuthToken as companyAuth
# Register your models here.
admin.site.register(publishers)
admin.site.register(companyAuth)