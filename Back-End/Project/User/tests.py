from django.test import TestCase
from django.contrib.auth import get_user_model
from User.models import Doctor, Patient
from User.serializers import DoctorRegisterSerializer
from User.permissions import IsDoctor, IsPatient
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status

CustomUser = get_user_model()

class CustomUserTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            'username': 'doctor1',
            'email': 'doctor1@example.com',
            'password': 'StrongPassword123',
            'is_doctor': True,
            'gender': 'male'
        }
        self.doctor_data = {
            'specialization': 'Cardiology',
            'prifix': 'Dr',
        }
        self.patient_data = {
            'username': 'patient1',
            'email': 'patient1@example.com',
            'password': 'StrongPassword123',
            'is_patient': True,
            'gender': 'female'
        }

    def test_create_doctor_user(self):
        user = CustomUser.objects.create_user(
            username='doctor1',
            email='doctor1@example.com',
            password='StrongPassword123',
            is_doctor=True,
            gender='male'
        )
        doctor = Doctor.objects.create(user=user, specialization='Cardiology', prifix='Dr')
        self.assertEqual(user.email, 'doctor1@example.com')
        self.assertTrue(user.is_doctor)
        self.assertEqual(doctor.specialization, 'Cardiology')


    def test_create_patient_user(self):
        user = CustomUser.objects.create_user(
            username=self.patient_data['username'],
            email=self.patient_data['email'],
            password=self.patient_data['password'],
            is_patient=self.patient_data['is_patient'],
            gender=self.patient_data['gender']
        )
        patient = Patient.objects.create(user=user)
        self.assertEqual(user.email, 'patient1@example.com')
        self.assertTrue(user.is_patient)
        self.assertEqual(patient.user.username, 'patient1')


class DoctorRegisterSerializerTestCase(TestCase):
    def test_valid_doctor_registration(self):
        data = {
            'username': 'doctor1',
            'email': 'doctor1@example.com',
            'password': 'StrongPassword123',
            'password2': 'StrongPassword123',
            'specialization': 'Cardiology',
            'prifix': 'Dr',
            'phone_number': '1234567890',
            'nationality': 'USA',
            'fluent_languages': 'English',
            'current_residence': 'New York',
            'first_name': 'John',
            'last_name': 'Doe',
            'gender': 'male'
        }
        serializer = DoctorRegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid())


    def test_invalid_doctor_email(self):
        data = {
            'username': 'doctor1',
            'email': 'invalid_email',
            'password': 'StrongPassword123',
            'password2': 'StrongPassword123',
            'specialization': 'Cardiology',
            'prifix': 'Dr',
            'gender': 'male'
        }
        serializer = DoctorRegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_doctor_password_mismatch(self):
        data = {
            'username': 'doctor1',
            'email': 'doctor1@example.com',
            'password': 'StrongPassword123',
            'password2': 'WrongPassword123',
            'specialization': 'Cardiology',
            'prifix': 'Dr',
            'phone_number': '1234567890',
            'nationality': 'USA',
            'fluent_languages': 'English',
            'current_residence': 'New York',
            'first_name': 'John',
            'last_name': 'Doe',
            'gender': 'male'
        }
        serializer = DoctorRegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())  # The serializer should be invalid
        self.assertIn('password', serializer.errors)
        self.assertEqual(serializer.errors['password'][0], 'Passwords do not match.')


class DoctorRegisterViewTestCase(APITestCase):
    def test_register_doctor_success(self):
        data = {
            'username': 'doctor1',
            'email': 'doctor1@example.com',
            'password': 'StrongPassword123',
            'password2': 'StrongPassword123',
            'specialization': 'Cardiology',
            'prifix': 'Dr',
            'phone_number': '1234567890',
            'nationality': 'USA',
            'fluent_languages': 'English',
            'current_residence': 'New York',
            'first_name': 'John',
            'last_name': 'Doe',
            'gender': 'male'
        }
        response = self.client.post('/api/register/doctor/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)

    def test_register_doctor_invalid_data(self):
        data = {
            'username': '',
            'email': 'invalid_email',
            'password': 'StrongPassword123',
            'password2': 'StrongPassword123',
            'specialization': 'Cardiology',
            'prifix': 'Dr',
            'gender': 'male'
        }
        response = self.client.post('/api/register/doctor/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

class PermissionTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.doctor_user = CustomUser.objects.create_user(username='doc', email='doc@example.com', is_doctor=True, gender='male')
        self.patient_user = CustomUser.objects.create_user(username='pat', email='pat@example.com', is_patient=True, gender='female')

    def test_is_doctor_permission(self):
        request = self.factory.get('/')
        request.user = self.doctor_user
        permission = IsDoctor()
        self.assertTrue(permission.has_permission(request, None))

    def test_is_patient_permission(self):
        request = self.factory.get('/')
        request.user = self.patient_user
        permission = IsPatient()
        self.assertTrue(permission.has_permission(request, None))


class ChatbotApiViewTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='user', email='user@example.com', password='password123', gender='male')
        self.client.force_authenticate(user=self.user)

    def test_create_chat_session(self):
        response = self.client.post('/api/chatbot/chat_sessions/')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('session_id', response.data)

    def test_create_message_invalid_session(self):
        response = self.client.post('/api/chatbot/messages/', {
            'chat_session': 999,  # Invalid session ID
            'sender': 'user',
            'text': 'Hello!'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
