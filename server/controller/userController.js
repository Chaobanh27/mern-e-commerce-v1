/* eslint-disable no-console */
import { userModel } from '../models/userModel.js'


export const userDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId)

    if (!user) {
      throw new Error('could not find user')
    }
    res.status(200).json({
      data : user,
      error : false,
      success : true,
      message : 'User details'
    })

  } catch (err) {
    res.status(400).json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}


export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find()

    res.json({
      message : 'All User ',
      data : allUsers,
      success : true,
      error : false
    })
  } catch (err) {
    res.status(400).json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const sessionUser = req.userId

    console.log(req.body)

    const { userId, email, name, role } = req.body

    const payload = {
      ...( email && { email : email }),
      ...( name && { name : name }),
      ...( role && { role : role })
    }

    const user = await userModel.findById(sessionUser)

    console.log('user.role', user.role)


    const updateUser = await userModel.findByIdAndUpdate(userId, payload)

    res.json({
      data : updateUser,
      message : 'User Updated',
      success : true,
      error : false
    })
  } catch (err) {
    res.status(400).json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}
