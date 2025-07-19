"use client";
import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const instructions = [
  { gesture: "Move index finger", action: "Move cursor (inverted X, smoothed)" },
  { gesture: "Pinch (index & thumb)", action: "Click" },
  { gesture: "Double pinch (index & thumb, twice)", action: "Double Click" },
  { gesture: "Swipe up/down with middle finger", action: "Scroll page" },
  { gesture: "Spread thumb & pinky", action: "Zoom in" },
  { gesture: "Pinch thumb & middle", action: "Zoom out" },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function GestureDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollY = useRef<number | null>(null);
  const lastPinch = useRef<boolean>(false);
  const lastZoomIn = useRef<boolean>(false);
  const lastZoomOut = useRef<boolean>(false);
  const lastClickTime = useRef<number>(0);
  const [lastGesture, setLastGesture] = useState<string>("");
  const [enabled, setEnabled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const cursorPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    if (!enabled || !videoRef.current) return;

    let camera: Camera;
    const hands = new Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results: any) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const hand = results.multiHandLandmarks[0];
        // Invert X for cursor movement (mirror effect)
        const [targetX, targetY] = [
          (1 - hand[8].x) * window.innerWidth,
          hand[8].y * window.innerHeight,
        ];
        // Smooth cursor
        cursorPos.current.x = lerp(cursorPos.current.x, targetX, 0.3);
        cursorPos.current.y = lerp(cursorPos.current.y, targetY, 0.3);
        const cursor = document.getElementById("gesture-cursor");
        if (cursor) {
          cursor.style.left = `${cursorPos.current.x - 10}px`;
          cursor.style.top = `${cursorPos.current.y - 10}px`;
        }
        // Pinch (index tip near thumb tip) for click
        const pinchDist = Math.hypot(hand[8].x - hand[4].x, hand[8].y - hand[4].y);
        const isPinching = pinchDist < 0.05;
        const now = Date.now();
        if (isPinching && !lastPinch.current) {
          if (now - lastClickTime.current < 400) {
            // Double click
            setLastGesture("Double Click");
            const el = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y) as HTMLElement | null;
            if (el) {
              el.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, clientX: cursorPos.current.x, clientY: cursorPos.current.y }));
            }
            lastClickTime.current = 0; // reset
          } else {
            // Single click
            setLastGesture("Click");
            const el = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y) as HTMLElement | null;
            if (el) {
              el.click();
            }
            lastClickTime.current = now;
          }
        }
        lastPinch.current = isPinching;
        // Swipe up/down for scroll (middle finger tip y movement)
        if (lastScrollY.current !== null) {
          const deltaY = hand[12].y - lastScrollY.current;
          if (Math.abs(deltaY) > 0.02) {
            setLastGesture(deltaY > 0 ? "Scroll Down" : "Scroll Up");
            window.scrollBy({ top: deltaY * 500, behavior: "smooth" });
          }
        }
        lastScrollY.current = hand[12].y;
        // Zoom in (spread thumb & pinky)
        const zoomInDist = Math.hypot(hand[4].x - hand[20].x, hand[4].y - hand[20].y);
        const isZoomIn = zoomInDist > 0.35;
        if (isZoomIn && !lastZoomIn.current) {
          setLastGesture("Zoom In");
          document.body.style.zoom = `${Math.min((Number(document.body.style.zoom) || 1) + 0.1, 2)}`;
        }
        lastZoomIn.current = isZoomIn;
        // Zoom out (pinch thumb & middle)
        const zoomOutDist = Math.hypot(hand[4].x - hand[12].x, hand[4].y - hand[12].y);
        const isZoomOut = zoomOutDist < 0.05;
        if (isZoomOut && !lastZoomOut.current) {
          setLastGesture("Zoom Out");
          document.body.style.zoom = `${Math.max((Number(document.body.style.zoom) || 1) - 0.1, 0.5)}`;
        }
        lastZoomOut.current = isZoomOut;
      }
    });

    camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await hands.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();

    return () => {
      camera && camera.stop();
    };
  }, [enabled]);

  return (
    <>
      {/* Floating control panel */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 10000, background: '#23272f', color: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0008', padding: 16, minWidth: 220 }}>
        <button
          onClick={() => setEnabled(e => !e)}
          style={{ background: enabled ? '#8A2BE2' : '#444', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: 8 }}
        >
          {enabled ? 'Stop Gesture Control' : 'Start Gesture Control'}
        </button>
        <button
          onClick={() => setShowInstructions(i => !i)}
          style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', marginLeft: 8 }}
        >
          {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
        </button>
        <div style={{ marginTop: 12, fontSize: 16, minHeight: 24 }}>
          {enabled && lastGesture && <span>Last Gesture: <b style={{ color: '#8A2BE2' }}>{lastGesture}</b></span>}
        </div>
      </div>
      {/* Video and cursor */}
      {enabled && (
        <div>
          <video ref={videoRef} style={{ display: "block", width: 640, height: 480, position: 'fixed', bottom: 24, left: 24, zIndex: 9999, borderRadius: 12, boxShadow: '0 2px 12px #0008' }} autoPlay playsInline />
          {/* Custom cursor for gesture control */}
          <div id="gesture-cursor" style={{
            position: "fixed",
            width: 20,
            height: 20,
            background: "#8A2BE2",
            borderRadius: "50%",
            pointerEvents: "none",
            left: 0,
            top: 0,
            zIndex: 99999,
            opacity: 0.8,
            border: "2px solid white",
          }} />
        </div>
      )}
      {/* Instructions panel */}
      {showInstructions && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 10000, background: '#222', color: '#fff', padding: 16, borderRadius: 8, maxWidth: 400 }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: 8 }}>Gesture Instructions</h3>
          <ul style={{ fontSize: 15, lineHeight: 1.7 }}>
            {instructions.map((item, i) => (
              <li key={i}><b>{item.gesture}:</b> {item.action}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
} 