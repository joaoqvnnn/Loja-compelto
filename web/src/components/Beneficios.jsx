import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Users, Store, Package, TrendingUp,
  ShieldCheck, Zap, Lock, Headphones
} from 'lucide-react'

/* =========================================================
   ESTATÍSTICAS — depois virão do banco (números reais da
   plataforma, calculados automaticamente pelo backend)
   ========================================================= */
const ESTATISTICAS = [
  { id: 1, Icone: Users,      valor: 4821,  sufixo: '',    label: 'Usuários ativos',     cor: '#2563eb' },
  { id: 2, Icone: Store,      valor: 326,   sufixo: '',    label: 'Lojas cadastradas',   cor: '#7c3aed' },
  { id: 3, Icone: Package,    valor: 2154,  sufixo: '',    label: 'Produtos à venda',    cor: '#0891b2' },
  { id: 4, Icone: TrendingUp, valor: 98,    sufixo: '%',   label: 'Aprovação dos clientes', cor: '#16a34a' },
]

/* =========================================================
   BENEFÍCIOS — depois virão do banco (admin edita textos e
   ícones pelo painel)
   ========================================================= */
const BENEFICIOS = [
  {
    Icone: Zap,
    titulo: 'Entrega automática',
    descricao: 'O produto chega na hora, direto no seu e-mail ou painel.',
    cor: '#f59e0b',
  },
  {
    Icone: ShieldCheck,
    titulo: 'Compra protegida',
    descricao: 'Sistema antifraude e reembolso garantido se algo der errado.',
    cor: '#16a34a',
  },
  {
    Icone: Lock,
    titulo: 'Pagamento seguro',
    descricao: 'PIX processado com criptografia e confirmação em segundos.',
    cor: '#2563eb',
  },
  {
    Icone: Headphones,
    titulo: 'Suporte 24/7',
    descricao: 'Atendimento humano por chat sempre que você precisar.',
    cor: '#7c3aed',
  },
]

/* ---- Contador animado ---- */
function Contador({ valor, sufixo = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  const visivel = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!visivel) return
    const duracao = 1600
    const inicio = performance.now()

    const anima = (agora) => {
      const t = Math.min((agora - inicio) / duracao, 1)
      // easing suave (easeOutCubic)
      const progresso = 1 - Math.pow(1 - t, 3)
      setN(Math.floor(valor * progresso))
      if (t < 1) requestAnimationFrame(anima)
      else setN(valor)
    }

    requestAnimationFrame(anima)
  }, [visivel, valor])

  return (
    <span ref={ref}>
      {n.toLocaleString('pt-BR')}{sufixo}
    </span>
  )
}

export default function Beneficios() {
  return (
    <section className="container-app py-12">

      {/* ===== Bloco 1: números da plataforma ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-6 sm:p-10 mb-12"
        style={{
          background: 'var(--cor-card)',
          border: '1px solid var(--cor-borda)',
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            A plataforma em números
          </h2>
          <p className="text-sm texto-suave">
            Milhares de pessoas já confiam na TrustMarket
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ESTATISTICAS.map((e, i) => {
            const { Icone } = e
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: `${e.cor}15` }}
                >
                  <Icone size={26} style={{ color: e.cor }} strokeWidth={2} />
                </div>

                <div className="text-3xl sm:text-4xl font-bold" style={{ color: e.cor }}>
                  <Contador valor={e.valor} sufixo={e.sufixo} />
                </div>

                <span className="text-xs sm:text-sm texto-suave mt-1">
                  {e.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* ===== Bloco 2: benefícios em cards ===== */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Por que escolher a TrustMarket?
        </h2>
        <p className="text-sm texto-suave">
          Tudo que você precisa em um só lugar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BENEFICIOS.map((b, i) => {
          const { Icone } = b
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-5 flex flex-col items-start"
              style={{
                background: 'var(--cor-card)',
                border: '1px solid var(--cor-borda)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${b.cor}15` }}
              >
                <Icone size={22} style={{ color: b.cor }} strokeWidth={2} />
              </div>

              <h3 className="font-semibold mb-1.5">
                {b.titulo}
              </h3>

              <p className="text-sm texto-suave leading-relaxed">
                {b.descricao}
              </p>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
