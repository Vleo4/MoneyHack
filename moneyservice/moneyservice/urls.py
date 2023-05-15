from django.contrib import admin
from django.urls import path
from finance.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/credits/', CreditListAPIView.as_view()),
    path('api/credit/create/', CreateCreditAPIView.as_view()),
]
