
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import CustomUser, Doctor, Patient, Gender_choice

class DoctorRegisterSerializer(serializers.ModelSerializer):

    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    phone_number = serializers.CharField(required=True)
    birth_date = serializers.DateField(required=False)
    gender = serializers.ChoiceField(choices=Gender_choice, required=False)
    specialization = serializers.CharField(required=True)
    prifix=serializers.CharField(max_length=100 ,)
    nationality=serializers.CharField(max_length=100 ,)
    fluent_languages=serializers.CharField(max_length=100 ,)
    current_residence=serializers.CharField(max_length=100 ,)
    class Meta:
        model = Doctor

        fields = ['username','prifix','first_name','last_name', 'email', 'password', 'password2', 'phone_number', 'birth_date', 'gender', 'specialization', 'nationality','fluent_languages','current_residence']


    def validate(self, attrs):
            # Check if username already exists
            if CustomUser.objects.filter(username=attrs['username']).exists():
                raise serializers.ValidationError({"username": "Username is already taken."})

            # Check if email already exists
            if CustomUser.objects.filter(email=attrs['email']).exists():
                raise serializers.ValidationError({"email": "Email is already registered."})

            # Check if passwords match
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({"password": "Passwords do not match."})

            return attrs
    def create(self, validated_data):
        specialization = validated_data.pop('specialization')
        prifix = validated_data.pop('prifix')
        
        user = CustomUser(
            first_name=validated_data['first_name'],

            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            birth_date=validated_data.get('birth_date'),  # Use get to avoid KeyError
            gender=validated_data.get('gender'),
            nationality =validated_data['nationality'],
            fluent_languages =validated_data['fluent_languages'],
            current_residence =validated_data['current_residence'],
            is_doctor=True ,
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()  # Save the user first

        # Now create the doctor instance
        doctor = Doctor(
            user=user,
            prifix=prifix,
            specialization=specialization,
        )
        doctor.save()  # Save the doctor instance

        return doctor


class PatientRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    phone_number = serializers.CharField(required=True)
    birth_date = serializers.DateField(required=False)
    gender = serializers.ChoiceField(choices=Gender_choice, required=False)
    nationality=serializers.CharField(max_length=100 ,)
    fluent_languages=serializers.CharField(max_length=100 ,)
    current_residence=serializers.CharField(max_length=100 ,)
    class Meta:
        model = Patient
        fields = ['username','first_name','last_name', 'email', 'password', 'password2', 'phone_number', 'birth_date', 'gender', 'nationality','fluent_languages','current_residence']

    def validate(self, attrs):
            # Check if username already exists
            if CustomUser.objects.filter(username=attrs['username']).exists():
                raise serializers.ValidationError({"username": "Username is already taken."})

            # Check if email already exists
            if CustomUser.objects.filter(email=attrs['email']).exists():
                raise serializers.ValidationError({"email": "Email is already registered."})

            # Check if passwords match
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({"password": "Passwords do not match."})

            return attrs

    def create(self, validated_data):
        validated_data.pop('password2')  # Remove password confirmation field
        user = CustomUser(
            first_name=validated_data['first_name'],

            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            birth_date=validated_data.get('birth_date'),  # Use get to avoid KeyError
            gender=validated_data.get('gender'),
            nationality =validated_data['nationality'],
            fluent_languages =validated_data['fluent_languages'],
            current_residence =validated_data['current_residence'],
            is_patient=True
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        patient = Patient(
            user=user,
        )
        patient.save()
        return patient


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True) 
    password = serializers.CharField(write_only=True, required=True)
