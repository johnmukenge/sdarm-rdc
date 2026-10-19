import { BookOpen, Users, Globe, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BibleStudyForm from "./bible-study-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande d'Étude Biblique",
  description:
    "Demandez une étude biblique gratuite avec un de nos pasteurs. Nous vous contacterons prochainement.",
};

const benefits = [
  {
    icon: BookOpen,
    title: "Étude Personnalisée",
    desc: "Adaptée à votre rythme et vos questions",
  },
  {
    icon: Users,
    title: "Pasteur Dédié",
    desc: "Un responsable qualifié vous accompagne",
  },
  {
    icon: Globe,
    title: "Partout dans le Monde",
    desc: "Disponible en présentiel ou à distance",
  },
  { icon: Heart, title: "100% Gratuit", desc: "Sans engagement ni frais" },
];

export default function EtudeBibliqueePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--primary))] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            Étude Biblique
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Découvrez la Parole de Dieu
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Commencez votre voyage spirituel avec une étude biblique
            personnalisée, gratuite et sans engagement, guidée par un de nos
            pasteurs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Benefits */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
                  <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  {desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold">Faire une Demande</h2>
            <p className="mb-8 text-[hsl(var(--muted-foreground))]">
              Remplissez le formulaire ci-dessous et un responsable vous
              contactera dans les 48 heures.
            </p>
            <BibleStudyForm />
          </div>
        </div>
      </div>
    </div>
  );
}
