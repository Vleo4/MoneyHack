from datetime import datetime

from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceUser
        fields = ('id', 'username', 'email')
        lookup_field = 'username'
        extra_kwargs = {
            'url': {'lookup_field': 'username'}
        }

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinanceUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = FinanceUser.objects.create_user(validated_data['username'],
                            validated_data['email'], validated_data['password'])
        return user

class CreditSerializer(serializers.ModelSerializer):
    max_value = serializers.SerializerMethodField()

    class Meta:
        model = Credit
        fields = "__all__"

    def get_max_value(self, obj):
        return obj.max_value()

class CreateCreditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credit
        fields = ['id', 'note', 'percentage', 'start_time', 'end_time', 'value', 'type_of_credit', 'from_where']


class CloseCreditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credit
        fields = ['is_closed']

    def update(self, instance, validated_data):
        instance.is_closed = not instance.is_closed
        instance.save()

        if instance.is_closed:
            loss = Loss.objects.create(
                note="credit",
                value=instance.max_value() - instance.value,
                category="credit",
                time=timezone.now(),
                user=instance.user
            )
            instance.loss = loss
            instance.save()
        else:
            if instance.loss:
                instance.loss.delete()
                instance.loss = None
                instance.save()

        return instance


class DepositSerializer(serializers.ModelSerializer):
    max_value = serializers.SerializerMethodField()
    current_value = serializers.SerializerMethodField()

    class Meta:
        model = Deposit
        fields = "__all__"

    def get_max_value(self, obj):
        return obj.max_value()

    def get_current_value(self, obj):
        return obj.current_value()

class CreateDepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposit
        fields = ['note', 'percentage', 'start_time', 'end_time', 'value', 'type_of_credit', 'from_where']


class CloseDepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposit
        fields = ['is_closed']

    def update(self, instance, validated_data):
        instance.is_closed = not instance.is_closed
        instance.save()

        if instance.is_closed:
            profit = Profit.objects.create(
                note="deposit",
                value=instance.current_value() - instance.value,
                category="credit",
                time=timezone.now(),
                user=instance.user
            )
            instance.profit = profit
            instance.save()
        else:
            if instance.profit:
                instance.profit.delete()
                instance.profit = None
                instance.save()

        return instance

class CreateProfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profit
        fields = ['note', 'value', 'category', 'time' ]

class ProfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profit
        fields = "__all__"

class CreateLossSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loss
        fields = ['note', 'value', 'category', 'time']

class LossSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loss
        fields = "__all__"