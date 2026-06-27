import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

// DEBUG VISUAL
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    console.log('[DEBUG] Enviando requisição para:', config.url)
    console.log('[DEBUG] Token:', token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    console.error('[DEBUG] Erro no interceptor:', error)
    return Promise.reject(error)
  }
)

// Interceptor para erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
