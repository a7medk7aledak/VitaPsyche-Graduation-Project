# استيراد المكتبات المطلوبة
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM

# تحميل النموذج والمحلل اللغوي (Tokenizer)
model_name = "thrishala/mental_health_chatbot"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# إنشاء أداة لتوليد النصوص باستخدام Pipeline
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)

# النص الذي تريد تجربته
prompt = "I am feeling very stressed and anxious, what should I do?"

# توليد النص
output = pipe(prompt, max_length=50, num_return_sequences=1)

# طباعة الناتج
print(output[0]["generated_text"])