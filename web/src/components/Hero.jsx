import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const BANNERS = [
  {
    id: 1,
    titulo: 'Produtos digitais com entrega imediata',
    subtitulo: 'Streaming, jogos, gift cards e licenças. Direto no seu e-mail após o pagamento.',
    cta: 'Explorar produtos',
  },
  {
    id: 2,
    titulo: 'Venda seus produtos digitais',
    subtitulo: 'Abra sua loja, cadastre produtos e receba via PIX. Sem mensalidade.',
    cta: 'Começar a vender',
  },
  {
    id: 3,
    titulo: 'Ofertas em destaque',
    subtitulo: 'Descontos em keys, cursos e assinaturas. Confira antes que acabe.',
    cta: 'Ver ofertas',
  },
]

export default function Hero() {
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setAtual(i => (i + 1) % BANNERS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const banner = BANNERS[atual]

  return (
    <section className="container-app pt-8 pb-12">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ background: '#0f172a' }}
      >
        <div className="px-6 sm:px-14 py-14 sm:py-20 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-3">
                {banner.titulo}
              </h1>

              <p className="text-sm sm:text-base text-white/70 mb-8 leading-relaxed max-w-md">
                {banner.subtitulo}
              </p>

              <button className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 h-11 rounded-lg text-sm">
                {banner.cta}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicadores simples */}
        <div className="absolute bottom-4 right-6 flex gap-1.5">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setAtual(i)}
              aria-label={`Banner ${i + 1}`}
              style={{
                width: i === atual ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === atual ? 'white' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
