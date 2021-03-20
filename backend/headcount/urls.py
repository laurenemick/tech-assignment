from django.urls import path
from . import views

urlpatterns = [
    path('api/companies/', views.load_companies, name='load_companies'),
]