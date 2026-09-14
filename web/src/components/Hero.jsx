import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

/* =========================================================
   BANNERS — depois isso virá do banco de dados (admin cria)
   Por enquanto estão aqui pra você ver o efeito funcionando.
   ========================================================= */
const BANNERS = [
  {
    id: 1,
    titulo: 'Produtos digitais com entrega automática',
    subtitulo: 'Compre e receba na hora. Sem espera, sem enrolação.',
    cta: 'Explorar agora',
    gradiente: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    emoji: '⚡',
  },
  {
    id: 2,
    titulo: 'Venda seus produtos digitais',
    subtitulo: 'Abra sua loja em minutos e comece a faturar hoje.',
    cta: 'Começar a vender',
    gradiente: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
    emoji: '🚀',
  },
  {
    id: 3,
    titulo: 'Ofertas com até 70% OFF',
    subtitulo: 'Aproveite descontos em keys, cursos, assinaturas e mais.',
    cta: 'Ver ofertas',
    gradiente: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)',
    emoji: '🔥',
  },
]

export default function Hero() {
  const [atual, setAtual] = useState(0)

  /* Troca automática a cada 5 segundos */
  useEffect(() => {
    const t = setInterval(() => {
      setAtual(i => (i + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const banner = BANNERS[atual]

  return (
    <section className="container-app pt-6 pb-10">
      <div
        className="relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[360px] flex items-center"
        style={{ background: banner.gradiente, transition: 'background 0.6s ease' }}
      >
        {/* Bolhas decorativas de fundo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-40 h-40 rounded-full bg-white/30 blur-2xl" />
        </div>

        {/* Conteúdo animado */}
        <div className="relative z-10 px-6 sm:px-12 py-10 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Selo "novidade" */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-sm mb-4">
                <Sparkles size={14} />
                <span>Novidade</span>
              </div>

              {/* Título */}
              <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-3">
                <span className="mr-2">{banner.emoji}</span>
                {banner.titulo}
              </h1>

              {/* Subtítulo */}
              <p className="text-white/90 text-base sm:text-lg mb-6 max-w-lg">
                {banner.subtitulo}
              </p>

              {/* Botão CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 h-12 rounded-full shadow-lg"
              >
                {banner.cta}
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicadores (bolinhas) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {BANNERS.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setAtual(i)}
              aria-label={`Ir para banner ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === atual ? 24 : 8,
                height: 8,
                background: i === atual ? 'white' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
