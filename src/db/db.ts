import { Pool } from 'pg';
import configuration from '../config';
export const pool = new Pool({
  connectionString: configuration.connectionStr,
});

const initDB = async () => {
  try {
    await pool.query(`
    
    CREATE TABLE  IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'contributor' CHECK(role IN ('contributor','maintainer')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  
    )
    `);


    await pool.query(`
    
    CREATE TABLE  IF NOT EXISTS issues(
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL CHECK(length(description) >= 20),
    type TEXT NOT NULL CHECK(type IN ('bug','feature_request')),
    status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','in_progress','resolved')),
    reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  
    )
    `);
    console.log("db connected successfully")

  } catch (error) {
    console.log(error)
  }
};

export default initDB;