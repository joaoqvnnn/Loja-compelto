import { motion } from 'framer-motion'
import {
  Mail, Phone, MapPin, Instagram, Twitter, Youtube,
  Send, ShieldCheck, Lock, CreditCard
} from 'lucide-react'

/* =========================================================
   LINKS DO FOOTER — depois virão do banco (admin cria,
   edita, adiciona colunas e links pelo painel)
   ========================================================= */
const COLUNAS = [
  {
    titulo: 'Plataforma',
    links: [
      { nome: 'Início', href: '/' },
      { nome: 'Categorias', href: '/categorias' },
      { nome: 'Ofertas', href: '/ofertas' },
      { nome: 'Lojas', href: '/lojas' },
    ],
  },
  {
    titulo: 'Para vendedores',
    links: [
      { nome: 'Começar a vender', href: '/vender' },
      { nome: 'Como funciona', href: '/como-funciona' },
      { nome: 'Taxas e comissões', href: '/taxas' },
      { nome: 'Central de ajuda', href: '/ajuda' },
    ],
  },
  {
    titulo: 'Suporte',
    links: [
      { nome: 'Central de ajuda', href: '/ajuda' },
      { nome: 'Fale conosco', href: '/contato' },
      { nome: 'Status da plataforma', href: '/status' },
      { nome: 'Reportar problema', href: '/reportar' },
    ],
  },
  {
    titulo: 'Legal',
    links: [
      { nome: 'Termos de uso', href: '/termos' },
      { nome: 'Política de privacidade', href: '/privacidade' },
      { nome: 'Política de reembolso', href: '/reembolso' },
      { nome: 'Cookies', href: '/cookies' },
    ],
  },
]

const REDES = [
  { Icone: Instagram, href: '#', label: 'Instagram' },
  { Icone: Twitter,   href: '#', label: 'Twitter' },
  { Icone: Youtube,   href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer
      className="mt-16"
      style={{
        background: 'var(--cor-fundo-alt)',
        borderTop: '1px solid var(--cor-borda)',
      }}
    >
      <div className="container-app py-12">

        {/* Grade principal */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">

          {/* Marca + descrição (ocupa 2 colunas no desktop) */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white"
                style={{ background: 'var(--cor-primaria)' }}
              >
                T
              </div>
              <span className="font-bold text-lg">
                Trust<span style={{ color: 'var(--cor-primaria)' }}>Market</span>
              </span>
            </div>

            <p className="text-sm texto-suave leading-relaxed mb-4 max-w-xs">
              O marketplace de produtos digitais com entrega automática, pagamento seguro e milhares de clientes satisfeitos.
            </p>

            {/* Redes sociais */}
            <div className="flex gap-2">
              {REDES.map(({ Icone, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--cor-card)',
                    border: '1px solid var(--cor-borda)',
                  }}
                >
                  <Icone size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          {COLUNAS.map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-sm mb-3">{col.titulo}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-sm texto-suave hover:text-primaria transition-colors"
                    >
                      {link.nome}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-6 sm:p-8 mb-10 grid md:grid-cols-2 gap-6 items-center"
          style={{ background: 'var(--cor-card)', border: '1px solid var(--cor-borda)' }}
        >
          <div>
            <h3 className="font-bold text-lg mb-1">
              Receba ofertas em primeira mão
            </h3>
            <p className="text-sm texto-suave">
              Cadastre seu e-mail e ganhe 10% de desconto na primeira compra.
            </p>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-xl px-4 h-12"
              style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
            >
              <Mail size={16} style={{ color: 'var(--cor-texto-suave)' }} />
              <input
                type="email"
                placeholder="seu@email.com"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 h-12 rounded-xl bg-primaria text-white font-semibold text-sm flex items-center gap-2 shrink-0"
            >
              <Send size={16} />
              Assinar
            </motion.button>
          </div>
        </motion.div>

        {/* Selos de segurança + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid var(--cor-borda)' }}
        >
          <p className="text-xs texto-suave text-center sm:text-left">
            © {new Date().getFullYear()} TrustMarket. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4 text-xs texto-suave">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} /> Compra segura
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} /> SSL 256-bits
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard size={14} /> PIX • Cartão • Boleto
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
