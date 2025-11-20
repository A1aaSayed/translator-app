from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from translator_service import translate_text
from deep_translator import GoogleTranslator
from gtts import gTTS
import io

app = Flask(__name__)
CORS(app)

# ========= HEALTH ==========
@app.route("/health")
def health():
    return {"status": "ok"}

# ========= LANGUAGES ==========
@app.route("/languages", methods=["GET"])
def languages():
    langs = GoogleTranslator().get_supported_languages(as_dict=True)
    return jsonify(langs)

# ========= TRANSLATION ==========
@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text", "")
    target = data.get("target_language")

    if not text or not target:
        return jsonify({"error": "Missing text or target_language"}), 400

    try:
        translated = translate_text(text, target)
        return jsonify({"translated_text": translated})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# ========= SPEAK ==========
@app.route('/speak', methods=['POST'])
def speak():
    data = request.json
    text = data.get('text', '')
    lang = data.get('lang', 'en')

    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    try:
        mp3_f = io.BytesIO()
        tts = gTTS(text=text, lang=lang)
        tts.write_to_fp(mp3_f)
        mp3_f.seek(0)

        return send_file(
            mp3_f,
            as_attachment=False,
            mimetype="audio/mpeg"
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)