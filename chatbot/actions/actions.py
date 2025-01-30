from typing import Any, Text, Dict, List
import requests
import json
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import time

API_KEYS = [
    "AIzaSyBnJLu6JVMLlLvxDM8rZh3bHvOWzp50a10",
    "AIzaSyDl3VWGHcqe7gvgIU2KXApy2IS5838YgJ0",
    "AIzaSyBk360OIQjQcVSkuAnv4HQtItQ5yPsk9uQ",
    "AIzaSyDPQAKs5DlPxw29DfqK2Ilf-wVsYHyfU0o",
    "AIzaSyAzk8XjfJVvbuJB36g0PzIwNQvHnxrL1a0",
    "AIzaSyBw-Gb1bck3HVqA7yWtybujdpGCyj9bWmo",
    "AIzaSyAUy8X-Ada9CdMCSY_d43FvkaciqwIfnkA",
    "AIzaSyBA_KB9TfdLKLqZze8LhAm_x9JlXwGJks8",
    "AIzaSyBUgLPBu9DLlJTq_CyiQYDu402-HA0680U"
]

# المواضيع المسموح بها باللغتين
ALLOWED_TOPICS = {
    'ar': [
        # المواضيع العامة للصحة النفسية
        "الصحة النفسية", "الصحة العقلية", "العلاج النفسي", "الطب النفسي",
        
        # الاضطرابات والحالات النفسية
        "الاكتئاب", "القلق", "التوتر", "الوسواس القهري", "اضطراب ثنائي القطب",
        "الفصام", "اضطراب الشخصية", "اضطراب الهلع", "الرهاب", "اضطراب ما بعد الصدمة",
        "اضطرابات الأكل", "اضطرابات النوم", "اضطراب نقص الانتباه", "فرط الحركة",
        "اضطراب الوسواس", "الاضطرابات النفسية", "اضطرابات المزاج",
        
        # الأعراض النفسية
        "الحزن", "القلق النفسي", "الخوف", "الهلع", "الأرق", "التعب النفسي",
        "الإرهاق النفسي", "الضغط النفسي", "الوحدة", "العزلة", "تقلب المزاج",
        "الغضب", "العدوانية", "الإحباط", "اليأس", "الأفكار السلبية",
        
        # العلاج والدعم النفسي
        "علاج نفسي", "استشارة نفسية", "معالج نفسي", "طبيب نفسي", "أخصائي نفسي",
        "جلسات نفسية", "إرشاد نفسي", "دعم نفسي", "تحليل نفسي", "علاج سلوكي",
        "علاج معرفي", "العلاج بالأدوية النفسية", "التأهيل النفسي",
        
        # التشخيص والتقييم
        "تشخيص نفسي", "تقييم نفسي", "فحص نفسي", "اختبار نفسي", "تحليل شخصية",
        
        # الصحة النفسية الإيجابية
        "الصحة النفسية الإيجابية", "تطوير الذات", "الثقة بالنفس", "تقدير الذات",
        "السعادة النفسية", "الرفاهية النفسية", "التوازن النفسي", "الصمود النفسي",
        
        # العلاقات والتفاعلات
        "المشاكل الزوجية", "العلاقات الأسرية", "التواصل", "المهارات الاجتماعية",
        "الذكاء العاطفي", "التعامل مع الآخرين"
    ],
    
    'en': [
        # General Mental Health Topics
        "mental health", "mental wellbeing", "psychological health", "psychiatry",
        "behavioral health", "emotional health", "psychological wellness",
        
        # Disorders and Conditions
        "depression", "anxiety", "stress", "OCD", "bipolar disorder",
        "schizophrenia", "personality disorder", "panic disorder", "phobia", "PTSD",
        "eating disorders", "sleep disorders", "ADHD", "attention deficit",
        "obsessive compulsive", "mental disorders", "mood disorders",
        "psychological disorders", "trauma", "addiction", "substance abuse",
        
        # Psychological Symptoms
        "sadness", "anxiety symptoms", "fear", "panic", "insomnia",
        "mental fatigue", "psychological exhaustion", "mental stress",
        "loneliness", "isolation", "mood swings", "anger", "aggression",
        "frustration", "hopelessness", "negative thoughts", "suicidal thoughts",
        
        # Treatment and Support
        "psychological therapy", "counseling", "psychotherapy", "psychiatrist",
        "psychologist", "therapy sessions", "mental health counseling",
        "psychological support", "psychoanalysis", "behavioral therapy",
        "cognitive therapy", "CBT", "DBT", "psychiatric medication",
        "psychological rehabilitation", "group therapy", "family therapy",
        
        # Diagnosis and Assessment
        "psychological diagnosis", "mental health assessment", "psychological evaluation",
        "personality assessment", "mental status examination", "psychological testing",
        
        # Positive Mental Health
        "positive psychology", "self-development", "self-confidence", "self-esteem",
        "psychological wellbeing", "mental wellness", "psychological balance",
        "emotional resilience", "mindfulness", "meditation", "stress management",
        
        # Relationships and Interactions
        "relationship issues", "family relationships", "communication skills",
        "social skills", "emotional intelligence", "interpersonal relationships",
        "marriage counseling", "family therapy", "social anxiety",
        
        # Professional Terms
        "clinical psychology", "psychopathology", "behavioral therapy",
        "cognitive behavioral therapy", "psychodynamic therapy", "mental health care",
        "psychological assessment", "therapeutic approaches", "psychological intervention"
    ]
}

class ActionAskCoreModel(Action):
    def name(self) -> Text:
        return "action_ask_core_model"

    def detect_language(self, text: str) -> str:
        # تحسين اكتشاف اللغة
        arabic_count = sum(1 for c in text if '\u0600' <= c <= '\u06FF')
        english_count = sum(1 for c in text if 'a' <= c.lower() <= 'z')
        
        return 'ar' if arabic_count > english_count else 'en'

    def check_topic_relevance(self, text: str, lang: str) -> bool:
        text_lower = text.lower()
        
        # التحقق من المواضيع حسب اللغة المكتشفة
        topics = ALLOWED_TOPICS[lang]
        
        # التحقق من وجود أي من المواضيع في النص
        return any(topic.lower() in text_lower for topic in topics)

    def get_error_message(self, lang: str) -> str:
        messages = {
            'ar': "أنا متخصص فقط في الطب النفسي والصحة النفسية، ولا يمكنني المساعدة في هذا الموضوع.",
            'en': "I specialize only in mental health and psychology, and cannot assist with this topic."
        }
        return messages.get(lang, messages['en'])

    def ask_core_model(self, prompt: str, retries=3, delay=5) -> str:
        headers = {"Content-Type": "application/json"}
        lang = self.detect_language(prompt)

        # التحقق من صلة الموضوع
        if not self.check_topic_relevance(prompt, lang):
            return self.get_error_message(lang)

        context = {
            'ar': """أنت طبيب نفسي متخصص ومؤهل مع خبرة 15 عاماً في التشخيص والعلاج النفسي. عليك:
                    1. تقييم الأعراض وتشخيص الحالة بدقة
                    2. تقديم خطة علاجية متكاملة تشمل:
                    - العلاج النفسي المناسب (معرفي سلوكي، تحليلي، إلخ)
                    - التقنيات العلاجية الحديثة
                    - توصيات بشأن العلاج الدوائي إذا لزم الأمر
                    - نصائح للرعاية الذاتية والدعم
                    3. استخدام أحدث البروتوكولات العلاجية والأبحاث
                    4. تقديم المشورة بأسلوب مهني ومتعاطف
                    5. الإشارة إلى ضرورة استشارة طبيب نفسي مباشرة في الحالات الحرجة

                    مع الأخذ في الاعتبار أن دورك هو تقديم معلومات عامة وليس بديلاً عن الاستشارة الطبية المباشرة.
                    
                    السؤال: """,
                    
            'en': """You are a qualified psychiatrist with 15 years of experience in psychological diagnosis and treatment. You should:
                    1. Evaluate symptoms and provide accurate diagnosis
                    2. Provide a comprehensive treatment plan including:
                    - Appropriate psychotherapy (CBT, psychodynamic, etc.)
                    - Modern therapeutic techniques
                    - Recommendations for medication when necessary
                    - Self-care and support guidelines
                    3. Utilize latest treatment protocols and research
                    4. Provide counseling in a professional and empathetic manner
                    5. Indicate when direct psychiatric consultation is necessary

                    Note that your role is to provide general information and not replace direct medical consultation.
                    
                    Question: """
        }
        
        enhanced_prompt = context[lang] + prompt

        data = {
            "contents": [{"parts": [{"text": enhanced_prompt}]}],
            "generationConfig": {
                "temperature": 0.7,
                "maxOutputTokens": 1000  # زيادة عدد الtokens للحصول على إجابات أكثر تفصيلاً
            }
        }

        for api_key in API_KEYS:
            api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={api_key}"
            
            for attempt in range(retries):
                try:
                    response = requests.post(api_url, headers=headers, json=data)
                    
                    if response.status_code == 200:
                        result = response.json()
                        return result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", 
                            "عذراً، لم يتم استلام رد." if lang == "ar" else "Sorry, no response received.")
                    elif response.status_code == 503:
                        time.sleep(delay)
                    else:
                        break  # جرب المفتاح التالي إذا كان هناك خطأ غير متوقع
                except Exception as e:
                    continue

        return "❌ تعذر الاتصال بـ API بعد عدة محاولات." if lang == "ar" else "❌ Failed to connect to the API after multiple attempts."

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        user_message = tracker.latest_message.get("text")
        core_response = self.ask_core_model(user_message)
        dispatcher.utter_message(text=core_response)
        return []