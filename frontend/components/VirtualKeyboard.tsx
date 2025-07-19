import React, { useRef, useState } from "react";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["Space", "Backspace", "Enter"]
];

function sendKey(key: string, input: HTMLInputElement | HTMLTextAreaElement | null) {
  if (!input) return;
  if (key === "Space") {
    input.value += " ";
  } else if (key === "Backspace") {
    input.value = input.value.slice(0, -1);
  } else if (key === "Enter") {
    input.form?.dispatchEvent(new Event("submit", { bubbles: true }));
  } else {
    input.value += key;
  }
  // Trigger input event for React
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
}

// Expose for gesture/voice integration
export let triggerVirtualKey: (key: string) => void = () => {};

export default function VirtualKeyboard() {
  const [lastKey, setLastKey] = useState<string | null>(null);
  const lastInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const fallbackInputRef = useRef<HTMLInputElement>(null);

  // Track last focused input
  React.useEffect(() => {
    const handler = (e: any) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        lastInputRef.current = e.target;
      }
    };
    window.addEventListener("focusin", handler);
    return () => window.removeEventListener("focusin", handler);
  }, []);

  // Expose trigger for gesture/voice integration
  triggerVirtualKey = (key: string) => {
    setLastKey(key);
    let input = lastInputRef.current;
    if (!input) {
      // Fallback: focus the hidden input
      fallbackInputRef.current?.focus();
      input = fallbackInputRef.current;
    }
    sendKey(key === "Space" ? " " : key, input);
    setTimeout(() => setLastKey(null), 200);
  };

  return (
    <div style={{
      position: "fixed",
      left: "50%",
      bottom: 40,
      transform: "translateX(-50%)",
      zIndex: 10002,
      background: "#23272f",
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 2px 24px #0008",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 400,
      maxWidth: "90vw",
      opacity: 0.98,
    }}>
      {/* Hidden fallback input for demo typing */}
      <input ref={fallbackInputRef} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1, left: 0, top: 0 }} tabIndex={-1} />
      {KEYS.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => {
                setLastKey(key);
                let input = lastInputRef.current;
                if (!input) {
                  fallbackInputRef.current?.focus();
                  input = fallbackInputRef.current;
                }
                sendKey(key === "Space" ? " " : key, input);
                setTimeout(() => setLastKey(null), 200);
              }}
              style={{
                minWidth: key === "Space" ? 120 : 40,
                padding: "12px 16px",
                fontSize: 18,
                borderRadius: 8,
                border: lastKey === key ? "2px solid #8A2BE2" : "none",
                background: lastKey === key ? "#8A2BE2" : "#444",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 1px 4px #0006",
                cursor: "pointer",
                transition: "background 0.2s, border 0.2s",
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
} 