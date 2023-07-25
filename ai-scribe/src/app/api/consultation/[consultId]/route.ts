//Get a singular consultation;
//url: http://localhost:3000/api/consultation/[consultId]

import prisma from "../../../../lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { consultId: string } }
) => {
  try {
    const consultation = await prisma.consultation.findMany({ where: { id: params.consultId }, include: { patient: true }});
    return NextResponse.json(consultation);
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
