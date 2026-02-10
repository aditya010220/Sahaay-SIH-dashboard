# Shaahay AI Backend

Mental health chatbot backend powered by Hugging Face's mental-health-bert model.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Verify `.env` file contains (do NOT commit your real token to source control):
```
HF_API_KEY=REDACTED
PORT=5000
```

3. Start the server:
```bash
npm run dev
```

## API Endpoint

**POST** `/api/chat`

Request:
```json
{
  "message": "I'm feeling really anxious today"
}
```

Response:
```json
{
  "userMessage": "I'm feeling really anxious today",
  "detectedState": "anxiety",
  "confidence": 0.92,
  "botReply": "It sounds like you're feeling anxious. Try taking a slow breath with me. You're safe right now 🌱"
}
```

## Safety Features

- Detects depression, anxiety, stress, suicidal ideation
- Provides empathetic, supportive responses
- Never claims to be a medical professional
- Shows crisis helpline info for suicidal content

## Model

Uses: `ourafla/mental-health-bert-finetuned` from Hugging Face
