import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
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

      {/* Header com menu, busca, tema e botão entrar */}
      <Header tema={tema} alternarTema={alternarTema} />

      {/* HOME */}
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
