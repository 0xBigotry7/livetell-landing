"use client"

import { motion } from "framer-motion"
import { Twitter, MessageCircle, Github } from "lucide-react"

export function SocialBar() {
  const socials = [
    {
      icon: Twitter,
      label: "Follow us on X",
      href: "https://twitter.com/livetell",
      color: "hover:text-blue-400"
    },
    {
      icon: MessageCircle,
      label: "Join our Telegram",
      href: "https://t.me/livetell",
      color: "hover:text-blue-500"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/livetell",
      color: "hover:text-gray-400"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-md py-4 px-6 z-40"
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-8">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-white/70 ${social.color} transition-colors duration-200 hover:scale-105`}
            whileHover={{ y: -2 }}
          >
            <social.icon className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
} 