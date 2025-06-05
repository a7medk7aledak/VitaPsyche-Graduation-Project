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
import fasttext
import re
import unicodedata # Import unicodedata

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

# Load FastText model once
try:
    language_model = fasttext.load_model("lid.176.bin")
    logger.info("FastText model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading FastText model: {e}. Make sure 'lid.176.bin' is in the correct path.")
    language_model = None

# Arabic Unicode ranges for character-based detection
ARABIC_RANGES = [
    (0x0600, 0x06FF),  # Arabic
    (0x0750, 0x077F),  # Arabic Supplement
    (0x08A0, 0x08FF),  # Arabic Extended-A
    (0xFB50, 0xFDFF),  # Arabic Presentation Forms-A
    (0xFE70, 0xFEFF),  # Arabic Presentation Forms-B
]

# Common Arabic words for pattern matching
COMMON_ARABIC_WORDS = {
    'في', 'من', 'إلى', 'على', 'عن', 'مع', 'هذا', 'هذه', 'التي', 'الذي',
    'كان', 'كانت', 'يكون', 'تكون', 'أن', 'إن', 'كيف', 'ماذا', 'أين', 'متى',
    'لماذا', 'أي', 'كل', 'بعض', 'جميع', 'معظم', 'أول', 'آخر', 'جديد', 'قديم',
    'كبير', 'صغير', 'طويل', 'قصير', 'جيد', 'سيء', 'سريع', 'بطيء', 'أنا', 'أنت',
    'هو', 'هي', 'نحن', 'أنتم', 'هم', 'لك', 'له', 'لها', 'لنا', 'لهم', 'والله',
    'الله', 'مرحبا', 'أهلا', 'شكرا', 'عفوا', 'آسف', 'نعم', 'لا', 'ربما', 'طبعا'
}

# Common English words for pattern matching
COMMON_ENGLISH_WORDS = {
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'about', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'among', 'this', 'that', 'these', 'those',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'its', 'our',
    'their', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
    'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'can', 'hello', 'hi', 'bye', 'goodbye', 'thanks', 'thank', 'please', 'sorry',
    'yes', 'no', 'maybe', 'ok', 'okay', 'sure', 'right', 'wrong', 'good',
    'bad', 'big', 'small', 'long', 'short', 'new', 'old', 'first', 'last'
}

def is_arabic_char(char):
    """Check if a character is Arabic"""
    code_point = ord(char)
    return any(start <= code_point <= end for start, end in ARABIC_RANGES)

def get_script_ratio(text):
    """Get the ratio of Arabic to Latin characters"""
    if not text.strip():
        return 0, 0
    
    arabic_count = 0
    latin_count = 0
    
    for char in text:
        if char.isalpha():
            if is_arabic_char(char):
                arabic_count += 1
            elif 'LATIN' in unicodedata.name(char, ''):
                latin_count += 1
    
    total_alpha = arabic_count + latin_count
    if total_alpha == 0:
        return 0, 0
    
    return arabic_count / total_alpha, latin_count / total_alpha

def detect_language_by_keywords(text):
    """Detect language based on common words"""
    words = re.findall(r'\b\w+\b', text.lower(), re.UNICODE)
    
    arabic_score = 0
    english_score = 0
    
    for word in words:
        if word in COMMON_ARABIC_WORDS:
            arabic_score += 2  # Higher weight for exact matches
        elif word in COMMON_ENGLISH_WORDS:
            english_score += 2
    
    return arabic_score, english_score

def enhanced_language_detection(text, min_confidence=0.3):
    """Enhanced language detection combining multiple methods"""
    if not text or not text.strip():
        return None, 0
    
    cleaned_text = text.strip()
    
    # Method 1: FastText detection
    fasttext_lang = None
    fasttext_confidence = 0
    if language_model:
        try:
            prediction = language_model.predict(cleaned_text)
            fasttext_lang = prediction[0][0].replace("__label__", "")
            fasttext_confidence = float(prediction[1][0])
        except Exception as e:
            logger.warning(f"FastText prediction failed for '{cleaned_text[:50]}...': {e}")
    
    # Method 2: Character-based detection
    arabic_ratio, latin_ratio = get_script_ratio(cleaned_text)
    
    # Method 3: Keyword-based detection
    arabic_keywords, english_keywords = detect_language_by_keywords(cleaned_text)
    
    # Scoring system
    scores = {'ar': 0, 'en': 0}
    
    # FastText score (weight: 40% if confident, 20% if not)
    if fasttext_lang in ['ar', 'en']:
        weight = 0.4 if fasttext_confidence > 0.5 else 0.2
        scores[fasttext_lang] += weight * fasttext_confidence
    
    # Character ratio score (weight: 30%)
    if arabic_ratio > latin_ratio and arabic_ratio > 0.3:
        scores['ar'] += 0.3 * arabic_ratio
    elif latin_ratio > arabic_ratio and latin_ratio > 0.3:
        scores['en'] += 0.3 * latin_ratio
    
    # Keyword score (weight: 30%)
    total_keyword_score = arabic_keywords + english_keywords
    if total_keyword_score > 0:
        scores['ar'] += 0.3 * (arabic_keywords / total_keyword_score)
        scores['en'] += 0.3 * (english_keywords / total_keyword_score)
    
    # Additional heuristics for short text
    if len(cleaned_text.split()) <= 3:
        # For very short text, give more weight to character detection
        if arabic_ratio > 0.5:
            scores['ar'] += 0.2
        elif latin_ratio > 0.5:
            scores['en'] += 0.2
        
        # Check for Arabic numerals and punctuation patterns
        if re.search(r'[؟،؛]', cleaned_text):  # Arabic punctuation
            scores['ar'] += 0.1
        elif re.search(r'[?.,;!]', cleaned_text):  # English punctuation
            scores['en'] += 0.1
    
    # Determine final language
    max_score = max(scores.values())
    if max_score < min_confidence:
        return None, max_score
    
    detected_lang = 'ar' if scores['ar'] > scores['en'] else 'en'
    return detected_lang, max_score

def detect_sentence_language(text):
    """Detect language of a sentence with enhanced detection"""
    if not text or not text.strip():
        return None
    
    lang, confidence = enhanced_language_detection(text)
    
    # Log detection details for debugging
    if logger.isEnabledFor(logging.DEBUG):
        logger.debug(f"Text: '{text[:50]}...', Detected: {lang}, Confidence: {confidence:.3f}")
    
    return lang

def detect_mixed_language_segments(sentence):
    """Detect different language segments within a sentence"""
    words = re.findall(r'\w+|\n|[^\w\s]', sentence, re.UNICODE)
    segments = []
    current_lang = None
    current_segment = []

    for word in words:
        if not word.strip():
            if word == '\n' and current_segment:
                segments.append((current_lang, ' '.join(current_segment)))
                current_segment = []
                current_lang = None
            continue

        # For single words, try enhanced detection
        lang = detect_sentence_language(word)
        
        # If single word detection fails, try with context
        if not lang and current_segment:
            context_text = ' '.join(current_segment + [word])
            context_lang = detect_sentence_language(context_text)
            if context_lang:
                lang = context_lang

        if not lang: # If language still not detected, try with the word alone using enhanced detection
             lang, confidence = enhanced_language_detection(word)
             if lang:
                 segments.append((lang, word))
             else:
                if current_segment:
                    lang_guess_for_segment = detect_sentence_language(' '.join(current_segment))
                    if lang_guess_for_segment in ['ar', 'en']:
                        segments.append((lang_guess_for_segment, ' '.join(current_segment)))
                    else:
                        segments.append(('unknown_segment_lang', ' '.join(current_segment)))
                    current_segment = []
                    current_lang = None
                segments.append(('unknown_word_lang', word))
             continue

        if lang not in ['ar', 'en']:
            if current_segment and current_lang in ['ar', 'en']:
                segments.append((current_lang, ' '.join(current_segment)))
                current_segment = []
            current_lang = 'other'
            continue

        if lang == current_lang:
            current_segment.append(word)
        else:
            if current_segment:
                segments.append((current_lang, ' '.join(current_segment)))
            current_segment = [word]
            current_lang = lang

    if current_segment:
        segments.append((current_lang, ' '.join(current_segment)))
    
    # Enhanced segment merging logic
    final_segments = []
    i = 0
    while i < len(segments):
        lang, text = segments[i]
        if lang in ['ar', 'en']:
            current_texts = [text]
            j = i + 1
            
            # Merge consecutive segments of the same supported language
            while j < len(segments) and segments[j][0] == lang:
                current_texts.append(segments[j][1])
                j += 1
            
            # Try to merge small unknown segments if surrounded by same language
            # This part is complex and might need refinement based on testing
            # For now, let's keep it simple and just merge same-language segments
            
            final_segments.append((lang, ' '.join(current_texts).strip())) # Use strip here
            i = j
        else:
            # Keep non-ar/en segments as they are
            if text.strip(): # Only add if not empty after strip
                final_segments.append((lang, text.strip()))
            i += 1
            
    # Remove empty segments after merging
    final_segments = [(l, t) for l, t in final_segments if t.strip()]
    return final_segments

class Config:
    KEY = os.getenv('KEY')
    TEMPERATURE = float(os.getenv('MODEL_TEMPERATURE'))
    MAX_TOKENS = int(os.getenv('MODEL_MAX_TOKENS'))
    MODEL_NAME = os.getenv('MODEL_NAME')
    MODEL_BASE_URL = os.getenv('MODEL_BASE_URL')
    WS_URL = "http://localhost:5000"
    REQUEST_TIMEOUT = 100  # Increased timeout to match backend

    # Add a check for required environment variables
    REQUIRED_ENV_VARS = ['KEY', 'MODEL_TEMPERATURE', 'MODEL_MAX_TOKENS', 'MODEL_NAME', 'MODEL_BASE_URL']
    for var in REQUIRED_ENV_VARS:
        if not os.getenv(var):
            logger.error(f"Environment variable {var} not set!")

# 🧠 ذاكرة ديناميكية لتخزين آخر 3 رسائل نفسية فقط
mental_history_buffer: List[Dict[str, str]] = []

def get_friendly_error_message(error_type: str, lang: str) -> str:
    """Get user-friendly error messages based on error type and language"""
    error_messages = {
        'timeout': {
            'ar': "عذراً، يبدو أن الاتصال يستغرق وقتاً أطول من المعتاد. هل يمكنك المحاولة مرة أخرى؟",
            'en': "I apologize, but the connection is taking longer than usual. Could you please try again?"
        },
        'api_error': {
            'ar': "عذراً، حدث خطأ في معالجة طلبك. هل يمكنك المحاولة مرة أخرى بعد قليل؟",
            'en': "I apologize, but there was an error processing your request. Could you please try again in a moment?"
        },
        'connection_error': {
            'ar': "عذراً، يبدو أن هناك مشكلة في الاتصال. هل يمكنك التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى؟",
            'en': "I apologize, but there seems to be a connection issue. Could you please check your internet connection and try again?"
        },
        'general_error': {
            'ar': "عذراً، حدث خطأ غير متوقع. هل يمكنك المحاولة مرة أخرى؟",
            'en': "I apologize, but an unexpected error occurred. Could you please try again?"
        }
    }
    return error_messages.get(error_type, error_messages['general_error']).get(lang, error_messages['general_error']['en'])

class ActionDetectLanguage(Action):
    def name(self) -> Text:
        return "action_detect_language"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        user_message = tracker.latest_message.get('text', '')
        detected_languages = set()  # Using set to avoid duplicates
        
        # First try FastText detection
        if language_model:
            try:
                # Try to detect language for the whole message first
                prediction = language_model.predict(user_message)
                detected_lang = prediction[0][0].replace("__label__", "")
                confidence = float(prediction[1][0])
                
                if detected_lang in ['ar', 'en'] and confidence > 0.7:
                    # If FastText is confident about a single language, use it
                    detected_languages.add(detected_lang)
                    logger.info(f"[ActionDetectLanguage] FastText detected language: {detected_lang} with confidence {confidence:.2f}")
                else:
                    # If not confident, try segment-based detection
                    segments = detect_mixed_language_segments(user_message)
                    if segments:
                        # Add all detected languages
                        for lang, _ in segments:
                            detected_languages.add(lang)
                    logger.info(f"[ActionDetectLanguage] Using segment detection: {detected_languages}")
            except Exception as e:
                logger.warning(f"[ActionDetectLanguage] FastText prediction failed: {e}")
                # Fall back to segment detection
                segments = detect_mixed_language_segments(user_message)
                if segments:
                    for lang, _ in segments:
                        detected_languages.add(lang)
        else:
            # If FastText model is not available, use segment detection
            segments = detect_mixed_language_segments(user_message)
            if segments:
                for lang, _ in segments:
                    detected_languages.add(lang)

        # If no languages detected, try API fallback
        if not detected_languages:
            logger.info("[ActionDetectLanguage] No languages detected, trying API fallback")
            try:
                if not Config.KEY:
                    logger.error("[ActionDetectLanguage] API Key (KEY) is not set for API fallback")
                    # Default to English
                    detected_languages.add('en')
                else:
                    client = openai.OpenAI(
                        api_key=Config.KEY,
                        base_url=Config.MODEL_BASE_URL,
                        timeout=Config.REQUEST_TIMEOUT
                    )

                    # Use API to detect language
                    api_messages = [
                        {"role": "system", "content": "Detect the language of the following text and respond with only 'ar' or 'en'. If the text contains both languages, respond with 'mixed'."},
                        {"role": "user", "content": user_message}
                    ]

                    api_response = await asyncio.to_thread(
                        client.chat.completions.create,
                        model=Config.MODEL_NAME,
                        messages=api_messages,
                        temperature=0.1,
                        max_tokens=5
                    )

                    if api_response and api_response.choices and api_response.choices[0].message:
                        api_detected_lang = api_response.choices[0].message.content.strip().lower()
                        if api_detected_lang in ['ar', 'en']:
                            detected_languages.add(api_detected_lang)
                        elif api_detected_lang == 'mixed':
                            # For mixed language, check for both Arabic and English characters
                            has_arabic = any(is_arabic_char(c) for c in user_message)
                            has_english = any(c.isascii() and c.isalpha() for c in user_message)
                            if has_arabic:
                                detected_languages.add('ar')
                            if has_english:
                                detected_languages.add('en')
                        logger.info(f"[ActionDetectLanguage] API detected languages: {detected_languages}")

            except Exception as e:
                logger.error(f"[ActionDetectLanguage] API fallback failed: {e}", exc_info=True)
                # Default to English
                detected_languages.add('en')

        # If still no languages detected, default to English
        if not detected_languages:
            detected_languages.add('en')

        # Convert set to list for storage
        detected_languages_list = list(detected_languages)
        logger.info(f"[ActionDetectLanguage] Final detected languages: {detected_languages_list}")
        return [SlotSet("detected_languages", detected_languages_list)]

async def detect_language_with_api(client, text):
    """Helper function to detect language using API"""
    try:
        api_messages = [
            {"role": "system", "content": "Detect the language of the following text and respond with only 'ar' or 'en'."},
            {"role": "user", "content": text}
        ]

        api_response = await asyncio.to_thread(
            client.chat.completions.create,
            model=Config.MODEL_NAME,
            messages=api_messages,
            temperature=0.1,
            max_tokens=5
        )

        if api_response and api_response.choices and api_response.choices[0].message:
            lang = api_response.choices[0].message.content.strip().lower()
            return lang if lang in ['ar', 'en'] else None
    except Exception as e:
        logger.error(f"Error in detect_language_with_api: {e}")
    return None

class ActionMentalHealthResponse(Action):
    def name(self) -> Text:
        return "action_mental_health_response"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        # Get the detected languages from the tracker
        detected_languages = tracker.get_slot("detected_languages")
        if not detected_languages:
            logger.error("[ActionMentalHealthResponse] No languages detected")
            dispatcher.utter_message(text="I'm sorry, I couldn't understand your message. Could you please try again?")
            return []

        # Get the user's message
        user_message = tracker.latest_message.get('text', '')
        if not user_message:
            logger.error("[ActionMentalHealthResponse] No user message found")
            dispatcher.utter_message(text="I'm sorry, I couldn't understand your message. Could you please try again?")
            return []

        try:
            # Initialize OpenAI client
            client = openai.OpenAI(
                api_key=Config.KEY,
                base_url=Config.MODEL_BASE_URL,
                timeout=Config.REQUEST_TIMEOUT
            )

            responses = []
            for lang in detected_languages:
                # Prepare the system message based on language
                if lang == 'ar':
                    system_message = """أنت مساعد نفسي متعاطف ومهني. مهمتك هي:
                    1. الاستماع بعناية وتفهم مشاعر المستخدم
                    2. تقديم دعم نفسي مناسب ومهني
                    3. تجنب إعطاء نصائح طبية أو تشخيصات
                    4. التركيز على التعاطف والتفهم
                    5. تشجيع المستخدم على طلب المساعدة المهنية إذا لزم الأمر
                    6. استخدام لغة عربية واضحة ومهنية
                    7. تجنب استخدام المصطلحات الطبية المعقدة
                    8. التركيز على تقديم الدعم العاطفي والنفسي
                    9. تجنب إعطاء وعود أو ضمانات
                    10. الحفاظ على السرية والخصوصية"""
                else:  # English
                    system_message = """You are an empathetic and professional mental health assistant. Your role is to:
                    1. Listen carefully and understand the user's feelings
                    2. Provide appropriate and professional mental health support
                    3. Avoid giving medical advice or diagnoses
                    4. Focus on empathy and understanding
                    5. Encourage seeking professional help when necessary
                    6. Use clear and professional language
                    7. Avoid using complex medical terminology
                    8. Focus on providing emotional and psychological support
                    9. Avoid making promises or guarantees
                    10. Maintain confidentiality and privacy"""

                # Prepare the messages for the API call
                messages = [
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_message}
                ]

                # Make the API call
                response = await asyncio.to_thread(
                    client.chat.completions.create,
                    model=Config.MODEL_NAME,
                    messages=messages,
                    temperature=Config.TEMPERATURE,
                    max_tokens=Config.MAX_TOKENS
                )

                if response and response.choices and response.choices[0].message:
                    bot_response = response.choices[0].message.content.strip()
                    responses.append(bot_response)
                else:
                    error_message = get_friendly_error_message("api_error", lang)
                    responses.append(error_message)

            # Send all responses
            for response in responses:
                dispatcher.utter_message(text=response)

        except Exception as e:
            logger.error(f"[ActionMentalHealthResponse] Error: {str(e)}", exc_info=True)
            # Send error message in all detected languages
            for lang in detected_languages:
                error_message = get_friendly_error_message("general_error", lang)
                dispatcher.utter_message(text=error_message)

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