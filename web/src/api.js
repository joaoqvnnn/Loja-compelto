/* =========================================================
   API — todas as chamadas ao backend passam por aqui.
   A URL vem da variável VITE_API_URL (definida no Render).
   ========================================================= */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

/* ---- Guarda o token no navegador ---- */
export function salvarToken(token) {
  localStorage.setItem('trustmarket_token', token)
}

export function pegarToken() {
  return localStorage.getItem('trustmarket_token')
}

export function removerToken() {
  localStorage.removeItem('trustmarket_token')
}

/* ---- Fetch base com tratamento de erro ---- */
async function request(path, options = {}) {
  const token = pegarToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || 'Erro na requisição')
  }

  return data
}

/* =========================================================
   AUTH
   ========================================================= */
export const auth = {
  cadastrar: (dados) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  entrar: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('/auth/me'),

  sair: () => {
    removerToken()
  },
}

/* =========================================================
   HEALTH CHECK — pra testar se API tá viva
   ========================================================= */
export async function verificarAPI() {
  try {
    const res = await fetch(`${API_URL}/`)
    return res.ok
  } catch {
    return false
  }
}

export { API_URL }
