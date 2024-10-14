from transformers import AutoTokenizer, AutoModelForTokenClassification, TrainingArguments, Trainer, DataCollatorForTokenClassification
from datasets import Dataset
import torch

# تحميل النموذج المدرب مسبقًا والمحلل اللغوي
model_name = "CAMeL-Lab/bert-base-arabic-camelbert-msa-ner"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)

# تحديد الحد الأقصى لطول التسلسل
max_length = 128

# إعداد بيانات التدريب (استبدل هذا ببياناتك الخاصة)

train_data = [
    {"text": "المريض يعاني من اكتئاب شديد", "labels": ["O", "O", "O", "B-DISORDER", "I-DISORDER"]},
    {"text": "تم وصف سيرترالين لعلاج الاكتئاب", "labels": ["O", "O", "B-MEDICATION", "O", "O", "B-DISORDER"]},
    {"text": "المريضة تعاني من اضطراب القلق العام", "labels": ["O", "O", "O", "B-DISORDER", "I-DISORDER", "I-DISORDER"]},
    {"text": "يشكو المريض من نوبات هلع متكررة", "labels": ["O", "O", "O", "B-SYMPTOM", "I-SYMPTOM", "O"]},
    {"text": "تم تشخيص الحالة على أنها اضطراب ثنائي القطب", "labels": ["O", "O", "O", "O", "O", "B-DISORDER", "I-DISORDER", "I-DISORDER"]},
    {"text": "يعاني من أرق شديد وفقدان الشهية", "labels": ["O", "O", "B-SYMPTOM", "I-SYMPTOM", "O", "B-SYMPTOM", "I-SYMPTOM"]},
    {"text": "وصف الطبيب الفلوكستين لعلاج الوسواس القهري", "labels": ["O", "O", "B-MEDICATION", "O", "O", "B-DISORDER", "I-DISORDER"]},
    {"text": "تظهر عليه أعراض الفصام مثل الهلاوس والأوهام", "labels": ["O", "O", "O", "B-DISORDER", "O", "B-SYMPTOM", "O", "B-SYMPTOM"]},
    {"text": "تعاني من نوبات اكتئاب حادة تتخللها فترات هوس خفيف", "labels": ["O", "O", "B-SYMPTOM", "I-SYMPTOM", "I-SYMPTOM", "O", "O", "B-SYMPTOM", "I-SYMPTOM"]},
    {"text": "يتناول الريسبيريدون لعلاج أعراض الذهان", "labels": ["O", "B-MEDICATION", "O", "O", "B-SYMPTOM", "I-SYMPTOM"]},
    {"text": "تم تشخيصها باضطراب الشخصية الحدية", "labels": ["O", "O", "O", "B-DISORDER", "I-DISORDER", "I-DISORDER"]},
    {"text": "يعاني من نوبات غضب شديدة وصعوبة في التحكم بالانفعالات", "labels": ["O", "O", "B-SYMPTOM", "I-SYMPTOM", "I-SYMPTOM", "O", "B-SYMPTOM", "I-SYMPTOM", "I-SYMPTOM", "I-SYMPTOM"]},
    {"text": "وصف له الطبيب البروزاك لعلاج الاكتئاب المزمن", "labels": ["O", "O", "O", "B-MEDICATION", "O", "O", "B-DISORDER", "I-DISORDER"]},
    {"text": "تعاني من اضطراب ما بعد الصدمة نتيجة حادث مروري", "labels": ["O", "O", "B-DISORDER", "I-DISORDER", "I-DISORDER", "I-DISORDER", "O", "O", "O"]},
    {"text": "يشكو من صعوبة التركيز وفرط الحركة", "labels": ["O", "O", "B-SYMPTOM", "I-SYMPTOM", "O", "B-SYMPTOM", "I-SYMPTOM"]},
    {"text": "تم وصف الاموكسابين لعلاج الاكتئاب والقلق", "labels": ["O", "O", "B-MEDICATION", "O", "O", "B-DISORDER", "O", "B-DISORDER"]},
    {"text": "يعاني من اضطراب الوسواس القهري مع أفكار متكررة عن النظافة", "labels": ["O", "O", "B-DISORDER", "I-DISORDER", "I-DISORDER", "O", "B-SYMPTOM", "I-SYMPTOM", "O", "O"]},
    {"text": "تظهر عليها أعراض فقدان الشهية العصبي", "labels": ["O", "O", "O", "B-DISORDER", "I-DISORDER", "I-DISORDER"]},
    {"text": "يتلقى العلاج المعرفي السلوكي لمعالجة الرهاب الاجتماعي", "labels": ["O", "B-TREATMENT", "I-TREATMENT", "I-TREATMENT", "O", "O", "B-DISORDER", "I-DISORDER"]},
    {"text": "تم تشخيصه باضطراب نقص الانتباه وفرط الحركة", "labels": ["O", "O", "O", "B-DISORDER", "I-DISORDER", "I-DISORDER", "I-DISORDER", "I-DISORDER"]}
]

# إنشاء قاموس لتحويل التسميات إلى أرقام
unique_labels = set([l for item in train_data for l in item["labels"]])
label_to_id = {label: i for i, label in enumerate(unique_labels)}
id_to_label = {i: label for label, i in label_to_id.items()}

# تحديث النموذج بعدد التسميات الجديد
model.config.num_labels = len(label_to_id)
model.config.label2id = label_to_id
model.config.id2label = id_to_label

def tokenize_and_align_labels(examples):
    tokenized_inputs = tokenizer(examples["text"], truncation=True, padding="max_length", max_length=max_length)
    labels = []
    for i, label in enumerate(examples["labels"]):
        word_ids = tokenized_inputs.word_ids(batch_index=i)
        previous_word_idx = None
        label_ids = []
        for word_idx in word_ids:
            if word_idx is None:
                label_ids.append(-100)
            elif word_idx != previous_word_idx:
                label_ids.append(label_to_id[label[word_idx]] if word_idx < len(label) else -100)
            else:
                label_ids.append(-100)
            previous_word_idx = word_idx
        labels.append(label_ids)
    tokenized_inputs["labels"] = labels
    return tokenized_inputs

# إنشاء مجموعة البيانات
dataset = Dataset.from_dict({"text": [item["text"] for item in train_data], "labels": [item["labels"] for item in train_data]})
tokenized_dataset = dataset.map(tokenize_and_align_labels, batched=True)

# تحديد معلمات التدريب
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=8,
    logging_dir="./logs",
    logging_steps=10,
)

# إنشاء معالج البيانات
data_collator = DataCollatorForTokenClassification(tokenizer)

# إنشاء المدرب
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator,
)

# بدء التدريب
trainer.train()

# حفظ النموذج المدرب
model.save_pretrained("./fine_tuned_model")
tokenizer.save_pretrained("./fine_tuned_model")

print("تم الانتهاء من تدريب النموذج وحفظه.")

# اختبار النموذج المدرب
test_text = "المريض يشكو من نوبات هلع متكررة"
inputs = tokenizer(test_text, return_tensors="pt", truncation=True, padding="max_length", max_length=max_length)
outputs = model(**inputs)
predictions = torch.argmax(outputs.logits, dim=2)

# عرض النتائج
tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
print("نتائج التصنيف:")
for token, prediction in zip(tokens, predictions[0]):
    if token != tokenizer.pad_token:
        label = id_to_label.get(prediction.item(), "غير معروف")
        print(f"الكلمة: {token}, التصنيف: {label}")

# طباعة معلومات إضافية للتحقق
print("\nمعلومات إضافية:")
print(f"عدد التسميات: {model.config.num_labels}")
print(f"التسميات المتاحة: {', '.join(label_to_id.keys())}")
print(f"أقصى قيمة تنبؤ: {predictions.max().item()}")