from django.urls import path
from .views import DoctorRegisterView, PatientRegisterView, LoginView

urlpatterns = [
    path('register/doctor/', DoctorRegisterView.as_view(), name='doctor-register'),
    path('register/patient/', PatientRegisterView.as_view(), name='patient-register'),
    path('login/', LoginView.as_view(), name='login'),
]
