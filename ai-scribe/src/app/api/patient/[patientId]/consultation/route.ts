//localhost:3000/api/patient/${patientId}/consultation
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,

  { params}: { params:{ patientId: string } },
) {
  try {
    const { patientId } = params;
    const patient = await prisma.patient.findUnique({
      where: { patientId },
      include: {
        consultation: true,
      },
    });
    
    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json({message: "GET Error", error}, {status: 500});
  }
  
}


