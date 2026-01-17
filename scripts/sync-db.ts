import 'dotenv/config'; // Load .env file
import { sequelize, connectDatabase } from '@/lib/database';
import '@/models'; // Import models to register them

async function syncDatabase() {
  try {
    await connectDatabase();
    
    console.log('🔄 Syncing database...');
    
    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    
    console.log('✅ Database synchronized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    process.exit(1);
  }
}

syncDatabase();
