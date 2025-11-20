from deep_translator import GoogleTranslator

def translate_text(text: str, dest: str):
    if not text:
        return ""

    try:
        return GoogleTranslator(source='auto', target=dest).translate(text)
    except Exception as e:
        raise RuntimeError(f"Translation failed: {e}")
