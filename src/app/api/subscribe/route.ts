import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/mongodb'
import { nanoid } from 'nanoid'
import config from '@/config/index.json'

export async function POST(req: Request) {
  try {
    const { email, referralCode } = await req.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(config.mongodb.dbName)
    const waitlist = db.collection(config.mongodb.collections.waitlist)

    // Check if email already exists
    const existingUser = await waitlist.findOne({ email })
    
    if (existingUser) {
      // If user exists and already has a referrer, just return their info
      if (existingUser.referredBy) {
        return NextResponse.json({
          success: true,
          message: "Welcome back! Here's your referral information.",
          referralCode: existingUser.referralCode,
          isExistingUser: true
        })
      }

      // If user exists but has no referrer, and a valid referral code is provided, update their entry
      if (referralCode) {
        const referrer = await waitlist.findOne({ referralCode })
        if (referrer) {
          // Update referrer's stats
          await waitlist.updateOne(
            { referralCode },
            { 
              $inc: { 
                referralCount: 1,
                points: config.referral.rewards.referrer.points
              }
            }
          )

          // Update existing user with referral info
          await waitlist.updateOne(
            { email },
            {
              $set: {
                referredBy: referrer.email,
                points: config.referral.rewards.referee.points
              }
            }
          )

          return NextResponse.json({
            success: true,
            message: "Your referral code has been successfully applied!",
            referralCode: existingUser.referralCode,
            isExistingUser: true
          })
        }
      }

      return NextResponse.json({
        success: true,
        message: "Welcome back! Here's your referral information.",
        referralCode: existingUser.referralCode,
        isExistingUser: true
      })
    }

    // Generate new referral code for new users
    const newReferralCode = nanoid(config.referral.codeLength)

    // Initialize user data
    const userData = {
      email,
      referralCode: newReferralCode,
      joinedAt: new Date(),
      referredBy: null,
      referralCount: 0,
      points: 0
    }

    // If referral code provided for new user, validate and update points
    if (referralCode) {
      const referrer = await waitlist.findOne({ referralCode })
      if (referrer) {
        // Update referrer's stats
        await waitlist.updateOne(
          { referralCode },
          { 
            $inc: { 
              referralCount: 1,
              points: config.referral.rewards.referrer.points
            }
          }
        )

        // Update new user's referral data
        userData.referredBy = referrer.email
        userData.points = config.referral.rewards.referee.points
      }
    }

    // Add new user to waitlist
    await waitlist.insertOne(userData)

    return NextResponse.json({ 
      success: true, 
      message: "Thank you for joining our waitlist! Here's your referral code to share with friends.",
      referralCode: newReferralCode,
      isExistingUser: false
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: "Something went wrong. Please try again." 
      },
      { status: 500 }
    )
  }
} 