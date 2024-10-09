import logging
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch
import json
import re
from sklearn.neural_network import MLPClassifier  # نموذج شبكة عصبية بسيطة
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
import random
from collections import deque  # لتحسين الذاكرة المؤقتة

class ImprovedArabicMentalHealthAssistant:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self._initialize_models()
        self.conversation_history = deque(maxlen=50)  # تحسين ذاكرة المحادثات
        self.memory = {}  # ذاكرة المستخدمين لتتبع معلوماتهم
        self._load_knowledge_base()
        self._initialize_healthcare_integration()
        self._initialize_continuous_learning()
        self._initialize_user_profiles()

    def _initialize_models(self):
        logging.info("Initializing models...")
        # تحميل نماذج اللغة العربية
        self.ar_tokenizer = AutoTokenizer.from_pretrained("aubmindlab/bert-base-arabertv02")
        self.ar_model = AutoModelForCausalLM.from_pretrained("aubmindlab/bert-base-arabertv02")
        # تحميل نموذج تحليل العواطف
        self.emotion_detector = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", tokenizer="j-hartmann/emotion-english-distilroberta-base")
        # استبدال نموذج اللهجات بنموذج BERT عربي مجاني متاح
        self.dialect_detector = pipeline("text-classification", model="aubmindlab/bert-base-arabertv02", tokenizer="aubmindlab/bert-base-arabertv02")

    def _load_knowledge_base(self):
        try:
            # تحميل قاعدة المعرفة من ملف JSON
            with open('knowledge_base.json', 'r', encoding='utf-8') as f:
                self.knowledge_base = json.load(f)
        except FileNotFoundError:
            logging.error("knowledge_base.json file not found. Please make sure the file exists in the correct directory.")
            self.knowledge_base = {}

    def _initialize_healthcare_integration(self):
        try:
            # تحميل مقدمي الرعاية الصحية من ملف JSON
            with open('healthcare_providers.json', 'r', encoding='utf-8') as f:
                self.healthcare_providers = json.load(f)
        except FileNotFoundError:
            logging.error("healthcare_providers.json file not found. Please make sure the file exists in the correct directory.")
            self.healthcare_providers = []

    def _initialize_continuous_learning(self):
        # شبكة عصبية بسيطة للتعلم المستمر
        self.tfidf_vectorizer = TfidfVectorizer(max_features=5000)
        self.nn_classifier = MLPClassifier(hidden_layer_sizes=(50,), max_iter=1, warm_start=True)  # نموذج تعلم مستمر

        # تحميل بيانات المحادثات لتدريب النموذج
        try:
            with open('conversation_history.json', 'r', encoding='utf-8') as f:
                conversation_data = json.load(f)

            texts = [conv['user_input'] for conv in conversation_data]
            labels = [conv['sentiment'] for conv in conversation_data]

            X = self.tfidf_vectorizer.fit_transform(texts)
            self.nn_classifier.fit(X, labels)
        except FileNotFoundError:
            logging.info("No existing conversation history found. Starting fresh.")

    def _initialize_user_profiles(self):
        try:
            # تحميل ملفات المستخدمين من ملف JSON
            with open('user_profiles.json', 'r', encoding='utf-8') as f:
                self.user_profiles = json.load(f)
        except FileNotFoundError:
            logging.info("No user profiles found. Initializing empty profiles.")
            self.user_profiles = {}

    def detect_dialect(self, text):
        # استخدام نموذج BERT لاكتشاف اللهجة
        result = self.dialect_detector(text)[0]
        return result['label'], result['score']

    def analyze_sentiment(self, text):
        # تحليل المشاعر باستخدام CAMeL
        sentiment = self.sentiment_analyzer.predict(text)
        return sentiment.top, sentiment.scores[sentiment.top]

    def detect_emotion(self, text):
        # اكتشاف العواطف باستخدام نموذج جديد
        result = self.emotion_detector(text)[0]
        return result['label'], result['score']

    def generate_response(self, user_input, user_id):
        # استخدام الذاكرة للتعرف على معلومات المستخدم عبر المحادثات الطويلة
        if user_id in self.memory:
            print(f"Welcome back! I remember you talked to me previously about: {', '.join(self.memory[user_id]['topics'])}.")
        else:
            self.memory[user_id] = {'topics': []}

        # إضافة الموضوعات التي تحدث عنها المستخدم إلى ذاكرته
        self.memory[user_id]['topics'].extend(re.findall(r'\b\w+\b', user_input.lower()))

        # اكتشاف اللهجة وتحليل المشاعر
        dialect, dialect_score = self.detect_dialect(user_input)
        emotion, emotion_score = self.detect_emotion(user_input)

        print(f"Detected Dialect: {dialect} ({dialect_score:.2f})")
        print(f"Detected Emotion: {emotion} ({emotion_score:.2f})")

        # استجابة بسيطة
        response = f"It seems you are feeling {emotion}. Is there anything else you'd like to discuss?"

        # تخزين المحادثة في الذاكرة المؤقتة
        self.conversation_history.append({
            "user_input": user_input,
            "response": response,
            "emotion": emotion,
            "dialect": dialect
        })

        # تحديث ملف تعريف المستخدم
        self._update_user_profile(user_id, user_input, emotion, dialect)

        return response

    def _update_user_profile(self, user_id, text, emotion, dialect):
        # تحديث اهتمامات المستخدم وتاريخه
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {"interests": [], "emotion_history": [], "dialect_history": []}

        # إضافة الاهتمامات بناءً على الكلمات المفتاحية
        interests = re.findall(r'\b\w+\b', text.lower())
        self.user_profiles[user_id]["interests"].extend(interests)

        # إضافة الشعور واللهجة إلى السجل
        self.user_profiles[user_id]["emotion_history"].append(emotion)
        self.user_profiles[user_id]["dialect_history"].append(dialect)

        # حفظ ملفات المستخدمين
        with open('user_profiles.json', 'w', encoding='utf-8') as f:
            json.dump(self.user_profiles, f, ensure_ascii=False, indent=2)

    def recommend_healthcare_provider(self, user_id):
        # توصيات بناءً على اهتمامات المستخدم
        user_profile = self.user_profiles.get(user_id, {})
        user_interests = user_profile.get('interests', [])

        matching_providers = [
            provider for provider in self.healthcare_providers
            if any(interest in provider['specialty'].lower() for interest in user_interests)
        ]

        if matching_providers:
            return random.choice(matching_providers)
        else:
            return random.choice(self.healthcare_providers)

    def run_session(self, user_id):
        print("Welcome! How can I assist you today?")

        while True:
            user_input = input("You: ")
            if user_input.lower() in ['exit', 'goodbye']:
                print("Thank you for talking with me. Take care!")
                break

            response = self.generate_response(user_input, user_id)
            print(f"Assistant: {response}")

            if len(self.conversation_history) % 5 == 0:
                provider = self.recommend_healthcare_provider(user_id)
                print(f"I recommend {provider['name']}, {provider['specialty']}. You can contact them via: {provider['contact']}")

    def save_conversation_history(self, filename='conversation_history.json'):
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.conversation_history, f, ensure_ascii=False, indent=2)

    def load_conversation_history(self, filename='conversation_history.json'):
        with open(filename, 'r', encoding='utf-8') as f:
            self.conversation_history = json.load(f)

if __name__ == "__main__":
    assistant = ImprovedArabicMentalHealthAssistant()
    user_id = input("Please enter your user ID: ")
    assistant.run_session(user_id)
    assistant.save_conversation_history()
