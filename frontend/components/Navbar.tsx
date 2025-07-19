"use client"

import { Button } from "@/components/ui/button"
import { LogInIcon, UserPlusIcon } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useScrollPosition } from "@/hooks/use-scroll-position"

export default function Navbar() {
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 50 // Determine if user has scrolled down

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center transition-all duration-300 ease-in-out
        ${isScrolled ? "bg-black/70 dark:bg-black/70 light:bg-white/80 backdrop-blur-sm shadow-lg" : "bg-transparent"}
      `}
    >
      <Link href="/" passHref>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text light:from-peach-500 light:to-peach-400">
          GestureGuy
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        {/* Added link to the new Explore Features page */}
        <Link href="/explore-features" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          
           
          >
            About
          </Button>
        </Link>
        {/* Removed old Features link as it's now a dedicated page */}
        {/* <Link href="/#features" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Features
          </Button>
        </Link> */}
        <Link href="/gesture-demo" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Gesture Demo
          </Button>
        </Link>
        <Link href="/#demo" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Demo
          </Button>
        </Link>
        <Link href="/#contact" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            Contact Us
          </Button>
        </Link>
        <Link href="/about-project" passHref>
          <Button
            variant="ghost"
            className="text-white hover:text-neon-blue dark:text-white dark:hover:text-neon-blue light:text-gray-800 light:hover:text-peach-500"
          >
            About Project
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button
            variant="outline"
            className="rounded-full bg-gray-800 text-white border-gray-700 hover:bg-gray-700 light:bg-white light:text-gray-800 light:border-gray-300 light:hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <UserPlusIcon className="h-4 w-4 mr-2" /> Sign Up
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button
            variant="outline"
            className="rounded-full bg-gray-800 text-white border-gray-700 hover:bg-gray-700 light:bg-white light:text-gray-800 light:border-gray-300 light:hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <LogInIcon className="h-4 w-4 mr-2" /> Login
          </Button>
        </Link>
        {/* Social Links */}
        <a href="https://github.com/Hardik-1226" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg className="w-6 h-6 text-white hover:text-neon-blue transition-colors mx-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
        </a>
        <a href="https://x.com/H_var25" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg className="w-6 h-6 text-white hover:text-neon-blue transition-colors mx-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6z"/><rect width="4" height="12" x="2" y="9" rx="2"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a href="https://instagram.com/hdkvrsny" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg className="w-6 h-6 text-white hover:text-neon-blue transition-colors mx-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="https://twitter.com/hardikvarshney" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg className="w-6 h-6 text-white hover:text-neon-blue transition-colors mx-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.17 3.01 4.09 3.05A9.05 9.05 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.84 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/></svg>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  )
}
