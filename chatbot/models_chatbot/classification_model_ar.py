import torch
import torch.nn.functional as F
import pandas as pd
from transformers import (
    AutoTokenizer, 
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments
)
from sklearn.model_selection import train_test_split
from datasets import Dataset

def init_arabic_model(num_labels=2):
    model_name = "aubmindlab/bert-large-arabertv02"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=num_labels)
    return model, tokenizer

# def train_arabic_model(model, tokenizer, train_file='arabic_tweets_depression.csv'):
#     # Load the dataset
#     df = pd.read_csv(train_file)

#     # Prepare the data
#     texts = df['tweet'].tolist()
#     labels = df['label'].map({'depressed': 1, 'non-depressed': 0}).tolist()

#     # Split the data into train and test sets
#     train_texts, test_texts, train_labels, test_labels = train_test_split(texts, labels, test_size=0.2, random_state=42)

#     # Tokenize the texts
#     train_encodings = tokenizer(train_texts, truncation=True, padding=True)
#     test_encodings = tokenizer(test_texts, truncation=True, padding=True)

#     # Create datasets
#     train_dataset = Dataset.from_dict(train_encodings).add_column('labels', train_labels)
#     test_dataset = Dataset.from_dict(test_encodings).add_column('labels', test_labels)

#     # Define training arguments
#     training_args = TrainingArguments(
#         output_dir="./results",
#         num_train_epochs=3,
#         per_device_train_batch_size=8,
#         per_device_eval_batch_size=8,
#         warmup_steps=500,
#         weight_decay=0.01,
#         logging_dir="./logs",
#     )

#     # Create trainer
#     trainer = Trainer(
#         model=model,
#         args=training_args,
#         train_dataset=train_dataset,
#         eval_dataset=test_dataset
#     )

#     # Train the model
#     trainer.train()

    # return model

def classify_arabic(text, model, tokenizer):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    probabilities = F.softmax(outputs.logits, dim=-1)
    prediction = torch.argmax(probabilities, dim=-1).item()
    return "اكتئاب" if prediction == 1 else "طبيعي"

if __name__ == "__main__":
    # Initialize the model and tokenizer
    arabic_model, arabic_tokenizer = init_arabic_model()

    # Ask if the user wants to train the model
    train_option = input("هل ترغب في تدريب النموذج؟ (نعم/لا): ")
    if train_option.lower() == 'نعم':
        print("جاري تدريب النموذج... قد يستغرق هذا بعض الوقت.")
        arabic_model = train_arabic_model(arabic_model, arabic_tokenizer)
        print("تم الانتهاء من تدريب النموذج.")

    # Test the model
    test_texts = [
        "أشعر بالحزن الشديد ولا أستطيع النوم.",
        "الحياة جميلة وأنا سعيد جداً.",
        "لا أجد معنى للحياة ولا أريد الاستمرار.",
        "أستمتع بوقتي مع العائلة والأصدقاء.",
        "أشعر بالوحدة والاكتئاب طوال الوقت."
    ]
    
    for text in test_texts:
        result = classify_arabic(text, arabic_model, arabic_tokenizer)
        print(f"النص: {text}\nالتصنيف: {result}\n")
    
    # Interactive testing
    while True:
        user_text = input("أدخل نصًا للتصنيف (أو اكتب 'خروج' للإنهاء): ")
        if user_text == 'خروج':
            break
        user_result = classify_arabic(user_text, arabic_model, arabic_tokenizer)
        print(f"التصنيف: {user_result}\n")