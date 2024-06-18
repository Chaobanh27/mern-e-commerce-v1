/* eslint-disable no-console */
import bcrypt from 'bcryptjs'
import { userModel } from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email) {
      throw new Error('Please provide email')
    }
    if (!password) {
      throw new Error('Please provide password')
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (checkPassword) {
      const tokenData = {
        _id : user._id,
        email : user.email
      }
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 })

      const tokenOption = {
        httpOnly : true,
        secure : true
      }

      res.cookie('token', token, tokenOption).status(200).json({
        message : 'Login successfully',
        data : token,
        success : true,
        error : false
      })

    }
    else {
      throw new Error('Please check Password')
    }
  } catch (err) {
    res.json({
      message : err.message || err,
      error : true,
      success : false
    })
  }

}

export const SignUp = async (req, res) => {
  try {
    const { email, password, name } = req.body

    const user = await userModel.findOne({ email })

    if (user) {
      throw new Error('Already user exits.')
    }

    if (!email) {
      throw new Error('Please provide email')
    }
    if (!password) {
      throw new Error('Please provide password')
    }
    if (!name) {
      throw new Error('Please provide name')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(password, salt)

    if (!hashPassword) {
      throw new Error('Something is wrong')
    }

    const payload = {
      ...req.body,
      role : 'GENERAL',
      password : hashPassword
    }

    const userData = new userModel(payload)
    const saveUser = await userData.save()

    res.status(201).json({
      data : saveUser,
      success : true,
      error : false,
      message : 'User created Successfully!'
    })


  } catch (err) {
    res.json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}


export const Logout = (req, res) => {
  try {
    res.clearCookie('token')

    res.json({
      message : 'Logged out successfully',
      error : false,
      success : true,
      data : []
    })
  } catch (err) {
    res.json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}

