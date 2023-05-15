from rest_framework import serializers
from .models import *

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
        fields = "__all__"