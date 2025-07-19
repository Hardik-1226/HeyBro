"use client";
import dynamic from "next/dynamic";

const GestureDetector = dynamic(() => import("@/components/GestureDetector"), { ssr: false });

export default function GestureDemoPage() {
  return <GestureDetector />;
} 