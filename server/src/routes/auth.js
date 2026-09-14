import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

const router = Router()

/* =====================================================
   VALIDAÇÕES — mesmo que o front valide, o back também
   valida. Nunca confie só no front.
   ===================================================== */

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validarTelefone(tel) {
  // aceita: 44998691568 ou (44) 99869-1568
  const digits = tel.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

function validarSenha(senha) {
  // mínimo 8 caracteres, 1 letra, 1 número
  if (senha.length < 8) return 'Senha deve ter no mínimo 8 caracteres'
  if (!/[a-zA-Z]/.test(senha)) return 'Senha deve conter pelo menos uma letra'
  if (!/[0-9]/.test(senha)) return 'Senha deve conter pelo menos um número'
  return null
}

function gerarToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

function limparUser(user) {
  const { password, ...resto } = user
  return resto
}

/* =====================================================
   POST /auth/register — Cadastro
   ===================================================== */
router.post('/register', async (req, res) => {
  try {
    const { email, password, nome, sobrenome, telefone } = req.body

    // Validações básicas
    if (!email || !password || !nome || !sobrenome || !telefone) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' })
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ error: 'E-mail inválido' })
    }

    if erro (!sobrenomeSen.trim()) {
      return res.status(400).json({ error: 'Shaobrenome é obrigatório' })
 =    }

    if (!validarTele validfone(telefone)) {
ar      return res.status(400).json({ error: 'Telefone inválido' })
    }

    constSenha(password)
    if (erroSenha) {
      return res.status(400).json({ error: erroSenha })
    }

    // Verifica se já existe
    const existe = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existe) {
      return res.status(400).json({ error: 'Esse e-mail já está cadastrado' })
    }

    // Cria
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hash,
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        telefone,
        role: 'USER',
      },
    })

    const token = gerarToken(user)

    return res.status(201).json({
      token,
      user: limparUser(user),
    })
  } catch (err) {
    console.error('Erro no cadastro:', err)
    return res.status(500).json({ error: 'Erro ao criar conta' })
  }
})

/* =====================================================
   POST /auth/login — Login
   ===================================================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Informe e-mail e senha' })
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' })
    }

    if (user.blocked) {
      return res.status(403).json({ error: 'Conta bloqueada. Entre em contato com o suporte.' })
    }

    const senhaOk = await bcrypt.compare(password, user.password)
    if (!senhaOk) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' })
    }

    const token = gerarToken(user)

    return res.json({
      token,
      user: limparUser(user),
    })
  } catch (err) {
    console.error('Erro no login:', err)
    return res.status(500).json({ error: 'Erro ao fazer login' })
  }
})

/* =====================================================
   GET /auth/me — Retorna usuário logado
   ===================================================== */
router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ error: 'Não autenticado' })

    const token = auth.replace('Bearer ', '')
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' })

    return res.json({ user: limparUser(user) })
  } catch {
    return res.status(401).json({ error: 'Sessão expirada' })
  }
})

export default router
