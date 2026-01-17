import { sequelize, connectDatabase } from '@/lib/database';
import { Doctor } from './Doctor';
import { Booking } from './Booking';

// Initialize models - import to register them
import './Doctor';
import './Booking';

// Export sequelize instance
export { sequelize, connectDatabase, Doctor, Booking };
