//localhost:3000/api/patient/${patientId}
//get one patient and create a consultation
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,

  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params;

    const consultation = await prisma.consultation.create({
      data: {
        patientId,
        seenOn: new Date(),
        summary: "",
      },
    });

    return NextResponse.json(consultation);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
}

