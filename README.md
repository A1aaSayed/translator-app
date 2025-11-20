# 🌐 Translator App

This is a simple translation application with Text-to-Speech (TTS), built with:

- Flask backend
- Googletrans for translation
- gTTS for speech synthesis
- HTML/CSS/JS frontend

## Requirements

- Python 3.10+
### Install Python using MiniConda (recommended)

1. Download & install MiniConda from [here](https://docs.anaconda.com/free/miniconda/#quick-command-line-install)

2. Create a new environment:
``` bash
$ conda create -n translator python=3.10
```

3. Activate the environment:
```bash
$ conda activate translator
```

### (Optional) Better terminal styling:
```bash
$ export PS1="\[\033[01;32m\]\u@\h:\w\n\[\033[00m\]\$ "
```

## Installation

### Install required packages
```bash
$ cd backend
```

```bash
$ pip install -r requirements.txt
```

## Run the Flask Backend
```bash
$ python app.py
```

### Backend runs on:
```bash
http://127.0.0.1:5000
```

## Run the Frontend
- Just open index.html in your browser.
- Make sure the backend is running first.

## API Endpoints
- Get Available Languages

`GET /languages`

- Translate Text

`POST /translate`

Body JSON:
```bash
{
  "text": "Hello world",
  "target_language": "ar"
}
```
- Text-to-Speech (TTS)

`POST /speak`

Returns an audio file (MP3)

## Project Structure
``` bash
translator/
│── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── languages.py
│   └── translator_service.py
│
│── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│       └── ...
│
└── README.md
```

## Features

🔤 Multi-language translation

🔊 Text-to-speech playback

🔄 Swap languages

📋 Copy text buttons

🌐 Clean & simple UI

## Contribution

Feel free to fork, modify, and improve the project.