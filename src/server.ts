import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'

import userRoutes from './routes/user.route'
import kategoriRoutes from './routes/kategori.route'
import authRoutes from './routes/auth.route'

dotenv.config()
const app = express()

// Middleware keamanan dan utilitas
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())

// Routing
app.use('/users', userRoutes)
app.use('/kategori', kategoriRoutes)
app.use('/auth', authRoutes)

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err.message)
  res.status(500).json({ error: 'Internal Server Error', message: err.message })
})

export default app