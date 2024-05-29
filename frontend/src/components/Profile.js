import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './styles/Profile.css'

import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProfile(response.data)
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      const response = await axios.put(
        'http://localhost:5000/api/profile',
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setProfile(response.data)
      setEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message)
    }
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      await axios.delete('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      localStorage.removeItem('token')
      toast.success('Profile deleted successfully')
      setProfile({ name: '', email: '' }) // Reset profile state
      navigate('/signup')
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message)
    }
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="profile-card">
      <h2>Profile Details</h2>
      <div>
        <label>Name: </label>
        {editing ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.name}</span>
        )}
      </div>
      <div>
        <label>Email: </label>
        {editing ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.email}</span>
        )}
      </div>
      {editing ? (
        <>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>Update Profile</button>
          <button onClick={handleDelete}>Delete Profile</button>
        </>
      )}
    </div>
  )
}

export default Profile
