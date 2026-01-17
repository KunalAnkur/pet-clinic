import { NextResponse } from "next/server";
import "@/models"; // Initialize models
import { Doctor } from "@/models/Doctor";

export async function GET() {
  try {
    const doctors = await (Doctor as any).findAll({
      order: [['id', 'ASC']],
    });

    // Parse JSON strings back to arrays
    const formattedDoctors = doctors.map((doctor: any) => {
      const doctorData = doctor.toJSON ? doctor.toJSON() : doctor;
      return {
        ...doctorData,
        timings: doctorData.timings ? JSON.parse(doctorData.timings) : [],
        availableDays: doctorData.availableDays ? JSON.parse(doctorData.availableDays) : [],
      };
    });

    return NextResponse.json(formattedDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
