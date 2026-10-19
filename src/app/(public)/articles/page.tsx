import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles sur la santé, la famille, la spiritualité, les prophéties bibliques et plus encore.",
};

const categories = [
  "Tout",
  "Santé",
  "Famille",
  "Éducation",
  "Spiritualité",
  "Prophéties Bibliques",
  "Jeunesse",
];

const articles = [
  {
    id: "1",
    slug: "sante-temple-dieu",
    title: "Le Corps — Temple de Dieu : Principes de Santé Adventiste",
    excerpt:
      "Les huit remèdes naturels comme base d'une vie saine selon les Écritures et l'Esprit de Prophétie.",
    coverImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    publishedAt: new Date("2024-09-01"),
    author: "Dr. M. Kalala",
    category: "Santé",
  },
  {
    id: "2",
    slug: "famille-chretienne-fondations",
    title: "Fondations d'une Famille Chrétienne Solide",
    excerpt:
      "Comment construire un foyer fondé sur les principes bibliques dans le contexte africain moderne.",
    coverImage:
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&q=80",
    publishedAt: new Date("2024-08-15"),
    author: "Pasteur P. Ngoy",
    category: "Famille",
  },
  {
    id: "3",
    slug: "education-chretienne-enfants",
    title: "L'Éducation Chrétienne des Enfants",
    excerpt:
      "Principes éducatifs tirés de l'Esprit de Prophétie pour former les futurs citoyens du Royaume.",
    coverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    publishedAt: new Date("2024-07-20"),
    author: "Sœur F. Mutombo",
    category: "Éducation",
  },
  {
    id: "4",
    slug: "propheties-daniel-2",
    title: "Daniel Chapitre 2 : L'Image et les Royaumes",
    excerpt:
      "Étude approfondie de la prophétie de Daniel 2 et son accomplissement dans l'histoire mondiale.",
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    publishedAt: new Date("2024-06-30"),
    author: "Ancien T. Tshilumba",
    category: "Prophéties Bibliques",
  },
  {
    id: "5",
    slug: "priere-vie-spirituelle",
    title: "La Prière : Respiration de l'Âme",
    excerpt:
      "Découvrez comment développer une vie de prière profonde et transformatrice au quotidien.",
    coverImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    publishedAt: new Date("2024-06-10"),
    author: "Pasteur E. Kabongo",
    category: "Spiritualité",
  },
  {
    id: "6",
    slug: "jeunesse-et-technologie",
    title: "La Jeunesse Adventiste face aux Défis Numériques",
    excerpt:
      "Comment naviguer dans l'ère digitale tout en préservant les valeurs chrétiennes.",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    publishedAt: new Date("2024-05-22"),
    author: "Frère A. Mwamba",
    category: "Jeunesse",
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--primary))] py-16 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            Articles
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Bibliothèque d&apos;Articles
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-xl">
            Ressources édifiantes sur la santé, la famille, la spiritualité et
            les prophéties bibliques.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search & Categories */}
        <div className="mb-10 flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input placeholder="Rechercher un article…" className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === "Tout" ? "default" : "outline"}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 bg-[hsl(var(--primary))]">
                  {article.category}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>·</span>
                  <span>{article.author}</span>
                </div>
                <h2 className="mb-2 flex-1 text-lg font-bold leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                <p className="mb-4 line-clamp-2 text-sm text-[hsl(var(--muted-foreground))]">
                  {article.excerpt}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="self-start"
                >
                  <Link href={`/articles/${article.slug}`}>
                    Lire l&apos;article
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
