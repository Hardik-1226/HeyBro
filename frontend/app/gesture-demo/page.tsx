import GestureDetector from "@/components/GestureDetector";

export default function GestureDemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
      <h1 className="text-4xl font-bold mb-6">Gesture Demo</h1>
      <p className="mb-4 text-lg text-gray-300">Allow camera access to test real-time hand gesture detection in your browser.</p>
      <GestureDetector />
    </div>
  );
} 