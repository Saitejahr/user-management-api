import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      )
      const token = response.data.token
      localStorage.setItem('token', token) // Save token to localStorage
      navigate('/profile')
      toast.success('Login successful')
    } catch (error) {
      toast.error('Error during login')
      console.error('Error during login:', error.response.data)
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
