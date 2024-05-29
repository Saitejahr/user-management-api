import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/Signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        formData
      )
      console.log(response.data)
      toast.success('Signup successful, OTP sent to email')
      setIsOtpSent(true)
    } catch (error) {
      console.error('Error during signup:', error.response.data)
      toast.error('Signup failed')
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/verify-otp',
        { email: formData.email, otp }
      )
      console.log(response.data)
      toast.success('OTP verified successfully')
      navigate('/login')
    } catch (error) {
      console.error('Error during OTP verification:', error.response.data)
      toast.error('OTP verification failed')
    }
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={isOtpSent ? handleVerifyOtp : handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        {isOtpSent && (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
          />
        )}
        <button type="submit">{isOtpSent ? 'Verify OTP' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Signup
