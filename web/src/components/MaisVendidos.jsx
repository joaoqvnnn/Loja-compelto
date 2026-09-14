import { motion } from 'framer-motion'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Star, Flame } from 'lucide-react'
import { useRef } from 'react'

/* =========================================================
   PRODUTOS — depois virão do banco (admin cadastra e marca
   como "mais vendido", ou o sistema ordena por vendas reais)
   ========================================================= */
const PRODUTOS = [
  {
    id: 1, emoji: '🎮', imagem: 'linear-gradient(135deg,#1e3a8a,#7c3aed)',
    titulo: 'Steam Keys Aleatórias | Entrega Automática',
    preco: 1.50, precoAntigo: 4.99, desconto: 70,
    avaliacao: 4.9, vendidos: 1243,
  },
  {
    id: 2, emoji: '🎬', imagem: 'linear-gradient(135deg,#dc2626,#7c2d12)',
    titulo: 'Netflix Premium 1 Mês 4K',
    preco: 19.90, precoAntigo: 39.90, desconto: 50,
    avaliacao: 4.8, vendidos: 872,
  },
  {
    id: 3, emoji: '🎵', imagem: 'linear-gradient(135deg,#16a34a,#065f46)',
    titulo: 'Spotify Premium 3 Meses',
    preco: 24.90, precoAntigo: 49.90, desconto: 50,
    avaliacao: 4.9, vendidos: 2104,
  },
  {
    id: 4, emoji: '📚', imagem: 'linear-gradient(135deg,#ea580c,#f59e0b)',
    titulo: 'Curso Marketing Digital 2025',
    preco: 9.99, precoAntigo: 29.90, desconto: 66,
    avaliacao: 4.7, vendidos: 431,
  },
  {
    id: 5, emoji: '📸', imagem: 'linear-gradient(135deg,#db2777,#7c3aed)',
    titulo: 'Instagram 1K Seguidores BR',
    preco: 14.90, precoAntigo: 29.90, desconto: 50,
    avaliacao: 4.6, vendidos: 654,
  },
  {
    id: 6, emoji: '💻', imagem: 'linear-gradient(135deg,#0891b2,#1e40af)',
    titulo: 'Windows 11 Pro | Chave Vitalícia',
    preco: 34.90, precoAntigo: 89.90, desconto: 61,
    avaliacao: 4.8, vendidos: 1089,
  },
  {
    id: 7, emoji: '⭐', imagem: 'linear-gradient(135deg,#7c3aed,#db2777)',
    titulo: 'Canva Pro Vitalício',
    preco: 12.90, precoAntigo: 39.90, desconto: 68,
    avaliacao: 4.9, vendidos: 1520,
  },
  {
    id: 8, emoji: '🎁', imagem: 'linear-gradient(135deg,#f59e0b,#dc2626)',
    titulo: 'Gift Card Google Play R$ 50',
    preco: 42.90, precoAntigo: 50.00, desconto: 14,
    avaliacao: 5.0, vendidos: 320,
  },
]

function CardVendido({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      whileHover={{ y: -6 }}
      className="shrink-0 w-[160px] sm:w-[200px] rounded-2xl overflow-hidden flex flex-col snap-start"
      style={{
        background: 'var(--cor-card)',
        border: '1px solid var(--cor-borda)',
      }}
    >
      {/* Imagem */}
      <div className="relative aspect-square flex items-center justify-center text-5xl" style={{ background: p.imagem }}>
        {p.emoji}

        {/* Ranking */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-full">
          <Flame size={12} className="text-orange-400" />
          #{i + 1}
        </div>

        {/* Desconto */}
        <div className="absolute bottom-2 left-2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-full shadow">
          -{p.desconto}%
        </div>

        {/* Favorito */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"
          aria-label="Favoritar"
        >
          <Heart size={14} className="text-slate-700" />
        </motion.button>
      </div>

      {/* Infos */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2 min-h-[36px]">
          {p.titulo}
        </h3>

        <div className="flex items-center gap-1.5 text-xs texto-suave">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          {p.avaliacao}
          <span>•</span>
          <span>{p.vendidos} vendidos</span>
        </div>

        <div className="mt-auto pt-1">
          <div className="text-xs texto-suave line-through">
            R$ {p.precoAntigo.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-lg font-bold text-primaria">
            R$ {p.preco.toFixed(2).replace('.', ',')}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full h-9 rounded-full bg-primaria text-white font-semibold text-sm flex items-center justify-center gap-1.5"
        >
          <ShoppingCart size={14} />
          Comprar
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function MaisVendidos() {
  const carrossel = useRef(null)

  const rolar = (dir) => {
    if (!carrossel.current) return
    carrossel.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="py-10">

      {/* Cabeçalho (dentro do container pra alinhar) */}
      <div className="container-app flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            🏆 Produtos mais vendidos
          </h2>
          <p className="text-sm texto-suave mt-1">
            Os favoritos da galera
          </p>
        </div>

        {/* Setas (esconde no mobile) */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => rolar(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => rolar(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Carrossel — arrasta com o dedo */}
      <div
        ref={carrossel}
        className="flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-[max(1rem,calc((100vw-1200px)/2+1rem))] pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {PRODUTOS.map((p, i) => (
          <CardVendido key={p.id} p={p} i={i} />
        ))}
      </div>

    </section>
  )
}
