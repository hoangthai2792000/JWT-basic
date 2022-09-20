const CustomError = require('../error/customError')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomError('Please provide username and password', 400)
  }

  const id = new Date().getDate() // just for testing, normally provided by DB
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  // console.log(req.user)

  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your ID is ${req.user.id}`,
  })
}

module.exports = { login, dashboard }
