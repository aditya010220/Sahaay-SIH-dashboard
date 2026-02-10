import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ChatMessage from './components/ChatMessage';
import QuickResponseChips from './components/QuickResponseChips';
import CrisisAlert from './components/CrisisAlert';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import WelcomeMessage from './components/WelcomeMessage';
import SafetyDisclaimer from './components/SafetyDisclaimer';

const AIChatbotSupport = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock AI responses with mental health focus
  const aiResponses = {
    anxiety: [
      `I understand you're feeling anxious. That's a completely normal response to stress. Let's try a quick breathing exercise together:\n\n1. Breathe in slowly for 4 counts\n2. Hold for 4 counts\n3. Breathe out for 6 counts\n4. Repeat 3-5 times\n\nHow are you feeling right now? Can you tell me more about what's causing your anxiety?`,
      `Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Here are some grounding techniques that might help:\n\n• Name 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste\n\nThis 5-4-3-2-1 technique can help bring you back to the present moment.`
    ],
    stress: [
      `Academic stress is very common among students. You're not alone in feeling this way. Let's break this down:\n\n• What specific aspects are causing the most stress?\n• Are there any upcoming deadlines or exams?\n• How has this been affecting your sleep and daily routine?\n\nRemember, it's okay to ask for help and take breaks when needed.`,
      `Stress can feel like a heavy weight, but there are ways to manage it effectively. Consider these strategies:\n\n• Break large tasks into smaller, manageable steps\n• Use the Pomodoro Technique (25 min work, 5 min break)\n• Practice saying "no" to additional commitments\n• Schedule regular self-care activities\n\nWhat feels most overwhelming right now?`
    ],
    sleep: [
      `Sleep problems can significantly impact your mental health and academic performance. Let's explore some sleep hygiene tips:\n\n• Keep a consistent sleep schedule\n• Avoid screens 1 hour before bed\n• Create a relaxing bedtime routine\n• Keep your room cool and dark\n• Limit caffeine after 2 PM\n\nHow long have you been experiencing sleep difficulties?`,
      `Poor sleep and mental health often go hand in hand. Here are some gentle techniques to try tonight:\n\n• Progressive muscle relaxation\n• Guided meditation (try apps like Headspace)\n• Journaling to clear your mind\n• Reading something light and positive\n\nWhat time do you usually try to go to sleep?`
    ],
    relationships: [
      `Relationship challenges can be emotionally draining. It's important to remember that healthy relationships require communication, boundaries, and mutual respect.\n\n• Have you been able to express your feelings clearly?\n• Are you taking care of your own needs too?\n• What support system do you have outside this relationship?\n\nWould you like to talk about what's been happening?`,
      `Navigating relationships while managing your mental health can be complex. Some things to consider:\n\n• It's okay to set boundaries\n• You can't control others, only your responses\n• Healthy relationships should feel supportive, not draining\n• Professional counseling can provide valuable perspective\n\nWhat aspect of your relationships feels most challenging right now?`
    ],
    overwhelmed: [
      `Feeling overwhelmed is your mind's way of saying you need to slow down and prioritize. Let's work through this together:\n\n• What are the top 3 things on your mind right now?\n• Which of these can you control vs. can't control?\n• What's one small step you could take today?\n\nRemember: You don't have to handle everything at once. One step at a time is perfectly okay.`,
      `When everything feels like too much, it's time to practice radical self-compassion. You're doing the best you can with what you have right now.\n\n• Take 3 deep breaths with me\n• Acknowledge that this feeling is temporary\n• Focus on just the next hour, not the whole day\n• Consider what you'd tell a good friend in your situation\n\nWhat would feel most helpful right now?`
    ],
    coping: [
      `I'm glad you're actively seeking coping strategies. That shows real strength and self-awareness. Here are some evidence-based techniques:\n\n• Mindfulness meditation (even 5 minutes helps)\n• Physical exercise or movement\n• Creative expression (art, music, writing)\n• Connection with supportive people\n• Professional counseling\n\nWhich of these resonates most with you, or have you tried any before?`,
      `Building a toolkit of coping strategies is one of the best investments in your mental health. Consider these approaches:\n\n• Problem-focused coping (addressing the source)\n• Emotion-focused coping (managing your response)\n• Meaning-focused coping (finding purpose/growth)\n• Social coping (reaching out for support)\n\nWhat situations do you find most challenging to cope with?`
    ],
    crisis: [
      `I'm very concerned about what you've shared. Your safety is the most important thing right now. Please know that you're not alone and help is available immediately.\n\nI'm going to connect you with crisis resources right now. Please don't hesitate to reach out to:\n\n• National Crisis Hotline: 14416\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n\nWould you like me to help you schedule an emergency counseling session?`
    ],
    default: [
      `Thank you for sharing that with me. I'm here to listen and support you. Mental health challenges are real and valid, and seeking help shows courage.\n\nCan you tell me more about how you've been feeling lately? I'm here to provide guidance and connect you with resources that might help.`,
      `I appreciate you opening up to me. Everyone's mental health journey is unique, and there's no "right" way to feel.\n\nWhat's been on your mind lately? Whether it's stress, anxiety, relationships, or just feeling overwhelmed, I'm here to help you work through it.`,
      `It sounds like you're going through something difficult. That takes strength to acknowledge and reach out for support.\n\nI'm here to listen without judgment and help you explore coping strategies. What feels most important to talk about right now?`
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const detectCrisisKeywords = (message) => {
    const crisisKeywordsEn = [
      'suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself',
      'self harm', 'cutting', 'overdose', 'die', 'death', 'hopeless',
      'no point', 'give up', 'can\'t go on', 'want to disappear'
    ];
    const crisisKeywordsHi = [
      'आत्महत्या', 'मरना', 'सब खत्म', 'जीने लायक नहीं', 'खुद को चोट', 'काट', 'ओवरडोज', 'मर', 'मृत्यु', 'उम्मीद नहीं', 'कोई मतलब नहीं', 'हार मान', 'नहीं चल सकता', 'गायब होना'
    ];
    const crisisKeywordsHinglish = [
      'aatmahatya', 'marna', 'sab khatam', 'jeene layak nahi', 'khud ko chot', 'katna', 'overdose', 'mrityu', 'ummeed nahi', 'haar maan', 'nahi chal sakta', 'gaayab hona', 'khatam kar', 'khud ko nukhsan'
    ];

    const lowerMessage = message?.toLowerCase() || '';
    return (
      crisisKeywordsEn.some(k => lowerMessage.includes(k)) ||
      crisisKeywordsHi.some(k => message.includes(k)) ||
      crisisKeywordsHinglish.some(k => lowerMessage.includes(k))
    );
  };

  const detectLanguage = (text) => {
    if (!text) return 'en';
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    const hinglishHints = ['hai', 'nahi', 'haan', 'kyu', 'kyon', 'kya', 'kaise', 'accha', 'acha', 'theek', 'thik', 'dukh', 'darr', 'gussa', 'tanav', 'udasi'];
    const t = text.toLowerCase();
    if (hinglishHints.some(h => t.includes(h))) return 'hi_latin';
    return 'en';
  };

  const translateText = async (text, target) => {
    try {
      const url = import.meta?.env?.VITE_TRANSLATE_WEBHOOK_URL || import.meta?.env?.VITE_TRANSLATE_API_URL;
      if (!url) return null;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target })
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data?.text || null;
    } catch {
      return null;
    }
  };

  const classifySeverity = (text) => {
    const t = text?.toLowerCase() || '';
    if (detectCrisisKeywords(t)) return 'crisis';
    const highIndicators = [
      'plan to', 'i have a plan', 'have a plan', 'means to', 'i took', 'i overdosed',
      'took pills', 'cut myself', 'bleeding', 'can\'t keep myself safe', 'immediate danger',
      'harm others', 'kill them', 'hallucinating', 'hearing voices', 'panic attack now'
    ];
    if (highIndicators.some(k => t.includes(k))) return 'high';
    const mediumIndicators = ['anxiety', 'panic', 'depressed', 'can\'t sleep', 'overwhelmed', 'hopeless'];
    if (mediumIndicators.some(k => t.includes(k))) return 'medium';
    return 'low';
  };

  const checkCounselorAvailability = async () => {
    try {
      const url = import.meta?.env?.VITE_COUNSELOR_STATUS_URL;
      if (!url) return null; // unknown
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) return null;
      const data = await res.json();
      return Boolean(data?.available);
    } catch {
      return null;
    }
  };

  const notifyCounselor = async ({ severity, text }) => {
    try {
      const zapUrl = import.meta?.env?.VITE_ZAPIER_WEBHOOK_URL;
      if (!zapUrl) return false;
      const payload = {
        type: 'AI_SUPPORT_ALERT',
        severity,
        messageSnippet: String(text).slice(0, 500),
        timestamp: new Date().toISOString(),
        source: 'student-ai-support'
      };
      const res = await fetch(zapUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const escalateIfSevere = async (text) => {
    const severity = classifySeverity(text);
    if (severity === 'high' || severity === 'crisis') {
      setShowCrisisAlert(true);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          text: 'I\'m concerned and have flagged your message to a counselor for immediate review.',
          isUser: false,
          timestamp: new Date()
        }
      ]);

      const [available, notified] = await Promise.all([
        checkCounselorAvailability(),
        notifyCounselor({ severity, text })
      ]);

      let followUp;
      if (notified) {
        if (available === false) {
          followUp = 'A counselor seems unavailable right now. For immediate help, call 14416 or use Crisis Support.';
        } else {
          followUp = 'A counselor has been notified and will reach out as soon as possible.';
        }
      } else {
        followUp = 'I could not send a notification right now. Please use Crisis Support or call 14416.';
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + Math.random(), text: followUp, isUser: false, timestamp: new Date() }
      ]);
    }
  };

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();

    // Name intent (English, Hinglish, Hindi)
    const asksNameEn = /\b(what(?:'s| is) your name|who are you|your name\b|name\?)/i.test(userMessage || '');
    const asksNameHiLatin = /\b(aapka|apka|tumhara|tera) naam(?: kya| kya hai| kya h)?/i.test(lowerMessage || '');
    const asksNameHi = (userMessage || '').includes('नाम') && ((userMessage || '').includes('क्या') || (userMessage || '').includes('क्या'));
    if (asksNameEn || asksNameHiLatin || asksNameHi) {
      return 'My name is Athreya.';
    }

    if (detectCrisisKeywords(userMessage)) {
      setShowCrisisAlert(true);
      return aiResponses?.crisis?.[0];
    }

    if (lowerMessage?.includes('anxious') || lowerMessage?.includes('anxiety') || lowerMessage?.includes('panic')) {
      return aiResponses?.anxiety?.[Math.floor(Math.random() * aiResponses?.anxiety?.length)];
    }

    if (lowerMessage?.includes('stress') || lowerMessage?.includes('academic') || lowerMessage?.includes('exam') || lowerMessage?.includes('deadline')) {
      return aiResponses?.stress?.[Math.floor(Math.random() * aiResponses?.stress?.length)];
    }

    if (lowerMessage?.includes('sleep') || lowerMessage?.includes('insomnia') || lowerMessage?.includes('tired') || lowerMessage?.includes('exhausted')) {
      return aiResponses?.sleep?.[Math.floor(Math.random() * aiResponses?.sleep?.length)];
    }

    if (lowerMessage?.includes('relationship') || lowerMessage?.includes('friend') || lowerMessage?.includes('family') || lowerMessage?.includes('partner')) {
      return aiResponses?.relationships?.[Math.floor(Math.random() * aiResponses?.relationships?.length)];
    }

    if (lowerMessage?.includes('overwhelmed') || lowerMessage?.includes('too much') || lowerMessage?.includes('can\'t handle')) {
      return aiResponses?.overwhelmed?.[Math.floor(Math.random() * aiResponses?.overwhelmed?.length)];
    }

    if (lowerMessage?.includes('coping') || lowerMessage?.includes('strategies') || lowerMessage?.includes('help me') || lowerMessage?.includes('what should i do')) {
      return aiResponses?.coping?.[Math.floor(Math.random() * aiResponses?.coping?.length)];
    }

    return aiResponses?.default?.[Math.floor(Math.random() * aiResponses?.default?.length)];
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText?.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Run escalation checks in background
    escalateIfSevere(messageText);

    const lang = detectLanguage(messageText);
    let textForAI = messageText;
    if (lang !== 'en') {
      const translated = await translateText(messageText, 'en');
      if (translated) textForAI = translated;
    }

    try {
      // Call the backend AI API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textForAI })
      });

      if (!response.ok) throw new Error('AI processing failed');

      const data = await response.json();
      let finalText = data.botReply;

      // If user speaks Hindi/Hinglish, translate response back
      if (lang !== 'en') {
        const translatedBack = await translateText(finalText, 'hi');
        if (translatedBack) finalText = translatedBack;
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: finalText,
        isUser: false,
        timestamp: new Date(),
        detectedState: data.detectedState,
        confidence: data.confidence
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('AI Error:', error);
      // Fallback to mock response if API fails
      const aiResponseEn = getAIResponse(textForAI);
      let finalText = aiResponseEn;
      if (lang !== 'en') {
        const translatedBack = await translateText(aiResponseEn, 'hi');
        if (translatedBack) finalText = translatedBack;
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: finalText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }
  };

  const handleQuickResponse = (responseText) => {
    handleSendMessage(responseText);
  };

  const handleStartChat = () => {
    setHasStartedChat(true);
    const welcomeMessage = {
      id: Date.now(),
      text: `Hello! I'm your AI mental health assistant. I'm here to provide support, guidance, and resources whenever you need them.\n\nI can help with anxiety, stress, sleep issues, relationship concerns, and general mental wellness. Everything we discuss is confidential.\n\nHow are you feeling today? What would you like to talk about?`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleClearChat = () => {
    setMessages([]);
    setHasStartedChat(false);
    setShowCrisisAlert(false);
  };

  return (
    <>
      <Helmet>
        <title>AI Chatbot Support - Sahaay</title>
        <meta name="description" content="Get instant mental health support and guidance through our AI-powered chatbot, available 24/7 for students." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header userRole="student" isAuthenticated={true} />

        <div className="pt-16 h-screen flex flex-col">
          {!hasStartedChat ? (
            <WelcomeMessage onStartChat={handleStartChat} />
          ) : (
            <>
              <ChatHeader
                onClearChat={handleClearChat}
                onShowCrisisSupport={() => setShowCrisisAlert(true)}
              />

              {/* Safety Disclaimer */}
              <SafetyDisclaimer />

              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20"
              >
                {messages?.map((message) => (
                  <ChatMessage
                    key={message?.id}
                    message={message?.text}
                    isUser={message?.isUser}
                    timestamp={message?.timestamp}
                  />
                ))}

                {isTyping && (
                  <ChatMessage
                    message=""
                    isUser={false}
                    timestamp={new Date()}
                    isTyping={true}
                  />
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-border bg-background/80 backdrop-blur-sm">
                {messages?.length === 0 && (
                  <div className="p-4">
                    <QuickResponseChips
                      onChipClick={handleQuickResponse}
                      disabled={isTyping}
                    />
                  </div>
                )}

                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={isTyping}
                  placeholder={isTyping ? "AI is typing..." : "Share what's on your mind..."}
                />
              </div>
            </>
          )}
        </div>

        <CrisisAlert
          isVisible={showCrisisAlert}
          onClose={() => setShowCrisisAlert(false)}
        />
      </div>
    </>
  );
};

export default AIChatbotSupport;
