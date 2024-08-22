from django.contrib import admin
from .models import billboards
from .models import billboard_type
# Register your models here.
admin.site.register(billboards)
admin.site.register(billboard_type)