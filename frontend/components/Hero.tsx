"use client"

import { Button } from "@/components/ui/button"
import { SparklesIcon, RocketIcon, LightbulbIcon } from "lucide-react"
import TypewriterEffect from "./TypewriterEffect"
import Link from "next/link"
import { useState } from "react"
import { BACKEND_URL } from "@/lib/api";
import GestureToggleButton from "@/components/GestureDetector";
import VirtualKeyboard from "./VirtualKeyboard";
import VoiceCommandOverlay from "./VoiceCommandOverlay";

export default function Hero() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [activated, setActivated] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showVoice, setShowVoice] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch(`${BACKEND_URL}/get-started`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.status === "started" || data.status === "already_running") {
        setActivated(true)
        setMessage("Gesture Control Activated!")
      } else {
        setMessage("Failed to activate gesture control.")
      }
    } catch (e) {
      setMessage("Could not connect to backend.")
    }
    setLoading(false)
  }

  const handleStop = async () => {
    setLoading(true)
    setMessage("")
    try {
      const res = await fetch(`${BACKEND_URL}/stop-gesture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (data.status === "stopped") {
        setActivated(false)
        setMessage("Gesture Control Stopped.")
      } else {
        setMessage("Failed to stop gesture control.")
      }
    } catch (e) {
      setMessage("Could not connect to backend.")
    }
    setLoading(false)
  }

  // (Dummy landmarks and sendLandmarks function removed)

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-12 dark:bg-black/50 light:bg-transparent pt-24">
      {/* Camera overlay and gesture toggle button */}
      <GestureToggleButton />
      {/* Virtual keyboard toggle button */}
      <button
        onClick={() => setShowKeyboard((prev) => !prev)}
        style={{
          position: 'fixed', bottom: 100, left: 32, zIndex: 10001,
          background: showKeyboard ? '#8A2BE2' : '#444', color: '#fff', border: 'none', borderRadius: 50, width: 56, height: 56,
          fontWeight: 'bold', fontSize: 28, boxShadow: '0 2px 12px #0008', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        title={showKeyboard ? 'Hide Virtual Keyboard' : 'Show Virtual Keyboard'}
      >
        <span role="img" aria-label="keyboard">⌨️</span>
      </button>
      {showKeyboard && <VirtualKeyboard />}
      {/* Voice command toggle button */}
      <button
        onClick={() => setShowVoice((prev) => !prev)}
        style={{
          position: 'fixed', bottom: 168, left: 32, zIndex: 10001,
          background: showVoice ? '#8A2BE2' : '#444', color: '#fff', border: 'none', borderRadius: 50, width: 56, height: 56,
          fontWeight: 'bold', fontSize: 28, boxShadow: '0 2px 12px #0008', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        title={showVoice ? 'Hide Voice Command' : 'Show Voice Command'}
      >
        <span role="img" aria-label="microphone">🎤</span>
      </button>
      {showVoice && <VoiceCommandOverlay />}
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 dark:text-white light:text-gray-800">
        <TypewriterEffect
          text="GestureGuy"
          speed={10}
          delay={0}
          className="bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text block light:from-peach-500 light:to-peach-400"
        />
        <TypewriterEffect text="The Gesture-Controlled Software Interface" speed={2} delay={150} className="block" />
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 dark:text-gray-300 light:text-gray-700">
        Discover the future of interaction. Control your digital world with intuitive hand gestures, making technology
        an extension of yourself.
      </p>
      <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-400">
        {/* Updated "Explore Features" button to link to the new page */}
        <Link href="/explore-features" passHref>
          <Button className="px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            <SparklesIcon className="mr-2 h-5 w-5" />
            Explore Features
          </Button>
        </Link>
        <Button
          variant="outline"
          className="px-8 py-3 text-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleGetStarted}
          disabled={loading || activated}
        >
          {loading && !activated ? (
            <span className="animate-spin mr-2">🔄</span>
          ) : (
            <RocketIcon className="mr-2 h-5 w-5" />
          )}
          {loading && !activated ? "Activating..." : "Get Started"}
        </Button>
        {activated && (
          <Button
            variant="destructive"
            className="px-8 py-3 text-lg border-2 border-white text-white bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handleStop}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin mr-2">🔄</span>
            ) : (
              <span className="mr-2">🛑</span>
            )}
            {loading ? "Stopping..." : "Stop"}
          </Button>
        )}
        {/* (Send Dummy Landmarks button removed) */}
        <Link href="/about-project" passHref>
          <Button
            variant="secondary"
            className="px-8 py-3 text-lg bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <LightbulbIcon className="mr-2 h-5 w-5" />
            Learn More
          </Button>
        </Link>
      </div>
      {message && (
        <div className="mt-4 text-green-400 font-bold">{message}</div>
      )}
    </section>
  )
}