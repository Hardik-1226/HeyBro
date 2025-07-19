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

const COOLDOWNS = {
  click: 500,
  doubleClick: 700,
  scroll: 400,
  zoom: 800,
};

export function GestureToggleButton({ enabled, setEnabled }: { enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <button
      onClick={() => setEnabled((prev: boolean) => !prev)}
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 10001,
        background: enabled ? '#8A2BE2' : '#444', color: '#fff', border: 'none', borderRadius: 50, width: 56, height: 56,
        fontWeight: 'bold', fontSize: 28, boxShadow: '0 2px 12px #0008', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      title={enabled ? 'Disable Gesture Control' : 'Enable Gesture Control'}
    >
      <span role="img" aria-label="hand">🖐️</span>
    </button>
  );
}

export default function GestureDetector({ enabled, showInstructions }: { enabled: boolean, showInstructions?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollY = useRef<number | null>(null);
  const lastPinch = useRef<boolean>(false);
  const lastZoomIn = useRef<boolean>(false);
  const lastZoomOut = useRef<boolean>(false);
  const lastClickTime = useRef<number>(0);
  const lastDoubleClickTime = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);
  const lastZoomTime = useRef<number>(0);
  const [lastGesture, setLastGesture] = useState<string>("");
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
        // Clamp cursor to viewport
        const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
        cursorPos.current.x = lerp(cursorPos.current.x, clamp(targetX, 0, window.innerWidth), 0.3);
        cursorPos.current.y = lerp(cursorPos.current.y, clamp(targetY, 0, window.innerHeight), 0.3);
        const cursor = document.getElementById("gesture-cursor");
        if (cursor) {
          cursor.style.left = `${cursorPos.current.x - 10}px`;
          cursor.style.top = `${cursorPos.current.y - 10}px`;
        }
        // Pinch (index tip near thumb tip) for click/double click
        const pinchDist = Math.hypot(hand[8].x - hand[4].x, hand[8].y - hand[4].y);
        const isPinching = pinchDist < 0.05;
        const now = Date.now();
        if (isPinching && !lastPinch.current) {
          if (now - lastDoubleClickTime.current < COOLDOWNS.doubleClick) {
            // Double click
            if (now - lastClickTime.current > COOLDOWNS.doubleClick) {
              setLastGesture("Double Click");
              const el = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y) as HTMLElement | null;
              if (el) {
                el.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, clientX: cursorPos.current.x, clientY: cursorPos.current.y }));
              }
              lastClickTime.current = now;
            }
          } else if (now - lastClickTime.current > COOLDOWNS.click) {
            // Single click
            setLastGesture("Click");
            const el = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y) as HTMLElement | null;
            if (el) {
              el.click();
            }
            lastClickTime.current = now;
            lastDoubleClickTime.current = now;
          }
        }
        lastPinch.current = isPinching;
        // Scroll (swipe up/down with middle finger)
        if (lastScrollY.current !== null) {
          const deltaY = hand[12].y - lastScrollY.current;
          if (Math.abs(deltaY) > 0.04 && now - lastScrollTime.current > COOLDOWNS.scroll) {
            setLastGesture(deltaY > 0 ? "Scroll Down" : "Scroll Up");
            window.scrollBy({ top: deltaY * 500, behavior: "smooth" });
            lastScrollTime.current = now;
          }
        }
        lastScrollY.current = hand[12].y;
        // Zoom in (spread thumb & pinky)
        const zoomInDist = Math.hypot(hand[4].x - hand[20].x, hand[4].y - hand[20].y);
        const isZoomIn = zoomInDist > 0.35;
        if (isZoomIn && !lastZoomIn.current && now - lastZoomTime.current > COOLDOWNS.zoom) {
          setLastGesture("Zoom In");
          document.body.style.zoom = `${Math.min((Number(document.body.style.zoom) || 1) + 0.1, 2)}`;
          lastZoomTime.current = now;
        }
        lastZoomIn.current = isZoomIn;
        // Zoom out (pinch thumb & middle)
        const zoomOutDist = Math.hypot(hand[4].x - hand[12].x, hand[4].y - hand[12].y);
        const isZoomOut = zoomOutDist < 0.05;
        if (isZoomOut && !lastZoomOut.current && now - lastZoomTime.current > COOLDOWNS.zoom) {
          setLastGesture("Zoom Out");
          document.body.style.zoom = `${Math.max((Number(document.body.style.zoom) || 1) - 0.1, 0.5)}`;
          lastZoomTime.current = now;
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

  if (!enabled) return null;

  return (
    <>
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
        {/* Feedback for last gesture */}
        <div style={{ position: 'fixed', left: 24, bottom: 120, zIndex: 10000, background: '#23272f', color: '#fff', borderRadius: 8, padding: '8px 16px', fontSize: 18, minWidth: 120, textAlign: 'center', opacity: 0.95 }}>
          {lastGesture && <span>Last: <b style={{ color: '#8A2BE2' }}>{lastGesture}</b></span>}
        </div>
      </div>
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