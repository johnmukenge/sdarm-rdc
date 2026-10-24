import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const updateNewsSchema = z.object({
  title: z.string().min(1, "Le titre est requis").optional(),
  excerpt: z.string().min(1, "L'extrait est requis").optional(),
  content: z.string().min(1, "Le contenu est requis").optional(),
  coverImage: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  featured: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const news = await prisma.news.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!news) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    if (news.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const body = await req.json();
    const validated = updateNewsSchema.parse(body);

    const updated = await prisma.news.update({
      where: { id },
      data: {
        ...validated,
        publishedAt:
          validated.status === "PUBLISHED" && !news.publishedAt
            ? new Date()
            : news.publishedAt,
      },
      include: { author: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.flatten() },
        { status: 400 },
      );
    }
    console.error("News update error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) {
      return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    }

    if (news.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    await prisma.news.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
