import { motion } from 'framer-motion'
import { ChevronRight, Store, Star, Shield, Package, TrendingUp } from 'lucide-react'

/* =========================================================
   LOJAS/VENDEDORES — depois virão do banco (admin pode
   destacar, ordenar, ocultar, etc)
   ========================================================= */
const LOJAS = [
  { id: 1, nome: 'affram',       cor: '#2563eb', inicial: 'A', nota: 4.9, vendas: 1243, produtos: 87,  verificado: true  },
  { id: 2, nome: 'StreamStore',  cor: '#dc2626', inicial: 'S', nota: 4.8, vendas: 872,  produtos: 42,  verificado: true  },
  { id: 3, nome: 'KeyMaster',    cor: '#0891b2', inicial: 'K', nota: 5.0, vendas: 2104, produtos: 156, verificado: true  },
  { id: 4, nome: 'DesignHub',    cor: '#7c3aed', inicial: 'D', nota: 4.7, vendas: 431,  produtos: 68,  verificado: false },
  { id: 5, nome: 'MusicKeys',    cor: '#16a34a', inicial: 'M', nota: 4.9, vendas: 1089, produtos: 34,  verificado: true  },
  { id: 6, nome: 'GiftStore',    cor: '#ea580c', inicial: 'G', nota: 4.6, vendas: 654,  produtos: 52,  verificado: false },
]

function CardLoja({ loja, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      whileHover={{ y: -6 }}
      className="rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
      style={{
        background: 'var(--cor-card)',
        border: '1px solid var(--cor-borda)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Faixa colorida no topo */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: loja.cor }}
      />

      {/* Avatar */}
      <div className="relative mt-2">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
          style={{ background: loja.cor }}
        >
          {loja.inicial}
        </div>

        {/* Selo verificado */}
        {loja.verificado && (
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-2"
            style={{ borderColor: 'var(--cor-card)' }}
            title="Vendedor verificado"
          >
            <Shield size={12} color="white" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Nome */}
      <h3 className="font-bold mt-3 text-sm">
        {loja.nome}
      </h3>

      {/* Nota */}
      <div className="flex items-center gap-1 mt-1 text-xs texto-suave">
        <Star size={12} className="fill-yellow-400 text-yellow-400" />
        <span className="font-medium text-slate-600 dark:text-slate-300">{loja.nota}</span>
        <span>•</span>
        <span>{loja.vendas.toLocaleString('pt-BR')} vendas</span>
      </div>

      {/* Produtos */}
      <div className="flex items-center gap-1 mt-1 text-xs texto-suave">
        <Package size={12} />
        {loja.produtos} produtos
      </div>

      {/* Botão */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mt-3 w-full h-9 rounded-full font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
        style={{
          background: 'var(--cor-fundo-alt)',
          border: '1px solid var(--cor-borda)',
          color: 'var(--cor-texto)',
        }}
      >
        <Store size={14} />
        Ver loja
      </motion.button>
    </motion.div>
  )
}

export default function Vendedores() {
  return (
    <section className="container-app py-10">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Store size={22} style={{ color: 'var(--cor-primaria)' }} />
            Lojas em destaque
          </h2>
          <p className="text-sm texto-suave mt-1">
            Vendedores com melhor avaliação
          </p>
        </div>
        <button className="text-sm font-medium flex items-center gap-1 text-primaria">
          Ver todas <ChevronRight size={16} />
        </button>
      </div>

      {/* Grade */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {LOJAS.map((loja, i) => (
          <CardLoja key={loja.id} loja={loja} i={i} />
        ))}
      </div>

    </section>
  )
}
