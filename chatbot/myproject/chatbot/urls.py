from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # صفحة الدردشة الرئيسية
    path('chatbot/', views.chatbot, name='chatbot'),  # نقطة النهاية للتواصل مع Rasa
]
