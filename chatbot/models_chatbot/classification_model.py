import torch
from transformers import (
    AutoTokenizer, 
    AutoModelForCausalLM, 
    pipeline, 
    LlamaConfig
)

def init_english_model():
    model_id = "kingabzpro/Llama-3.1-8B-Instruct-Mental-Health-Classification"
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    custom_config = LlamaConfig.from_pretrained(model_id)
    custom_config.rope_scaling = None
    model = AutoModelForCausalLM.from_pretrained(
        model_id,
        config=custom_config,
        low_cpu_mem_usage=True,
        torch_dtype=torch.float16,
        device_map="auto",
    )
    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        torch_dtype=torch.float16,
        device_map="auto",
    )
    return pipe

def classify_english(text, pipe):
    prompt = f"""Classify the text into Normal, Depression, Anxiety, Bipolar, and return the answer as the corresponding mental health disorder label.
    text: {text}
    label: """.strip()
    outputs = pipe(prompt, max_new_tokens=2, do_sample=True, temperature=0.1)
    return outputs[0]["generated_text"].split("label: ")[-1].strip()

if __name__ == "__main__":
    english_pipe = init_english_model()
    
    # Test the model
    test_texts = [
        "I'm trapped in a storm of emotions that I can't control, and it feels like no one understands the chaos inside me",
        "I feel great today! Everything seems to be going my way and I'm excited about the future",
        "I can't stop worrying about everything. My mind is constantly racing with 'what if' scenarios",
        "One moment I'm on top of the world, full of energy and ideas, and the next I'm crashing down into despair",
        "I've been feeling a bit stressed lately, but overall I'm managing well and looking forward to the weekend"
    ]
    
    for text in test_texts:
        result = classify_english(text, english_pipe)
        print(f"Text: {text}\nClassification: {result}\n")
    
    # Interactive testing
    while True:
        user_text = input("Enter a text to classify (or type 'exit' to quit): ")
        if user_text.lower() == 'exit':
            break
        user_result = classify_english(user_text, english_pipe)
        print(f"Classification: {user_result}\n")








# anther model very light but Its results are inaccurate!!!!

# # استيراد المكتبات اللازمة
# from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification

# # تحميل النموذج مباشرة باستخدام pipeline
# pipe = pipeline("text-classification", model="edmundhui/mental_health_trainer")

# # تحميل النموذج والمحول يدوياً
# tokenizer = AutoTokenizer.from_pretrained("edmundhui/mental_health_trainer")
# model = AutoModelForSequenceClassification.from_pretrained("edmundhui/mental_health_trainer")

# # نصوص تجريبية لتحليل الصحة النفسية
# texts = [
#     "I feel really sad and hopeless.",
#     "I'm feeling great and full of energy today!",
#     "I've been feeling anxious and worried about everything lately.",
#     "I am so excited about the future!"
# ]

# # استخدام النموذج عبر pipeline لتحليل النصوص
# for text in texts:
#     result = pipe(text)
#     print(f"Text: {text}")
#     print(f"Prediction: {result[0]['label']}, Confidence: {result[0]['score']:.4f}")
#     print("-" * 50)
