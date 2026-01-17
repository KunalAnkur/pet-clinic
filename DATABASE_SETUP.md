# Database Setup Guide - Sequelize with PostgreSQL

This project uses Sequelize ORM with PostgreSQL. Follow these steps to set up the database.

## 1. Install Dependencies

```bash
npm install
```

This will install:
- `sequelize` - Sequelize ORM
- `pg` - PostgreSQL database driver
- `pg-hstore` - PostgreSQL hstore support
- `tsx` - TypeScript executor for seeding (dev dependency)

## 2. Set Up PostgreSQL Database

### Option A: Local PostgreSQL Installation

If you have PostgreSQL installed locally:

```bash
# Create database (in psql or using createdb command)
createdb pet_clinic

# Or using psql:
psql -U postgres
CREATE DATABASE pet_clinic;
```

### Option B: Using Docker (Recommended)

```bash
docker run --name pet-clinic-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=pet_clinic \
  -p 5432:5432 \
  -d postgres:15
```

### Option C: Cloud Database (Supabase, Railway, etc.)

Use the connection string provided by your cloud database service.

## 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/pet_clinic"

# Optional: Enable SSL for production/cloud databases
DB_SSL="false"
```

**Example connection strings:**

- Local PostgreSQL:
  ```env
  DATABASE_URL="postgresql://postgres:password@localhost:5432/pet_clinic"
  ```

- Docker PostgreSQL:
  ```env
  DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/pet_clinic"
  ```

- Cloud (Supabase, Railway, etc.):
  ```env
  DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
  DB_SSL="true"
  ```

## 4. Sync Database Schema

```bash
npm run db:sync
```

This creates/updates tables in your PostgreSQL database based on your models.

## 5. Seed the Database

```bash
npm run db:seed
```

This populates the database with initial doctor data.

## Database Schema

### Doctor Model (`models/Doctor.ts`)
- `id` - Primary key (auto-increment/SERIAL)
- `name` - Doctor's full name
- `photo` - Photo URL (optional)
- `qualification` - Medical qualifications
- `experience` - Years of experience
- `specialty` - Medical specialty
- `timings` - TEXT field storing JSON string array of available times
- `availableDays` - TEXT field storing JSON string array of available days
- `bio` - Biography (optional)
- `isExternal` - Boolean indicating if this is an external/visiting doctor
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Booking Model (`models/Booking.ts`)
- `id` - Primary key (UUID)
- `bookingId` - Unique booking ID string (e.g., "BK1234")
- `service` - Service type ("vaccination" | "treatment" | "surgery")
- `doctorId` - Foreign key to Doctor (INTEGER)
- `date` - Appointment date (TIMESTAMP)
- `timeSlot` - Selected time slot (STRING)
- `ownerName` - Pet owner's name
- `phone` - Contact phone number
- `petType` - Type of pet
- `breed` - Pet breed (optional)
- `age` - Pet age (optional)
- `notes` - Additional notes (optional, TEXT)
- `status` - Booking status ("pending" | "confirmed" | "cancelled")
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

**Relationships:**
- `Booking` belongs to `Doctor` (foreign key: `doctorId`)
- `Doctor` has many `Bookings`

## API Routes

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/[id]` - Get a specific doctor

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (with optional query params: `?status=pending&doctorId=1`)
- `GET /api/bookings/[id]` - Get a specific booking
- `PATCH /api/bookings/[id]` - Update a booking (mainly for status)

## Example API Usage

### Create a Booking

```typescript
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    service: 'vaccination',
    doctorId: 1,
    date: new Date().toISOString(),
    timeSlot: '10:00 AM',
    ownerName: 'John Doe',
    phone: '+91 98765 43210',
    petType: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    notes: 'First visit'
  })
});

const booking = await response.json();
console.log(booking.bookingId); // e.g., "BK1234"
```

### Get All Doctors

```typescript
const response = await fetch('/api/doctors');
const doctors = await response.json();
// Note: timings and availableDays are automatically parsed from JSON strings
```

### Update Booking Status

```typescript
const response = await fetch(`/api/bookings/${bookingId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'confirmed'
  })
});
```

## Project Structure

```
pet-clinic/
├── lib/
│   └── database.ts          # Sequelize PostgreSQL connection setup
├── models/
│   ├── Doctor.ts            # Doctor model definition
│   ├── Booking.ts           # Booking model definition
│   └── index.ts             # Model exports
├── scripts/
│   ├── sync-db.ts           # Database sync script
│   └── seed.ts              # Database seed script
└── app/
    └── api/                 # Next.js API routes
        ├── doctors/
        └── bookings/
```

## Development Workflow

1. **Initial Setup:**
   ```bash
   # Install dependencies
   npm install
   
   # Set up PostgreSQL database (create database)
   # Update .env with DATABASE_URL
   
   # Sync schema and seed data
   npm run db:sync
   npm run db:seed
   ```

2. **Making Changes to Models:**
   - Update model files in `models/`
   - Run `npm run db:sync` to sync schema changes
   - **Note:** In production, use migrations instead of sync

3. **Adding Seed Data:**
   - Update `scripts/seed.ts`
   - Run `npm run db:seed` (note: this clears existing data)

## Troubleshooting

- **Connection refused**: Verify PostgreSQL is running and `DATABASE_URL` is correct
- **Authentication failed**: Check username/password in `DATABASE_URL`
- **Database does not exist**: Create the database first using `CREATE DATABASE pet_clinic;`
- **SSL connection errors**: Set `DB_SSL="true"` in `.env` for cloud databases
- **Port conflicts**: Make sure PostgreSQL is running on port 5432 (or update URL)

## Production Considerations

1. **Use Migrations**: Instead of `db:sync`, use Sequelize migrations for production
2. **Connection Pooling**: The current setup includes connection pooling
3. **Environment Variables**: Never commit `.env` file, use environment variables in your hosting platform
4. **SSL**: Enable SSL for production databases (set `DB_SSL="true"`)
5. **Backups**: Set up regular database backups
