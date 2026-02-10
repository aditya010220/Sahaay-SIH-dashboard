import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';


const ChatInput = ({ onSendMessage, disabled = false, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recTimerRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  // File upload handlers
  const triggerFileSelect = () => {
    if (disabled) return;
    fileInputRef?.current?.click();
  };

  const handleFileSelected = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    // Encode as a parsable message for renderer
    onSendMessage(`file:${encodeURIComponent(file.name)}|${url}`);
    // reset input to allow the same file to be selected again
    e.target.value = '';
  };

  // Audio recording handlers
  const startRecording = async () => {
    if (disabled || isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const chunks = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (ev) => {
        if (ev?.data?.size > 0) chunks.push(ev.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        onSendMessage(`audio:${encodeURIComponent('Voice message')}|${url}`);
        cleanupRecording();
      };

      recorder.start();
      setIsRecording(true);
      setRecSeconds(0);
      recTimerRef.current = setInterval(() => setRecSeconds((s) => s + 1), 1000);
    } catch (err) {
      console.error('Microphone access denied or not available', err);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    try {
      mediaRecorderRef?.current?.stop();
    } catch {}
  };

  const cleanupRecording = () => {
    setIsRecording(false);
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    setRecSeconds(0);
    mediaRecorderRef.current = null;
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
  };

  useEffect(() => {
    return () => cleanupRecording();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,audio/*"
        className="hidden"
        onChange={handleFileSelected}
      />

      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e?.target?.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-2xl border border-border bg-input px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gentle-transition"
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
        
        {message?.trim() && (
          <div className="absolute right-2 bottom-2">
            <Button
              type="submit"
              size="icon"
              disabled={disabled || !message?.trim()}
              iconName="Send"
              className="h-8 w-8 rounded-full"
            />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={disabled}
          iconName="Paperclip"
          className="rounded-full"
          onClick={triggerFileSelect}
        />
        
        <Button
          type="button"
          variant={isRecording ? 'danger' : 'outline'}
          size="icon"
          disabled={disabled}
          iconName={isRecording ? 'Square' : 'Mic'}
          className="rounded-full"
          onClick={isRecording ? stopRecording : startRecording}
          aria-pressed={isRecording}
          aria-label={isRecording ? `Stop recording (${recSeconds}s)` : 'Start voice recording'}
        />
        {isRecording && (
          <span className="text-xs text-muted-foreground select-none">{recSeconds}s</span>
        )}
      </div>
    </form>
  );
};

export default ChatInput;
