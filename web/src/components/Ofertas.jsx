import { motion } from 'framer-motion'
import { Heart, ShoppingCart, ChevronRight, Star, Package } from 'lucide-react'

/* =========================================================
   PRODUTOS — depois virão do banco de dados (admin cadastra)
   ========================================================= */
const PRODUTOS = [
  {
    id: 1,
    titulo: 'Steam Keys Aleatórias | Entrega Automática',
    imagem: 'linear-gradient(135deg,#1e3a8a,#7c3aed)',
    emoji: '🎮',
    preco: 1.50,
    precoAntigo: 4.99,
    desconto: 70,
    avaliacao: 4.9,
    vendidos: 1243,
    estoque: 9989,
  },
  {
    id: 2,
    titulo: 'Netflix Premium 1 Mês | Tela 4K',
    imagem: 'linear-gradient(135deg,#dc2626,#7c2d12)',
    emoji: '🎬',
    preco: 19.90,
    precoAntigo: 39.90,
    desconto: 50,
    avaliacao: 4.8,
    vendidos: 872,
    estoque: 342,
  },
  {
    id: 3,
    titulo: 'Spotify Premium 3 Meses | Conta Nova',
    imagem: 'linear-gradient(135deg,#16a34a,#065f46)',
    emoji: '🎵',
    preco: 24.90,
    precoAntigo: 49.90,
    desconto: 50,
    avaliacao: 4.9,
    vendidos: 2104,
    estoque: 128,
  },
  {
    id: 4,
    titulo: 'Curso Marketing Digital Completo 2025',
    imagem: 'linear-gradient(135deg,#ea580c,#f59e0b)',
    emoji: '📚',
    preco: 9.99,
    precoAntigo: 29.90,
    desconto: 66,
    avaliacao: 4.7,
    vendidos: 431,
    estoque: 9999,
  },
  {
    id: 5,
    titulo: 'Instagram 1K Seguidores Brasileiros',
    imagem: 'linear-gradient(135deg,#db2777,#7c3aed)',
    emoji: '📸',
    preco: 14.90,
    precoAntigo: 29.90,
    desconto: 50,
    avaliacao: 4.6,
    vendidos: 654,
    estoque: 500,
  },
  {
    id: 6,
    titulo: 'Windows 11 Pro | Chave Vitalícia Original',
    imagem: 'linear-gradient(135deg,#0891b2,#1e40af)',
    emoji: '💻',
    preco: 34.90,
    precoAntigo: 89.90,
    desconto: 61,
    avaliacao: 4.8,
    vendidos: 1089,
    estoque: 87,
  },
]

function CardProduto({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--cor-card)',
        border: '1px solid var(--cor-borda)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}
    >
      {/* Imagem / Banner */}
      <div
        className="relative aspect-square flex items-center justify-center text-6xl"
        style={{ background: p.imagem }}
      >
        {p.emoji}

        {/* Badge de desconto */}
        <div className="absolute top-2 left-2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-full shadow">
          -{p.desconto}%
        </div>

        {/* Botão favorito */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow"
          aria-label="Favoritar"
        >
          <Heart size={14} className="text-slate-700" />
        </motion.button>
      </div>

      {/* Infos */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">

        {/* Título */}
        <h3 className="text-sm font-semibold leading-tight line-clamp-2 min-h-[36px]">
          {p.titulo}
        </h3>

        {/* Avaliação + vendidos */}
        <div className="flex items-center gap-2 text-xs texto-suave">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            {p.avaliacao}
          </span>
          <span>•</span>
          <span>{p.vendidos} vendidos</span>
        </div>

        {/* Estoque */}
        <div className="flex items-center gap-1 text-xs texto-suave">
          <Package size={12} />
          {p.estoque.toLocaleString('pt-BR')} em estoque
        </div>

        {/* Preços */}
        <div className="mt-auto pt-1">
          <div className="text-xs texto-suave line-through">
            R$ {p.precoAntigo.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-xl font-bold text-primaria">
            R$ {p.preco.toFixed(2).replace('.', ',')}
          </div>
        </div>

        {/* Botão comprar */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full h-9 rounded-full bg-primaria text-white font-semibold text-sm flex items-center justify-center gap-1.5 mt-1"
        >
          <ShoppingCart size={14} />
          Comprar
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Ofertas() {
  return (
    <section className="container-app py-10">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            🔥 Ofertas em destaque
          </h2>
          <p className="text-sm texto-suave mt-1">
            Aproveite antes que acabe
          </p>
        </div>
        <button className="text-sm font-medium flex items-center gap-1 text-primaria">
          Ver todas <ChevronRight size={16} />
        </button>
      </div>

      {/* Grade */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {PRODUTOS.map((p, i) => (
          <CardProduto key={p.id} p={p} i={i} />
        ))}
      </div>

    </section>
  )
}
