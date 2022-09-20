const CustomError = require('../error/customError')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  // console.log(req.headers)
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('No token provided', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    const { id, username } = decoded
    req.user = { id, username }

    next()
  } catch (error) {
    throw new CustomError('Not authorized to access this site', 401)
  }
}

module.exports = authMiddleware
