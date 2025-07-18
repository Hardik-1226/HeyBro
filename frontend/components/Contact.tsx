"use client" // Mark as client component to use the hook

import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"
import { useInViewAnimation } from "@/hooks/useInViewAnimation" // Import the hook

export default function Contact() {
  const { ref, className } = useInViewAnimation({ delay: 100 }) // Add a slight delay for sequential animation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! (This is a frontend-only demo)")
  }

  return (
    <section
      id="contact"
      ref={ref} // Attach ref to the section
      className={`relative z-10 py-20 px-4 bg-black/40 text-white dark:bg-black/40 light:bg-white/60 ${className}`} // Adjusted opacity
    >
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 dark:text-white light:text-gray-800">
          <span className="bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
            Get In
          </span>{" "}
          Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-200 text-white dark:text-white light:text-gray-800 focus:border-neon-purple focus:ring-neon-purple light:focus:border-peach-500 light:focus:ring-peach-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              className="w-full p-3 rounded-md bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-200 text-white dark:text-white light:text-gray-800 focus:border-neon-blue focus:ring-neon-blue light:focus:border-peach-400 light:focus:ring-peach-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2"
            >
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Your message here..."
              rows={5}
              className="w-full p-3 rounded-md bg-gray-800 dark:bg-gray-800 light:bg-white border border-gray-700 dark:border-gray-700 light:border-gray-200 text-white dark:text-white light:text-gray-800 focus:border-neon-pink focus:ring-neon-pink light:focus:border-peach-500 light:focus:ring-peach-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 text-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] light:bg-gradient-to-r light:from-peach-500 light:to-peach-400 light:hover:from-peach-400 light:hover:to-peach-500 light:text-white"
          >
            <SendIcon className="mr-2 h-5 w-5" />
            Send Message
          </Button>
        </form>
      </div>
      {/* Social Links */}
      <div className="mt-10 flex justify-center space-x-6">
        <a href="https://github.com/hardikvarshney" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg className="w-7 h-7 text-white hover:text-neon-blue transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
        </a>
        <a href="https://linkedin.com/in/hardikvarshney" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg className="w-7 h-7 text-white hover:text-neon-blue transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6z"/><rect width="4" height="12" x="2" y="9" rx="2"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://instagram.com/hardikvarshney" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg className="w-7 h-7 text-white hover:text-neon-blue transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="https://twitter.com/hardikvarshney" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg className="w-7 h-7 text-white hover:text-neon-blue transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.17 3.01 4.09 3.05A9.05 9.05 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.84 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/></svg>
        </a>
      </div>
    </section>
  )
}
