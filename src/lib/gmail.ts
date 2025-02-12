import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { getWelcomeEmailTemplate } from './email-templates'

const SCOPES = ['https://www.googleapis.com/auth/gmail.send']

async function getGmailService() {
  const oauth2Client = new OAuth2Client(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  )

  // Set credentials using refresh token
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  })

  return google.gmail({ version: 'v1', auth: oauth2Client })
}

export async function sendWelcomeEmail(to: string, referralCode: string, isExistingUser = false) {
  try {
    const gmail = await getGmailService()
    
    const emailContent = getWelcomeEmailTemplate({ 
      email: to, 
      referralCode,
      isExistingUser
    })

    const encodedEmail = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
      },
    })
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
} 