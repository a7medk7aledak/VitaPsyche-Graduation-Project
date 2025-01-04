from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import logging

# Set up logging for error tracking
logger = logging.getLogger(__name__)

@csrf_exempt
def chatbot(request):
    """
    Handles POST requests from the frontend and sends messages to the Rasa chatbot.
    """
    if request.method == "POST":
        try:
            # Check if the request content type is JSON
            if request.content_type != "application/json":
                return JsonResponse({"response": "Content-Type must be application/json."}, status=400)

            # Log the incoming request
            logger.info("Received request: %s", request.body)

            # Parse the incoming JSON request body
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()

            # Send the user's message to Rasa if it's not empty
            if user_message:
                rasa_url = "http://localhost:5005/webhooks/rest/webhook"
                response = requests.post(rasa_url, json={"sender": "user", "message": user_message}, timeout=10)

                # Log the response from Rasa
                logger.info("Response from Rasa: %s", response.text)

                # Check if the response from Rasa was successful
                if response.status_code == 200:
                    rasa_responses = response.json()
                    if rasa_responses and len(rasa_responses) > 0:
                        bot_message = rasa_responses[0].get("text", "I didn't understand your message.")
                    else:
                        bot_message = "No valid response from Rasa."
                else:
                    bot_message = "Problem connecting to Rasa."

                # Return the chatbot's response as JSON
                return JsonResponse({"response": bot_message})
            else:
                return JsonResponse({"response": "No message sent."}, status=400)
        except json.JSONDecodeError as e:
            logger.error("JSON decode error: %s", str(e))
            return JsonResponse({"response": "Invalid data format."}, status=400)
        except Exception as e:
            logger.error("Unexpected error: %s", str(e))
            return JsonResponse({"response": f"Error: {str(e)}"}, status=500)
    else:
        return JsonResponse({"response": "Method not allowed."}, status=405)


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
                if not rasa_responses or len(rasa_responses) == 0 or "text" not in rasa_responses[0]:
                    bot_message = "Lina didn't understand your message."
                else:
                    bot_message = rasa_responses[0].get("text", "No valid response from Lina.")

                # Return Lina's response as JSON
                return JsonResponse({"response": bot_message})
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