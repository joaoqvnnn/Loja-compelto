import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Moon, Sun, Search, ShoppingCart, User, Menu, X,
  Home, LayoutGrid, Flame, Store, Info
} from 'lucide-react'

/* =========================================================
   MENU — depois virá do banco (admin cria/edita/ordena os
   itens do menu pelo painel administrativo)
   ========================================================= */
const MENU = [
  { id: 1, nome: 'Início',     Icone: Home,       href: '/' },
  { id: 2, nome: 'Categorias', Icone: LayoutGrid, href: '/categorias' },
  { id: 3, nome: 'Ofertas',    Icone: Flame,      href: '/ofertas' },
  { id: 4, nome: 'Lojas',      Icone: Store,      href: '/lojas' },
  { id: 5, nome: 'Sobre',      Icone: Info,       href: '/sobre' },
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
        {/* Linha superior */}
        <div className="container-app flex items-center justify-between h-16 gap-3">

          {/* Logo + Nome (editável pelo admin) */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: 'var(--cor-primaria)' }}
            >
              T
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Trust<span style={{ color: 'var(--cor-primaria)' }}>Market</span>
            </span>
          </a>

          {/* Menu desktop (escondido no mobile) */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {MENU.map(item => {
              const { Icone } = item
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-1.5 px-3 h-10 rounded-full text-sm font-medium texto-suave transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--cor-fundo-alt)'
                    e.currentTarget.style.color = 'var(--cor-primaria)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--cor-texto-suave)'
                  }}
                >
                  <Icone size={16} />
                  {item.nome}
                </motion.a>
              )
            })}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-2">

            {/* Busca */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            {/* Tema */}
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
              className="w-10 h-10 rounded-full items-center justify-center hidden sm:flex relative"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Carrinho"
            >
              <ShoppingCart size={18} />
              {/* Badge de itens (vem do banco depois) */}
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primaria text-white text-[10px] font-bold flex items-center justify-center"
              >
                0
              </span>
            </button>

            {/* Entrar */}
            <button className="hidden sm:flex px-5 h-10 rounded-full font-semibold text-white items-center gap-2 bg-primaria transition-all">
              <User size={16} />
              Entrar
            </button>

            {/* Botão hamburguer (só mobile) */}
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="w-10 h-10 rounded-full flex md:hidden items-center justify-center"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
              aria-label="Menu"
            >
              {menuAberto ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Menu mobile (abre embaixo do header) */}
        <AnimatePresence>
          {menuAberto && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: '1px solid var(--cor-borda)' }}
            >
              <div className="container-app py-3 flex flex-col gap-1">
                {MENU.map(item => {
                  const { Icone } = item
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setMenuAberto(false)}
                      className="flex items-center gap-3 px-3 h-11 rounded-xl font-medium"
                      style={{ background: 'var(--cor-fundo-alt)' }}
                    >
                      <Icone size={18} style={{ color: 'var(--cor-primaria)' }} />
                      {item.nome}
                    </a>
                  )
                })}

                {/* Botão entrar no mobile */}
                <button className="mt-2 h-11 rounded-xl bg-primaria text-white font-semibold flex items-center justify-center gap-2">
                  <User size={18} />
                  Entrar
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
