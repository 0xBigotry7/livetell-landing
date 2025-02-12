import config from '@/config/index.json'

interface EmailTemplateProps {
  email: string
  referralCode: string
  isExistingUser?: boolean
}

export function getWelcomeEmailTemplate({ email, referralCode, isExistingUser }: EmailTemplateProps): string {
  const referralLink = `${config.app.url}?ref=${referralCode}`

  const referralSection = `
    <div style="background: #1e40af; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="color: white; margin: 0;">Your Referral Code: <strong>${referralCode}</strong></p>
      <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 14px;">Share this with friends to help them get early access!</p>
      <div style="margin-top: 12px;">
        <p style="color: white; margin: 0; font-size: 14px;">Your Referral Link:</p>
        <code style="display: block; background: rgba(0,0,0,0.2); padding: 8px; margin-top: 4px; border-radius: 4px; color: #93c5fd; font-size: 12px; word-break: break-all;">${referralLink}</code>
      </div>
    </div>
  `

  const accessNote = `
    <div style="background: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid rgba(59, 130, 246, 0.2);">
      <p style="color: #93c5fd; margin: 0; font-size: 14px;">
        <strong>💡 Pro Tip:</strong> Need to access your referral info later? Simply try signing up with this email again, 
        and we'll show you your referral details. Save this email for future reference!
      </p>
    </div>
  `

  return `
From: ${process.env.GMAIL_USER_EMAIL}
To: ${email}
Subject: ${isExistingUser ? 'Your Livetell Referral Information' : config.email.subjects.welcome}
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #2563eb; margin: 0;">${isExistingUser ? 'Welcome Back to Livetell! 🎉' : 'Welcome to Livetell! 🎉'}</h1>
      <p style="color: #666; font-size: 16px;">${isExistingUser ? 'Here\'s your referral information' : 'Your journey to smarter trading starts here'}</p>
    </div>

    ${referralSection}
    ${accessNote}

    <div style="margin: 25px 0;">
      <h2 style="color: #1e40af; font-size: 20px;">What's Next?</h2>
      <ul style="color: #4b5563; padding-left: 20px;">
        <li style="margin: 10px 0;">Share your referral code with friends</li>
        <li style="margin: 10px 0;">Get early access to our trading platform</li>
        <li style="margin: 10px 0;">Stay tuned for exclusive updates</li>
      </ul>
    </div>

    <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
      <h3 style="color: #2563eb; margin: 0 0 15px 0;">Connect With Us</h3>
      <p style="margin: 5px 0;">
        <a href="${config.social.twitter}" style="color: #2563eb; text-decoration: none;">Twitter</a> | 
        <a href="${config.social.telegram}" style="color: #2563eb; text-decoration: none;">Telegram</a> | 
        <a href="${config.social.github}" style="color: #2563eb; text-decoration: none;">GitHub</a>
      </p>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">
        You're receiving this email because you joined the Livetell waitlist.<br>
        If you didn't sign up, please ignore this email.
      </p>
    </div>
  </div>
</body>
</html>
`
} 