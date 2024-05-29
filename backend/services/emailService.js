import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config()
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_PASS,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('OTP email sent')
  } catch (error) {
    console.error('Error sending OTP email:', error)
  }
}
