/* ===========================
   Load Languages Dynamically
=========================== */
async function loadLanguages() {
    const res = await fetch("http://127.0.0.1:5000/languages");
    const data = await res.json();

    const sourceSelect = document.getElementById("sourceSelect");
    const targetSelect = document.getElementById("targetSelect");

    Object.entries(data).forEach(([name, code]) => {
        // from select
        const opt1 = document.createElement("option");
        opt1.value = code;
        opt1.textContent = name;
        sourceSelect.appendChild(opt1);

        // to select
        const opt2 = document.createElement("option");
        opt2.value = code;
        opt2.textContent = name;
        targetSelect.appendChild(opt2);
    });
}

loadLanguages();

/* ===========================
   Elements
=========================== */
const sourceText = document.getElementById("sourceText");
const targetText = document.getElementById("targetText");
const translateBtn = document.getElementById("translate");
const sourceSelect = document.getElementById("sourceSelect");
const targetSelect = document.getElementById("targetSelect");

/* ===========================
   Translate Button
=========================== */
translateBtn.addEventListener("click", async () => {
    const text = sourceText.value.trim();
    const targetLang = targetSelect.value;

    if (!text) {
        targetText.value = "Please enter text...";
        return;
    }

    try {
    const response = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            text: text,
            target_language: targetLang
        })
    });
    const data = await response.json();

        if (data.translated_text) {
            targetText.value = data.translated_text;
        } else {
            targetText.value = "Error: " + data.error;
        }
    } catch (err) {
        targetText.value = "Network Error!";
        console.error(err);
    }
});

/* ===========================
   Auto-clear target on text delete
=========================== */
sourceText.addEventListener("input", () => {
    if (sourceText.value.trim() === "") {
        targetText.value = "";
    }
});

/* ===========================
   Copy Buttons
=========================== */
document.getElementById('copySource').addEventListener("click", () => {
    const text = sourceText.value;
    if (!text) return;

    navigator.clipboard.writeText(text);
});

document.getElementById('copyTarget').addEventListener("click", () => {
    const text = targetText.value;
    if (!text) return;

    navigator.clipboard.writeText(text);
});

/* ===========================
   Text-to-Speech via Flask
=========================== */
async function speakText(text, lang) {
    if (!text.trim()) return;

    const res = await fetch('http://127.0.0.1:5000/speak', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang })
    });

    if (!res.ok) {
        console.error("TTS failed");
        return;
    }
    const audioBlob = await res.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    audio.play();
}

/* Speak buttons */
document.getElementById('speakSource').addEventListener('click', () => {
    const text = sourceText.value;
    const lang = document.getElementById('sourceSelect').value.split("-")[0];
    speakText(text, lang);
});

document.getElementById("speakTarget").addEventListener("click", () => {
    const text = targetText.value;
    const lang = document.getElementById("targetSelect").value.split("-")[0];
    speakText(text, lang);
});

/* ===========================
   Swap Button
=========================== */
document.getElementById('swap').addEventListener("click", () => {
    let tempText = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = tempText;

    let tempLang = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = tempLang;
})