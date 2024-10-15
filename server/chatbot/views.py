from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt
def chatbot(request):
    """
    Handles POST requests from the frontend and sends messages to the Rasa chatbot.
    """
    if request.method == "POST":
        try:
            # Parse the JSON body of the request
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()

            # If there is a message, send it to Rasa
            if user_message:
                rasa_url = "http://localhost:5005/webhooks/rest/webhook"
                response = requests.post(rasa_url, json={"sender": "user", "message": user_message})

                # Check if the response from Rasa is successful
                if response.status_code == 200:
                    rasa_responses = response.json()
                    if rasa_responses:
                        bot_message = rasa_responses[0].get("text", "I didn't understand your message.")
                    else:
                        bot_message = "No response from Rasa."
                else:
                    bot_message = "Problem connecting to Rasa."

                # Return the chatbot response as JSON
                return JsonResponse({"response": bot_message})
            else:
                return JsonResponse({"response": "No message sent."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"response": "Invalid data format."}, status=400)
        except Exception as e:
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
            # Parse the JSON body of the request
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()

            # If there is a message, send it to Rasa (Lina's instance)
            if user_message:
                rasa_url = "http://localhost:5006/webhooks/rest/webhook"
                response = requests.post(rasa_url, json={"sender": "user", "message": user_message})

                # Check if the response from Rasa is successful
                if response.status_code == 200:
                    rasa_responses = response.json()
                    if rasa_responses:
                        bot_message = rasa_responses[0].get("text", "Lina didn't understand your message.")
                    else:
                        bot_message = "No response from Lina."
                else:
                    bot_message = "Problem connecting to Lina."

                # Return Lina's response as JSON
                return JsonResponse({"response": bot_message})
            else:
                return JsonResponse({"response": "No message sent."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"response": "Invalid data format."}, status=400)
        except Exception as e:
            return JsonResponse({"response": f"Error: {str(e)}"}, status=500)
    else:
        return JsonResponse({"response": "Method not allowed."}, status=405)
