import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react'

/* =========================================================
   FAQ — depois virá do banco (admin cria/edita/ordena pelo
   painel administrativo)
   ========================================================= */
const PERGUNTAS = [
  {
    id: 1,
    pergunta: 'Como funciona a entrega dos produtos digitais?',
    resposta: 'A entrega é automática. Assim que o pagamento é confirmado, o produto aparece na sua conta e também é enviado para o seu e-mail cadastrado. Tudo em segundos.',
  },
  {
    id: 2,
    pergunta: 'É seguro comprar na TrustMarket?',
    resposta: 'Sim. Todas as compras são protegidas pelo sistema antifraude. Se o produto não for entregue conforme anunciado, você recebe reembolso integral.',
  },
  {
    id: 3,
    pergunta: 'Quais formas de pagamento vocês aceitam?',
    resposta: 'Aceitamos PIX (aprovação instantânea), cartão de crédito e boleto. O PIX é o método mais rápido e com a menor taxa.',
  },
  {
    id: 4,
    pergunta: 'Como faço para começar a vender?',
    resposta: 'É simples: crie sua conta, cadastre sua loja, envie a documentação para verificação e comece a anunciar. Sem mensalidade, você só paga comissão quando vender.',
  },
  {
    id: 5,
    pergunta: 'Quando posso sacar meu saldo?',
    resposta: 'O saldo fica disponível logo após a confirmação da venda. Você pode solicitar saque via PIX a qualquer momento, com prazo de até 24h úteis para cair na conta.',
  },
  {
    id: 6,
    pergunta: 'E se eu tiver algum problema com meu pedido?',
    resposta: 'Nossa equipe de suporte está disponível 24/7. Você pode abrir uma disputa diretamente no pedido e nós vamos mediar a situação até resolver.',
  },
]

function Item({ item, aberto, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--cor-card)',
        border: '1px solid var(--cor-borda)',
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
        aria-expanded={aberto}
      >
        <span className="font-semibold text-sm sm:text-base">
          {item.pergunta}
        </span>
        <motion.div
          animate={{ rotate: aberto ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown size={20} style={{ color: 'var(--cor-primaria)' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm texto-suave leading-relaxed">
              {item.resposta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [aberto, setAberto] = useState(0)

  return (
    <section className="container-app py-12">

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3"
          style={{ background: 'var(--cor-fundo-alt)', color: 'var(--cor-primaria)' }}
        >
          <HelpCircle size={14} />
          Dúvidas frequentes
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Perguntas frequentes
        </h2>
        <p className="text-sm texto-suave">
          Tudo que você precisa saber antes de comprar ou vender
        </p>
      </div>

      <div className="grid gap-3 max-w-3xl mx-auto">
        {PERGUNTAS.map((p, i) => (
          <Item
            key={p.id}
            item={p}
            aberto={aberto === i}
            onClick={() => setAberto(aberto === i ? -1 : i)}
          />
        ))}
      </div>

      {/* Bloco de contato */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-8 max-w-3xl mx-auto rounded-2xl p-6 sm:p-8 text-center"
        style={{ background: 'var(--cor-fundo-alt)', border: '1px solid var(--cor-borda)' }}
      >
        <MessageCircle size={32} style={{ color: 'var(--cor-primaria)' }} className="mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-1">Ainda tem dúvidas?</h3>
        <p className="text-sm texto-suave mb-4">
          Nosso time está pronto pra te ajudar 24 horas por dia.
        </p>
        <button className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-primaria text-white font-semibold text-sm">
          <MessageCircle size={16} />
          Falar com o suporte
        </button>
      </motion.div>

    </section>
  )
}
