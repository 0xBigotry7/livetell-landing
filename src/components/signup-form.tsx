"use client"

import { motion } from "framer-motion"
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSubscribe } from "@/hooks/useSubscribe"
import { SignupSuccessModal } from "./signup-success-modal"

export function SignupForm() {
  const {
    email,
    referralCode,
    isEmailValid,
    status,
    message,
    showReferralInput,
    successModalOpen,
    userReferralCode,
    handleEmailChange,
    handleReferralCodeChange,
    handleSubmit,
    toggleReferralInput,
    closeSuccessModal,
  } = useSubscribe()

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            disabled={status === 'loading'}
            className={`w-full bg-white/10 text-white placeholder:text-gray-400 border-2 transition-colors focus:bg-white/20 ${
              email ? (isEmailValid ? "border-green-500" : "border-red-500") : "border-transparent"
            }`}
            style={{ color: 'white' }}
          />
          {email && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl ${
                isEmailValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {isEmailValid ? "✓" : "✗"}
            </motion.span>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={toggleReferralInput}
            className="text-sm text-blue-300 hover:text-blue-100 transition-colors flex items-center gap-1"
          >
            {showReferralInput ? (
              <>Hide referral code <ChevronUp size={14} /></>
            ) : (
              <>Have a referral code? <ChevronDown size={14} /></>
            )}
          </button>

          {showReferralInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2"
            >
              <Input
                type="text"
                placeholder="Enter referral code"
                value={referralCode}
                onChange={handleReferralCodeChange}
                disabled={status === 'loading'}
                className="w-full bg-white/10 text-white placeholder:text-gray-400 border-transparent transition-colors focus:bg-white/20"
                style={{ color: 'white' }}
              />
            </motion.div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isEmailValid || status === 'loading'}
          className={`w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 ${
            isEmailValid && status !== 'loading' ? "opacity-100 scale-100" : "opacity-50 scale-95"
          }`}
        >
          {status === 'loading' ? (
            <>Loading...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Join Waitlist</>
          )}
        </Button>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message}
          </motion.p>
        )}
      </form>

      {userReferralCode && (
        <SignupSuccessModal
          isOpen={successModalOpen}
          onClose={closeSuccessModal}
          referralCode={userReferralCode}
        />
      )}
    </div>
  )
} 