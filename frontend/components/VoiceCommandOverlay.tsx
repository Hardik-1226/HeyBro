import React, { useEffect, useRef, useState } from "react";

const COMMANDS = [
  { keywords: ["up", "scroll up"], action: () => window.scrollBy({ top: -200, behavior: "smooth" }) },
  { keywords: ["down", "scroll down"], action: () => window.scrollBy({ top: 200, behavior: "smooth" }) },
  { keywords: ["click"], action: () => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (el && el.tagName !== "A") {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: x, clientY: y }));
    }
  } },
  { keywords: ["zoom in"], action: () => {
    document.body.style.zoom = `${Math.min((Number(document.body.style.zoom) || 1) + 0.1, 2)}`;
  } },
  { keywords: ["zoom out"], action: () => {
    document.body.style.zoom = `${Math.max((Number(document.body.style.zoom) || 1) - 0.1, 0.5)}`;
  } },
];

export default function VoiceCommandOverlay() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setTranscript("Voice recognition not supported in this browser.");
      return;
    }
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const last = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      setTranscript(last);
      for (const cmd of COMMANDS) {
        if (cmd.keywords.some(k => last.includes(k))) {
          cmd.action();
          setTranscript(`✔️ ${last}`);
        }
      }
    };
    recognitionRef.current = recognition;
    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }
    return () => recognition.stop();
  }, [listening]);

  return (
    <div style={{
      position: "fixed",
      left: "50%",
      bottom: 120,
      transform: "translateX(-50%)",
      zIndex: 10002,
      background: "#23272f",
      borderRadius: 16,
      padding: 24,
      boxShadow: "0 2px 24px #0008",
      color: "#fff",
      minWidth: 320,
      textAlign: "center",
      opacity: 0.98,
    }}>
      <span role="img" aria-label="microphone" style={{ fontSize: 32 }}>🎤</span>
      <div style={{ fontWeight: "bold", fontSize: 20, marginTop: 8 }}>Voice Command Mode</div>
      <button
        onClick={() => setListening(l => !l)}
        style={{ margin: 12, padding: '8px 20px', borderRadius: 8, border: 'none', background: listening ? '#8A2BE2' : '#444', color: '#fff', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}
      >
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <div style={{ fontSize: 16, marginTop: 8, color: listening ? '#8A2BE2' : '#aaa', minHeight: 24 }}>
        {transcript || '(Say: up, down, click, scroll up, zoom in, zoom out...)'}
      </div>
    </div>
  );
} 