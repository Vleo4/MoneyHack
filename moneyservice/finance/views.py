from django.shortcuts import render
from .serializers import *
from rest_framework.response import Response

from rest_framework import generics, status

class CreditListAPIView(generics.ListAPIView):
    queryset = Credit.objects.all()
    serializer_class = CreditSerializer


class CreateCreditAPIView(generics.CreateAPIView):
    serializer_class = CreateCreditSerializer
