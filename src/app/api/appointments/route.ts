import { validateAppointment } from "@/lib";
import { AppointmentRequest } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data: AppointmentRequest = await request.json();
    const errors = validateAppointment(data);

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Appointment scheduled successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to schedule appointment",
      },
      { status: 500 }
    );
  }
}
