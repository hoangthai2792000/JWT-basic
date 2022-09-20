const CustomError = require('../error/customError')
const errorHandlerMiddleware = async (err, req, res, next) => {
  // console.log(err)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(500)
    .json({ msg: 'Something went wrong, please try again later' })
}

module.exports = errorHandlerMiddleware
