import Image from "next/image";
import { Heart, Target, Eye, BookOpen, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Histoire, mission, vision et croyances de l'Église Adventiste du Septième Jour Mouvement de Réforme en RDC.",
};

const beliefs = [
  "La Sainte Bible comme seule règle de foi et de pratique",
  "La Sainte Trinité : Père, Fils et Saint-Esprit",
  "La création divine en six jours littéraux",
  "La chute de l'homme et le plan de la rédemption",
  "Le salut par la grâce de Dieu seul à travers la foi",
  "Le saint sabbat (septième jour) comme jour de repos",
  "Le baptême par immersion",
  "La sainte cène comme mémorial de la mort du Christ",
  "Le retour visible et personnel de Jésus-Christ",
  "La résurrection des morts et le jugement final",
  "La nouvelle terre comme demeure éternelle des rachetés",
  "Le don de prophétie manifesté dans l'Esprit de Prophétie",
];

const milestones = [
  { year: "1914", event: "Fondation du Mouvement de Réforme en Allemagne" },
  {
    year: "1925",
    event: "Organisation officielle de la Conférence Générale SDARM",
  },
  { year: "1948", event: "Début du travail missionnaire en Afrique Centrale" },
  { year: "1965", event: "Établissement de la première congrégation au Congo" },
  { year: "1985", event: "Organisation de la Direction Nationale SDARM-RDC" },
  { year: "2000", event: "Franchissement du cap de 100 congrégations en RDC" },
  { year: "2024", event: "Plus de 300 congrégations et 50 000 membres" },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1438232992991-995b671e4b8a?w=1200&q=80"
          alt="Église"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-10">
          <Badge className="mb-3 w-fit bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            À Propos
          </Badge>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            Notre Histoire & Mission
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Mission / Vision / Values */}
        <section
          className="grid gap-6 md:grid-cols-3"
          aria-labelledby="mvv-heading"
        >
          <h2 id="mvv-heading" className="sr-only">
            Mission, Vision et Valeurs
          </h2>
          {[
            {
              icon: Target,
              title: "Notre Mission",
              text: "Proclamer l'Évangile éternel à toute nation, tribu, langue et peuple, en appelant l'humanité à se préparer pour le retour imminent de Jésus-Christ.",
            },
            {
              icon: Eye,
              title: "Notre Vision",
              text: "Une église unie, fidèle à la Parole de Dieu et aux principes de la Réforme, dont les membres reflètent le caractère du Christ dans toutes les dimensions de leur vie.",
            },
            {
              icon: Heart,
              title: "Nos Valeurs",
              text: "Fidélité aux Écritures, sainteté de vie, unité dans la foi, service désintéressé, témoignage intégral de l'Évangile de la santé, de l'éducation et de la charité.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
                  <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Separator />

        {/* Histoire */}
        <section aria-labelledby="history-heading">
          <h2
            id="history-heading"
            className="mb-8 text-3xl font-black tracking-tight"
          >
            Histoire de l&apos;Église
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
              <p>
                Le Mouvement de Réforme de l&apos;Église Adventiste du Septième
                Jour a ses origines en Allemagne en 1914, lorsqu&apos;un groupe
                de fidèles a refusé de compromettre les principes bibliques
                pendant la Première Guerre Mondiale.
              </p>
              <p>
                En 1925, l&apos;organisation internationale a été officiellement
                établie sous le nom de &ldquo;Conférence Générale des
                Adventistes du Septième Jour Mouvement de Réforme&rdquo;, avec
                pour mission de restaurer les vérités bibliques perdues dans le
                courant principal de l&apos;Adventisme.
              </p>
              <p>
                En République Démocratique du Congo, le travail missionnaire a
                commencé dans les années 1940-1950, aboutissant à la formation
                de la Direction Nationale en 1985. Aujourd&apos;hui,
                l&apos;Église compte plus de 300 congrégations réparties dans
                les 12 fédérations à travers le pays.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-[hsl(var(--primary))]" />{" "}
                Chronologie
              </h3>
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-4">
                  <span className="w-12 shrink-0 font-bold text-[hsl(var(--primary))] text-sm">
                    {m.year}
                  </span>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Beliefs */}
        <section aria-labelledby="beliefs-heading">
          <h2
            id="beliefs-heading"
            className="mb-8 text-3xl font-black tracking-tight flex items-center gap-3"
          >
            <BookOpen className="h-8 w-8 text-[hsl(var(--primary))]" />
            Nos Croyances Fondamentales
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((belief, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-xs font-bold text-[hsl(var(--primary))]">
                  {i + 1}
                </span>
                <p className="text-sm text-[hsl(var(--foreground))]">
                  {belief}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery */}
        <section aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            className="mb-6 text-3xl font-black tracking-tight"
          >
            Galerie Photos
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&q=75",
              "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=75",
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=75",
              "https://images.unsplash.com/photo-1438232992991-995b671e4b8a?w=400&q=75",
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=75",
              "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=400&q=75",
              "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=400&q=75",
              "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=75",
            ].map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
