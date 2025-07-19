"use client";
import React from "react";
import GestureDetector, { GestureToggleButton } from "@/components/GestureDetector";

export default function ClientGestureProvider() {
  const [enabled, setEnabled] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);
  return (
    <>
      <GestureToggleButton enabled={enabled} setEnabled={setEnabled} />
      <GestureDetector enabled={enabled} showInstructions={showInstructions} />
    </>
  );
} 