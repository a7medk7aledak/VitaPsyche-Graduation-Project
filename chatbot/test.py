import logging
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, BertForSequenceClassification, AdamW, MarianMTModel, MarianTokenizer
import torch
from datasets import load_dataset, concatenate_datasets
import json
import re
from collections import deque
from torch.utils.data import DataLoader, TensorDataset
from tqdm import tqdm
import random
from langdetect import detect

class BilingualMentalHealthAssistant:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self._initialize_models()
        self.conversation_history = deque(maxlen=50)
        self.memory = {}
        self._load_knowledge_base()
        self._initialize_healthcare_integration()
        self._initialize_user_profiles()
        self._train_on_combined_datasets()

    def _initialize_models(self):
        logging.info("Initializing models...")
        # Arabic models
        self.ar_tokenizer = AutoTokenizer.from_pretrained("aubmindlab/aragpt2-base")
        self.ar_model = AutoModelForCausalLM.from_pretrained("aubmindlab/aragpt2-base")
        self.ar_emotion_detector = pipeline("text-classification", model="CAMeL-Lab/bert-base-arabic-camelbert-msa-sentiment")
        
        # English models
        self.en_tokenizer = AutoTokenizer.from_pretrained("gpt2")
        self.en_model = AutoModelForCausalLM.from_pretrained("gpt2")
        self.en_emotion_detector = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

        # Bilingual sentiment analysis
        self.sentiment_model = BertForSequenceClassification.from_pretrained("CAMeL-Lab/bert-base-arabic-camelbert-msa-sentiment")
        self.sentiment_tokenizer = AutoTokenizer.from_pretrained("CAMeL-Lab/bert-base-arabic-camelbert-msa-sentiment")

        # Translation models
        self.ar_to_en_translator = MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-ar-en")
        self.ar_to_en_tokenizer = MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-ar-en")
        self.en_to_ar_translator = MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-en-ar")
        self.en_to_ar_tokenizer = MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-ar")

    def _load_knowledge_base(self):
        try:
            with open('bilingual_mental_health_knowledge_base.json', 'r', encoding='utf-8') as f:
                self.knowledge_base = json.load(f)
        except FileNotFoundError:
            logging.error("Bilingual mental health knowledge base not found. Initializing default.")
            self.knowledge_base = self._create_default_knowledge_base()

    def _create_default_knowledge_base(self):
        return {
            "depression": {
                "ar": {
                    "name": "الاكتئاب",
                    "description": "حالة من الحزن المستمر وفقدان الاهتمام بالأنشطة",
                    "symptoms": ["الحزن المستمر", "فقدان الاهتمام", "اضطرابات النوم"],
                    "treatments": ["العلاج النفسي", "الأدوية المضادة للاكتئاب", "تغييرات نمط الحياة"]
                },
                "en": {
                    "name": "Depression",
                    "description": "A persistent state of sadness and loss of interest in activities",
                    "symptoms": ["Persistent sadness", "Loss of interest", "Sleep disturbances"],
                    "treatments": ["Psychotherapy", "Antidepressant medications", "Lifestyle changes"]
                }
            },
            "anxiety": {
                "ar": {
                    "name": "القلق",
                    "description": "شعور بالخوف أو التوتر الشديد",
                    "symptoms": ["التوتر", "الأرق", "صعوبة التركيز"],
                    "treatments": ["العلاج السلوكي المعرفي", "تقنيات الاسترخاء", "الأدوية المضادة للقلق"]
                },
                "en": {
                    "name": "Anxiety",
                    "description": "A feeling of fear or intense worry",
                    "symptoms": ["Nervousness", "Insomnia", "Difficulty concentrating"],
                    "treatments": ["Cognitive Behavioral Therapy", "Relaxation techniques", "Anti-anxiety medications"]
                }
            }
        }

    def _initialize_healthcare_integration(self):
        # Code for healthcare integration (unchanged)
        pass

    def _initialize_user_profiles(self):
        # Code for user profiles (unchanged)
        pass

    def _train_on_combined_datasets(self):
        # Code for training on combined datasets (unchanged)
        pass

    def detect_language(self, text):
        return detect(text)

    def translate(self, text, source_lang, target_lang):
        if source_lang == target_lang:
            return text
        
        if source_lang == 'ar' and target_lang == 'en':
            translator = self.ar_to_en_translator
            tokenizer = self.ar_to_en_tokenizer
        elif source_lang == 'en' and target_lang == 'ar':
            translator = self.en_to_ar_translator
            tokenizer = self.en_to_ar_tokenizer
        else:
            raise ValueError("Unsupported language pair")

        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        translated = translator.generate(**inputs)
        return tokenizer.decode(translated[0], skip_special_tokens=True)

    def detect_sentiment(self, text, lang):
        if lang == 'ar':
            inputs = self.sentiment_tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
        else:  # English
            translated_text = self.translate(text, 'en', 'ar')
            inputs = self.sentiment_tokenizer(translated_text, return_tensors="pt", truncation=True, padding=True, max_length=128)
        
        with torch.no_grad():
            outputs = self.sentiment_model(**inputs)
        
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()
        confidence = torch.nn.functional.softmax(logits, dim=1)[0][predicted_class].item()

        sentiment_labels = {
            'ar': ["سلبي", "محايد", "إيجابي"],
            'en': ["Negative", "Neutral", "Positive"]
        }
        return sentiment_labels[lang][predicted_class], confidence

    def detect_emotion(self, text, lang):
        if lang == 'ar':
            result = self.ar_emotion_detector(text)[0]
        else:  # English
            result = self.en_emotion_detector(text)[0]
        return result['label'], result['score']

    def generate_response(self, user_input, user_id):
        lang = self.detect_language(user_input)
        
        if user_id in self.memory:
            previous_topics = ', '.join(set(self.memory[user_id]['topics'][-5:]))
            welcome_back = {
                'ar': f"مرحبًا بعودتك! أتذكر أننا تحدثنا عن: {previous_topics}.",
                'en': f"Welcome back! I remember we talked about: {previous_topics}."
            }
            print(welcome_back[lang])
        else:
            self.memory[user_id] = {'topics': [], 'language': lang}

        self.memory[user_id]['topics'].extend(re.findall(r'\b\w+\b', user_input))

        sentiment, sentiment_score = self.detect_sentiment(user_input, lang)
        emotion, emotion_score = self.detect_emotion(user_input, lang)

        print_detected = {
            'ar': f"المشاعر المكتشفة: {emotion} ({emotion_score:.2f})\nالموقف المكتشف: {sentiment} ({sentiment_score:.2f})",
            'en': f"Detected Emotion: {emotion} ({emotion_score:.2f})\nDetected Sentiment: {sentiment} ({sentiment_score:.2f})"
        }
        print(print_detected[lang])

        response_templates = {
            'ar': f"شكرًا لمشاركتك. يبدو أنك تشعر بـ {emotion} مع موقف {sentiment}. ",
            'en': f"Thank you for sharing. You seem to feel {emotion} with a {sentiment} sentiment. "
        }
        response = response_templates[lang]

        # Add information from knowledge base
        for disorder, info in self.knowledge_base.items():
            if info[lang]['name'].lower() in user_input.lower():
                response += "\n\n" + {
                    'ar': f"قد يكون من المفيد معرفة المزيد عن {info[lang]['name']}:\n",
                    'en': f"It might be helpful to know more about {info[lang]['name']}:\n"
                }[lang]
                response += {
                    'ar': f"الوصف: {info[lang]['description']}\n",
                    'en': f"Description: {info[lang]['description']}\n"
                }[lang]
                response += {
                    'ar': f"بعض الأعراض الشائعة: {', '.join(info[lang]['symptoms'][:3])}\n",
                    'en': f"Some common symptoms: {', '.join(info[lang]['symptoms'][:3])}\n"
                }[lang]
                response += {
                    'ar': f"بعض خيارات العلاج: {', '.join(info[lang]['treatments'][:3])}\n",
                    'en': f"Some treatment options: {', '.join(info[lang]['treatments'][:3])}\n"
                }[lang]

        response += {
            'ar': "\nهل ترغب في مناقشة هذا أكثر أو معرفة المزيد عن أي اضطراب محدد؟",
            'en': "\nWould you like to discuss this further or learn more about any specific disorder?"
        }[lang]

        critical_keywords = {
            'ar': ["انتحار", "أذى", "يأس", "اكتئاب شديد"],
            'en': ["suicide", "harm", "hopeless", "severe depression"]
        }
        if any(keyword in user_input.lower() for keyword in critical_keywords[lang]):
            response += {
                'ar': "\n\nأنا قلق بشأن سلامتك. من فضلك فكر في الاتصال بأخصائي الصحة النفسية على الفور.",
                'en': "\n\nI'm concerned about your safety. Please consider contacting a mental health professional immediately."
            }[lang]
            self._emergency_referral(user_id)

        self.conversation_history.append({
            "user_input": user_input,
            "response": response,
            "emotion": emotion,
            "sentiment": sentiment,
            "language": lang
        })

        self._update_user_profile(user_id, user_input, emotion, sentiment, lang)
        return response

    def _emergency_referral(self, user_id):
        # Emergency referral logic (unchanged)
        pass

    def _update_user_profile(self, user_id, text, emotion, sentiment, lang):
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {"interests": [], "emotion_history": [], "sentiment_history": [], "language": lang}

        interests = re.findall(r'\b\w+\b', text)
        self.user_profiles[user_id]["interests"].extend(interests)
        self.user_profiles[user_id]["emotion_history"].append(emotion)
        self.user_profiles[user_id]["sentiment_history"].append(sentiment)
        self.user_profiles[user_id]["language"] = lang

        with open('bilingual_user_profiles.json', 'w', encoding='utf-8') as f:
            json.dump(self.user_profiles, f, ensure_ascii=False, indent=2)

    def run_session(self, user_id):
        print("مرحبًا! كيف يمكنني مساعدتك اليوم؟ / Hello! How can I assist you today?")
        print("تنبيه: هذا نظام آلي للمساعدة الأولية وليس بديلاً عن الرعاية الطبية المهنية.")
        print("Note: This is an automated system for initial assistance and not a substitute for professional medical care.")
        while True:
            user_input = input("أنت/You: ")
            if user_input.lower() in ["خروج", "exit"]:
                print("وداعًا! / Goodbye!")
                break
            response = self.generate_response(user_input, user_id)
            print("المساعد/Assistant:", response)
