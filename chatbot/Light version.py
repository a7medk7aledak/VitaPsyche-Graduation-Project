import logging
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline, BertForSequenceClassification, AdamW
import torch
from datasets import load_dataset
import json
import re
from collections import deque
from torch.utils.data import DataLoader, TensorDataset
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
        # Initialize models
        logging.info("Initializing models...")
        self.ar_tokenizer = AutoTokenizer.from_pretrained("aubmindlab/aragpt2-base")
        self.ar_model = AutoModelForCausalLM.from_pretrained("aubmindlab/aragpt2-base")
        
        self.emotion_detector = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", tokenizer="j-hartmann/emotion-english-distilroberta-base")

        # Using TinyBERT model for sentiment analysis to reduce complexity
        self.sentiment_model = BertForSequenceClassification.from_pretrained("huawei-noah/TinyBERT_General_4L_312D", num_labels=3)
        self.sentiment_tokenizer = AutoTokenizer.from_pretrained("huawei-noah/TinyBERT_General_4L_312D")

    def _load_knowledge_base(self):
        try:
            with open('knowledge_base.json', 'r', encoding='utf-8') as f:
                self.knowledge_base = json.load(f)
        except FileNotFoundError:
            logging.error("Knowledge base not found. Initializing empty.")
            self.knowledge_base = {}

    def _initialize_healthcare_integration(self):
        try:
            with open('healthcare_providers.json', 'r', encoding='utf-8') as f:
                self.healthcare_providers = json.load(f)
        except FileNotFoundError:
            logging.error("Healthcare providers not found.")
            self.healthcare_providers = []

    def _initialize_user_profiles(self):
        try:
            with open('user_profiles.json', 'r', encoding='utf-8') as f:
                self.user_profiles = json.load(f)
        except FileNotFoundError:
            logging.info("User profiles not found. Initializing empty.")
            self.user_profiles = {}

    def _train_on_huggingface_dataset(self):
        logging.info("Loading and preparing dataset from Hugging Face...")
        dataset = load_dataset("emotion", split="train")

        texts = dataset["text"]
        labels = dataset["label"]
        
        # Encode the data
        encoded_data = self.sentiment_tokenizer(texts, truncation=True, padding=True, max_length=128, return_tensors="pt")
        input_ids = encoded_data["input_ids"]
        attention_mask = encoded_data["attention_mask"]
        labels = torch.tensor(labels)
        
        dataset = TensorDataset(input_ids, attention_mask, labels)
        dataloader = DataLoader(dataset, batch_size=16, shuffle=True)

        optimizer = AdamW(self.sentiment_model.parameters(), lr=2e-5)
        
        # Train sentiment model
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
        inputs = self.sentiment_tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
        with torch.no_grad():
            outputs = self.sentiment_model(**inputs)
        
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()
        confidence = torch.nn.functional.softmax(logits, dim=1)[0][predicted_class].item()

        sentiment_labels = ["Negative", "Neutral", "Positive"]
        return sentiment_labels[predicted_class], confidence

    def detect_emotion(self, text):
        result = self.emotion_detector(text)[0]
        return result['label'], result['score']

    def generate_response(self, user_input, user_id):
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

        response = f"Thank you for sharing. You seem to feel {emotion} with {sentiment} sentiment. Would you like to discuss further?"

        critical_keywords = ["suicide", "harm", "hopeless"]
        if any(keyword in user_input.lower() for keyword in critical_keywords):
            response += " I'm concerned about your safety. Please consider contacting a mental health professional."

        self.conversation_history.append({
            "user_input": user_input,
            "response": response,
            "emotion": emotion,
            "sentiment": sentiment
        })

        self._update_user_profile(user_id, user_input, emotion, sentiment)
        return response

    def _update_user_profile(self, user_id, text, emotion, sentiment):
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {"interests": [], "emotion_history": [], "sentiment_history": []}

        interests = re.findall(r'\b\w+\b', text.lower())
        self.user_profiles[user_id]["interests"].extend(interests)
        self.user_profiles[user_id]["emotion_history"].append(emotion)
        self.user_profiles[user_id]["sentiment_history"].append(sentiment)

        with open('user_profiles.json', 'w', encoding='utf-8') as f:
            json.dump(self.user_profiles, f, ensure_ascii=False, indent=2)

    def run_session(self, user_id):
        print("Welcome! How can I assist you today?")
        while True:
            user_input = input("You: ")
            if user_input.lower() == "exit":
                print("Goodbye!")
                break
            response = self.generate_response(user_input, user_id)
            print("Assistant:", response)

if __name__ == "__main__":
    assistant = ImprovedArabicMentalHealthAssistant()
    assistant.run_session("user_001")