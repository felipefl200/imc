import prisma from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const imcs = await prisma.imc.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return NextResponse.json(imcs, { status: 200 });
}

export async function POST(request: Request) {
  const { peso, altura } = await request.json();
  const imc = await prisma.imc.create({
    data: {
      peso,
      altura,
      imc: Number((peso / (altura * altura)).toFixed(2)),
    },
  });
  return NextResponse.json(imc, { status: 201 });
}
