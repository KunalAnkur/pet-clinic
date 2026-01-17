import 'dotenv/config'; // Load .env file
import { connectDatabase, sequelize } from '@/lib/database';
import { Doctor, Booking } from '@/models';

async function seed() {
  try {
    await connectDatabase();
    console.log('🌱 Seeding database...');

    // Clear existing data using raw SQL with CASCADE to handle foreign keys
    // This truncates both tables and resets sequences
    await sequelize.query('TRUNCATE TABLE "bookings", "doctors" RESTART IDENTITY CASCADE');

    // Seed doctors
    const doctors = [
      {
        name: "Dr. Ashok Kumar",
        photo: "/doctors/doctor1.jpg",
        qualification: "BVSc & AH, MVSc (Medicine)",
        experience: 34,
        specialty: "Internal Medicine & Vaccination",
        phone: "+919876543210",
        timings: JSON.stringify(["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM"]),
        availableDays: JSON.stringify(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
        bio: "Specializes in preventive care and complex medical cases with over a decade of experience.",
        isExternal: false,
      },
      {
        name: "Dr. Rajesh Kumar",
        photo: "/doctors/doctor2.jpg",
        qualification: "BVSc & AH, PhD (Veterinary Surgery)",
        experience: 15,
        specialty: "Orthopedic & Soft Tissue Surgery",
        phone: "+919876543211",
        timings: JSON.stringify(["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "4:00 PM", "4:30 PM", "5:00 PM"]),
        availableDays: JSON.stringify(["Monday", "Wednesday", "Friday", "Saturday"]),
        bio: "Expert in surgical procedures with a gentle approach to patient care.",
        isExternal: false,
      },
      {
        name: "Dr. Priya Mehta",
        photo: "/doctors/doctor3.jpg",
        qualification: "BVSc & AH, MVSc (Dermatology)",
        experience: 8,
        specialty: "Dermatology & General Practice",
        phone: "+919876543212",
        timings: JSON.stringify(["11:00 AM", "11:30 AM", "12:00 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"]),
        availableDays: JSON.stringify(["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
        bio: "Focused on skin conditions and allergies with compassionate pet handling.",
        isExternal: false,
      },
      {
        name: "External Specialist",
        photo: "/doctors/specialist.jpg",
        qualification: "Visiting Surgeon",
        experience: 20,
        specialty: "Advanced Surgical Procedures",
        phone: "+919876543213",
        timings: JSON.stringify(["On-Call"]),
        availableDays: JSON.stringify(["By Appointment"]),
        bio: "Available for complex surgeries and specialized procedures upon request.",
        isExternal: true,
      },
    ];

    await Doctor.bulkCreate(doctors);

    console.log('✅ Seeded doctors successfully!');
    console.log(`   Created ${doctors.length} doctors`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
