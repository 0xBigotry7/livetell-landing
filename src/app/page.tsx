"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Rocket, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { SignupForm } from "@/components/signup-form"
import { SocialBar } from "@/components/social-bar"

export default function LandingPage() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const features = [
    {
      icon: Rocket,
      text: "Lightning-Fast Alerts",
      description: "Get real-time notifications when it matters most, ensuring you never miss a crucial market moment."
    },
    {
      icon: Zap,
      text: "Insider Signals",
      description: "Transform live chatter into winning insights by decoding real-time audio from platforms like X Spaces."
    },
    {
      icon: TrendingUp,
      text: "VIP Access",
      description: "Join our exclusive waitlist for early access to our platform with nearly 80% prediction accuracy."
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 flex flex-col items-center justify-center p-4 pb-24 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={controls}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
        >
          Livetell
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl mb-4 text-green-200"
        >
          Your Ultimate Edge in the Meme Coin Arena
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg mb-8 text-green-100/80"
        >
          Real-time signals that transform market chaos into clear, actionable moves.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white bg-opacity-5 backdrop-blur-md p-8 rounded-lg mb-8 shadow-lg border border-green-500/20"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-300">Get Your VIP Pass Now!</h2>
          <SignupForm />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
              className="flip-card h-[200px]"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="bg-white bg-opacity-5 p-6 rounded-lg flex flex-col items-center justify-center h-full border border-green-500/20">
                    <feature.icon className="h-8 w-8 mb-2 text-blue-400" />
                    <p className="text-green-200 font-medium">{feature.text}</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="bg-white bg-opacity-10 p-6 rounded-lg flex flex-col items-center justify-center h-full border border-blue-500/20">
                    <p className="text-green-100 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-green-100/70 text-sm max-w-2xl mx-auto mb-4">
            Meme coin trading is a high-stakes game, and every whisper can mean the difference between a win and a loss. Livetell listens to live audio and decodes the noise into clear signals.
          </p>
          <Link
            href="/learn-more"
            className="inline-block text-lg text-blue-300 hover:text-blue-100 transition-colors items-center hover:scale-105 transform duration-200 mb-12"
          >
            Discover our vision <Rocket className="inline-block ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
      <SocialBar />
    </div>
  )
}

