import { NextResponse } from "next/server";
import "@/models"; // Initialize models
import { Booking } from "@/models/Booking";
import { Doctor } from "@/models/Doctor";
import { z } from "zod";
import { randomUUID } from "crypto";

const bookingSchema = z.object({
  service: z.enum(["vaccination", "treatment", "surgery"]),
  doctorId: z.number().int().positive(),
  date: z.string().datetime(),
  timeSlot: z.string(),
  ownerName: z.string().min(1),
  phone: z.string().min(1),
  petType: z.string().min(1),
  breed: z.string().optional(),
  age: z.string().optional(),
  notes: z.string().optional(),
});

// Helper function to serialize dates recursively
const serializeDates = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(serializeDates);
  if (typeof obj === 'object') {
    const serialized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value instanceof Date) {
          serialized[key] = value.toISOString();
        } else if (typeof value === 'object' && value !== null) {
          serialized[key] = serializeDates(value);
        } else {
          serialized[key] = value;
        }
      }
    }
    return serialized;
  }
  return obj;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Check if doctor exists
    const doctor = await (Doctor as any).findByPk(validatedData.doctorId);

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    // Generate unique booking ID
    let bookingId: string;
    let isUnique = false;
    while (!isUnique) {
      bookingId = `BK${Math.floor(1000 + Math.random() * 9000)}`;
      const existing = await (Booking as any).findOne({ where: { bookingId } });
      if (!existing) {
        isUnique = true;
      }
    }

    // Create booking
    const booking = await (Booking as any).create({
      id: randomUUID(),
      bookingId: bookingId!,
      service: validatedData.service,
      doctorId: validatedData.doctorId,
      date: new Date(validatedData.date),
      timeSlot: validatedData.timeSlot,
      ownerName: validatedData.ownerName,
      phone: validatedData.phone,
      petType: validatedData.petType,
      breed: validatedData.breed || null,
      age: validatedData.age || null,
      notes: validatedData.notes || null,
      status: "pending",
    });

    // Fetch booking with doctor details
    let bookingWithDoctor;
    try {
      bookingWithDoctor = await (Booking as any).findByPk(booking.id, {
        include: [{
          model: Doctor,
          as: 'doctor',
          attributes: ['id', 'name', 'specialty'],
        }],
      });
    } catch (includeError) {
      console.error('Error fetching booking with doctor:', includeError);
      // If include fails, try without include
      bookingWithDoctor = await (Booking as any).findByPk(booking.id);
      if (bookingWithDoctor) {
        // Manually add doctor info
        const doctor = await (Doctor as any).findByPk(validatedData.doctorId, {
          attributes: ['id', 'name', 'specialty'],
        });
        bookingWithDoctor.doctor = doctor;
      }
    }

    if (!bookingWithDoctor) {
      console.error('Failed to fetch created booking with id:', booking.id);
      // Return the booking we just created
      const bookingData = booking.toJSON();
      const serializedData = bookingData ? serializeDates(bookingData) : null;
      return NextResponse.json(serializedData || { error: "Booking created but failed to retrieve" }, { status: 201 });
    }

    const bookingData = bookingWithDoctor.toJSON();
    
    if (!bookingData) {
      return NextResponse.json(
        { error: "Failed to retrieve created booking" },
        { status: 500 }
      );
    }

    const serializedData = serializeDates(bookingData);
    return NextResponse.json(serializedData, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const doctorId = searchParams.get("doctorId");

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (doctorId) {
      where.doctorId = parseInt(doctorId);
    }

    const bookings = await (Booking as any).findAll({
      where,
      include: [{
        model: Doctor,
        as: 'doctor',
        attributes: ['id', 'name', 'specialty'],
      }],
      order: [['date', 'DESC']],
    });

    // Helper function to serialize dates in booking data
    const serializeBooking = (booking: any) => {
      const data = booking.toJSON ? booking.toJSON() : booking;
      if (data.date) {
        data.date = data.date instanceof Date ? data.date.toISOString() : data.date;
      }
      if (data.createdAt) {
        data.createdAt = data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt;
      }
      if (data.updatedAt) {
        data.updatedAt = data.updatedAt instanceof Date ? data.updatedAt.toISOString() : data.updatedAt;
      }
      return data;
    };

    return NextResponse.json(bookings.map((b: any) => serializeBooking(b)));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
