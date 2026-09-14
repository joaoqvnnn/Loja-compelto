import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Hero from './components/Hero.jsx'
import Categorias from './components/Categorias.jsx'
import Ofertas from './components/Ofertas.jsx'
import MaisVendidos from './components/MaisVendidos.jsx'
import Recentes from './components/Recentes.jsx'
import Vendedores from './components/Vendedores.jsx'
import ComeceVender from './components/ComeceVender.jsx'
import Beneficios from './components/Beneficios.jsx'
import FAQ from './components/FAQ.jsx'

import Produto from './pages/Produto.jsx'

/* ====== Página inicial ====== */
function Home() {
  return (
    <>
      <Hero />
      <Categorias />
      <Ofertas />
      <MaisVendidos />
      <Recentes />
      <Vendedores />
      <ComeceVender />
      <Beneficios />
      <FAQ />
    </>
  )
}

/* ====== Placeholder pra páginas que ainda virão ====== */
function EmBreve({ titulo }) {
  return (
    <div className="container-app py-24 text-center">
      <h1 className="text-3xl font-bold mb-2">{titulo}</h1>
      <p className="texto-suave">Essa página será construída na próxima etapa.</p>
    </div>
  )
}

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
      <Header tema={tema} alternarTema={alternarTema} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:slug" element={<Produto />} />
          <Route path="/categorias" element={<EmBreve titulo="Categorias" />} />
          <Route path="/categoria/:cat" element={<EmBreve titulo="Categoria" />} />
          <Route path="/categoria/:cat/:sub" element={<EmBreve titulo="Subcategoria" />} />
          <Route path="/ofertas" element={<EmBreve titulo="Ofertas" />} />
          <Route path="/lojas" element={<EmBreve titulo="Lojas" />} />
          <Route path="/loja/:slug" element={<EmBreve titulo="Loja" />} />
          <Route path="/carrinho" element={<EmBreve titulo="Carrinho" />} />
          <Route path="/entrar" element={<EmBreve titulo="Entrar" />} />
          <Route path="/sobre" element={<EmBreve titulo="Sobre" />} />
          <Route path="*" element={<EmBreve titulo="Página não encontrada" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
