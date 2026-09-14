import { motion } from 'framer-motion'
import { Rocket, Store, TrendingUp, Wallet, ArrowRight, ShieldCheck } from 'lucide-react'

/* =========================================================
   VANTAGENS — depois virão do banco (admin edita os textos
   e os ícones dessa seção pelo painel)
   ========================================================= */
const VANTAGENS = [
  {
    Icone: Store,
    titulo: 'Loja própria em minutos',
    descricao: 'Crie sua vitrine personalizada sem precisar programar nada.',
  },
  {
    Icone: TrendingUp,
    titulo: 'Vendas automáticas',
    descricao: 'Entrega instantânea pro cliente após o pagamento aprovado.',
  },
  {
    Icone: Wallet,
    titulo: 'Receba quando quiser',
    descricao: 'Saldo liberado na hora e saque via PIX a qualquer momento.',
  },
  {
    Icone: ShieldCheck,
    titulo: 'Compra 100% protegida',
    descricao: 'Sistema antifraude, mediação e garantia de entrega.',
  },
]

export default function ComeceVender() {
  return (
    <section className="container-app py-12">

      {/* Bloco principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-12"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #2563eb 100%)' }}
      >
        {/* Enfeites de fundo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-purple-500 blur-3xl" />
        </div>

        {/* Ícone decorativo grande */}
        <Rocket
          size={260}
          strokeWidth={0.6}
          color="white"
          className="absolute -bottom-6 right-2 opacity-10 hidden sm:block"
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

          {/* Lado esquerdo: texto + botão */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-white text-sm mb-5">
              <Rocket size={14} />
              <span>Para vendedores</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Comece a vender<br />
              <span className="text-blue-400">em poucos minutos</span>
            </h2>

            <p className="text-white/80 text-base sm:text-lg mb-7 max-w-md">
              Abra sua loja, cadastre seus produtos digitais e receba pagamentos direto na sua conta.
              Sem burocracia, sem mensalidade.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 h-12 rounded-full shadow-lg"
              >
                Criar minha loja
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-6 h-12 rounded-full"
              >
                Como funciona
              </motion.button>
            </div>

            {/* Mini-info */}
            <div className="mt-6 flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} /> Sem mensalidade
              </span>
              <span className="flex items-center gap-1.5">
                <Wallet size={14} /> Saque via PIX
              </span>
            </div>
          </div>

          {/* Lado direito: cartões de vantagens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VANTAGENS.map((v, i) => {
              const { Icone } = v
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl p-4 bg-white/5 backdrop-blur border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                    <Icone size={20} color="white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">
                    {v.titulo}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {v.descricao}
                  </p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </motion.div>

    </section>
  )
}
