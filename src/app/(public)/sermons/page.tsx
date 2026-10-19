import Image from "next/image";
import Link from "next/link";
import { Play, Search, Calendar, User, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Bibliothèque de sermons de l'Église Adventiste du Septième Jour Mouvement de Réforme.",
};

const sermons = [
  {
    id: "1",
    slug: "sanctification-chemin-ciel",
    title: "La Sanctification : Le Chemin vers le Ciel",
    preacher: "Pasteur E. Kabongo",
    sermonDate: new Date("2024-09-21"),
    thumbnail:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    category: "Sanctification",
  },
  {
    id: "2",
    slug: "sabbat-signe-eternel",
    title: "Le Sabbat : Signe Éternel entre Dieu et Son Peuple",
    preacher: "Pasteur J. Mukendi",
    sermonDate: new Date("2024-09-14"),
    thumbnail:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    category: "Sabbat",
  },
  {
    id: "3",
    slug: "prophecies-fin-temps",
    title: "Les Prophéties de la Fin des Temps",
    preacher: "Ancien T. Tshilumba",
    sermonDate: new Date("2024-09-07"),
    thumbnail:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80",
    category: "Prophéties",
  },
  {
    id: "4",
    slug: "foi-oeuvres",
    title: "La Foi sans les Œuvres est Morte",
    preacher: "Pasteur P. Ngoy",
    sermonDate: new Date("2024-08-31"),
    thumbnail:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    category: "Foi",
  },
  {
    id: "5",
    slug: "retour-christ-esperance",
    title: "Le Retour du Christ — Notre Bienheureuse Espérance",
    preacher: "Pasteur E. Kabongo",
    sermonDate: new Date("2024-08-24"),
    thumbnail:
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=800&q=80",
    category: "Seconde Venue",
  },
  {
    id: "6",
    slug: "saint-esprit-vie-chretienne",
    title: "Le Saint-Esprit dans la Vie Chrétienne",
    preacher: "Pasteur J. Mukendi",
    sermonDate: new Date("2024-08-17"),
    thumbnail:
      "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=800&q=80",
    category: "Saint-Esprit",
  },
];

const categories = [
  "Tout",
  "Sanctification",
  "Sabbat",
  "Prophéties",
  "Foi",
  "Seconde Venue",
  "Saint-Esprit",
];

export default function SermonsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--primary))] py-16 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            Sermons
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Bibliothèque de Sermons
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-xl">
            Édifiez votre foi avec les messages spirituels de nos prédicateurs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <Input
                placeholder="Rechercher par titre ou prédicateur…"
                className="pl-9"
              />
            </div>
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <article
              key={sermon.id}
              className="group overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:shadow-lg transition-shadow"
            >
              <Link href={`/sermons/${sermon.slug}`}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    fill
                    className="object-cover brightness-75 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                      <Play
                        className="h-5 w-5 text-[hsl(var(--primary))] translate-x-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <Badge className="absolute left-4 top-4 bg-[hsl(var(--primary))]">
                    {sermon.category}
                  </Badge>
                </div>
              </Link>
              <div className="p-5">
                <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(sermon.sermonDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {sermon.preacher}
                  </span>
                </div>
                <h2 className="font-bold text-base leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">
                  <Link href={`/sermons/${sermon.slug}`}>{sermon.title}</Link>
                </h2>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href={`/sermons/${sermon.slug}`}>
                    <Play className="mr-1.5 h-3.5 w-3.5" /> Regarder
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
