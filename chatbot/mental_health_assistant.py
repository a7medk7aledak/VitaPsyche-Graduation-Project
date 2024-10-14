#all models her and logic
from models_chatbot.sentiment_analysis import SentimentAnalysis
from models_chatbot.sentiment_analysis_ar import SentimentAnalysisAR
from models_chatbot.entity_recognition import EntityRecognition
from models_chatbot.entity_recognition_ar import EntityRecognitionAR
from models_chatbot.classification_model import DiseaseClassifier
from models_chatbot.classification_model_ar import DiseaseClassifierAR
from models_chatbot.response_generator import ResponseGenerator
from models_chatbot.response_generator_ar import ResponseGeneratorAR
from models_chatbot.translation_model import Translator

class MentalHealthAssistant:
    def __init__(self):
        # تحميل النماذج
        self.sentiment_en = SentimentAnalysis()
        self.sentiment_ar = SentimentAnalysisAR()
        self.entity_en = EntityRecognition()
        self.entity_ar = EntityRecognitionAR()
        self.classifier_en = DiseaseClassifier()
        self.classifier_ar = DiseaseClassifierAR()
        self.response_gen_en = ResponseGenerator()
        self.response_gen_ar = ResponseGeneratorAR()
        self.translator = Translator()

    def detect_language(self, message):
        # دالة لاكتشاف لغة النص
        if any(char in message for char in "اأإء"):
            return 'ar'
        else:
            return 'en'

    def analyze_message(self, message):
        language = self.detect_language(message)

        # تحليل المشاعر
        if language == 'en':
            sentiment = self.sentiment_en.predict(message)
            entities = self.entity_en.extract(message)
            diagnosis = self.classifier_en.classify(entities)
            response = self.response_gen_en.generate(diagnosis, sentiment)
        else:
            sentiment = self.sentiment_ar.predict(message)
            entities = self.entity_ar.extract(message)
            diagnosis = self.classifier_ar.classify(entities)
            response = self.response_gen_ar.generate(diagnosis, sentiment)

        return response

    def translate_message(self, message, target_language):
        return self.translator.translate(message, target_language)

    def run(self, message):
        language = self.detect_language(message)

        # إذا كانت هناك حاجة للترجمة
        if language != 'en':
            message = self.translate_message(message, 'en')

        response = self.analyze_message(message)

        # إعادة الترجمة للغة الأصلية إن لزم الأمر
        if language != 'en':
            response = self.translate_message(response, 'ar')

        return response

# مثال على الاستخدام
if __name__ == "__main__":
    assistant = MentalHealthAssistant()
    user_message = input("اكتب رسالتك: ")
    bot_response = assistant.run(user_message)
    print("رد المساعد:", bot_response)
