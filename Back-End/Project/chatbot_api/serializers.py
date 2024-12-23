from rest_framework import serializers
from .models import ChatSession, Message, UnansweredQuestion


class ChatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields = ['id', 'session_id', 'user', 'created_at']
        extra_kwargs = {
            'user': {'read_only': True},
        }


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'chat_session', 'sender', 'text', 'timestamp', 'is_answered']



class UnansweredQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnansweredQuestion
        fields = ['id', 'user', 'question', 'timestamp']
