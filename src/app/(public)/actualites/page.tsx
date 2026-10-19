import Image from "next/image";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Toutes les actualités de l'Église Adventiste du Septième Jour Mouvement de Réforme en RDC.",
};

const allNews = [
  {
    id: "1",
    slug: "assemblee-generale-2024",
    title: "Assemblée Générale 2024 — Rapport et Résolutions",
    excerpt:
      "L'Assemblée Générale de l'Église SDARM-RDC a adopté plusieurs résolutions importantes pour l'avancement de la mission.",
    coverImage:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    publishedAt: new Date("2024-09-15"),
    author: { name: "Rédaction SDARM" },
    tag: "Organisation",
  },
  {
    id: "2",
    slug: "evangelisation-kinshasa",
    title: "Série d'Évangélisation à Kinshasa",
    excerpt:
      "Une semaine de réunions d'évangélisation a vu plus de 200 décisions pour le baptême dans la commune de Lingwala.",
    coverImage:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
    publishedAt: new Date("2024-08-20"),
    author: { name: "Pasteur J. Mukendi" },
    tag: "Évangélisation",
  },
  {
    id: "3",
    slug: "formation-anciens-eglise",
    title: "Formation des Anciens d'Église — Session Nationale",
    excerpt:
      "La Direction Nationale a organisé une session de formation intensive pour les anciens des 12 fédérations de RDC.",
    coverImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    publishedAt: new Date("2024-07-10"),
    author: { name: "Direction Nationale" },
    tag: "Formation",
  },
  {
    id: "4",
    slug: "camp-jeunesse-2024",
    title: "Camp de la Jeunesse 2024 — Un Succès Retentissant",
    excerpt:
      "Plus de 500 jeunes ont participé au camp national de la jeunesse adventiste réformée tenu à Lubumbashi.",
    coverImage:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    publishedAt: new Date("2024-06-25"),
    author: { name: "Département Jeunesse" },
    tag: "Jeunesse",
  },
  {
    id: "5",
    slug: "retraite-spirituelle-kivu",
    title: "Retraite Spirituelle au Kivu",
    excerpt:
      "Les membres du Kivu se sont rassemblés pour une semaine de retraite spirituelle au bord du lac Kivu.",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    publishedAt: new Date("2024-05-18"),
    author: { name: "Fédération du Kivu" },
    tag: "Spiritualité",
  },
  {
    id: "6",
    slug: "nouveau-temple-mbuji-mayi",
    title: "Inauguration du Nouveau Temple de Mbuji-Mayi",
    excerpt:
      "Un temple pouvant accueillir 800 fidèles a été inauguré dans la ville diamantaire de Mbuji-Mayi.",
    coverImage:
      "https://images.unsplash.com/photo-1438232992991-995b671e4b8a?w=800&q=80",
    publishedAt: new Date("2024-04-03"),
    author: { name: "Fédération du Kasaï" },
    tag: "Infrastructure",
  },
];

export default function ActualitesPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-[hsl(var(--primary))] py-16 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            Actualités
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Toutes les Actualités
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-xl">
            Restez informé des dernières nouvelles de l&apos;Église Adventiste
            du Septième Jour Mouvement de Réforme en RDC.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search & Filter */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input placeholder="Rechercher une actualité…" className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Tout",
              "Organisation",
              "Évangélisation",
              "Formation",
              "Jeunesse",
            ].map((tag) => (
              <Button
                key={tag}
                variant={tag === "Tout" ? "default" : "outline"}
                size="sm"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allNews.map((news) => (
            <article
              key={news.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={news.coverImage}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 bg-[hsl(var(--primary))]">
                  {news.tag}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{formatDate(news.publishedAt)}</span>
                  <span>·</span>
                  <span>{news.author.name}</span>
                </div>
                <h2 className="mb-2 flex-1 text-lg font-bold leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">
                  <Link href={`/actualites/${news.slug}`}>{news.title}</Link>
                </h2>
                <p className="mb-4 line-clamp-2 text-sm text-[hsl(var(--muted-foreground))]">
                  {news.excerpt}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-auto self-start"
                >
                  <Link href={`/actualites/${news.slug}`}>Lire Plus</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button variant="outline" disabled>
            Précédent
          </Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Suivant</Button>
        </div>
      </div>
    </div>
  );
}
