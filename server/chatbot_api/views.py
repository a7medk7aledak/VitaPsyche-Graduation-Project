from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import ChatSession, Message, UnansweredQuestion
from .serializers import ChatSessionSerializer, MessageSerializer, UnansweredQuestionSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import logging
import uuid
import requests  # لإرسال طلبات إلى Rasa
from rest_framework_simplejwt.authentication import JWTAuthentication
class ChatSessionView(APIView):

    #permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @swagger_auto_schema(
        operation_description="Create a new chat session",
        responses={
            201: openapi.Response(
                description="Chat session created",
                examples={
                    'application/json': {
                        'session_id': 'string',
                        'message': 'New chat session created for testuser.'
                    }
                }
            )
        }
    )
    def post(self, request):
        session_id = str(uuid.uuid4())
        chat_session = ChatSession.objects.create(user=request.user, session_id=session_id)
        return Response({
            'session_id': session_id,
            'message': f"New chat session created for {request.user.username}."
        }, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description="Retrieve all chat sessions for the authenticated user",
        responses={
            200: ChatSessionSerializer(many=True)
        }
    )
    def get(self, request):
        sessions = ChatSession.objects.filter(user=request.user)
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChatSessionMessagesView(APIView):
    #permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @swagger_auto_schema(
        operation_description="Retrieve all messages for a specific chat session",
        manual_parameters=[
            openapi.Parameter(
                'session_id', openapi.IN_PATH,
                description="The ID of the chat session",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: MessageSerializer(many=True),
            404: openapi.Response(description="Session not found")
        }
    )
    def get(self, request, session_id):
        try:
            chat_session = ChatSession.objects.get(session_id=session_id, user=request.user)
            messages = chat_session.messages.all()
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ChatSession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)


class MessageView(APIView):
    authentication_classes = [JWTAuthentication]
    @swagger_auto_schema(
        operation_description="Send a message in a chat session and get bot response",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'chat_session': openapi.Schema(type=openapi.TYPE_INTEGER, description="Chat session ID"),
                'sender': openapi.Schema(type=openapi.TYPE_STRING, description="Sender of the message (e.g., 'user')"),
                'text': openapi.Schema(type=openapi.TYPE_STRING, description="Content of the message"),
            },
            required=['chat_session', 'sender', 'text']
        ),
        responses={
            201: MessageSerializer,
            400: openapi.Response(description="Invalid input")
        }
    )
    def post(self, request, *args, **kwargs):
        print("Request received:", request.data)  # لمعرفة البيانات المستلمة
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            user_message = serializer.save()
            print(f"User message saved: {user_message}")

            # إرسال الرسالة إلى Rasa مع معالجة أخطاء الاتصال والاستجابة
            rasa_url = "http://localhost:5005/webhooks/rest/webhook"
            try:
                rasa_response = requests.post(
                    rasa_url,
                    json={"sender": user_message.chat_session.session_id, "message": user_message.text},
                    timeout=10 # Added a reasonable timeout
                )
                rasa_response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)

                bot_replies = rasa_response.json()
                # Process and save bot replies
                if bot_replies:
                    for reply in bot_replies:
                        print(f"Bot reply: {reply}")
                        Message.objects.create(
                            chat_session=user_message.chat_session,
                            sender="bot",
                            text=reply.get("text", "")
                        )
                else:
                    print("Rasa returned an empty response.")
                    # Optionally save a default bot message if Rasa is empty
                    # Message.objects.create(
                    #     chat_session=user_message.chat_session,
                    #     sender="bot",
                    #     text="Got an empty response from the chatbot."
                    # )

            except requests.exceptions.Timeout:
                print("Request to Rasa timed out")
                # Save a timeout error message
                Message.objects.create(
                    chat_session=user_message.chat_session,
                    sender="bot",
                    text="Error: The chatbot took too long to respond."
                )
                return Response({"error": "Rasa request timed out."}, status=status.HTTP_504_GATEWAY_TIMEOUT)
            except requests.exceptions.ConnectionError:
                print("Failed to connect to Rasa")
                # Save a connection error message
                Message.objects.create(
                    chat_session=user_message.chat_session,
                    sender="bot",
                    text="Error: Could not connect to the chatbot service."
                )
                return Response({"error": "Could not connect to Rasa."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            except requests.exceptions.RequestException as e:
                print(f"Error during Rasa request: {e}")
                # Save a generic request error message
                Message.objects.create(
                    chat_session=user_message.chat_session,
                    sender="bot",
                    text=f"Error communicating with chatbot: {e}"
                )
                return Response({"error": f"Error during Rasa request: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except json.JSONDecodeError:
                 print("Rasa returned invalid JSON")
                 # Save a JSON decode error message
                 Message.objects.create(
                     chat_session=user_message.chat_session,
                     sender="bot",
                     text="Error: Chatbot returned an invalid response."
                 )
                 return Response({"error": "Rasa returned invalid JSON."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                # Catch any other unexpected errors during Rasa interaction
                print(f"Unexpected error during Rasa interaction: {e}")
                Message.objects.create(
                    chat_session=user_message.chat_session,
                    sender="bot",
                    text=f"An unexpected error occurred during chatbot interaction: {e}"
                )
                return Response({"error": f"An unexpected error occurred during Rasa interaction: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # If Rasa interaction was successful, return the user message data
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UnansweredQuestionView(APIView):
    authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Add a new unanswered question",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user': openapi.Schema(type=openapi.TYPE_INTEGER, description="User ID"),
                'question': openapi.Schema(type=openapi.TYPE_STRING, description="The text of the unanswered question"),
            },
            required=['user', 'question']
        ),
        responses={
            201: UnansweredQuestionSerializer,
            400: openapi.Response(description="Invalid input")
        }
    )
    def post(self, request):
        serializer = UnansweredQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': "Unanswered question saved.",
                'question': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Retrieve all unanswered questions for the authenticated user",
        responses={
            200: UnansweredQuestionSerializer(many=True)
        }
    )
    def get(self, request):
        unanswered_questions = UnansweredQuestion.objects.filter(user=request.user)
        serializer = UnansweredQuestionSerializer(unanswered_questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Set up logging for error tracking
logger = logging.getLogger(__name__)

@csrf_exempt
def chatbot(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()
            username = data.get("username", "user")
            chat_session_id = data.get("chat_session", "default_session")

            # Prevent bot messages from being sent back to Rasa
            if username == "bot":
                return JsonResponse({}, status=200)

            print("BACKEND: Received message:", user_message, "Username:", username)
            print("=== Django: Received message from frontend ===")
            print("Message details:", {
                "message": user_message,
                "username": username,
                "chat_session": chat_session_id
            })

            if user_message:
                rasa_url = "http://localhost:5005/webhooks/rest/webhook"
                try:
                    print("=== Django: Sending message to Rasa ===")
                    print("Rasa request payload:", {
                        "sender": str(chat_session_id),
                        "message": user_message,
                        "metadata": {"username": username}
                    })

                    response = requests.post(
                        rasa_url,
                        json={
                            "sender": str(chat_session_id),
                            "message": user_message,
                            "metadata": {
                                "username": username,
                                "custom": {
                                    "username": username
                                }
                            }
                        },
                        timeout=30
                    )

                    print("=== Django: Received response from Rasa ===")
                    print("Rasa response status:", response.status_code)
                    print("Rasa response content:", response.text)

                except requests.Timeout:
                    print("=== Django: Request to Rasa timed out ===")
                    return JsonResponse({"response": "عذراً، يبدو أن هناك ضغطاً على الخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل."}, status=504)
                except requests.ConnectionError:
                    print("=== Django: Failed to connect to Rasa ===")
                    return JsonResponse({"response": "عذراً، يبدو أن هناك ضغطاً على الخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل."}, status=503)

                if response.status_code == 200:
                    rasa_responses = response.json()
                    if rasa_responses and len(rasa_responses) > 0:
                        # Collect all text responses from Rasa
                        bot_messages = []
                        for resp in rasa_responses:
                            if "text" in resp:
                                bot_messages.append(resp["text"])
                        
                        if bot_messages:
                            # Join all messages with newlines
                            bot_message = "\n".join(bot_messages)
                        else:
                            bot_message = "عذراً، يبدو أن هناك ضغطاً على الخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل."
                    else:
                        bot_message = "عذراً، يبدو أن هناك ضغطاً على الخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل."
                else:
                    print("=== Django: Rasa returned an error ===")
                    print("Error status:", response.status_code)
                    bot_message = "عذراً، يبدو أن هناك ضغطاً على الخدمة حالياً. الرجاء المحاولة مرة أخرى بعد قليل."

                print("=== Django: Sending response to frontend ===")
                print("Response:", {"response": bot_message})

                return JsonResponse({"response": bot_message})
            else:
                return JsonResponse({"response": "الرجاء إدخال رسالة."}, status=400)
        except json.JSONDecodeError:
            print("=== Django: JSON decode error ===")
            return JsonResponse({"response": "خطأ في تنسيق البيانات المرسلة."}, status=400)
        except Exception as e:
            print("=== Django: Unexpected error ===")
            print("Error details:", str(e))
            return JsonResponse({"response": "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى."}, status=500)
    return JsonResponse({"response": "طريقة طلب غير صحيحة."}, status=405)


@csrf_exempt
def route_lina(request):
    """
    Handles POST requests from the frontend and sends messages to the Rasa model for Lina.
    """
    if request.method == "POST":
        try:
            # Check if the request content type is JSON
            if not request.content_type or 'application/json' not in request.content_type:
                return JsonResponse({"response": "Content-Type must be application/json."}, status=400)

            # Log the incoming request
            logger.info("Received request: %s", request.body)

            # Parse the incoming JSON request body
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()

            # Send the user's message to Rasa (Lina's instance) if it's not empty
            if user_message:
                rasa_url = "http://localhost:5006/webhooks/rest/webhook"
                try:
                    response = requests.post(rasa_url, json={"sender": "user", "message": user_message}, timeout=10)
                except requests.Timeout:
                    return JsonResponse({"response": "The request to Rasa timed out."}, status=504)

                # Log the response from Rasa
                logger.info("Response from Lina: %s", response.text)

                # Check if the response from Rasa was successful
                if response.status_code != 200:
                    logger.error(f"Rasa returned an error: {response.status_code} - {response.text}")
                    return JsonResponse({"response": "Problem connecting to Lina."}, status=response.status_code)

                rasa_responses = response.json()
                if not rasa_responses or len(rasa_responses) == 0:
                    bot_message = "Lina didn't understand your message."
                    detected_language = 'en'  # Default to English
                else:
                    # Get the message and language from the response
                    bot_message = rasa_responses[0].get("text", "No valid response from Lina.")
                    # Get language from custom data if available
                    detected_language = rasa_responses[0].get("custom", {}).get("detected_language", 'en')

                # Return Lina's response as JSON with language information
                return JsonResponse({
                    "response": bot_message,
                    "language": detected_language
                })
            else:
                return JsonResponse({"response": "No message sent."}, status=400)
        except json.JSONDecodeError as e:
            logger.error("JSON decode error: %s", str(e))
            return JsonResponse({"response": "Invalid data format."}, status=400)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({"response": "An unexpected error occurred. Please try again later."}, status=500)
    else:
        return HttpResponseNotAllowed(["POST"], "Method not allowed.")