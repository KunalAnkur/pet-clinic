import { NextResponse } from "next/server";
import "@/models"; // Initialize models
import { Doctor } from "@/models/Doctor";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doctorId = parseInt(id);

    if (isNaN(doctorId)) {
      return NextResponse.json(
        { error: "Invalid doctor ID" },
        { status: 400 }
      );
    }

    const doctor = await (Doctor as any).findByPk(doctorId);

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    const doctorData = doctor.toJSON();
    const formattedDoctor = {
      ...doctorData,
      timings: doctorData.timings ? JSON.parse(doctorData.timings) : [],
      availableDays: doctorData.availableDays ? JSON.parse(doctorData.availableDays) : [],
    };

    return NextResponse.json(formattedDoctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctor" },
      { status: 500 }
    );
  }
}
