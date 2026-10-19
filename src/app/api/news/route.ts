import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "PUBLISHED";
  const limit = Number(searchParams.get("limit") ?? "10");
  const page = Number(searchParams.get("page") ?? "1");

  try {
    const [total, news] = await Promise.all([
      prisma.news.count({ where: { status: status as "PUBLISHED" } }),
      prisma.news.findMany({
        where: { status: status as "PUBLISHED" },
        include: { author: { select: { name: true, image: true } } },
        orderBy: { publishedAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
    ]);

    return NextResponse.json({
      data: news,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
