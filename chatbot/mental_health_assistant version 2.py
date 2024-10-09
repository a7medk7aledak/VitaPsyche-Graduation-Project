import logging
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, BertForSequenceClassification
import torch
from datasets import load_dataset
import json
import re
from collections import deque
from torch.utils.data import DataLoader, TensorDataset
from torch.optim import AdamW
from tqdm import tqdm
import random

class ImprovedArabicMentalHealthAssistant:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self._initialize_models()
        self.conversation_history = deque(maxlen=50)
        self.memory = {}
        self._load_knowledge_base()
        self._initialize_healthcare_integration()
        self._initialize_user_profiles()
        self._train_on_huggingface_dataset()

    def _initialize_models(self):
        # Initialize the models
        logging.info("Initializing models...")
        self.ar_tokenizer = AutoTokenizer.from_pretrained("aubmindlab/bert-base-arabertv02")
        self.ar_model = AutoModelForCausalLM.from_pretrained("aubmindlab/bert-base-arabertv02")
        self.emotion_detector = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", tokenizer="j-hartmann/emotion-english-distilroberta-base")
        
        self.sentiment_model = BertForSequenceClassification.from_pretrained("aubmindlab/bert-base-arabertv02", num_labels=6)  # Adjusted num_labels to 6
        self.sentiment_tokenizer = AutoTokenizer.from_pretrained("aubmindlab/bert-base-arabertv02")

    def _load_knowledge_base(self):
        # Load the knowledge base
        try:
            with open('knowledge_base.json', 'r', encoding='utf-8') as f:
                self.knowledge_base = json.load(f)
        except FileNotFoundError:
            logging.error("knowledge_base.json file not found. Initializing empty knowledge base.")
            self.knowledge_base = {}

    def _initialize_healthcare_integration(self):
        # Initialize healthcare providers
        try:
            with open('healthcare_providers.json', 'r', encoding='utf-8') as f:
                self.healthcare_providers = json.load(f)
        except FileNotFoundError:
            logging.error("healthcare_providers.json file not found. Initializing empty provider list.")
            self.healthcare_providers = []

    def _initialize_user_profiles(self):
        # Initialize user profiles
        try:
            with open('user_profiles.json', 'r', encoding='utf-8') as f:
                self.user_profiles = json.load(f)
        except FileNotFoundError:
            logging.info("No user profiles found. Initializing empty profiles.")
            self.user_profiles = {}

    def _train_on_huggingface_dataset(self):
        logging.info("Loading and preparing dataset from Hugging Face...")
        dataset = load_dataset("emotion", split="train")
        
        texts = dataset["text"]
        labels = dataset["label"]
        
        # Ensure labels are in the range 0-5
        unique_labels = set(labels)
        print(f"Unique labels in dataset: {unique_labels}")
        
        # Encode the data
        encoded_data = self.sentiment_tokenizer(texts, truncation=True, padding=True, max_length=128, return_tensors="pt")
        input_ids = encoded_data["input_ids"]
        attention_mask = encoded_data["attention_mask"]
        labels = torch.tensor(labels)
        
        dataset = TensorDataset(input_ids, attention_mask, labels)
        dataloader = DataLoader(dataset, batch_size=16, shuffle=True)
        
        optimizer = AdamW(self.sentiment_model.parameters(), lr=2e-5)
        
        # Train the sentiment model
        logging.info("Training sentiment model...")
        self.sentiment_model.train()
        for epoch in range(3):
            for batch in tqdm(dataloader):
                optimizer.zero_grad()
                input_ids, attention_mask, labels = batch
                outputs = self.sentiment_model(input_ids, attention_mask=attention_mask, labels=labels)
                loss = outputs.loss
                loss.backward()
                optimizer.step()

        logging.info("Sentiment model training completed.")

    def detect_sentiment(self, text):
        # Detect sentiment in the text
        inputs = self.sentiment_tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
        with torch.no_grad():
            outputs = self.sentiment_model(**inputs)
        
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()
        confidence = torch.nn.functional.softmax(logits, dim=1)[0][predicted_class].item()
        
        sentiment_labels = ["Negative", "Neutral", "Positive", "Very Positive", "Very Negative"]
        return sentiment_labels[predicted_class], confidence

    def detect_emotion(self, text):
        # Detect emotion in the text
        result = self.emotion_detector(text)[0]
        return result['label'], result['score']

    def generate_response(self, user_input, user_id):
        # Generate response based on user input
        if user_id in self.memory:
            previous_topics = ', '.join(set(self.memory[user_id]['topics'][-5:]))
            print(f"Welcome back! I remember we talked about: {previous_topics}.")
        else:
            self.memory[user_id] = {'topics': []}

        self.memory[user_id]['topics'].extend(re.findall(r'\b\w+\b', user_input.lower()))

        sentiment, sentiment_score = self.detect_sentiment(user_input)
        emotion, emotion_score = self.detect_emotion(user_input)

        print(f"Detected Sentiment: {sentiment} ({sentiment_score:.2f})")
        print(f"Detected Emotion: {emotion} ({emotion_score:.2f})")

        # Customize response based on detected emotion
        if emotion == "fear":
            response = "I sense that you might be feeling afraid right now. It's natural to feel this way. Would you like to talk about what's causing this feeling?"
        elif emotion == "sadness":
            response = "I'm sorry to hear that you're feeling sad. Sadness can be a difficult emotion. Is there something specific that's making you feel this way?"
        elif emotion == "anger":
            response = "I understand that you're feeling angry. Anger can be a powerful emotion. Would you like to share what's triggering your anger?"
        elif emotion == "joy":
            response = "I'm glad to hear that you're feeling happy! Has something good happened recently that you'd like to share?"
        else:
            response = f"Thank you for sharing your feelings. Would you like to talk more about what's making you feel {emotion}?"

        # Add practical suggestions
        if "work" in user_input.lower() and "stress" in user_input.lower():
            response += " Regarding work stress, have you tried taking short breaks during the day or practicing deep breathing exercises?"
        
        if "sleep" in user_input.lower() and "problem" in user_input.lower():
            response += " Concerning sleep issues, setting a regular sleep schedule and avoiding screens an hour before bedtime might help."

        # Detect critical cases
        critical_keywords = ["suicide", "harm", "hopeless"]
        if any(keyword in user_input.lower() for keyword in critical_keywords):
            response += " I'm concerned about your safety. Please consider calling the helpline at XXXX or speaking with a mental health professional."

        self.conversation_history.append({
            "user_input": user_input,
            "response": response,
            "emotion": emotion,
            "sentiment": sentiment
        })

        self._update_user_profile(user_id, user_input, emotion, sentiment)

        return response

    def _update_user_profile(self, user_id, text, emotion, sentiment):
        # Update user profile
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {"interests": [], "emotion_history": [], "sentiment_history": []}

        interests = re.findall(r'\b\w+\b', text.lower())
        self.user_profiles[user_id]["interests"].extend(interests)
        self.user_profiles[user_id]["emotion_history"].append(emotion)
        self.user_profiles[user_id]["sentiment_history"].append(sentiment)

        with open('user_profiles.json', 'w', encoding='utf-8') as f:
            json.dump(self.user_profiles, f, ensure_ascii=False, indent=2)

    def recommend_healthcare_provider(self, user_id):
        # Recommend healthcare provider
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
        # Run the conversation session
        print("Welcome! How can I assist you today?")

        while True:
            user_input = input("You: ")
            if user_input.lower() == "exit":
                print("Goodbye! Take care.")
                break

            response = self.generate_response(user_input, user_id)
            print("Assistant:", response)

if __name__ == "__main__":
    assistant = ImprovedArabicMentalHealthAssistant()
    assistant.run_session("user_001")
