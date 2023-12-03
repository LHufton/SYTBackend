import {
  hashPassword,
  comparePassword,
  createToken
} from '../middleware/index.js'

import User from '../models/User.js'

export const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    let passwordDigest = await hashPassword(password)
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      const user = await User.create({ name, email, passwordDigest })
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await comparePassword(user.passwordDigest, password)
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

export const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.user_id)
    let matched = await comparePassword(user.passwordDigest, oldPassword)
    if (matched) {
      let passwordDigest = await hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

export const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}
