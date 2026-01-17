import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/lib/database';

interface DoctorAttributes {
  id: number;
  name: string;
  photo: string | null;
  qualification: string;
  experience: number;
  specialty: string;
  phone: string | null;
  timings: string; // JSON string
  availableDays: string; // JSON string
  bio: string | null;
  isExternal: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DoctorCreationAttributes extends Optional<DoctorAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Doctor extends Model<DoctorAttributes, DoctorCreationAttributes> implements DoctorAttributes {
  public id!: number;
  public name!: string;
  public photo!: string | null;
  public qualification!: string;
  public experience!: number;
  public specialty!: string;
  public phone!: string | null;
  public timings!: string;
  public availableDays!: string;
  public bio!: string | null;
  public isExternal!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timings: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '[]',
    },
    availableDays: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '[]',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isExternal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'doctors',
    timestamps: true,
  }
);
