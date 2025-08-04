const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')
const path = require('path')

const dbPath = path.join(__dirname, 'timeright.db')
const db = new sqlite3.Database(dbPath)

// Criar tabelas
db.serialize(() => {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'client' CHECK(role IN ('client', 'admin')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Tabela de serviços
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      duration INTEGER NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Tabela de agendamentos
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      service_id INTEGER NOT NULL,
      professional_id INTEGER DEFAULT 1,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (service_id) REFERENCES services(id)
    )
  `)

  // Inserir usuário admin
  const adminPassword = bcrypt.hashSync('admin123', 10)
  db.run(`
    INSERT OR IGNORE INTO users (name, email, phone, password, role) 
    VALUES ('Admin', 'admin@timeright.com', '(11) 99999-9999', ?, 'admin')
  `, [adminPassword])

  // Inserir usuário teste
  const userPassword = bcrypt.hashSync('123456', 10)
  db.run(`
    INSERT OR IGNORE INTO users (name, email, phone, password, role) 
    VALUES ('João Silva', 'joao@email.com', '(11) 98888-8888', ?, 'client')
  `, [userPassword])

  // Inserir serviços de exemplo
  const services = [
    ['Corte Feminino', 'cabelo', 50.00, 60, 'Corte moderno e estiloso', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400'],
    ['Coloração', 'cabelo', 120.00, 120, 'Coloração profissional', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'],
    ['Manicure', 'manicure', 25.00, 45, 'Cuidado completo das unhas', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'],
    ['Maquiagem', 'maquiagem', 80.00, 90, 'Maquiagem para eventos', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400']
  ]

  services.forEach(service => {
    db.run(`
      INSERT OR IGNORE INTO services (name, category, price, duration, description, image) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, service)
  })

  console.log('Banco de dados SQLite criado com sucesso!')
})

db.close()