import React from "react";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["Space", "Backspace", "Enter"]
];

function sendKey(key: string) {
  const active = document.activeElement as HTMLElement | null;
  if (!active) return;
  if (key === "Space") {
    active.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    active.dispatchEvent(new KeyboardEvent("keypress", { key: " " }));
    active.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
    (active as HTMLInputElement).value += " ";
  } else if (key === "Backspace") {
    active.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));
    active.dispatchEvent(new KeyboardEvent("keypress", { key: "Backspace" }));
    active.dispatchEvent(new KeyboardEvent("keyup", { key: "Backspace" }));
    (active as HTMLInputElement).value = (active as HTMLInputElement).value.slice(0, -1);
  } else if (key === "Enter") {
    active.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    active.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
    active.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    (active as HTMLInputElement).form?.dispatchEvent(new Event("submit", { bubbles: true }));
  } else {
    active.dispatchEvent(new KeyboardEvent("keydown", { key }));
    active.dispatchEvent(new KeyboardEvent("keypress", { key }));
    active.dispatchEvent(new KeyboardEvent("keyup", { key }));
    (active as HTMLInputElement).value += key;
  }
  // Trigger input event for React
  active.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function VirtualKeyboard() {
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
      {KEYS.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {row.map((key) => (
            <button
              key={key}
              onClick={() => sendKey(key === "Space" ? " " : key)}
              style={{
                minWidth: key === "Space" ? 120 : 40,
                padding: "12px 16px",
                fontSize: 18,
                borderRadius: 8,
                border: "none",
                background: "#444",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 1px 4px #0006",
                cursor: "pointer",
                transition: "background 0.2s",
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