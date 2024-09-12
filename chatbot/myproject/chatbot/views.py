from django.shortcuts import render

# Create your views here.
import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json


def index(request):
    """
    يعرض صفحة الدردشة الرئيسية.
    """
    return render(request, 'index.html')
@csrf_exempt
def chatbot(request):
    """
    يتعامل مع الطلبات POST من واجهة الدردشة ويرسل الرسائل إلى Rasa.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "").strip()
            if user_message:
                rasa_url = "http://localhost:5005/webhooks/rest/webhook"
                response = requests.post(rasa_url, json={"sender": "user", "message": user_message})

                # التحقق من استجابة Rasa
                if response.status_code == 200:
                    rasa_responses = response.json()
                    if rasa_responses:
                        bot_message = rasa_responses[0].get("text", "لم أفهم ما قلته.")
                    else:
                        bot_message = "can't understand what you say"
                else:
                    bot_message = "هناك مشكلة في الاتصال بـ Rasa."

                return JsonResponse({"response": bot_message})
            else:
                return JsonResponse({"response": "you dont send message"}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"response": "تنسيق البيانات غير صالح."}, status=400)
        except Exception as e:
            return JsonResponse({"response": f"error: {str(e)}"}, status=500)
    else:
        return JsonResponse({"response": "req not support"}, status=405)
