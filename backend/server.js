import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// env initialization
dotenv.config()

// mongodb connection
connectDB()

const app = express()

// bodyparser
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running....')
})

// initialize routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// 404 middleware
app.use(notFound)

// error middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`.yellow
      .bold
  )
)
