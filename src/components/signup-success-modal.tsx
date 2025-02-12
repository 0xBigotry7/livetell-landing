"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, X, Info } from 'lucide-react'
import config from '@/config/index.json'

interface SignupSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  referralCode: string
  isExistingUser?: boolean
}

export function SignupSuccessModal({ isOpen, onClose, referralCode, isExistingUser }: SignupSuccessModalProps) {
  const [copied, setCopied] = useState<'code' | 'link' | null>(null)
  const referralLink = `${config.app.url}?ref=${referralCode}`

  const copyToClipboard = async (text: string, type: 'code' | 'link') => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleBackdropClick}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-green-900/50 to-blue-900/50 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-green-900/90 p-8 shadow-2xl ring-1 ring-white/20"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
            
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute -right-2 -top-2 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {isExistingUser ? 'Welcome Back! 🎉' : 'Welcome to Livetell! 🎉'}
              </h3>
              
              <p className="text-green-100 mb-6">
                Share Livetell with your friends and help them get early access to our platform.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => copyToClipboard(referralCode, 'code')}
                  className={`w-full text-left transition-all duration-200 ${
                    copied === 'code' 
                      ? 'bg-gradient-to-br from-green-900/40 to-green-800/20 ring-1 ring-green-500/30' 
                      : 'bg-gradient-to-br from-black/40 to-black/20 ring-1 ring-white/20 hover:ring-white/30 hover:from-black/50'
                  } p-4 rounded-xl group relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Your Referral Code</span>
                    <div className="flex items-center gap-2">
                      {copied === 'code' && (
                        <span className="text-green-400 text-sm">Copied!</span>
                      )}
                      <span className="text-white/60 group-hover:text-white">
                        {copied === 'code' ? <Check size={16} /> : <Copy size={16} />}
                      </span>
                    </div>
                  </div>
                  <code className="text-lg text-blue-300 font-mono tracking-wider">{referralCode}</code>
                </button>

                <button
                  onClick={() => copyToClipboard(referralLink, 'link')}
                  className={`w-full text-left transition-all duration-200 ${
                    copied === 'link'
                      ? 'bg-gradient-to-br from-green-900/40 to-green-800/20 ring-1 ring-green-500/30'
                      : 'bg-gradient-to-br from-black/40 to-black/20 ring-1 ring-white/20 hover:ring-white/30 hover:from-black/50'
                  } p-4 rounded-xl group relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Referral Link</span>
                    <div className="flex items-center gap-2">
                      {copied === 'link' && (
                        <span className="text-green-400 text-sm">Copied!</span>
                      )}
                      <span className="text-white/60 group-hover:text-white">
                        {copied === 'link' ? <Check size={16} /> : <Copy size={16} />}
                      </span>
                    </div>
                  </div>
                  <div className="text-blue-300 text-sm break-all font-mono">
                    {referralLink}
                  </div>
                </button>

                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-4 rounded-xl ring-1 ring-blue-500/30">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                    <p className="text-sm text-blue-100">
                      Need to access your referral info later? Simply try signing up with the same email again, 
                      and we&apos;ll show you your referral details anytime you need them!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 