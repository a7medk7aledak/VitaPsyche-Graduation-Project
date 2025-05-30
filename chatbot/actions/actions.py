from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import asyncio
import openai
import logging
import time
from typing import Any, Text, Dict, List
from rasa_sdk.events import SlotSet
import os
from dotenv import load_dotenv
import websockets
import json

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class Config:
    KEY = os.getenv('KEY')
    TEMPERATURE = float(os.getenv('MODEL_TEMPERATURE'))
    MAX_TOKENS = int(os.getenv('MODEL_MAX_TOKENS'))
    MODEL_NAME = os.getenv('MODEL_NAME')
    MODEL_BASE_URL = os.getenv('MODEL_BASE_URL')
    WS_URL = "http://localhost:5000"

    # Add a check for required environment variables
    REQUIRED_ENV_VARS = ['KEY', 'MODEL_TEMPERATURE', 'MODEL_MAX_TOKENS', 'MODEL_NAME', 'MODEL_BASE_URL']
    for var in REQUIRED_ENV_VARS:
        if not os.getenv(var):
            logger.error(f"Environment variable {var} not set!")

# 🧠 ذاكرة ديناميكية لتخزين آخر 3 رسائل نفسية فقط
mental_history_buffer: List[Dict[str, str]] = []

class ActionMentalHealthResponse(Action):
    def name(self) -> Text:
        return "action_mental_health_response"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        user_message = tracker.latest_message.get('text')
        latest_intent_name = tracker.latest_message.get('intent', {}).get('name', '')
        lang_slot = tracker.get_slot("language")

        # تحديد اللغة
        if lang_slot and lang_slot in ['ar', 'en']:
            lang = lang_slot
        else:
            is_arabic_char_present = any(0x0600 <= ord(c) <= 0x06FF for c in user_message or "")
            is_arabic_intent = latest_intent_name.endswith('_ar')
            lang = "ar" if is_arabic_char_present or is_arabic_intent else "en"

        logger.info(f"[MentalAction] Lang: {lang}, Intent: {latest_intent_name}, Message: {user_message}")

        mental_health_intents = [
            'mental_health_symptoms_en', 'mental_health_symptoms_ar',
            'general_mental_support_en', 'general_mental_support_ar',
            'seek_mental_strength_ar', 'seek_mental_strength_en',
            'express_loneliness_ar', 'express_loneliness_en'
        ]

        global mental_history_buffer

        if latest_intent_name in mental_health_intents:
            # تحديث الذاكرة: إزالة الأقدم إن كانت ممتلئة
            if len(mental_history_buffer) >= 3:
                mental_history_buffer.pop(0)

            # إضافة رسالة المستخدم الحالية
            if not mental_history_buffer or mental_history_buffer[-1]["content"] != user_message:
                mental_history_buffer.append({"role": "user", "content": user_message})

            # إضافة آخر رد من الروبوت إن وُجد
            for event in reversed(tracker.events):
                if event.get("event") == "bot" and event.get("text"):
                    if not mental_history_buffer or mental_history_buffer[-1].get("content") != event["text"]:
                        mental_history_buffer.append({"role": "assistant", "content": event["text"]})
                    break

            # الاقتصار على آخر 3 رسائل فقط
            mental_history_buffer = mental_history_buffer[-3:]

            # إعداد رسالة النظام
            system_message_content = (
                f"You are 'VitaPsyche Assistant', a highly compassionate, empathetic, and supportive mental health assistant. "
                f"You are not a doctor, but can provide support. Respond clearly and thoughtfully in {'Arabic (اللغة العربية)' if lang == 'ar' else 'English'}.\n"
                f"User query: '{user_message}'"
            )

            # إعداد الرسائل للإرسال إلى النموذج
            messages_for_api = [{"role": "system", "content": system_message_content}] + mental_history_buffer

            try:
                start_time = time.time()
                
                # Check if API key is set
                if not Config.KEY:
                     raise ValueError("OpenAI API Key (KEY) is not set in environment variables.")

                api_response = await asyncio.to_thread(
                    openai.ChatCompletion.create,
                    model=Config.MODEL_NAME,
                    messages=messages_for_api,
                    api_key=Config.KEY,
                    api_base=Config.MODEL_BASE_URL,
                    temperature=Config.TEMPERATURE,
                    max_tokens=Config.MAX_TOKENS
                )
                time_taken = time.time() - start_time

                if api_response and api_response.choices and api_response.choices[0].message:
                    bot_reply = api_response.choices[0].message.content.strip()
                    
                    # Clean up response format
                    bot_reply = bot_reply.replace('*', '')  # Remove asterisks
                    bot_reply = bot_reply.replace('_', '')  # Remove underscores
                    bot_reply = bot_reply.replace('`', '')  # Remove backticks
                    bot_reply = bot_reply.replace('#', '')  # Remove hash symbols
                    bot_reply = bot_reply.replace('>', '')  # Remove blockquotes
                    bot_reply = ' '.join(bot_reply.split())  # Normalize whitespace
                    
                    # Send response via WebSocket
                    try:
                         async with websockets.connect(Config.WS_URL) as websocket:
                             await websocket.send(json.dumps({
                                 'type': 'bot_response',
                                 'data': {
                                     'text': bot_reply,
                                     'lang': lang
                                 }
                             }))
                    except Exception as ws_e:
                         logger.error(f"WebSocket Error: {ws_e}")

                    dispatcher.utter_message(text=bot_reply)
                    logger.info(f"API took {time_taken:.2f}s: {bot_reply[:100]}...")
                else:
                    fallback = "عذرًا، لم أتمكن من الرد الآن. حاول مرة أخرى." if lang == "ar" else "Sorry, I couldn't respond right now. Please try again."
                    dispatcher.utter_message(text=fallback)

            except Exception as e:
                logger.error(f"API Error: {e}", exc_info=True)
                error = f"حدث خطأ تقني: {e}. حاول لاحقًا." if lang == "ar" else f"A technical error occurred: {e}. Please try again later."
                dispatcher.utter_message(text=error)

        else:
            logger.info(f"Trying fallback for intent: {latest_intent_name}")
            system_message_content = (
                f"You are 'VitaPsyche Assistant', a highly compassionate, empathetic, and supportive mental health assistant. "
                f"You are not a doctor, but can provide support. Respond clearly and thoughtfully in {'Arabic (اللغة العربية)' if lang == 'ar' else 'English'}.\n"
                f"User query: '{user_message}'"
            )
            messages_for_api = [
                {"role": "system", "content": system_message_content},
                {"role": "user", "content": user_message}
            ]
            try:
                # Check if API key is set
                if not Config.KEY:
                    raise ValueError("OpenAI API Key (KEY) is not set in environment variables.")

                start_time = time.time()
                api_response = await asyncio.to_thread(
                    openai.ChatCompletion.create,
                    model=Config.MODEL_NAME,
                    messages=messages_for_api,
                    api_key=Config.KEY,
                    api_base=Config.MODEL_BASE_URL,
                    temperature=Config.TEMPERATURE,
                    max_tokens=Config.MAX_TOKENS
                )
                time_taken = time.time() - start_time

                if api_response and api_response.choices and api_response.choices[0].message:
                    bot_reply = api_response.choices[0].message.content.strip()
                    
                    # Clean up response format
                    bot_reply = bot_reply.replace('*', '')  # Remove asterisks
                    bot_reply = bot_reply.replace('_', '')  # Remove underscores
                    bot_reply = bot_reply.replace('`', '')  # Remove backticks
                    bot_reply = bot_reply.replace('#', '')  # Remove hash symbols
                    bot_reply = bot_reply.replace('>', '')  # Remove blockquotes
                    bot_reply = ' '.join(bot_reply.split())  # Normalize whitespace
                    
                    dispatcher.utter_message(text=bot_reply)
                    logger.info(f"API fallback took {time_taken:.2f}s: {bot_reply[:100]}...")
                else:
                    fallback = "عذرًا، لم أتمكن من الرد الآن. حاول مرة أخرى." if lang == "ar" else "Sorry, I couldn't respond right now. Please try again."
                    dispatcher.utter_message(text=fallback)
            except Exception as e:
                logger.error(f"API Fallback Error: {e}", exc_info=True)
                error = f"حدث خطأ تقني: {e}. حاول لاحقًا." if lang == "ar" else f"A technical error occurred: {e}. Please try again later."
                dispatcher.utter_message(text=error)
            return []


class ActionHandleSpecificTestEn(Action):
    def name(self) -> Text:
        return "action_handle_specific_test_en"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        test_links = {
            "rosenberg": "https://mind-med-graduation-project.vercel.app/tests/rses-001",
            "ocd": "https://mind-med-graduation-project.vercel.app/tests/ybocs-001",
            "depression": "https://mind-med-graduation-project.vercel.app/tests/bdi-2025",
            "ptsd": "https://mind-med-graduation-project.vercel.app/tests/ptsd-2025",
            "internet": "https://mind-med-graduation-project.vercel.app/tests/ias-2025",
            "anxiety": "https://mind-med-graduation-project.vercel.app/tests/anx-2025",
            "conners": "https://mind-med-graduation-project.vercel.app/tests/conners-2025",
            "personality": "https://mind-med-graduation-project.vercel.app/tests/personality-2025",
            "cognitive": "https://mind-med-graduation-project.vercel.app/tests/cognitive-2025"
        }

        message = tracker.latest_message.get('text', '').lower()
        
        if "rosenberg" in message or "self-esteem" in message:
            dispatcher.utter_message(text=f"You can take the Rosenberg Self-Esteem Scale here: {test_links['rosenberg']}")
        elif "ocd" in message:
            dispatcher.utter_message(text=f"You can take the OCD Scale here: {test_links['ocd']}")
        elif "depression" in message:
            dispatcher.utter_message(text=f"You can take the Depression Scale here: {test_links['depression']}")
        elif "ptsd" in message:
            dispatcher.utter_message(text=f"You can take the PTSD Scale here: {test_links['ptsd']}")
        elif "internet" in message:
            dispatcher.utter_message(text=f"You can take the Internet Addiction Scale here: {test_links['internet']}")
        elif "anxiety" in message:
            dispatcher.utter_message(text=f"You can take the Anxiety Scale here: {test_links['anxiety']}")
        elif "conners" in message:
            dispatcher.utter_message(text=f"You can take the Conners' Test here: {test_links['conners']}")
        elif "personality" in message:
            dispatcher.utter_message(text=f"You can take the Personality Disorders Test here: {test_links['personality']}")
        elif "cognitive" in message:
            dispatcher.utter_message(text=f"You can take the Cognitive Distortions Assessment here: {test_links['cognitive']}")
        else:
            dispatcher.utter_message(text="I'm not sure which test you're interested in. Could you please specify which test you'd like to take?")

        return []

class ActionHandleSpecificTestAr(Action):
    def name(self) -> Text:
        return "action_handle_specific_test_ar"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        test_links = {
            "روزنبرج": "https://mind-med-graduation-project.vercel.app/tests/rses-001",
            "تقدير الذات": "https://mind-med-graduation-project.vercel.app/tests/rses-001",
            "وسواس": "https://mind-med-graduation-project.vercel.app/tests/ybocs-001",
            "اكتئاب": "https://mind-med-graduation-project.vercel.app/tests/bdi-2025",
            "صدمة": "https://mind-med-graduation-project.vercel.app/tests/ptsd-2025",
            "انترنت": "https://mind-med-graduation-project.vercel.app/tests/ias-2025",
            "قلق": "https://mind-med-graduation-project.vercel.app/tests/anx-2025",
            "كونرز": "https://mind-med-graduation-project.vercel.app/tests/conners-2025",
            "شخصية": "https://mind-med-graduation-project.vercel.app/tests/personality-2025",
            "معرفي": "https://mind-med-graduation-project.vercel.app/tests/cognitive-2025"
        }

        message = tracker.latest_message.get('text', '')
        
        if any(keyword in message for keyword in ["روزنبرج", "تقدير الذات"]):
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار روزنبرج لتقدير الذات من هنا: {test_links['روزنبرج']}")
        elif "وسواس" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار الوسواس القهري من هنا: {test_links['وسواس']}")
        elif "اكتئاب" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار الاكتئاب من هنا: {test_links['اكتئاب']}")
        elif "صدمة" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار اضطراب ما بعد الصدمة من هنا: {test_links['صدمة']}")
        elif "انترنت" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار ادمان الانترنت من هنا: {test_links['انترنت']}")
        elif "قلق" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار القلق من هنا: {test_links['قلق']}")
        elif "كونرز" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار كونرز من هنا: {test_links['كونرز']}")
        elif "شخصية" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار اضطرابات الشخصية من هنا: {test_links['شخصية']}")
        elif "معرفي" in message:
            dispatcher.utter_message(text=f"يمكنك إجراء اختبار التشوهات المعرفية من هنا: {test_links['معرفي']}")
        else:
            dispatcher.utter_message(text="لست متأكدًا أي اختبار تهتم به. هل يمكنك تحديد الاختبار الذي ترغب في إجرائه؟")

        return []


class ActionHandleSpecificArticleEn(Action):
    def name(self) -> Text:
        return "action_handle_specific_article_en"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        article_links = {
            "schizophrenia": "https://mind-med-graduation-project.vercel.app/articles/Schizophrenia",
            "alzheimer's disease": "https://mind-med-graduation-project.vercel.app/articles/Alzheimer's%20Disease",
            "depression": "https://mind-med-graduation-project.vercel.app/articles/Depression",
            "panic disorder": "https://mind-med-graduation-project.vercel.app/articles/Panic%20Disorder",
            "borderline personality disorder": "https://mind-med-graduation-project.vercel.app/articles/Borderline%20Personality%20Disorder",
            "geriatric sleep disorder": "https://mind-med-graduation-project.vercel.app/articles/Geriatric%20Sleep%20Disorder",
            "lewy body dementia": "https://mind-med-graduation-project.vercel.app/articles/Lewy%20Body%20Dementia"
        }

        message = tracker.latest_message.get('text', '').lower()

        # Map possible user inputs to standard keys
        article_keywords = {
            "schizophrenia": ["schizophrenia", "الفصام"],
            "alzheimer's disease": ["alzheimer's", "الزهايمر"],
            "depression": ["depression", "الاكتئاب"],
            "panic disorder": ["panic disorder", "اضطراب الهلع"],
            "borderline personality disorder": ["borderline personality disorder", "bpd", "اضطراب الشخصية الحدية"],
            "geriatric sleep disorder": ["geriatric sleep disorder", "sleep disorder", "اضطرابات النوم"],
            "lewy body dementia": ["lewy body dementia", "خرف أجسام ليوي"]
        }

        selected_article = None
        for key, keywords in article_keywords.items():
            if any(keyword in message for keyword in keywords):
                selected_article = key
                break

        if selected_article and selected_article in article_links:
             dispatcher.utter_message(text=f"You can read about {selected_article.title()} here: {article_links[selected_article]}")
        else:
            dispatcher.utter_message(text="I'm not sure which article you're interested in. Could you please specify which article you'd like to read?")
        
        return []

class ActionHandleSpecificArticleAr(Action):
    def name(self) -> Text:
        return "action_handle_specific_article_ar"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        article_links = {
            "الفصام": "https://mind-med-graduation-project.vercel.app/articles/Schizophrenia",
            "مرض الزهايمر": "https://mind-med-graduation-project.vercel.app/articles/Alzheimer's%20Disease",
            "الاكتئاب": "https://mind-med-graduation-project.vercel.app/articles/Depression",
            "اضطراب الهلع": "https://mind-med-graduation-project.vercel.app/articles/Panic%20Disorder",
            "اضطراب الشخصية الحدية": "https://mind-med-graduation-project.vercel.app/articles/Borderline%20Personality%20Disorder",
            "اضطرابات النوم عند كبار السن": "https://mind-med-graduation-project.vercel.app/articles/Geriatric%20Sleep%20Disorder",
            "خرف أجسام ليوي": "https://mind-med-graduation-project.vercel.app/articles/Lewy%20Body%20Dementia"
        }

        message = tracker.latest_message.get('text', '')

        # Map possible user inputs to standard keys
        article_keywords = {
            "الفصام": ["الفصام", "schizophrenia"],
            "مرض الزهايمر": ["الزهايمر", "alzheimer's"],
            "الاكتئاب": ["الاكتئاب", "depression"],
            "اضطراب الهلع": ["اضطراب الهلع", "panic disorder"],
            "اضطراب الشخصية الحدية": ["اضطراب الشخصية الحدية", "bpd", "borderline personality disorder"],
            "اضطرابات النوم عند كبار السن": ["اضطرابات النوم", "sleep disorder", "geriatric sleep disorder"],
            "خرف أجسام ليوي": ["خرف أجسام ليوي", "lewy body dementia"]
        }

        selected_article = None
        for key, keywords in article_keywords.items():
            if any(keyword in message for keyword in keywords):
                selected_article = key
                break

        if selected_article and selected_article in article_links:
             dispatcher.utter_message(text=f"يمكنك قراءة المزيد عن {selected_article} هنا: {article_links[selected_article]}")
        else:
            dispatcher.utter_message(text="لست متأكدًا أي مقال تهتم به. هل يمكنك تحديد المقال الذي ترغب في قراءته؟")

        return []

class ActionHandleSpecificDoctorServiceEn(Action):
    def name(self) -> Text:
        return "action_handle_specific_doctor_service_en"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        service_links = {
            "depression treatment": "https://mind-med-graduation-project.vercel.app/services/depression",
            "addiction treatment": "https://mind-med-graduation-project.vercel.app/services/addiction",
            "psychosis treatment": "https://mind-med-graduation-project.vercel.app/services/psychosis",
            "personality disorders treatment": "https://mind-med-graduation-project.vercel.app/services/personality-disorders",
            "adjustment disorders treatment": "https://mind-med-graduation-project.vercel.app/services/adjustment-disorders",
            "anxiety treatment": "https://mind-med-graduation-project.vercel.app/services/anxiety",
            "eating disorders treatment": "https://mind-med-graduation-project.vercel.app/services/eating-disorders",
            "sexual disorders treatment": "https://mind-med-graduation-project.vercel.app/services/sexual-disorders",
            "ptsd treatment": "https://mind-med-graduation-project.vercel.app/services/ptsd",
            "bipolar disorder treatment": "https://mind-med-graduation-project.vercel.app/services/bipolar",
            "adhd treatment": "https://mind-med-graduation-project.vercel.app/services/adhd",
            "ocd treatment": "https://mind-med-graduation-project.vercel.app/services/ocd",
            "schizophrenia treatment": "https://mind-med-graduation-project.vercel.app/services/schizophrenia",
            "marriage counseling": "https://mind-med-graduation-project.vercel.app/services/marriage-counseling",
            "child behavioral disorders treatment": "https://mind-med-graduation-project.vercel.app/services/child-behavioral"
        }

        message = tracker.latest_message.get('text', '').lower()

        # Map possible user inputs to standard keys
        service_keywords = {
            "depression treatment": ["depression", "الاكتئاب"],
            "addiction treatment": ["addiction", "الإدمان"],
            "psychosis treatment": ["psychosis", "الذهان"],
            "personality disorders treatment": ["personality disorders", "اضطرابات الشخصية"],
            "adjustment disorders treatment": ["adjustment disorders", "اضطرابات التكيف"],
            "anxiety treatment": ["anxiety", "القلق"],
            "eating disorders treatment": ["eating disorders", "اضطرابات الأكل"],
            "sexual disorders treatment": ["sexual disorders", "الاضطرابات الجنسية"],
            "ptsd treatment": ["ptsd", "اضطراب ما بعد الصدمة"],
            "bipolar disorder treatment": ["bipolar disorder", "الاضطراب ثنائي القطب"],
            "adhd treatment": ["adhd", "اضطراب فرط الحركة ونقص الانتباه"],
            "ocd treatment": ["ocd", "الوسواس القهري"],
            "schizophrenia treatment": ["schizophrenia", "الفصام"],
            "marriage counseling": ["marriage counseling", "الاستشارات الزوجية"],
            "child behavioral disorders treatment": ["child behavioral disorders", "اضطرابات سلوكية للأطفال"]
        }

        selected_service = None
        for key, keywords in service_keywords.items():
            if any(keyword in message for keyword in keywords):
                selected_service = key
                break

        if selected_service and selected_service in service_links:
             dispatcher.utter_message(text=f"You can find more information about {selected_service.title()} here: {service_links[selected_service]}")
        else:
            dispatcher.utter_message(text="I'm not sure which service you're interested in. Could you please specify which service you'd like to know more about?")

        return []


class ActionHandleSpecificDoctorServiceAr(Action):
    def name(self) -> Text:
        return "action_handle_specific_doctor_service_ar"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        service_links = {
            "علاج الاكتئاب": "https://mind-med-graduation-project.vercel.app/services/depression",
            "علاج الإدمان": "https://mind-med-graduation-project.vercel.app/services/addiction",
            "علاج الذهان": "https://mind-med-graduation-project.vercel.app/services/psychosis",
            "علاج اضطرابات الشخصية": "https://mind-med-graduation-project.vercel.app/services/personality-disorders",
            "علاج اضطرابات التكيف": "https://mind-med-graduation-project.vercel.app/services/adjustment-disorders",
            "علاج القلق": "https://mind-med-graduation-project.vercel.app/services/anxiety",
            "علاج اضطرابات الأكل": "https://mind-med-graduation-project.vercel.app/services/eating-disorders",
            "علاج الاضطرابات الجنسية": "https://mind-med-graduation-project.vercel.app/services/sexual-disorders",
            "علاج اضطراب ما بعد الصدمة": "https://mind-med-graduation-project.vercel.app/services/ptsd",
            "علاج الاضطراب ثنائي القطب": "https://mind-med-graduation-project.vercel.app/services/bipolar",
            "علاج اضطراب فرط الحركة ونقص الانتباه": "https://mind-med-graduation-project.vercel.app/services/adhd",
            "علاج الوسواس القهري": "https://mind-med-graduation-project.vercel.app/services/ocd",
            "علاج الفصام": "https://mind-med-graduation-project.vercel.app/services/schizophrenia",
            "الاستشارات الزوجية": "https://mind-med-graduation-project.vercel.app/services/marriage-counseling",
            "علاج الاضطرابات السلوكية والعاطفية للأطفال": "https://mind-med-graduation-project.vercel.app/services/child-behavioral"
        }

        message = tracker.latest_message.get('text', '')

        # Map possible user inputs to standard keys
        service_keywords = {
            "علاج الاكتئاب": ["اكتئاب", "depression"],
            "علاج الإدمان": ["إدمان", "addiction"],
            "علاج الذهان": ["ذهان", "psychosis"],
            "علاج اضطرابات الشخصية": ["اضطرابات الشخصية", "personality disorders"],
            "علاج اضطرابات التكيف": ["اضطرابات التكيف", "adjustment disorders"],
            "علاج القلق": ["قلق", "anxiety"],
            "علاج اضطرابات الأكل": ["اضطرابات الأكل", "eating disorders"],
            "علاج الاضطرابات الجنسية": ["الاضطرابات الجنسية", "sexual disorders"],
            "علاج اضطراب ما بعد الصدمة": ["اضطراب ما بعد الصدمة", "ptsd"],
            "علاج الاضطراب ثنائي القطب": ["الاضطراب ثنائي القطب", "bipolar disorder"],
            "علاج اضطراب فرط الحركة ونقص الانتباه": ["اضطراب فرط الحركة ونقص الانتباه", "adhd"],
            "علاج الوسواس القهري": ["وسواس", "ocd"],
            "علاج الفصام": ["فصام", "schizophrenia"],
            "الاستشارات الزوجية": ["استشارات زوجية", "marriage counseling"],
            "علاج الاضطرابات السلوكية والعاطفية للأطفال": ["اضطرابات سلوكية للأطفال", "child behavioral disorders"]
        }

        selected_service = None
        for key, keywords in service_keywords.items():
            if any(keyword in message for keyword in keywords):
                selected_service = key
                break

        if selected_service and selected_service in service_links:
             dispatcher.utter_message(text=f"يمكنك العثور على مزيد من المعلومات حول {selected_service} هنا: {service_links[selected_service]}")
        else:
            dispatcher.utter_message(text="لست متأكدًا أي خدمة تهتم بها. هل يمكنك تحديد الخدمة التي ترغب في معرفة المزيد عنها؟")

        return []


# These actions seem unused based on the rules and stories provided earlier
# class ActionHandleLinaSupportEn(Action):
#     def name(self) -> Text:
#         return "action_handle_lina_support_en"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         # This action would handle general Lina support requests
#         # For now, the rules directly map specific Lina intents to utters
#         pass # Placeholder

# class ActionHandleLinaSupportAr(Action):
#     def name(self) -> Text:
#         return "action_handle_lina_support_ar"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         # This action would handle general Lina support requests
#         # For now, the rules directly map specific Lina intents to utters
#         pass # Placeholder

# class ActionHandleDoctorServiceEn(Action):
#     def name(self) -> Text:
#         return "action_handle_doctor_service_en"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         # This action seems redundant as specific service requests are handled by ActionHandleSpecificDoctorServiceEn
#         pass # Placeholder

# class ActionHandleDoctorServiceAr(Action):
#     def name(self) -> Text:
#         return "action_handle_doctor_service_ar"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         # This action seems redundant as specific service requests are handled by ActionHandleSpecificDoctorServiceAr
#         pass # Placeholder 