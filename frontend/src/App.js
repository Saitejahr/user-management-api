import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Router>
      <div>
        <h1>User Management System</h1>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
