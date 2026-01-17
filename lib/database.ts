import { Sequelize } from 'sequelize';
// Explicitly import and require pg to ensure it's available for Sequelize
import pg from 'pg';
const { types } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required. Please set it in your .env file.');
}

// Create Sequelize instance for PostgreSQL
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    // Enable SSL for cloud databases (Supabase, Railway, Render, etc.)
    ssl: process.env.DB_SSL !== 'false' && (databaseUrl.includes('sslmode=require') || 
          databaseUrl.includes('supabase') || 
          databaseUrl.includes('railway') ||
          databaseUrl.includes('render.com') ||
          process.env.NODE_ENV === 'production') ? {
      require: true,
      rejectUnauthorized: false
    } : false,
    // Force IPv4 if IPv6 is causing issues
    connect_timeout: 10,
  }
});

// Test connection
export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
}
