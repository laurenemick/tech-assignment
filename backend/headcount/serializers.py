from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    # month = serializers.DateField(format="%Y-%m-01")
    class Meta:
        model = Company 
        fields = ('company', 'month', 'headcount')