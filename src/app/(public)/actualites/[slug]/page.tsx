import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Share2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

// In production this fetches from DB by slug
const getNews = (slug: string) => ({
  id: "1",
  slug,
  title: "Assemblée Générale 2024 — Rapport et Résolutions",
  excerpt:
    "L'Assemblée Générale de l'Église SDARM-RDC a adopté plusieurs résolutions importantes.",
  content: `
    <p>L'Assemblée Générale de l'Église Adventiste du Septième Jour Mouvement de Réforme en République Démocratique du Congo s'est tenue du 10 au 14 septembre 2024 à Kinshasa, rassemblant plus de 500 délégués venus de toutes les fédérations du pays.</p>
    <h2>Résolutions Majeures</h2>
    <p>Parmi les résolutions adoptées figurent : l'expansion du programme d'évangélisation dans les provinces de l'Est, le renforcement des écoles adventistes réformées, et la création d'un fonds de solidarité pour les membres dans le besoin.</p>
    <h2>Rapport Financier</h2>
    <p>Le trésorier national a présenté un rapport financier équilibré, avec une augmentation des dîmes et offrandes de 15% par rapport à l'année précédente.</p>
    <h2>Perspectives 2025</h2>
    <p>La Direction Nationale a annoncé un ambitieux plan d'expansion pour 2025, visant à établir 50 nouvelles congrégations à travers la RDC.</p>
  `,
  coverImage:
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=85",
  publishedAt: new Date("2024-09-15"),
  author: { name: "Rédaction SDARM", image: null },
  tag: "Organisation",
});

const relatedNews = [
  {
    id: "2",
    slug: "evangelisation-kinshasa",
    title: "Série d'Évangélisation à Kinshasa",
    publishedAt: new Date("2024-08-20"),
    coverImage:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=75",
  },
  {
    id: "3",
    slug: "formation-anciens-eglise",
    title: "Formation des Anciens d'Église",
    publishedAt: new Date("2024-07-10"),
    coverImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=75",
  },
];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = getNews(slug);
  return { title: news.title, description: news.excerpt };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={news.coverImage}
          alt={news.title}
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 container mx-auto px-4 pb-8">
          <Badge className="mb-3 bg-[hsl(var(--primary))]">{news.tag}</Badge>
          <h1 className="max-w-3xl text-3xl font-black text-white md:text-4xl lg:text-5xl leading-tight">
            {news.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Article */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(news.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {news.author.name}
              </span>
              <Button variant="ghost" size="sm" className="ml-auto gap-1.5">
                <Share2 className="h-4 w-4" /> Partager
              </Button>
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:text-[hsl(var(--primary))] prose-headings:font-bold prose-p:text-[hsl(var(--foreground))] prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            <Separator className="my-8" />

            <Button asChild variant="outline">
              <Link href="/actualites">
                <ArrowLeft className="mr-2 h-4 w-4" /> Toutes les actualités
              </Link>
            </Button>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Articles Liés
              </h2>
              <div className="space-y-4">
                {relatedNews.map((n) => (
                  <article key={n.id} className="flex gap-3 group">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={n.coverImage}
                        alt={n.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">
                        {formatDate(n.publishedAt)}
                      </p>
                      <Link
                        href={`/actualites/${n.slug}`}
                        className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors"
                      >
                        {n.title}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20 p-5 text-center">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-[hsl(var(--primary))]" />
              <h3 className="font-semibold text-[hsl(var(--primary))] mb-1">
                Étude Biblique Gratuite
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                Un pasteur vous contactera prochainement.
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/etude-biblique">Faire une demande</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
