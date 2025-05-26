from django.urls import path
from .views import ChatSessionView, MessageView, UnansweredQuestionView, ChatSessionMessagesView

urlpatterns = [
     path('chat_sessions/', ChatSessionView.as_view(), name='chat_sessions'),
    path('chat_sessions/<str:session_id>/messages/', ChatSessionMessagesView.as_view(), name='chat_session_messages'),
    path('messages/', MessageView.as_view(), name='messages'),
    path('unanswered_questions/', UnansweredQuestionView.as_view(), name='unanswered_questions'),
]
