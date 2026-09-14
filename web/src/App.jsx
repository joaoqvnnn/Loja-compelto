import { useEffect, useState } from 'react'
import { Moon, Sun, Search, ShoppingCart, User } from 'lucide-react'
import Hero from './components/Hero.jsx'
import Categorias from './components/Categorias.jsx'
import Ofertas from './components/Ofertas.jsx'
import MaisVendidos from './components/MaisVendidos.jsx'
import Recentes from './components/Recentes.jsx'
import Vendedores from './components/Vendedores.jsx'
import ComeceVender from './components/ComeceVender.jsx'

export default function App() {
  const [tema, setTema] = useState('light')

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

          {/* Logo + Nome */}
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

          {/* Ações */}
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            <button
              onClick={alternarTema}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Alternar tema"
            >
              {tema === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              className="w-10 h-10 rounded-full items-center justify-center hidden sm:flex"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
            </button>

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
        <Hero />
        <Categorias />
        <Ofertas />
        <MaisVendidos />
        <Recentes />
        <Vendedores />
        <ComeceVender />
      </main>

    </div>
  )
}
