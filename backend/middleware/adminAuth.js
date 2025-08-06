const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || 
                  req.headers['x-admin-token']
    
    if (!token) {
      return res.status(401).json({ error: 'Token de admin não fornecido' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado - Admin necessário' })
    }
    
    req.admin = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token de admin inválido' })
  }
}

module.exports = adminAuth