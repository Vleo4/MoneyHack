from django.shortcuts import render

from .permissions import IsOwnerOrReadOnly
from .serializers import *
from rest_framework.response import Response

from rest_framework import generics, status

class CreditListAPIView(generics.ListAPIView):
    serializer_class = CreditSerializer

    def get_queryset(self):
        user = self.request.user
        return Credit.objects.filter(user=user)


class CreateCreditAPIView(generics.CreateAPIView):
    serializer_class = CreateCreditSerializer

    def perform_create(self, serializer):
        # Assign the user here
        serializer.save(user=self.request.user)

class UpdateCreditAPIView(generics.UpdateAPIView):
    serializer_class = CreateCreditSerializer
    queryset = Credit.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

class CloseCreditAPIView(generics.UpdateAPIView):
    queryset = Credit.objects.all()
    serializer_class = CloseCreditSerializer
    permission_classes = [IsOwnerOrReadOnly]

class DeleteCreditAPIView(generics.DestroyAPIView):
    queryset = Credit.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

class DepositListAPIView(generics.ListAPIView):
    serializer_class = DepositSerializer

    def get_queryset(self):
        user = self.request.user
        return Deposit.objects.filter(user=user)

class CreateDepositAPIView(generics.CreateAPIView):
    serializer_class = CreateDepositSerializer

    def perform_create(self, serializer):
        # Assign the user here
        serializer.save(user=self.request.user)

class UpdateDepositAPIView(generics.UpdateAPIView):
    serializer_class = CreateDepositSerializer
    queryset = Deposit.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

class CloseDepositAPIView(generics.UpdateAPIView):
    queryset = Deposit.objects.all()
    serializer_class = CloseDepositSerializer
    permission_classes = [IsOwnerOrReadOnly]

class DeleteDepositAPIView(generics.DestroyAPIView):
    queryset = Deposit.objects.all()
    permission_classes = [IsOwnerOrReadOnly]


class ProfitListAPIView(generics.ListAPIView):
    serializer_class = ProfitSerializer

    def get_queryset(self):
        user = self.request.user
        return Profit.objects.filter(user=user)

class CreateProfitAPIView(generics.CreateAPIView):
    serializer_class = CreateProfitSerializer

    def perform_create(self, serializer):
        # Assign the user here
        serializer.save(user=self.request.user)

class UpdateProfitAPIView(generics.UpdateAPIView):
    serializer_class = CreateProfitSerializer
    queryset = Profit.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

class DeleteProfitAPIView(generics.DestroyAPIView):
    queryset = Profit.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

class LossListAPIView(generics.ListAPIView):
    serializer_class = LossSerializer

    def get_queryset(self):
        user = self.request.user
        return Loss.objects.filter(user=user)

class CreateLossAPIView(generics.CreateAPIView):
    serializer_class = CreateLossSerializer

    def perform_create(self, serializer):
        # Assign the user here
        serializer.save(user=self.request.user)

class UpdateLossAPIView(generics.UpdateAPIView):
    serializer_class = CreateLossSerializer
    queryset = Loss.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

class DeleteLossAPIView(generics.DestroyAPIView):
    queryset = Loss.objects.all()
    permission_classes = [IsOwnerOrReadOnly]