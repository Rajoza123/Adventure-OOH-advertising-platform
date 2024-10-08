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
    path('billtype/',BillboardTypeView.as_view(),name='Billboard-Type'),
    path('billboard/',BillBoardView.as_view(),name='Billboards'),
    path('billboard/<int:id>/',BillBoardView.as_view(),name='Billboard'),
    path('billxcomp/',BillxCompView.as_view(),name='Booking'),
    path('billxcomp/<int:id>',BillxCompView.as_view(),name='Booking'),
    path('bookings/', Bookings.as_view(), name='company-Bookings'),
    path('company/',CompanyView.as_view(),name='Companies'),
    path('company/<int:id>/',CompanyView.as_view(),name='Company'),
    path('comp_signin/', CompanySignInView.as_view(), name='company-signin'),
    path('comp_profile/', CompanyProfileView.as_view(), name='company-profile'),
    path('comp_signout/', CompanySignOutView.as_view(), name='company-signout'),
    path('publisher/',PublisherView.as_view(),name='Publishers'),
    path('pub_signin/', PublisherSignInView.as_view(), name='Publisher-signin'),
    path('pub_profile/', PublisherProfileView.as_view(), name='Publisher-profile'),
    path('pub_signout/', PublsiherSignOutView.as_view(), name='Publisher-signout'),
    path('pub_billboards/', PublisherBillBoardsViews.as_view(), name='Publisher-Billboards'),
    path('pub_requests/<int:id>/', PublisherRequests.as_view(), name='Publisher-Request'),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
