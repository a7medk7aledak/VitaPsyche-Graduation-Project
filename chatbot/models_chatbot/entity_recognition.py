from transformers import pipeline

# تحميل نموذج Bio_ClinicalBERT باستخدام الـ pipeline
pipe = pipeline("fill-mask", model="emilyalsentzer/Bio_ClinicalBERT")

# مجموعة من النصوص الطبية لاستخراج الأعراض أو الكلمات المهمة
test_texts = [
    "The patient was diagnosed with severe depression and anxiety.",
    "Symptoms of schizophrenia include hallucinations and delusions.",
    "Common signs of bipolar disorder include extreme mood swings and erratic behavior.",
    "The patient complained of severe headaches and chronic fatigue.",
    "The doctor noted symptoms of obsessive-compulsive disorder such as repetitive behaviors.",
]

# مجموعة من الأعراض التي نريد التركيز عليها لاستخراجها
symptoms_keywords = ["depression", "anxiety", "schizophrenia", "hallucinations", "delusions", 
                     "mood swings", "fatigue", "headache", "repetitive behaviors", "obsessive-compulsive disorder"]

# دالة لاستخراج الكلمات المهمة بناءً على الأعراض
def extract_keywords(text, keywords):
    extracted_keywords = []
    for keyword in keywords:
        if keyword in text:
            extracted_keywords.append(keyword)
    return extracted_keywords

# اختبار النموذج على النصوص المختلفة
for i, text in enumerate(test_texts):
    print(f"Text {i + 1}: {text}")
    
    # استخراج الكلمات المتعلقة بالأعراض
    extracted_symptoms = extract_keywords(text, symptoms_keywords)
    
    # عرض النتائج
    if extracted_symptoms:
        print(f"Extracted symptoms/keywords: {', '.join(extracted_symptoms)}")
    else:
        print("No symptoms or relevant keywords found.")
    
    print("-" * 50)  # فاصل بين النتائج


