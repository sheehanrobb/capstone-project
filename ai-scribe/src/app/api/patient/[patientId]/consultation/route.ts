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

    // const patient = await prisma.patient.findUnique({
    //   where: { patientId },
    //   include: {
    //     consultation: true,
    //   },
    // });

    return NextResponse.json(consultation);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
}
// export const GET = async () => {
//   try {
//     const patientConsult = await prisma.patient.findUnique();
//     return NextResponse.json(patientConsult);
//   } catch (error) {
//     return NextResponse.json({message: "GET Error", error}, {status: 500});
//   }

// }
