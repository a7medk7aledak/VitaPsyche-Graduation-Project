from transformers import MarianMTModel, MarianTokenizer

# تحميل الموديل والمُرمِّز للترجمة من العربية إلى الإنجليزية
ar_to_en_translator = MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-ar-en")
ar_to_en_tokenizer = MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-ar-en")

# تحميل الموديل والمُرمِّز للترجمة من الإنجليزية إلى العربية
en_to_ar_translator = MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-en-ar")
en_to_ar_tokenizer = MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-ar")

# دالة لترجمة النص من العربية إلى الإنجليزية
def translate_ar_to_en(text):
    inputs = ar_to_en_tokenizer(text, return_tensors="pt", padding=True)
    translated_tokens = ar_to_en_translator.generate(**inputs)
    translated_text = ar_to_en_tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]
    return translated_text

# دالة لترجمة النص من الإنجليزية إلى العربية
def translate_en_to_ar(text):
    inputs = en_to_ar_tokenizer(text, return_tensors="pt", padding=True)
    translated_tokens = en_to_ar_translator.generate(**inputs)
    translated_text = en_to_ar_tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]
    return translated_text

# تجربة الترجمة من العربية إلى الإنجليزية
arabic_text = "مرحبًا، كيف حالك؟"
english_translation = translate_ar_to_en(arabic_text)
print(f"الترجمة من العربية إلى الإنجليزية: {english_translation}")

# تجربة الترجمة من الإنجليزية إلى العربية
english_text = "Hello, how are you?"
arabic_translation = translate_en_to_ar(english_text)
print(f"الترجمة من الإنجليزية إلى العربية: {arabic_translation}")
