/* eslint-disable no-console */
import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { route } from './routes/index.js'
import cors from 'cors'

const START_SERVER = () => {
  const app = express()
  app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
  }))
  app.use(express.json())
  app.use(cookieParser())
  app.use('/api', route)
  // app.use((err, req, res, next) => {
  //   const statusCode = err.statusCode || 500
  //   const message = err.message || 'Internal server error'

  //   res.status(statusCode).json({
  //     success: false,
  //     statusCode,
  //     message
  //   })
  // })

  app.listen(process.env.PORT, () => {
    console.log('server is running at port 3000')
  })
}


console.log('Connecting to MongoDB CLoud Atlas...')

mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log('connected to mongodb')
    START_SERVER()
  })
  .catch((err) => {
    console.error('Error connecting to MongoDb Atlas', err)
  })