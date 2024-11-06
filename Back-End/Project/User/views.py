from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import DoctorRegisterSerializer, PatientRegisterSerializer, LoginSerializer

class DoctorRegisterView(APIView):
    @swagger_auto_schema(
        request_body=DoctorRegisterSerializer,
        responses={
            201: openapi.Response('Doctor registered successfully'),
            400: 'Bad Request - Invalid Data'
        }
    )
    def post(self, request):
        serializer = DoctorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Doctor registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PatientRegisterView(APIView):
    @swagger_auto_schema(
        request_body=PatientRegisterSerializer,
        responses={
            201: openapi.Response('Patient registered successfully'),
            400: 'Bad Request - Invalid Data'
        }
    )
    def post(self, request):
        serializer = PatientRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Patient registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    
    @swagger_auto_schema(
        operation_description="User Login",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password')
            },
            required=['email', 'password']
        ),
        responses={
            200: openapi.Response(
                description='Login successful',
                examples={
                    'application/json': {
                        'access_token': 'string',
                        'refresh_token': 'string',
                        'message': 'Login successful'
                    }
                }
            ),
            400: openapi.Response(
                description='Invalid credentials or validation errors',
                examples={
                    'application/json': {
                        'error': 'Invalid credentials'
                    }
                }
            )
        }
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            print(email, password)

            # Use custom authenticate with email
            user = authenticate(request, email=email, password=password)  
            print(user)
            if user:
                login(request, user)  # Log the user in
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                return Response({
                    'access_token': access_token,
                    'refresh_token': str(refresh),
                    'message': 'Login successful'
                }, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
