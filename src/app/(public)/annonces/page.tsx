import Link from "next/link";
import { Download, FileText, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annonces Officielles",
  description: "Annonces officielles et communiqués de l'Église Adventiste du Septième Jour Mouvement de Réforme en RDC.",
};

const announcements = [
  {
    id: "1",
    slug: "convocation-assemblee-2024",
    title: "Convocation à l'Assemblée Générale 2024",
    content: "Tous les délégués et membres de la Direction Nationale sont convoqués à l'Assemblée Générale qui se tiendra du 10 au 14 septembre 2024 à Kinshasa.",
    category: "Organisation",
    publishedAt: new Date("2024-08-01"),
    attachments: [{ name: "Programme_AG_2024.pdf", url: "#", fileType: "pdf" }],
  },
  {
    id: "2",
    slug: "semaine-priere-octobre-2024",
    title: "Semaine de Prière — Octobre 2024",
    content: "La Direction Nationale invite tous les membres à participer à la Semaine de Prière qui se tiendra du 18 au 25 octobre 2024 dans toutes les congrégations.",
    category: "Spirituel",
    publishedAt: new Date("2024-09-20"),
    attachments: [],
  },
  {
    id: "3",
    slug: "nouveau-directeur-education",
    title: "Nomination du Nouveau Directeur du Département Éducation",
    content: "La Direction Nationale annonce la nomination du Frère Paul Ngalula au poste de Directeur du Département Éducation avec effet immédiat.",
    category: "Personnel",
    publishedAt: new Date("2024-09-05"),
    attachments: [{ name: "Décision_officielle.pdf", url: "#", fileType: "pdf" }],
  },
  {
    id: "4",
    slug: "collecte-fonds-orphelins",
    title: "Collecte de Fonds pour les Orphelins de l'Est",
    content: "Face à la crise humanitaire dans l'Est de la RDC, la Direction Nationale lance une collecte de fonds pour venir en aide aux orphelins de nos congrégations affectées.",
    category: "Humanitaire",
    publishedAt: new Date("2024-08-25"),
    attachments: [{ name: "Guide_collecte.pdf", url: "#", fileType: "pdf" }],
  },
];

const categoryColors: Record<string, string> = {
  Organisation: "bg-[hsl(var(--primary))]",
  Spirituel: "bg-purple-600",
  Personnel: "bg-amber-600",
  Humanitaire: "bg-green-600",
};

export default function AnnoncesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--primary))] py-16 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">Officiel</Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Annonces Officielles</h1>
          <p className="mt-3 text-white/80 text-lg max-w-xl">
            Communiqués officiels et décisions de la Direction Nationale SDARM-RDC.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {announcements.map((ann) => (
            <Card key={ann.id} className="hover:shadow-md transition-shadow group">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge className={`${categoryColors[ann.category] ?? "bg-[hsl(var(--primary))]"} text-white text-xs`}>
                    {ann.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                    <Calendar className="h-3 w-3" />
                    {formatDate(ann.publishedAt)}
                  </span>
                </div>
                <CardTitle className="text-lg group-hover:text-[hsl(var(--primary))] transition-colors">
                  <Link href={`/annonces/${ann.slug}`}>{ann.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">{ann.content}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {ann.attachments.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
                      Pièces jointes
                    </p>
                    {ann.attachments.map((file) => (
                      <a
                        key={file.name}
                        href={file.url}
                        download
                        className="flex items-center gap-2 text-sm text-[hsl(var(--primary))] hover:underline"
                      >
                        <FileText className="h-4 w-4" /> {file.name}
                        <Download className="ml-auto h-3.5 w-3.5 opacity-60" />
                      </a>
                    ))}
                  </div>
                )}
                <Button asChild variant="outline" size="sm">
                  <Link href={`/annonces/${ann.slug}`}>Lire l&apos;annonce complète</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
