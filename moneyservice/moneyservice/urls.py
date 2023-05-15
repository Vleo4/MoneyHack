from django.contrib import admin
from django.urls import path
from finance.views import *
from finance.auth_views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/credits/', CreditListAPIView.as_view()),
    path('api/credit/create/', CreateCreditAPIView.as_view()),
    path('api/credit/update/<int:pk>/', UpdateCreditAPIView.as_view()),
    path('api/credit/close/<int:pk>/', CloseCreditAPIView.as_view()),
    path('api/credit/destroy/<int:pk>/', DeleteCreditAPIView.as_view()),
    path('api/deposits/', DepositListAPIView.as_view()),
    path('api/deposit/create/', CreateDepositAPIView.as_view()),
    path('api/deposit/update/<int:pk>/', UpdateDepositAPIView.as_view()),
    path('api/deposit/close/<int:pk>/', CloseDepositAPIView.as_view()),
    path('api/deposit/destroy/<int:pk>/', DeleteDepositAPIView.as_view()),
    path('api/profits/', ProfitListAPIView.as_view()),
    path('api/profit/create/', CreateProfitAPIView.as_view()),
    path('api/profit/update/<int:pk>/', UpdateProfitAPIView.as_view()),
    path('api/profit/destroy/<int:pk>/', DeleteProfitAPIView.as_view()),
    path('api/looses/', LossListAPIView.as_view()),
    path('api/lose/create/', CreateLossAPIView.as_view()),
    path('api/lose/update/<int:pk>/', UpdateLossAPIView.as_view()),
    path('api/lose/destroy/<int:pk>/', DeleteLossAPIView.as_view()),
    path('api/register/', RegisterAPI.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/google_login/', GoogleAuthAPIView.as_view()),
]
