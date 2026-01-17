import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/lib/database';
import { Doctor } from './Doctor';

interface BookingAttributes {
  id: string;
  bookingId: string;
  service: string;
  doctorId: number;
  date: Date;
  timeSlot: string;
  ownerName: string;
  phone: string;
  petType: string;
  breed: string | null;
  age: string | null;
  notes: string | null;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: string;
  public bookingId!: string;
  public service!: string;
  public doctorId!: number;
  public date!: Date;
  public timeSlot!: string;
  public ownerName!: string;
  public phone!: string;
  public petType!: string;
  public breed!: string | null;
  public age!: string | null;
  public notes!: string | null;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctors',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeSlot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
    indexes: [
      {
        fields: ['doctorId'],
      },
      {
        fields: ['date'],
      },
      {
        fields: ['status'],
      },
    ],
  }
);

// Define associations
Booking.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Doctor.hasMany(Booking, { foreignKey: 'doctorId', as: 'bookings' });
