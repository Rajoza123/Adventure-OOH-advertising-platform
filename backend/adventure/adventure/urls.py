"""
URL configuration for adventure project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from publisher.views import *
from company.views import *
from billboard.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('publisher/',PublisherView.as_view()),
    path('company/',CompanyView.as_view()),
    path('company/<int:id>/',CompanyView.as_view()),
    path('billtype/',BillboardTypeView.as_view()),
    path('billboard/',BillBoardView.as_view()),
    path('billxcomp/',BillxCompView.as_view()),
    path('signin/', CompanySignInView.as_view(), name='company-signin'),
    path('profile/', CompanyProfileView.as_view(), name='company-profile'),
    path('signout/', CompanySignOutView.as_view(), name='company-signout'),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
