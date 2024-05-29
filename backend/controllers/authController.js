import User from '../models/userModel.js'
import { generateOTP, sendOTP } from '../services/emailService.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const signup = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = bcrypt.hashSync(password, 10)
    const otp = generateOTP()
    const otpExpires = Date.now() + 10 * 60 * 1000 // OTP expires in 10 minutes
    user = new User({ name, email, password: hashedPassword, otp, otpExpires })
    await user.save()
    await sendOTP(email, otp)
    res.status(200).json({ message: 'Signup successful, OTP sent to email' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const payload = { id: user.id } // Modify payload to include user ID directly
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or OTP' })
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid email or OTP' })
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP expired' })
    }
    user.isVerified = true
    user.otp = undefined
    user.otpExpires = undefined
    await user.save()
    res.status(200).json({ message: 'Email verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
