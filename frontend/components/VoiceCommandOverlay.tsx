import React from "react";

export default function VoiceCommandOverlay() {
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
      <div style={{ fontSize: 14, marginTop: 8, color: "#aaa" }}>
        (Coming soon: control mouse and keyboard with your voice!)
      </div>
    </div>
  );
} 