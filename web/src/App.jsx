import { useEffect, useState } from 'react'
import { Moon, Sun, Search, ShoppingCart, User } from 'lucide-react'
import Hero from './components/Hero.jsx'

export default function App() {
  const [tema, setTema] = useState('light')

  // Aplica/remove a classe .dark no <html> conforme o tema
  useEffect(() => {
    const html = document.documentElement
    if (tema === 'dark') html.classList.add('dark')
    else html.classList.remove('dark')
  }, [tema])

  const alternarTema = () => setTema(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <div className="min-h-screen" style={{ background: 'var(--cor-fundo)' }}>

      {/* ==========================================
          HEADER
          ========================================== */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'var(--cor-card)',
          borderBottom: '1px solid var(--cor-borda)'
        }}
      >
        <div className="container-app flex items-center justify-between h-16 gap-3">

          {/* Logo + Nome (depois o admin troca aqui) */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: 'var(--cor-primaria)' }}
            >
              T
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Trust<span style={{ color: 'var(--cor-primaria)' }}>Market</span>
            </span>
          </div>

          {/* Botões à direita */}
          <div className="flex items-center gap-2">

            {/* Busca */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            {/* Tema claro/escuro */}
            <button
              onClick={alternarTema}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Alternar tema"
            >
              {tema === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Carrinho */}
            <button
              className="w-10 h-10 rounded-full items-center justify-center hidden sm:flex"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
            </button>

            {/* Entrar */}
            <button className="px-5 h-10 rounded-full font-semibold text-white flex items-center gap-2 bg-primaria transition-all">
              <User size={16} />
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          HOME
          ========================================== */}
      <main>
        {/* Banner/Hero com carrossel animado */}
        <Hero />
      </main>

    </div>
  )
}
