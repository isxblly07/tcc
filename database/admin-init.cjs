const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')
const path = require('path')

const dbPath = path.join(__dirname, 'timeright.db')
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  // Tabela de Administradores
  db.run(`
    CREATE TABLE IF NOT EXISTS administrators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Tabela de Promoções
  db.run(`
    CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      service_id INTEGER,
      discount_percent REAL NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_id) REFERENCES services(id)
    )
  `)

  // Tabela de Horários de Funcionamento
  db.run(`
    CREATE TABLE IF NOT EXISTS business_hours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_of_week INTEGER NOT NULL CHECK(day_of_week BETWEEN 0 AND 6),
      open_time TEXT NOT NULL,
      close_time TEXT NOT NULL,
      active BOOLEAN DEFAULT 1
    )
  `)

  // Tabela de Notificações
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      type TEXT NOT NULL CHECK(type IN ('reminder', 'confirmation', 'cancellation')),
      message TEXT NOT NULL,
      sent BOOLEAN DEFAULT 0,
      scheduled_for DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)

  // Tabela de Avaliações
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      appointment_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      service_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (appointment_id) REFERENCES appointments(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (service_id) REFERENCES services(id)
    )
  `)

  // Inserir admin padrão
  const adminPassword = bcrypt.hashSync('Admin@123', 10)
  db.run(`
    INSERT OR IGNORE INTO administrators (name, email, password_hash) 
    VALUES ('Super Admin', 'admin@timeright.com', ?)
  `, [adminPassword])

  // Inserir horários padrão
  const businessHours = [
    [1, '08:00', '18:00'], [2, '08:00', '18:00'], [3, '08:00', '18:00'],
    [4, '08:00', '18:00'], [5, '08:00', '18:00'], [6, '08:00', '16:00']
  ]
  
  businessHours.forEach(([day, open, close]) => {
    db.run(`
      INSERT OR IGNORE INTO business_hours (day_of_week, open_time, close_time) 
      VALUES (?, ?, ?)
    `, [day, open, close])
  })

  console.log('Tabelas de administração criadas!')
})

db.close()