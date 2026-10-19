import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const churches = await prisma.church.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(churches);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (
    !session?.user ||
    !["ADMIN", "EDITOR"].includes(session.user.role as string)
  ) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const church = await prisma.church.create({ data: body });
    return NextResponse.json(church, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur de création" }, { status: 400 });
  }
}
