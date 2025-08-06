const sql = require('mssql')

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'YourPassword123',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'TimeRight',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

let pool

const connectDB = async () => {
  try {
    pool = await sql.connect(config)
    console.log('✅ Conectado ao SQL Server')
    return pool
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error)
    process.exit(1)
  }
}

const getPool = () => {
  if (!pool) {
    throw new Error('Banco de dados não conectado')
  }
  return pool
}

module.exports = { connectDB, getPool, sql }