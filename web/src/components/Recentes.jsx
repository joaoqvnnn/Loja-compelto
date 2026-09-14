import { motion } from 'framer-motion'
import { Heart, ShoppingCart, ChevronRight, Clock } from 'lucide-react'

/* =========================================================
   PRODUTOS — depois virão do banco (admin cadastra e o
   sistema ordena por data de criação)
   ========================================================= */
const PRODUTOS = [
  { id: 1, emoji: '🎮', imagem: 'linear-gradient(135deg,#1e3a8a,#7c3aed)', titulo: 'Steam Key Platinum Edition', preco: 2.99, loja: 'affram' },
  { id: 2, emoji: '🎬', imagem: 'linear-gradient(135deg,#dc2626,#7c2d12)', titulo: 'HBO Max 1 Mês 4K', preco: 14.90, loja: 'StreamStore' },
  { id: 3, emoji: '📸', imagem: 'linear-gradient(135deg,#db2777,#7c3aed)', titulo: 'Instagram 500 Likes BR', preco: 4.90, loja: 'SocialBoost' },
  { id: 4, emoji: '💻', imagem: 'linear-gradient(135deg,#0891b2,#1e40af)', titulo: 'Office 365 Vitalício', preco: 29.90, loja: 'KeyMaster' },
  { id: 5, emoji: '⭐', imagem: 'linear-gradient(135deg,#7c3aed,#db2777)', titulo: 'Canva Pro 1 Ano', preco: 19.90, loja: 'DesignHub' },
  { id: 6, emoji: '🎵', imagem: 'linear-gradient(135deg,#16a34a,#065f46)', titulo: 'Spotify Premium 1 Mês', preco: 9.90, loja: 'MusicKeys' },
  { id: 7, emoji: '🎁', imagem: 'linear-gradient(135deg,#f59e0b,#dc2626)', titulo: 'Google Play R$ 25', preco: 22.90, loja: 'GiftStore' },
  { id: 8, emoji: '📚', imagem: 'linear-gradient(135deg,#ea580c,#f59e0b)', titulo: 'Curso Excel Avançado', preco: 7.90, loja: 'EduPro' },
  { id: 9, emoji: '🎯', imagem: 'linear-gradient(135deg,#2563eb,#7c3aed)', titulo: 'Valorant 1000 VP', preco: 24.90, loja: 'GameKeys' },
  { id: 10, emoji: '🎨', imagem: 'linear-gradient(135deg,#db2777,#f59e0b)', titulo: 'Pack 500 Mockups', preco: 12.90, loja: 'DesignHub' },
]

function CardRecente({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35, delay: i * 0.03 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
      style={{
        background: 'var(--cor-card)',
        border: '1px solid var(--cor-borda)',
      }}
    >
      {/* Imagem */}
      <div
        className="relative aspect-square flex items-center justify-center text-4xl"
        style={{ background: p.imagem }}
      >
        {p.emoji}

        {/* Selo NOVO */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
          <Clock size={10} />
          NOVO
        </div>

        {/* Favorito — aparece no hover (desktop) */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Favoritar"
        >
          <Heart size={14} className="text-slate-700" />
        </motion.button>
      </div>

      {/* Infos */}
      <div className="p-2.5 flex flex-col gap-1">
        <h3 className="text-xs sm:text-sm font-semibold leading-tight line-clamp-2 min-h-[32px]">
          {p.titulo}
        </h3>

        <span className="text-[10px] texto-suave truncate">
          🏪 {p.loja}
        </span>

        <div className="flex items-center justify-between mt-1 gap-1">
          <span className="text-base sm:text-lg font-bold text-primaria">
            R$ {p.preco.toFixed(2).replace('.', ',')}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-primaria text-white flex items-center justify-center shrink-0"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Recentes() {
  return (
    <section className="container-app py-10">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            🆕 Produtos recentes
          </h2>
          <p className="text-sm texto-suave mt-1">
            Acabaram de chegar na plataforma
          </p>
        </div>
        <button className="text-sm font-medium flex items-center gap-1 text-primaria">
          Ver todos <ChevronRight size={16} />
        </button>
      </div>

      {/* Grade */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {PRODUTOS.map((p, i) => (
          <CardRecente key={p.id} p={p} i={i} />
        ))}
      </div>

    </section>
  )
}
