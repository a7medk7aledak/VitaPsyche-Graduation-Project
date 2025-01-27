from django.urls import path
from . import views
from .views import chatbot
urlpatterns = [
    path('chatbot/', chatbot),
    path('lina/', views.route_lina, name='route_lina'),
    
]

