//Patient index, returns list of all patients which will correspond to a dropdown list on the frontend
//url: http://localhost:3000/api/patient
//this works and returnS an empty array - no patient database
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";



export const GET = async () => {
  try {
    const patients = await prisma.patient.findMany();
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({message: "GET Error", error}, {status: 500});
  }
  
}


 