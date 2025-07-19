"use client";
import React, { useRef, useEffect } from "react";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { BACKEND_URL } from "@/lib/api";

export default function GestureDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      // Here you get hand landmarks and can trigger actions!
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // Send landmarks to backend
        await fetch(`${BACKEND_URL}/process-landmarks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ landmarks: results.multiHandLandmarks }),
        });
      }
      console.log(results.multiHandLandmarks);
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
    </div>
  );
} 