# استيراد المكتبات اللازمة
from transformers import pipeline

# تحميل نموذج Bio_ClinicalBERT باستخدام الـ pipeline
pipe = pipeline("fill-mask", model="emilyalsentzer/Bio_ClinicalBERT")

# مجموعة من النصوص التي تحتوي على أقنعة [MASK] للاختبار
test_texts = [
    "The patient was diagnosed with [MASK] disorder and prescribed [MASK] medication.",
    "Common treatments for [MASK] include cognitive behavioral therapy and antidepressant [MASK].",
    "Symptoms of [MASK] disorder often include hallucinations and delusions.",
    "The doctor prescribed [MASK] to help manage the patient's anxiety.",
    "[MASK] is commonly used to treat patients with depression and bipolar disorder.",
    "The patient reported severe [MASK] after stopping the medication abruptly.",
]

# اختبار النموذج على النصوص المختلفة
for i, text in enumerate(test_texts):
    print(f"Results for text {i + 1}: {text}")
    results = pipe(text)
    
    # طباعة النتائج الكاملة لفهم بنيتها
    print("Full results:")
    print(results)
    print()
    
    # عرض النتائج المتوقعة لكل قناع في النص
    if isinstance(results, list):
        for j, result in enumerate(results):
            print(f"Results for mask {j + 1}:")
            if isinstance(result, dict):
                print(f"Predicted token: {result.get('token_str', 'N/A')}, with score: {result.get('score', 0):.4f}")
            elif isinstance(result, list):
                for sub_result in result:
                    if isinstance(sub_result, dict):
                        print(f"Predicted token: {sub_result.get('token_str', 'N/A')}, with score: {sub_result.get('score', 0):.4f}")
    else:
        print("Unexpected result format")
    
    print("-" * 50)  # فاصل بين النتائج