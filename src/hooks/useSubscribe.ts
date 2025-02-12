import { useState, ChangeEvent, FormEvent } from 'react'

interface SubscribeState {
  email: string
  referralCode: string
  isEmailValid: boolean
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
  showReferralInput: boolean
  successModalOpen: boolean
  userReferralCode: string | null
}

export function useSubscribe() {
  const [state, setState] = useState<SubscribeState>({
    email: '',
    referralCode: '',
    isEmailValid: false,
    status: 'idle',
    message: '',
    showReferralInput: false,
    successModalOpen: false,
    userReferralCode: null
  })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setState(prev => ({
      ...prev,
      email,
      isEmailValid: validateEmail(email)
    }))
  }

  const handleReferralCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      referralCode: e.target.value
    }))
  }

  const toggleReferralInput = () => {
    setState(prev => ({
      ...prev,
      showReferralInput: !prev.showReferralInput
    }))
  }

  const closeSuccessModal = () => {
    setState(prev => ({
      ...prev,
      successModalOpen: false
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!state.isEmailValid) return

    setState(prev => ({ ...prev, status: 'loading' }))

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.email,
          referralCode: state.referralCode || undefined
        })
      })

      const data = await response.json()

      if (data.success && data.referralCode) {
        setState(prev => ({
          ...prev,
          status: 'success',
          message: data.message,
          successModalOpen: true,
          userReferralCode: data.referralCode,
          email: '',
          referralCode: '',
          showReferralInput: false,
          isEmailValid: false
        }))
      } else {
        setState(prev => ({
          ...prev,
          status: 'error',
          message: data.message
        }))
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      }))
    }
  }

  return {
    ...state,
    handleEmailChange,
    handleReferralCodeChange,
    handleSubmit,
    toggleReferralInput,
    closeSuccessModal
  }
} 