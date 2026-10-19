import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Church,
  Calendar,
  Star,
  ChevronRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Bienvenue sur le site de l'Église Adventiste du Septième Jour Mouvement de Réforme en RDC.",
};

// Demo data — replaced by DB queries once DATABASE_URL is configured
const featuredNews = [
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
    featured: true,
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
    featured: false,
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
    featured: false,
  },
];

const featuredSermon = {
  id: "1",
  slug: "sanctification-chemin-ciel",
  title: "La Sanctification : Le Chemin vers le Ciel",
  preacher: "Pasteur Emmanuel Kabongo",
  thumbnail:
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
  sermonDate: new Date("2024-09-21"),
  category: "Sanctification",
};

const currentLesson = {
  title: "La Grande Controverse",
  quarter: "Q4 2024",
  coverImage:
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
  description:
    "Étude du plan de la rédemption à travers le grand conflit entre le bien et le mal.",
};

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=1920&q=85"
            alt="Église"
            fill
            priority
            className="object-cover brightness-[0.35]"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-[hsl(var(--accent))]/90 text-[hsl(var(--accent-foreground))] text-xs font-semibold tracking-widest uppercase px-4 py-1">
            Bienvenue
          </Badge>
          <h1
            id="hero-heading"
            className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl"
          >
            Église Adventiste du Septième Jour
            <span className="block text-[hsl(var(--accent))]">
              Mouvement de Réforme
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            A la loi et au témoignage; Si on ne parle pas ansi il n&apos;y aura
            point d&apos;aurore pour le peuple.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="xl"
              className="bg-white text-[hsl(var(--primary))] hover:bg-white/90 font-bold"
            >
              <Link href="/etude-biblique">
                <BookOpen className="mr-2 h-5 w-5" />
                Demander une Étude Biblique
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/eglises">
                <Church className="mr-2 h-5 w-5" />
                Trouver une Église
              </Link>
            </Button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 text-xs">
          <div className="h-8 w-[1px] bg-white/30" />
          <span>Défiler</span>
        </div>
      </section>

      {/* ─── Stats strip ───────────────────────────────────────────────────── */}
      <section
        className="bg-[hsl(var(--primary))] py-8 text-white"
        aria-label="Statistiques"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "12", label: "Fédérations" },
              { value: "300+", label: "Églises locales" },
              { value: "50 000+", label: "Membres" },
              { value: "1925", label: "Fondé en" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-[hsl(var(--accent))]">
                  {value}
                </p>
                <p className="text-sm text-white/80 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── News Feed ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" aria-labelledby="news-heading">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Badge
                variant="outline"
                className="mb-2 text-[hsl(var(--primary))] border-[hsl(var(--primary))]"
              >
                Actualités
              </Badge>
              <h2
                id="news-heading"
                className="text-3xl font-black tracking-tight md:text-4xl"
              >
                Dernières Nouvelles
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="hidden sm:flex text-[hsl(var(--primary))]"
            >
              <Link href="/actualites">
                Voir tout <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Featured + side list */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Featured card */}
            <div className="lg:col-span-2">
              <article className="group relative overflow-hidden rounded-2xl bg-[hsl(var(--card))] shadow-md hover:shadow-xl transition-shadow">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featuredNews[0].coverImage}
                    alt={featuredNews[0].title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-4 top-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
                    À la Une
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                    <span>{formatDate(featuredNews[0].publishedAt)}</span>
                    <span>·</span>
                    <span>{featuredNews[0].author.name}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold group-hover:text-[hsl(var(--primary))] transition-colors">
                    {featuredNews[0].title}
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] line-clamp-2">
                    {featuredNews[0].excerpt}
                  </p>
                  <Button asChild className="mt-4" variant="outline">
                    <Link href={`/actualites/${featuredNews[0].slug}`}>
                      Lire Plus <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            </div>

            {/* Side list */}
            <div className="flex flex-col gap-4">
              {featuredNews.slice(1).map((news) => (
                <article
                  key={news.id}
                  className="group flex gap-4 rounded-xl border border-[hsl(var(--border))] p-4 hover:border-[hsl(var(--primary))]/30 transition-colors bg-[hsl(var(--card))]"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={news.coverImage}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">
                      {formatDate(news.publishedAt)}
                    </p>
                    <h3 className="line-clamp-2 text-sm font-semibold group-hover:text-[hsl(var(--primary))] transition-colors">
                      <Link href={`/actualites/${news.slug}`}>
                        {news.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}

              <Button asChild variant="outline" className="mt-auto">
                <Link href="/actualites">
                  Toutes les actualités <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sermon + Leçon ───────────────────────────────────────────────── */}
      <section
        className="bg-[hsl(var(--muted))]/40 py-16 lg:py-24"
        aria-labelledby="resources-heading"
      >
        <div className="container mx-auto px-4">
          <h2
            id="resources-heading"
            className="mb-10 text-3xl font-black tracking-tight md:text-4xl text-center"
          >
            Ressources Spirituelles
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Featured Sermon */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={featuredSermon.thumbnail}
                  alt={featuredSermon.title}
                  fill
                  className="object-cover brightness-75 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <Play
                      className="h-6 w-6 text-[hsl(var(--primary))] translate-x-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <Badge className="absolute left-4 top-4 bg-[hsl(var(--primary))]">
                  Sermon à la Une
                </Badge>
              </div>
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(featuredSermon.sermonDate)} ·{" "}
                  {featuredSermon.preacher}
                </CardDescription>
                <CardTitle className="group-hover:text-[hsl(var(--primary))] transition-colors">
                  {featuredSermon.title}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href={`/sermons/${featuredSermon.slug}`}>
                    Écouter le Sermon
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Sabbath School Lesson */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={currentLesson.coverImage}
                  alt={currentLesson.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
                  École du Sabbat — {currentLesson.quarter}
                </Badge>
              </div>
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  Leçon de l&apos;École du Sabbat
                </CardDescription>
                <CardTitle className="group-hover:text-[hsl(var(--primary))] transition-colors">
                  {currentLesson.title}
                </CardTitle>
                <CardDescription>{currentLesson.description}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-3">
                <Button asChild>
                  <Link href="/lecon-sabbat">Lire la Leçon</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/lecon-sabbat#download">Télécharger PDF</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── CTA Étude Biblique ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[hsl(var(--primary))] py-20"
        aria-labelledby="cta-heading"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <Star className="mx-auto mb-4 h-10 w-10 text-[hsl(var(--accent))]" />
          <h2
            id="cta-heading"
            className="text-3xl font-black tracking-tight md:text-5xl"
          >
            Commencez Votre Étude Biblique
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Nos pasteurs sont disponibles pour vous accompagner dans la
            découverte de la Parole de Dieu, gratuitement et sans engagement.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-8 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]/90 font-bold"
          >
            <Link href="/etude-biblique">
              <BookOpen className="mr-2 h-5 w-5" />
              Faire une Demande
            </Link>
          </Button>
        </div>
      </section>

      {/* ─── Find a Church ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" aria-labelledby="church-heading">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-2 text-[hsl(var(--primary))] border-[hsl(var(--primary))]"
              >
                Communauté
              </Badge>
              <h2
                id="church-heading"
                className="text-3xl font-black tracking-tight md:text-4xl"
              >
                Trouvez une Église près de chez vous
              </h2>
              <p className="mt-4 text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
                Rejoignez une communauté adventiste réformée dans votre ville.
                Utilisez notre carte interactive pour trouver l&apos;église la
                plus proche.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/eglises">
                  <Church className="mr-2 h-5 w-5" />
                  Trouver une Église
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80"
                alt="Carte des églises"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--primary))]/20">
                <div className="rounded-xl bg-white p-4 shadow-lg text-center">
                  <Church className="mx-auto h-8 w-8 text-[hsl(var(--primary))]" />
                  <p className="mt-1 text-sm font-semibold text-[hsl(var(--primary))]">
                    300+ Églises
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    à travers la RDC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
