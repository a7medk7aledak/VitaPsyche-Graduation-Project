import requests
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionQwenResponse(Action):
    def name(self) -> str:
        return "action_qwen_response"  # اسم الأكشن المخصص

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict) -> list:
        # إعداد API
        API_URL = "https://api-inference.huggingface.co/models/Qwen/QwQ-32B-Preview"
        headers = {"Authorization": "Bearer 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"}

        # استخراج آخر رسالة من المستخدم
        user_message = tracker.latest_message.get("text", "")

        # إعداد البيانات للطلب
        data = {
            "model": "Qwen/QwQ-32B-Preview",
            "inputs": f"[INST]Please answer the following question.\nQuestion: {user_message}\nAssistant:\n[/INST]",
            "parameters": {
                "max_tokens": 500,
                "temperature": 0.9,
                "top_p": 0.9,
                "do_sample": True
            }
        }

        # إرسال الطلب إلى API
        response = requests.post(API_URL, headers=headers, json=data)

        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and 'generated_text' in result[0]:
                generated_text = result[0]['generated_text']
                # استخراج النص بعد "[/INST]"
                start_index = generated_text.find("[/INST]") + len("[/INST]")
                if start_index != -1:
                    clean_text = generated_text[start_index:].strip()
                    # إزالة أي علامات مثل "[INST]" أو "[/INST]"
                    clean_text = clean_text.replace("[INST]", "").replace("[/INST]", "").strip()
                    # إرسال الرد للمستخدم
                    dispatcher.utter_message(text=clean_text)
                else:
                    dispatcher.utter_message(text="Sorry, I couldn't generate a response.")
            else:
                dispatcher.utter_message(text="Unexpected response format from the API.")
        else:
            dispatcher.utter_message(text="Failed to connect to the API.")

        return []
