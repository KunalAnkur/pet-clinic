import { NextResponse } from "next/server";
import "@/models"; // Initialize models
import { Booking } from "@/models/Booking";
import { Doctor } from "@/models/Doctor";
import { z } from "zod";

const updateBookingSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const booking = await (Booking as any).findByPk(id, {
      include: [{
        model: Doctor,
        as: 'doctor',
        attributes: ['id', 'name', 'specialty'],
      }],
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    const bookingData = booking.toJSON();
    // Ensure dates are serializable
    if (bookingData.date) {
      bookingData.date = bookingData.date instanceof Date ? bookingData.date.toISOString() : bookingData.date;
    }
    if (bookingData.createdAt) {
      bookingData.createdAt = bookingData.createdAt instanceof Date ? bookingData.createdAt.toISOString() : bookingData.createdAt;
    }
    if (bookingData.updatedAt) {
      bookingData.updatedAt = bookingData.updatedAt instanceof Date ? bookingData.updatedAt.toISOString() : bookingData.updatedAt;
    }
    return NextResponse.json(bookingData);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateBookingSchema.parse(body);

    const booking = await (Booking as any).findByPk(id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    await booking.update(validatedData);

    // Fetch updated booking with doctor details
    const updatedBooking = await (Booking as any).findByPk(id, {
      include: [{
        model: Doctor,
        as: 'doctor',
        attributes: ['id', 'name', 'specialty'],
      }],
    });

    const bookingData = updatedBooking?.toJSON();
    // Ensure dates are serializable
    if (bookingData?.date) {
      bookingData.date = bookingData.date instanceof Date ? bookingData.date.toISOString() : bookingData.date;
    }
    if (bookingData?.createdAt) {
      bookingData.createdAt = bookingData.createdAt instanceof Date ? bookingData.createdAt.toISOString() : bookingData.createdAt;
    }
    if (bookingData?.updatedAt) {
      bookingData.updatedAt = bookingData.updatedAt instanceof Date ? bookingData.updatedAt.toISOString() : bookingData.updatedAt;
    }
    return NextResponse.json(bookingData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
