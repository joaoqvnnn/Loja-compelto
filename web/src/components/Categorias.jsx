import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

/* =========================================================
   CATEGORIAS — depois virá do banco (admin cria e ordena)
   ========================================================= */
const CATEGORIAS = [
  { id: 1, nome: 'Streaming',    emoji: '🎬', cor: '#e11d48', qtd: 128 },
  { id: 2, nome: 'Games',        emoji: '🎮', cor: '#7c3aed', qtd: 342 },
  { id: 3, nome: 'Steam',        emoji: '🎯', cor: '#2563eb', qtd: 189 },
  { id: 4, nome: 'Assinaturas',  emoji: '⭐', cor: '#f59e0b', qtd: 96  },
  { id: 5, nome: 'Cursos',       emoji: '📚', cor: '#16a34a', qtd: 211 },
  { id: 6, nome: 'Instagram',    emoji: '📸', cor: '#db2777', qtd: 74  },
  { id: 7, nome: 'Softwares',    emoji: '💻', cor: '#0891b2', qtd: 156 },
  { id: 8, nome: 'Gift Cards',   emoji: '🎁', cor: '#ea580c', qtd: 88  },
]

export default function Categorias() {
  return (
    <section className="container-app py-10">

      {/* Cabeçalho da seção */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Categorias populares
        </h2>
        <button className="text-sm font-medium flex items-center gap-1 text-primaria">
          Ver todas <ChevronRight size={16} />
        </button>
      </div>

      {/* Grade de categorias */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIAS.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex flex-col items-center justify-center gap-2 p-4 sm:p-5 rounded-2xl overflow-hidden transition-shadow"
            style={{
              background: 'var(--cor-card)',
              border: '1px solid var(--cor-borda)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            {/* Brilho no hover */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity"
              style={{ background: cat.cor }}
            />

            {/* Ícone circular */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${cat.cor}15` }}
            >
              {cat.emoji}
            </div>

            {/* Nome */}
            <span className="font-semibold text-sm sm:text-base relative z-10">
              {cat.nome}
            </span>

            {/* Quantidade */}
            <span className="text-xs texto-suave relative z-10">
              {cat.qtd} produtos
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
