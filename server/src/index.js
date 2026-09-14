import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '5mb' }))

// Rota de teste
app.get('/', (_, res) => {
  res.json({ ok: true, service: 'marketplace-api', versao: '1.0' })
})

// Rotas
app.use('/auth', authRoutes)

// Inicia
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`)
})
