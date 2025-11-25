const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.resolve(__dirname, "../hrms.db"),
  (err) => {
    if (err) {
      console.error("Database connection failed", err.message);
    } else {
      console.log("Sql Database connected");
      db.run("PRAGMA foreign_keys = ON");
    }
  }
);

db.run(`
    CREATE TABLE IF NOT EXISTS  organisations(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    admin_name TEXt NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    `);

db.run(`
    CREATE TABLE IF NOT EXISTS employees(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employeeName TEXT NOT NULL,
    email TEXT NOT NULL,
    position TEXT NOT NULL,
    department TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    organisations_id INTEGER,
    FOREIGN KEY (organisations_id) REFERENCES organisations(id)
    )
    `);

db.run(`
      CREATE TABLE IF NOT EXISTS teams(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      organisations_id INTEGER,
      FOREIGN KEY (organisations_id) REFERENCES organisations(id)

      )
      `);

db.run(`
  CREATE TABLE IF NOT EXISTS employee_teams(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER,
  employee_id INTEGER,
  assigned_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
 
  )
  `);

db.run(`
    CREATE TABLE IF NOT EXISTS activity_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    organisations_id INTEGER,
    FOREIGN KEY (organisations_id) REFERENCES organisations(id)
    
    )
    `);

module.exports = db;
