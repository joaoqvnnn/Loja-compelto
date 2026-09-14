import { useEffect, useState } from 'react'
import { Moon, Sun, Search, ShoppingCart, User } from 'lucide-react'

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
          HEADER — versão inicial (depois vira editável)
          ========================================== */}
      <header
        className="sticky top-0 z-50 borda"
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
              className="w-10 h-10 rounded-full flex items-center justify-center borda"
              style={{ background: 'var(--cor-fundo-alt)' }}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            {/* Tema claro/escuro */}
            <button
              onClick={alternarTema}
              className="w-10 h-10 rounded-full flex items-center justify-center borda"
              style={{ background: 'var(--cor-fundo-alt)' }}
              aria-label="Alternar tema"
            >
              {tema === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Carrinho */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center borda hidden sm:flex"
              style={{ background: 'var(--cor-fundo-alt)' }}
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
            </button>

            {/* Entrar */}
            <button
              className="px-5 h-10 rounded-full font-semibold text-white flex items-center gap-2 bg-primaria transition-all"
            >
              <User size={16} />
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          CONTEÚDO — placeholder (Home completa vem nos
          próximos arquivos)
          ========================================== */}
      <main className="container-app py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Bem-vindo ao <span style={{ color: 'var(--cor-primaria)' }}>TrustMarket</span>
        </h1>
        <p className="texto-suave text-lg max-w-xl mx-auto">
          O header acima já está funcionando, com tema claro/escuro.
          Nas próximas etapas vamos montar banner, categorias, produtos,
          ofertas, FAQ, footer e o painel administrativo que controla tudo.
        </p>
      </main>

    </div>
  )
}
