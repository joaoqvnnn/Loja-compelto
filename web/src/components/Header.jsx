import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Moon, Sun, Search, ShoppingCart, User, Menu, X } from 'lucide-react'

const MENU = [
  { nome: 'Início',     href: '/' },
  { nome: 'Produtos',   href: '/categorias' },
  { nome: 'Categorias', href: '/categorias' },
  { nome: 'Vender',     href: '/vender' },
]

export default function Header({ tema, alternarTema }) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'var(--cor-card)',
          borderBottom: '1px solid var(--cor-borda)',
        }}
      >
        <div className="container-app flex items-center justify-between h-14 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'var(--cor-primaria)' }}
            >
              T
            </div>
            <span className="font-bold text-base">
              Trust<span style={{ color: 'var(--cor-primaria)' }}>Market</span>
            </span>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {MENU.map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="text-sm font-medium texto-suave hover:text-primaria transition-colors"
              >
                {item.nome}
              </Link>
            ))}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-1">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center texto-suave"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            <button
              onClick={alternarTema}
              className="w-9 h-9 rounded-full flex items-center justify-center texto-suave"
              aria-label="Tema"
            >
              {tema === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link
              to="/carrinho"
              className="w-9 h-9 rounded-full items-center justify-center texto-suave hidden sm:flex"
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
            </Link>

            <Link
              to="/entrar"
              className="hidden sm:flex ml-2 px-4 h-9 rounded-full font-semibold text-white items-center gap-1.5 text-sm bg-primaria"
            >
              <User size={15} />
              Entrar
            </Link>

            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="w-9 h-9 rounded-full flex md:hidden items-center justify-center texto-suave"
              aria-label="Menu"
            >
              {menuAberto ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {menuAberto && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: '1px solid var(--cor-borda)' }}
            >
              <div className="container-app py-3 flex flex-col">
                {MENU.map((item, i) => (
                  <Link
                    key={i}
                    to={item.href}
                    onClick={() => setMenuAberto(false)}
                    className="py-3 text-sm font-medium texto-suave"
                    style={{ borderBottom: i < MENU.length - 1 ? '1px solid var(--cor-borda)' : 'none' }}
                  >
                    {item.nome}
                  </Link>
                ))}

                <Link
                  to="/entrar"
                  onClick={() => setMenuAberto(false)}
                  className="mt-3 h-10 rounded-full bg-primaria text-white font-semibold flex items-center justify-center gap-2 text-sm"
                >
                  <User size={16} />
                  Entrar
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
