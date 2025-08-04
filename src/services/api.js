import axios from 'axios'

// Cache simples para requisições GET
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Cache para requisições GET
    if (config.method === 'get') {
      const cacheKey = `${config.url}${JSON.stringify(config.params || {})}`
      const cached = cache.get(cacheKey)
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        config.adapter = () => Promise.resolve(cached.data)
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    // Armazenar resposta no cache para requisições GET
    if (response.config.method === 'get') {
      const cacheKey = `${response.config.url}${JSON.stringify(response.config.params || {})}`
      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      })
    }
    return response
  },
  (error) => {
    console.error('Erro na API:', error)
    
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      error.message = 'Servidor não está rodando. Execute: npm run server'
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    if (error.response?.status === 404) {
      error.message = 'Recurso não encontrado'
    }
    
    if (error.response?.status >= 500) {
      error.message = 'Erro interno do servidor'
    }
    
    return Promise.reject(error)
  }
)

export default api