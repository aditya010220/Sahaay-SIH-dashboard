function generateReply(prediction) {
  const { label, score } = prediction;

  if (label === "depression") {
    return "I'm really sorry you're feeling this way. You're not alone, and it's okay to ask for help. 💙\n\nWould you like to talk more about what you're experiencing? I'm here to listen, and I can also help you connect with a counselor if you'd like.";
  }

  if (label === "anxiety") {
    return "It sounds like you're feeling anxious. Try taking a slow breath with me. You're safe right now 🌱\n\nLet's try: Breathe in for 4 counts, hold for 4, breathe out for 6. Repeat 3 times.\n\nWhat's been making you feel anxious?";
  }

  if (label === "stress") {
    return "Stress can feel overwhelming. Would you like to talk about what's causing it?\n\nRemember, it's okay to take breaks and ask for help. Breaking things down into smaller steps can make them more manageable.";
  }

  if (label === "suicidal") {
    return "⚠️ I'm really glad you reached out. Your life matters, and help is available right now.\n\n🆘 IMMEDIATE HELP:\n• National Crisis Hotline: 14416\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n\nPlease reach out to a trusted person or mental health professional immediately. You don't have to go through this alone. I've also alerted a counselor who can provide additional support.\n\nWould you like me to help you schedule an emergency counseling session?";
  }

  return "Thank you for sharing. I'm here to listen without judgment. Tell me more about how you're feeling.";
}

module.exports = generateReply;
