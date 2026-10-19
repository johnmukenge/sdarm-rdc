import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

const getSermon = (slug: string) => ({
  id: "1",
  slug,
  title: "La Sanctification : Le Chemin vers le Ciel",
  description:
    "Dans ce sermon, le Pasteur Kabongo explore la doctrine de la sanctification telle qu'enseignée dans les Saintes Écritures et dans les écrits de l'Esprit de Prophétie. Il démontre que la sanctification n'est pas une option mais une exigence divine pour tout croyant qui aspire au salut.",
  preacher: "Pasteur Emmanuel Kabongo",
  sermonDate: new Date("2024-09-21"),
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  downloadUrl: "#",
  category: "Sanctification",
});

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sermon = getSermon(slug);
  return { title: sermon.title, description: sermon.description };
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug } = await params;
  const sermon = getSermon(slug);
  if (!sermon) notFound();

  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--primary))] py-12 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            {sermon.category}
          </Badge>
          <h1 className="max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
            {sermon.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(sermon.sermonDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {sermon.preacher}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Video */}
        {sermon.videoUrl && (
          <div className="mb-8 aspect-video overflow-hidden rounded-2xl shadow-xl">
            <iframe
              src={sermon.videoUrl}
              title={sermon.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Description & Actions */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-bold">Description</h2>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
              {sermon.description}
            </p>
            <Separator className="my-6" />
            <Button asChild variant="outline">
              <Link href="/sermons">
                <ArrowLeft className="mr-2 h-4 w-4" /> Tous les sermons
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {sermon.downloadUrl && (
              <Button asChild className="w-full" variant="outline">
                <a href={sermon.downloadUrl} download>
                  <Download className="mr-2 h-4 w-4" /> Télécharger l&apos;audio
                </a>
              </Button>
            )}
            <div className="rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20 p-5 text-center">
              <h3 className="font-semibold text-[hsl(var(--primary))] mb-2">
                Approfondir votre foi
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                Demandez une étude biblique gratuite.
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/etude-biblique">Étude Biblique</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
