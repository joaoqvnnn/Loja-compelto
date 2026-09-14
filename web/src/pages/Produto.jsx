import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronRight, Heart, Package, ShoppingCart, Star, ShieldCheck,
  Lock, Truck, Share2, Flag, Minus, Plus, Check, Info,
  MessageSquare, Calendar, MapPin, BadgeCheck, Zap
} from 'lucide-react'

/* =========================================================
   PRODUTO — depois virá do banco pelo slug da URL
   ========================================================= */
const PRODUTO = {
  id: 'steam-keys-aleatorias',
  titulo: 'STEAM KEYS ALEATÓRIAS | ENTREGA AUTOMÁTICA',
  categoria: 'Steam',
  subcategoria: 'Keys',
  preco: 1.50,
  estoque: 19,
  favoritos: 3,
  vendidos: 46,
  avaliacao: 5.0,
  totalAvaliacoes: 13,
  variacoes: [
    { id: 1, nome: '1x KEY PLATINA', preco: 1.50, estoque: 19 },
    { id: 2, nome: '5x KEYS PLATINA', preco: 6.90, estoque: 40 },
    { id: 3, nome: '10x KEYS PLATINA', preco: 12.90, estoque: 12 },
  ],
  vendedor: {
    nome: 'affram',
    avatar: 'A',
    cor: '#2563eb',
    ultimaVisita: 'há cerca de 15 horas',
    nota: 5.0,
    membroDesde: 'há 20 dias',
    verificado: true,
  },
}

function Estrelinhas({ nota }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(nota) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
        />
      ))}
    </div>
  )
}

export default function Produto() {
  const { slug } = useParams()
  const [variacao, setVariacao] = useState(PRODUTO.variacoes[0].id)
  const [quantidade, setQuantidade] = useState(1)
  const [favoritado, setFavoritado] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('descricao')

  const variacaoSelecionada = PRODUTO.variacoes.find(v => v.id === variacao)

  return (
    <div className="container-app py-6">

      {/* ===== BREADCRUMB ===== */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm texto-suave mb-6 flex-wrap">
        <Link to="/" className="hover:text-primaria">Início</Link>
        <ChevronRight size={14} />
        <Link to="/categorias" className="hover:text-primaria">Categorias</Link>
        <ChevronRight size={14} />
        <Link to="/categoria/steam" className="hover:text-primaria">{PRODUTO.categoria}</Link>
        <ChevronRight size={14} />
        <Link to="/categoria/steam/keys" className="hover:text-primaria">{PRODUTO.subcategoria}</Link>
        <ChevronRight size={14} />
        <span className="text-primaria font-medium truncate max-w-[140px]">{PRODUTO.titulo}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">

        {/* ===== COLUNA ESQUERDA ===== */}
        <div>

          {/* Imagem/banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-3xl flex items-center justify-center mb-6 overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#7c3aed)' }}
          >
            <Zap size={120} color="white" strokeWidth={1} opacity={0.3} />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                <Share2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                <Flag size={18} />
              </button>
            </div>
          </motion.div>

          {/* Título + tags */}
          <h1 className="text-xl sm:text-2xl font-bold mb-3">
            {PRODUTO.titulo}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <Link to="/categoria/steam" className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--cor-fundo-alt)' }}>
              {PRODUTO.categoria}
            </Link>
            <Link to="/categoria/steam/keys" className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--cor-fundo-alt)' }}>
              {PRODUTO.subcategoria}
            </Link>
          </div>

          {/* Estatísticas */}
          <div className="flex flex-wrap items-center gap-4 text-sm texto-suave mb-6">
            <span className="flex items-center gap-1.5">
              <Package size={16} />
              <strong className="text-texto">{PRODUTO.estoque}</strong> em estoque
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={16} />
              <strong className="text-texto">{PRODUTO.favoritos}</strong> favoritos
            </span>
            <span className="flex items-center gap-1.5">
              <ShoppingCart size={16} />
              <strong className="text-texto">{PRODUTO.vendidos}</strong> vendidos
            </span>
          </div>

          {/* Abas */}
          <div className="mt-8">
            <div className="flex gap-1 border-b overflow-x-auto" style={{ borderColor: 'var(--cor-borda)' }}>
              {[
                { id: 'descricao', nome: 'Descrição', Icone: Info },
                { id: 'avaliacoes', nome: 'Avaliações', Icone: Star },
                { id: 'perguntas', nome: 'Perguntas', Icone: MessageSquare },
              ].map(t => {
                const { Icone } = t
                const ativa = abaAtiva === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setAbaAtiva(t.id)}
                    className="px-4 h-12 flex items-center gap-2 text-sm font-medium whitespace-nowrap relative"
                    style={{ color: ativa ? 'var(--cor-primaria)' : 'var(--cor-texto-suave)' }}
                  >
                    <Icone size={16} />
                    {t.nome}
                    {ativa && (
                      <motion.div
                        layoutId="aba"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primaria"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="py-6 text-sm leading-relaxed texto-suave">
              {abaAtiva === 'descricao' && (
                <div className="space-y-3">
                  <p>Chaves aleatórias de Steam com entrega automática após confirmação do pagamento.</p>
                  <p>Você receberá o código diretamente no seu e-mail e também ficará disponível no seu painel de pedidos.</p>
                  <p>Cada chave dá direito a um jogo aleatório da biblioteca Steam. Pode ser qualquer jogo de qualquer valor.</p>
                </div>
              )}
              {abaAtiva === 'avaliacoes' && (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="rounded-2xl p-4" style={{ background: 'var(--cor-fundo-alt)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-primaria text-white flex items-center justify-center font-bold text-sm">
                          C
                        </div>
                        <div>
                          <div className="font-semibold text-texto text-sm">Cliente {i}</div>
                          <Estrelinhas nota={5} />
                        </div>
                      </div>
                      <p className="text-xs">Entrega rápida, produto conforme anunciado. Recomendo!</p>
                    </div>
                  ))}
                </div>
              )}
              {abaAtiva === 'perguntas' && (
                <div className="text-center py-8">
                  <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Nenhuma pergunta ainda.</p>
                  <button className="mt-4 px-4 h-10 rounded-full bg-primaria text-white font-semibold text-sm">
                    Fazer uma pergunta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== COLUNA DIREITA ===== */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 rounded-3xl p-5"
            style={{ background: 'var(--cor-card)', border: '1px solid var(--cor-borda)' }}
          >

            <div className="text-3xl sm:text-4xl font-bold text-primaria mb-5">
              R$ {variacaoSelecionada.preco.toFixed(2).replace('.', ',')}
            </div>

            {/* Quantidade */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-sm">Quantidade</span>
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--cor-borda)' }}>
                <button
                  onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold">{quantidade}</span>
                <button
                  onClick={() => setQuantidade(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Variações */}
            <div className="mb-4">
              <span className="font-medium text-sm block mb-2">Escolha a variação</span>
              <div className="flex flex-col gap-2">
                {PRODUTO.variacoes.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setVariacao(v.id)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm transition-all"
                    style={{
                      background: variacao === v.id ? 'var(--cor-fundo-alt)' : 'var(--cor-fundo-alt)',
                      border: variacao === v.id ? '2px solid var(--cor-primaria)' : '2px solid transparent',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background: variacao === v.id ? 'var(--cor-primaria)' : 'transparent',
                          border: variacao === v.id ? 'none' : '2px solid var(--cor-borda)',
                        }}
                      >
                        {variacao === v.id && <Check size={12} color="white" strokeWidth={3} />}
                      </div>
                      <span className="font-medium">{v.nome}</span>
                    </div>
                    <span className="text-xs texto-suave">{v.estoque} disp.</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Entrega */}
            <div className="flex items-center gap-2 text-xs texto-suave mb-4 p-3 rounded-xl"
              style={{ background: 'var(--cor-fundo-alt)' }}>
              <Truck size={16} style={{ color: 'var(--cor-primaria)' }} />
              Entrega imediata após a compra
            </div>

            {/* Botões */}
            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-full bg-primaria text-white font-bold flex items-center justify-center gap-2"
              >
                Comprar agora
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 h-12 rounded-full font-semibold flex items-center justify-center gap-2"
                  style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
                >
                  <ShoppingCart size={16} />
                  Adicionar
                </motion.button>

                <button
                  onClick={() => setFavoritado(!favoritado)}
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: favoritado ? '#fee2e2' : 'var(--cor-fundo-alt)',
                    border: '1px solid var(--cor-borda)',
                  }}
                >
                  <Heart
                    size={18}
                    className={favoritado ? 'fill-red-500 text-red-500' : ''}
                  />
                </button>
              </div>
            </div>

            {/* Selos */}
            <div className="flex flex-col gap-2 mt-4 pt-4 text-xs texto-suave"
              style={{ borderTop: '1px solid var(--cor-borda)' }}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} style={{ color: 'var(--cor-primaria)' }} />
                E-mail e documentos verificados
              </span>
              <span className="flex items-center gap-2">
                <Lock size={14} style={{ color: 'var(--cor-primaria)' }} />
                Pagamento seguro via PIX
              </span>
            </div>

            {/* Garantia */}
            <div className="mt-4 rounded-2xl p-3 flex items-start gap-3"
              style={{ background: '#16a34a' }}>
              <ShieldCheck size={20} color="white" className="shrink-0 mt-0.5" />
              <p className="text-xs text-white leading-relaxed">
                <strong>Entrega garantida.</strong> Se o produto não for entregue, o dinheiro volta.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== VENDEDOR ===== */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Vendedor</h2>
          <Link to="/loja/affram" className="text-sm font-medium text-primaria flex items-center gap-1">
            Ver perfil <ChevronRight size={14} />
          </Link>
        </div>

        <div className="rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5"
          style={{ background: 'var(--cor-card)', border: '1px solid var(--cor-borda)' }}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
              style={{ background: PRODUTO.vendedor.cor }}
            >
              {PRODUTO.vendedor.avatar}
            </div>
            {PRODUTO.vendedor.verificado && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                style={{ border: '2px solid var(--cor-card)' }}>
                <BadgeCheck size={12} color="white" strokeWidth={3} />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="font-bold text-lg">{PRODUTO.vendedor.nome}</div>
            <div className="text-xs texto-suave flex items-center gap-1 justify-center sm:justify-start">
              <MapPin size={12} />
              {PRODUTO.vendedor.ultimaVisita}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
            <div className="text-center">
              <div className="text-xs texto-suave mb-1">Avaliação</div>
              <Estrelinhas nota={PRODUTO.vendedor.nota} />
              <div className="text-xs font-semibold mt-0.5">{PRODUTO.vendedor.nota}</div>
            </div>
            <div className="text-center">
              <div className="text-xs texto-suave mb-1">Membro</div>
              <div className="flex items-center justify-center gap-1">
                <Calendar size={12} />
              </div>
              <div className="text-xs font-semibold mt-0.5">{PRODUTO.vendedor.membroDesde}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
