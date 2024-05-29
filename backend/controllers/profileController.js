import User from '../models/userModel.js'

export const getProfile = async (req, res) => {
  try {
    console.log('User ID in getProfile:', req.user.id)
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      console.log('User not found for ID:', req.user.id)
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Server error in getProfile:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateProfile = async (req, res) => {
  const { name, email } = req.body
  try {
    console.log('User ID in updateProfile:', req.user.id)
    let user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.name = name || user.name
    user.email = email || user.email
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    console.error('Server error in updateProfile:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    console.log('User ID in deleteProfile:', req.user.id)
    const user = await User.findByIdAndDelete(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Server error in deleteProfile:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}
