
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
Gender_choice=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('prefer_not_to_say', 'Prefer not to say'),
    ]


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    is_doctor = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=15, blank=True)  # Assuming a maximum length of 15 digits
    birth_date = models.DateField(null=True, blank=True)  # Allowing null for users who may not provide this
    gender = models.CharField(max_length=30, choices=Gender_choice, blank=True)  # Providing choices for gender
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    nationality=models.CharField(max_length=100)

    current_residence=models.CharField(max_length=100)
    fluent_languages=models.CharField(max_length=100)
    def __str__(self):
        return self.username

class Doctor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100)
    prifix=models.CharField(max_length=100 ,default='Dr')
    def __str__(self):
        return f"Dr. {self.user.username}"

class Patient(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='patient_profile')


    def __str__(self):
        return self.user.username
