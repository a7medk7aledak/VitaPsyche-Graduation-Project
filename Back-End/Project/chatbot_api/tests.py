from rest_framework.test import APITestCase
from rest_framework import status
from User.models import CustomUser
from chatbot_api.models import ChatSession, Message, UnansweredQuestion
from unittest.mock import patch


class ChatSessionTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', email='testuser@example.com', password='password123')
        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        ChatSession.objects.all().delete()
        Message.objects.all().delete()

    def test_create_chat_session(self):
        response = self.client.post('/api/chatbot/chat_sessions/')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('session_id', response.data)
        self.assertEqual(ChatSession.objects.filter(user=self.user).count(), 1)

    def test_get_user_chat_sessions(self):
        # Create multiple sessions
        ChatSession.objects.all().delete()  # Clean existing sessions
        for _ in range(3):
            self.client.post('/api/chatbot/chat_sessions/')
        response = self.client.get('/api/chatbot/chat_sessions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

class MessageTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', email='testuser@example.com', password='password123')
        self.client.force_authenticate(user=self.user)
        self.chat_session = ChatSession.objects.create(user=self.user, session_id='12345')

    def tearDown(self):
        ChatSession.objects.all().delete()
        Message.objects.all().delete()

    def test_send_message(self):
        response = self.client.post(
            '/api/chatbot/messages/',
            data={
            'chat_session': self.chat_session.id,
            'sender': 'user',
            'text': 'Hello, bot!'
        },
            format='json'
        )
        self.assertEqual(response.status_code, 201)

        # Verify total messages (user message + bot reply)
        message_count = Message.objects.filter(chat_session=self.chat_session).count()
        self.assertEqual(message_count, 2)  # الآن نتوقع 2

        # Verify the content of the bot's reply
        bot_message = Message.objects.filter(chat_session=self.chat_session, sender='bot').first()
        self.assertEqual(bot_message.text, 'Good to see you! How can I support you today?')

    @patch('requests.post')
    def test_send_message(self, mock_post):
        # إعداد رد وهمي لـ Rasa
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = [
        {"recipient_id": "12345", "text": "Good to see you! How can I support you today?"}
        ]

        response = self.client.post(
        '/api/chatbot/messages/',
        data={
            'chat_session': self.chat_session.id,
            'sender': 'user',
            'text': 'Hello, bot!'
        },
        format='json'
        )
        self.assertEqual(response.status_code, 201)

        # Verify total messages (user message + bot reply)
        message_count = Message.objects.filter(chat_session=self.chat_session).count()
        self.assertEqual(message_count, 2)

        # Verify the content of the bot's reply
        bot_message = Message.objects.filter(chat_session=self.chat_session, sender='bot').first()
        self.assertEqual(bot_message.text, 'Good to see you! How can I support you today?')



    def test_get_session_messages(self):
        Message.objects.create(chat_session=self.chat_session, sender='user', text='Message 1')
        Message.objects.create(chat_session=self.chat_session, sender='bot', text='Response 1')
        response = self.client.get(f'/api/chatbot/chat_sessions/{self.chat_session.session_id}/messages/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

class UnansweredQuestionTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', email='testuser@example.com', password='password123')
        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        UnansweredQuestion.objects.all().delete()

    def test_add_unanswered_question(self):
        data = {
            'user': self.user.id,
            'question': 'What is the capital of France?'
        }
        response = self.client.post('/api/chatbot/unanswered_questions/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UnansweredQuestion.objects.filter(user=self.user).count(), 1)

    def test_get_unanswered_questions(self):
        UnansweredQuestion.objects.create(user=self.user, question='Question 1')
        UnansweredQuestion.objects.create(user=self.user, question='Question 2')
        response = self.client.get('/api/chatbot/unanswered_questions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)


class EndToEndTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', email='testuser@example.com', password='password123')
        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        ChatSession.objects.all().delete()
        Message.objects.all().delete()

    @patch('requests.post')
    def test_full_chat_flow(self, mock_post):
        # إعداد رد وهمي لـ Rasa
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = [
            {"recipient_id": "12345", "text": "Good to see you! How can I support you today?"}
     ]

        ChatSession.objects.all().delete()
        Message.objects.all().delete()

        # Step 1: Create a chat session
        session_response = self.client.post('/api/chatbot/chat_sessions/')
        self.assertEqual(session_response.status_code, status.HTTP_201_CREATED)
        session_id = session_response.data['session_id']

        # Step 2: Send a message
        chat_session = ChatSession.objects.get(session_id=session_id)
        message_data = {
        'chat_session': chat_session.id,
        'sender': 'user',
            'text': 'Hi, how are you?'
        }
        message_response = self.client.post('/api/chatbot/messages/', message_data)
        self.assertEqual(message_response.status_code, status.HTTP_201_CREATED)

        # Check the total messages (user message + bot reply)
        message_count = Message.objects.filter(chat_session=chat_session).count()
        self.assertEqual(message_count, 2)

        # Step 3: Retrieve messages
        messages_response = self.client.get(f'/api/chatbot/chat_sessions/{session_id}/messages/')
        self.assertEqual(messages_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(messages_response.data), 2)

        # Verify the content of the messages
        self.assertEqual(messages_response.data[0]['text'], 'Hi, how are you?')  # رسالة المستخدم
        self.assertEqual(messages_response.data[1]['text'], 'Good to see you! How can I support you today?')  # رد البوت
