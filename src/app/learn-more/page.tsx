"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Brain, Code2, Lock, ChartBar } from "lucide-react"
import { SignupForm } from "@/components/signup-form"
import { SocialBar } from "@/components/social-bar"

export default function LearnMore() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our predictive AI model, developed with PKUAI Lab, achieves nearly 80% accuracy in market predictions."
    },
    {
      icon: Code2,
      title: "Open Source Future",
      description: "We're committed to transparency. Our AI model will be open-sourced, allowing the community to verify and improve our technology."
    },
    {
      icon: Lock,
      title: "Secure & Reliable",
      description: "Built with enterprise-grade security to ensure your trading signals and data are protected at all times."
    },
    {
      icon: ChartBar,
      title: "Beyond Meme Coins",
      description: "Our vision extends to transforming live information consumption across multiple markets - from event predictions to sports betting."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-green-900 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <Link
          href="/"
          className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors mb-8 hover:scale-105 transform duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400"
        >
          The Future of Live Information is Here
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-green-100/90 max-w-3xl mx-auto mb-12"
        >
          Livetell is more than just a tool for memecoin trading. Our mission is to transform how we all consume live, time-sensitive information.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
              className="flip-card h-[250px]"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="bg-white bg-opacity-5 p-8 rounded-lg flex flex-col items-center justify-center h-full border border-blue-500/20 backdrop-blur-sm">
                    <feature.icon className="h-12 w-12 mb-4 text-blue-400" />
                    <h3 className="text-xl font-semibold text-green-200">{feature.title}</h3>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="bg-white bg-opacity-10 p-8 rounded-lg flex flex-col items-center justify-center h-full border border-green-500/20 backdrop-blur-sm">
                    <p className="text-green-100 text-lg leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="bg-white bg-opacity-5 backdrop-blur-md p-8 rounded-lg border border-blue-500/20 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-blue-300">Join the Future of Information</h3>
          <p className="text-green-100 text-lg leading-relaxed mb-6">
            Experience the power of real-time information analysis that gives you the edge in any market.
          </p>
          <SignupForm />
        </motion.div>
      </motion.div>
      <SocialBar />
    </div>
  )
}

