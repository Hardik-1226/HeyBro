"use client";
import React, { useRef, useEffect } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

export default function GestureDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollY = useRef<number | null>(null);
  const lastPinch = useRef<boolean>(false);

  useEffect(() => {
    if (!videoRef.current) return;

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
        // Move custom cursor with index finger tip
        const [x, y] = [hand[8].x * window.innerWidth, hand[8].y * window.innerHeight];
        const cursor = document.getElementById("gesture-cursor");
        if (cursor) {
          cursor.style.left = `${x - 10}px`;
          cursor.style.top = `${y - 10}px`;
        }
        // Pinch (index tip near thumb tip) for click
        const pinchDist = Math.hypot(hand[8].x - hand[4].x, hand[8].y - hand[4].y);
        const isPinching = pinchDist < 0.05;
        if (isPinching && !lastPinch.current) {
          // Simulate click on element under cursor
          const el = document.elementFromPoint(x, y) as HTMLElement | null;
          if (el) el.click();
        }
        lastPinch.current = isPinching;
        // Swipe up/down for scroll (middle finger tip y movement)
        if (lastScrollY.current !== null) {
          const deltaY = hand[12].y - lastScrollY.current;
          if (Math.abs(deltaY) > 0.02) {
            window.scrollBy({ top: deltaY * 500, behavior: "smooth" });
          }
        }
        lastScrollY.current = hand[12].y;
      }
    });

    const camera = new Camera(videoRef.current, {
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
      camera.stop();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ display: "block", width: 640, height: 480 }} autoPlay playsInline />
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
        zIndex: 9999,
        opacity: 0.8,
        border: "2px solid white",
      }} />
    </div>
  );
} 