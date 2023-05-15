from django.shortcuts import render
from .serializers import *
from rest_framework.response import Response

from rest_framework import generics, status

class CreditListAPIView(generics.ListAPIView):
    queryset = Credit.objects.all()
    serializer_class = CreditSerializer


class CreateCreditAPIView(generics.CreateAPIView):
    serializer_class = CreateCreditSerializer

class UpdateCreditAPIView(generics.UpdateAPIView):
    serializer_class = CreateCreditSerializer
    queryset = Credit.objects.all()

class CloseCreditAPIView(generics.UpdateAPIView):
    queryset = Credit.objects.all()
    serializer_class = CloseCreditSerializer

class DeleteCreditAPIView(generics.DestroyAPIView):
    queryset = Credit.objects.all()

class DepositListAPIView(generics.ListAPIView):
    queryset = Deposit.objects.all()
    serializer_class = DepositSerializer

class CreateDepositAPIView(generics.CreateAPIView):
    serializer_class = CreateDepositSerializer

class UpdateDepositAPIView(generics.UpdateAPIView):
    serializer_class = CreateDepositSerializer
    queryset = Deposit.objects.all()

class CloseDepositAPIView(generics.UpdateAPIView):
    queryset = Deposit.objects.all()
    serializer_class = CloseDepositSerializer

class DeleteDepositAPIView(generics.DestroyAPIView):
    queryset = Deposit.objects.all()


class ProfitListAPIView(generics.ListAPIView):
    queryset = Profit.objects.all()
    serializer_class = ProfitSerializer

class CreateProfitAPIView(generics.CreateAPIView):
    serializer_class = CreateProfitSerializer

class UpdateProfitAPIView(generics.UpdateAPIView):
    serializer_class = CreateProfitSerializer
    queryset = Profit.objects.all()

class DeleteProfitAPIView(generics.DestroyAPIView):
    queryset = Profit.objects.all()

class LossListAPIView(generics.ListAPIView):
    queryset = Loss.objects.all()
    serializer_class = LossSerializer

class CreateLossAPIView(generics.CreateAPIView):
    serializer_class = CreateLossSerializer

class UpdateLossAPIView(generics.UpdateAPIView):
    serializer_class = CreateLossSerializer
    queryset = Loss.objects.all()

class DeleteLossAPIView(generics.DestroyAPIView):
    queryset = Loss.objects.all()