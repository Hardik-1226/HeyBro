"use client" // Mark as client component to use the hook

import { PlayCircleIcon } from "lucide-react"
import Image from "next/image"
import { useInViewAnimation } from "@/hooks/useInViewAnimation" // Import the hook

export default function Demo() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  return (
    <section
      id="demo"
      ref={ref} // Attach ref to the section
      className={`relative z-10 py-20 px-4 bg-black/40 text-white dark:bg-black/40 light:bg-white/60 ${className}`} // Adjusted opacity
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
            See It
          </span>{" "}
          In Action
        </h2>

        <div className="relative w-full aspect-video bg-gray-800 dark:bg-gray-800 light:bg-white/80 rounded-lg overflow-hidden shadow-2xl mb-16">
          {/* Demo video */}
          <video
            src="/demo.mp4"
            controls
            muted
            className="w-full h-full object-cover"
            poster="/placeholder.svg?height=720&width=1280"
          >
            Your browser does not support the video tag.
          </video>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
            (Demo video)
          </p>
        </div>

        <h3 className="text-3xl font-bold text-center mb-10 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-pink to-neon-purple text-transparent bg-clip-text light:from-peach-400 light:to-peach-500">
            Meet
          </span>{" "}
          the Innovators
        </h3>
        <div className="flex justify-center">
          {[
            {
              name: "Hardik Varshney",
              bio: "Creator and lead developer of GestureGuy.",
              avatar: "/hardik-innovator.jpg", // Use the uploaded image
            },
          ].map((person, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-800 dark:bg-gray-800 light:bg-white p-6 rounded-lg shadow-lg border border-gray-700 dark:border-gray-700 light:border-gray-200 transition-all duration-300 transform hover:scale-105 max-w-xs"
            >
              <Image
                src={person.avatar}
                alt={person.name}
                width={180}
                height={180}
                className="rounded-full mb-4 border-4 border-neon-blue light:border-peach-500 object-cover"
              />
              <h4 className="text-xl font-semibold text-white dark:text-white light:text-gray-800 mb-2">
                {person.name}
              </h4>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 text-sm">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
