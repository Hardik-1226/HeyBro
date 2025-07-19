"use client";
import React, { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { BACKEND_URL } from "@/lib/api";

export default function GestureDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSentRef = useRef<number>(0);
  const [action, setAction] = useState<string>("");

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

    hands.onResults(async (results: any) => {
      const now = Date.now();
      // Send at most every 200ms
      if (
        results.multiHandLandmarks &&
        results.multiHandLandmarks.length > 0 &&
        now - lastSentRef.current > 200
      ) {
        lastSentRef.current = now;
        try {
          const response = await fetch(`${BACKEND_URL}/process-landmarks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ landmarks: results.multiHandLandmarks }),
          });
          const data = await response.json();
          setAction(data.action || "");
        } catch (err) {
          // Optionally, handle error
        }
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
      <div style={{ marginTop: 16, fontSize: 20, color: '#8A2BE2', fontWeight: 'bold' }}>
        {action && `Detected Action: ${action}`}
      </div>
    </div>
  );
} 