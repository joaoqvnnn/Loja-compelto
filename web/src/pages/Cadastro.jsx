import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Check, X,
  AlertCircle, Loader2, ShieldCheck, ArrowRight
} from 'lucide-react'
import { auth, salvarToken } from '../api.js'

/* =========================================================
   MÁSCARA DE TELEFONE
   44998691568  →  (44) 99869-1568
   4498691568   →  (44) 9869-1568
   ========================================================= */
function mascararTelefone(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)

  if (digitos.length === 0) return ''
  if (digitos.length <= 2) return `(${digitos}`
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

/* =========================================================
   FORÇA DA SENHA
   Retorna: nível (0-4), cor, texto
   ========================================================= */
function calcularForcaSenha(senha) {
  if (!senha) return { nivel: 0, cor: '#94a3b8', texto: '' }

  let pontos = 0
  if (senha.length >= 8) pontos++
  if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) pontos++
  if (/[0-9]/.test(senha)) pontos++
  if (/[^a-zA-Z0-9]/.test(senha)) pontos++

  if (pontos <= 1) return { nivel: 1, cor: '#dc2626', texto: 'Fraca' }
  if (pontos === 2) return { nivel: 2, cor: '#f59e0b', texto: 'Média' }
  if (pontos === 3) return { nivel: 3, cor: '#16a34a', texto: 'Forte' }
  return { nivel: 4, cor: '#16a34a', texto: 'Muito forte' }
}

/* =========================================================
   SUGESTÕES DE E-MAIL
   Digita "joao@gmail" → mostra @gmail.com
   Digita "joao@" → sugere gmail, icloud, outlook, hotmail
   ========================================================= */
const DOMINIOS = ['gmail.com', 'icloud.com', 'outlook.com', 'hotmail.com']

function sugerirEmails(valor) {
  if (!valor || !valor.includes('@')) return []

  const [local, dominio] = valor.split('@')
  if (!local) return []

  if (dominio && !DOMINIOS.some(d => d.startsWith(dominio.toLowerCase()))) {
    return []
  }

  if (!dominio) {
    return DOMINIOS.map(d => `${local}@${d}`)
  }

  return DOMINIOS
    .filter(d => d.startsWith(dominio.toLowerCase()) && d !== dominio.toLowerCase())
    .map(d => `${local}@${d}`)
}

/* =========================================================
   COMPONENTE
   ========================================================= */
export default function Cadastro() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    password: '',
    confirmar: '',
  })

  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [aceitouTermos, setAceitouTermos] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erroServidor, setErroServidor] = useState('')

  const forca = useMemo(() => calcularForcaSenha(form.password), [form.password])
  const sugestoes = useMemo(() => sugerirEmails(form.email), [form.email])

  /* Validações visuais em tempo real */
  const senhaTemMinimo = form.password.length >= 8
  const senhaTemLetra = /[a-zA-Z]/.test(form.password)
  const senhaTemNumero = /[0-9]/.test(form.password)
  const senhasIguais = form.password && form.password === form.confirmar
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const telefoneValido = form.telefone.replace(/\D/g, '').length >= 10

  const formularioValido =
    form.nome.trim() &&
    form.sobrenome.trim() &&
    emailValido &&
    telefoneValido &&
    senhaTemMinimo &&
    senhaTemLetra &&
    senhaTemNumero &&
    senhasIguais &&
    aceitouTermos

  /* Atualiza campo */
  const setCampo = (campo, valor) => {
    setErroServidor('')
    if (campo === 'telefone') {
      valor = mascararTelefone(valor)
    }
    setForm(f => ({ ...f, [campo]: valor }))
  }

  /* Envia */
  async function enviar(e) {
    e.preventDefault()
    if (!formularioValido || carregando) return

    setCarregando(true)
    setErroServidor('')

    try {
      const resposta = await auth.cadastrar({
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        telefone: form.telefone,
        password: form.password,
      })

      salvarToken(resposta.token)
      navigate('/')
    } catch (err) {
      setErroServidor(err.message || 'Erro ao criar conta')
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
          <h1 className="text-2xl font-bold mb-1">Criar conta</h1>
          <p className="text-sm texto-suave mb-6">
            Leva menos de 1 minuto
          </p>

          {erroServidor && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-3 rounded-xl mb-4 text-sm"
              style={{ background: '#fee2e2', color: '#991b1b' }}
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{erroServidor}</span>
            </motion.div>
          )}

          <form onSubmit={enviar} className="flex flex-col gap-4">

            {/* Nome + Sobrenome */}
            <div className="grid grid-cols-2 gap-3">
              <Campo
                label="Nome"
                Icone={User}
                valor={form.nome}
                onChange={(v) => setCampo('nome', v)}
                placeholder="João"
                autoComplete="given-name"
              />
              <Campo
                label="Sobrenome"
                Icone={User}
                valor={form.sobrenome}
                onChange={(v) => setCampo('sobrenome', v)}
                placeholder="Silva"
                autoComplete="family-name"
                obrigatorio
              />
            </div>

            {/* E-mail com sugestões */}
            <div className="relative">
              <Campo
                label="E-mail"
                Icone={Mail}
                valor={form.email}
                onChange={(v) => {
                  setCampo('email', v)
                  setMostrarSugestoes(true)
                }}
                onBlur={() => setTimeout(() => setMostrarSugestoes(false), 200)}
                placeholder="seu@email.com"
                autoComplete="email"
                type="email"
                valido={emailValido}
              />

              {/* Sugestões de domínio */}
              {mostrarSugestoes && sugestoes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20"
                  style={{
                    background: 'var(--cor-card)',
                    border: '1px solid var(--cor-borda)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                >
                  {sugestoes.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setCampo('email', s)
                        setMostrarSugestoes(false)
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-fundo-alt transition-colors flex items-center gap-2"
                      style={{ borderBottom: i < sugestoes.length - 1 ? '1px solid var(--cor-borda)' : 'none' }}
                    >
                      <Mail size={14} style={{ color: 'var(--cor-primaria)' }} />
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Telefone com máscara */}
            <Campo
              label="Telefone"
              Icone={Phone}
              valor={form.telefone}
              onChange={(v) => setCampo('telefone', v)}
              placeholder="(44) 99999-9999"
              autoComplete="tel"
              type="tel"
              valido={telefoneValido}
            />

            {/* Senha */}
            <div>
              <Campo
                label="Senha"
                Icone={Lock}
                valor={form.password}
                onChange={(v) => setCampo('password', v)}
                placeholder="Mínimo 8 caracteres"
                tipoMostrarSenha={mostrarSenha}
                setMostrarSenha={setMostrarSenha}
                type={mostrarSenha ? 'text' : 'password'}
                autoComplete="new-password"
              />

              {/* Barra de força */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5 mb-1">
                    {[1, 2, 3, 4].map(n => (
                      <div
                        key={n}
                        className="flex-1 rounded-full transition-all"
                        style={{
                          background: n <= forca.nivel ? forca.cor : 'var(--cor-borda)',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium" style={{ color: forca.cor }}>
                    {forca.texto}
                  </span>
                </div>
              )}

              {/* Requisitos */}
              {form.password && (
                <div className="mt-2 flex flex-col gap-1">
                  <Requisito ok={senhaTemMinimo} texto="Pelo menos 8 caracteres" />
                  <Requisito ok={senhaTemLetra} texto="Contém uma letra" />
                  <Requisito ok={senhaTemNumero} texto="Contém um número" />
                </div>
              )}
            </div>

            {/* Confirmar senha */}
            <div>
              <Campo
                label="Confirmar senha"
                Icone={Lock}
                valor={form.confirmar}
                onChange={(v) => setCampo('confirmar', v)}
                placeholder="Digite novamente"
                tipoMostrarSenha={mostrarConfirmar}
                setMostrarSenha={setMostrarConfirmar}
                type={mostrarConfirmar ? 'text' : 'password'}
                autoComplete="new-password"
              />

              {form.confirmar && !senhasIguais && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#dc2626' }}>
                  <X size={12} /> As senhas não coincidem
                </p>
              )}
              {senhasIguais && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#16a34a' }}>
                  <Check size={12} /> Senhas coincidem
                </p>
              )}
            </div>

            {/* Termos */}
            <label className="flex items-start gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={aceitouTermos}
                onChange={(e) => setAceitouTermos(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-blue-600"
              />
              <span className="text-xs texto-suave leading-relaxed">
                Li e aceito os{' '}
                <a href="/termos" className="text-primaria font-medium hover:underline">Termos de uso</a>
                {' '}e a{' '}
                <a href="/privacidade" className="text-primaria font-medium hover:underline">Política de privacidade</a>
              </span>
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
                  Criando conta...
                </>
              ) : (
                <>
                  Criar minha conta
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Link pra login */}
          <p className="text-center text-sm texto-suave mt-6">
            Já tem conta?{' '}
            <Link to="/entrar" className="text-primaria font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>

        {/* Selo segurança */}
        <div className="flex items-center justify-center gap-2 text-xs texto-suave mt-6">
          <ShieldCheck size={14} />
          Seus dados são protegidos com criptografia
        </div>

      </motion.div>
    </div>
  )
}

/* =========================================================
   COMPONENTE DE CAMPO (input reutilizável)
   ========================================================= */
function Campo({
  label, Icone, valor, onChange, onBlur, placeholder,
  type = 'text', autoComplete, obrigatorio,
  valido, tipoMostrarSenha, setMostrarSenha,
}) {
  return (
    <div>
      <label className="text-xs font-medium mb-1.5 block">
        {label}
        {obrigatorio && <span style={{ color: '#dc2626' }}> *</span>}
      </label>

      <div
        className="flex items-center gap-2 rounded-xl px-3 h-11 transition-all"
        style={{
          background: 'var(--cor-fundo-alt)',
          border: `1px solid ${valido === true ? '#16a34a' : 'var(--cor-borda)'}`,
        }}
      >
        {Icone && <Icone size={16} style={{ color: 'var(--cor-texto-suave)' }} />}

        <input
          type={type}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent outline-none text-sm w-full"
        />

        {/* Botão mostrar/ocultar senha */}
        {setMostrarSenha !== undefined && (
          <button
            type="button"
            onClick={() => setMostrarSenha(!tipoMostrarSenha)}
            className="shrink-0"
            tabIndex={-1}
          >
            {tipoMostrarSenha ? (
              <EyeOff size={16} style={{ color: 'var(--cor-texto-suave)' }} />
            ) : (
              <Eye size={16} style={{ color: 'var(--cor-texto-suave)' }} />
            )}
          </button>
        )}

        {/* Ícone de check quando válido */}
        {valido === true && (
          <Check size={16} style={{ color: '#16a34a' }} />
        )}
      </div>
    </div>
  )
}

/* =========================================================
   REQUISITO DE SENHA (linha com check/x)
   ========================================================= */
function Requisito({ ok, texto }) {
  return (
    <div className="flex items-center gap-1.5 text-xs" style={{ color: ok ? '#16a34a' : 'var(--cor-texto-suave)' }}>
      {ok ? <Check size={12} /> : <X size={12} />}
      {texto}
    </div>
  )
}
