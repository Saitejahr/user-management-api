import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    console.log('No token provided')
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      console.log('Token is not valid:', err)
      return res.status(403).json({ message: 'Token is not valid' })
    }
    req.user = user
    console.log('User ID extracted from token:', user.id)
    next()
  })
}

export default authMiddleware
