import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail, Lock, Eye, EyeOff, AlertCircle, Loader2,
  ShieldCheck, ArrowRight, Check
} from 'lucide-react'
import { auth, salvarToken } from '../api.js'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [lembrar, setLembrar] = useState(true)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const formularioValido = emailValido && password.length >= 1

  async function enviar(e) {
    e.preventDefault()
    if (!formularioValido || carregando) return

    setCarregando(true)
    setErro('')

    try {
      const resposta = await auth.entrar(email, password)
      salvarToken(resposta.token)
      navigate('/')
    } catch (err) {
      setErro(err.message || 'E-mail ou senha incorretos')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-xl"
            style={{ background: 'var(--cor-primaria)' }}
          >
            T
          </div>
          <span className="font-bold text-2xl">
            Trust<span style={{ color: 'var(--cor-primaria)' }}>Market</span>
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: 'var(--cor-card)',
            border: '1px solid var(--cor-borda)',
          }}
        >
          <h1 className="text-2xl font-bold mb-1">Bem-vindo de volta</h1>
          <p className="text-sm texto-suave mb-6">
            Entre na sua conta pra continuar
          </p>

          {erro && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-3 rounded-xl mb-4 text-sm"
              style={{ background: '#fee2e2', color: '#991b1b' }}
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{erro}</span>
            </motion.div>
          )}

          <form onSubmit={enviar} className="flex flex-col gap-4">

            {/* E-mail */}
            <div>
              <label className="text-xs font-medium mb-1.5 block">E-mail</label>
              <div
                className="flex items-center gap-2 rounded-xl px-3 h-11 transition-all"
                style={{
                  background: 'var(--cor-fundo-alt)',
                  border: `1px solid ${email && emailValido ? '#16a34a' : 'var(--cor-borda)'}`,
                }}
              >
                <Mail size={16} style={{ color: 'var(--cor-texto-suave)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErro('')
                  }}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="flex-1 bg-transparent outline-none text-sm w-full"
                />
                {email && emailValido && (
                  <Check size={16} style={{ color: '#16a34a' }} />
                )}
              </div>
            </div>

            {/* Senha */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium">Senha</label>
                <Link
                  to="/recuperar-senha"
                  className="text-xs text-primaria font-medium hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <div
                className="flex items-center gap-2 rounded-xl px-3 h-11"
                style={{
                  background: 'var(--cor-fundo-alt)',
                  border: '1px solid var(--cor-borda)',
                }}
              >
                <Lock size={16} style={{ color: 'var(--cor-texto-suave)' }} />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErro('')
                  }}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  className="flex-1 bg-transparent outline-none text-sm w-full"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="shrink-0"
                  tabIndex={-1}
                >
                  {mostrarSenha ? (
                    <EyeOff size={16} style={{ color: 'var(--cor-texto-suave)' }} />
                  ) : (
                    <Eye size={16} style={{ color: 'var(--cor-texto-suave)' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Lembrar */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-xs texto-suave">Manter conectado</span>
            </label>

            {/* Botão */}
            <motion.button
              type="submit"
              disabled={!formularioValido || carregando}
              whileHover={formularioValido ? { scale: 1.02 } : {}}
              whileTap={formularioValido ? { scale: 0.98 } : {}}
              className="w-full h-12 rounded-full text-white font-bold flex items-center justify-center gap-2 mt-2 transition-opacity"
              style={{
                background: 'var(--cor-primaria)',
                opacity: !formularioValido || carregando ? 0.5 : 1,
                cursor: !formularioValido || carregando ? 'not-allowed' : 'pointer',
              }}
            >
              {carregando ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--cor-borda)' }} />
            <span className="text-xs texto-suave">ou</span>
            <div className="flex-1 h-px" style={{ background: 'var(--cor-borda)' }} />
          </div>

          {/* Link pra cadastro */}
          <p className="text-center text-sm texto-suave">
            Não tem conta?{' '}
            <Link to="/cadastro" className="text-primaria font-semibold hover:underline">
              Criar agora
            </Link>
          </p>
        </div>

        {/* Selo segurança */}
        <div className="flex items-center justify-center gap-2 text-xs texto-suave mt-6">
          <ShieldCheck size={14} />
          Conexão protegida e criptografada
        </div>

      </motion.div>
    </div>
  )
}
