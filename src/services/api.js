import axios from 'axios'

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
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
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