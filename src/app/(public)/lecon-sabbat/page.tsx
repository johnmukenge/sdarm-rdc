import Image from "next/image";
import Link from "next/link";
import { BookOpen, Download, Share2, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "École du Sabbat",
  description:
    "Leçons de l'École du Sabbat — Téléchargez et lisez les leçons du guide d'étude biblique adventiste réformé.",
};

const currentLesson = {
  id: "1",
  title: "La Grande Controverse",
  quarter: "Q4 2024",
  year: 2024,
  pdfUrl: "/pdfs/lecon-q4-2024.pdf",
  coverImage:
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
  description:
    "Ce trimestre, nous étudions le grand conflit entre le bien et le mal tel que décrit dans l'œuvre maîtresse d'Ellen G. White. Nous verrons comment ce conflit affecte chaque aspect de notre vie spirituelle et comment Dieu guide Son peuple à travers les âges.",
  publishedAt: new Date("2024-10-01"),
};

const archiveLessons = [
  {
    id: "2",
    title: "Le Sanctuaire et Son Service",
    quarter: "Q3 2024",
    year: 2024,
    pdfUrl: "#",
    coverImage:
      "https://images.unsplash.com/photo-1490732630849-6eca66148e87?w=400&q=75",
    publishedAt: new Date("2024-07-01"),
  },
  {
    id: "3",
    title: "La Foi qui Agit par l'Amour",
    quarter: "Q2 2024",
    year: 2024,
    pdfUrl: "#",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=75",
    publishedAt: new Date("2024-04-01"),
  },
  {
    id: "4",
    title: "Le Livre de Matthieu",
    quarter: "Q1 2024",
    year: 2024,
    pdfUrl: "#",
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=75",
    publishedAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    title: "Le Grand Espoir",
    quarter: "Q4 2023",
    year: 2023,
    pdfUrl: "#",
    coverImage:
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=400&q=75",
    publishedAt: new Date("2023-10-01"),
  },
];

export default function LeconSabbatPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--primary))] py-16 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            Ressources
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Leçon de l&apos;École du Sabbat
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-xl">
            Téléchargez et lisez le guide d&apos;étude biblique adventiste
            réformé pour chaque trimestre.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Current Lesson */}
        <section className="mb-12" aria-labelledby="current-lesson-heading">
          <h2
            id="current-lesson-heading"
            className="mb-6 text-2xl font-bold flex items-center gap-2"
          >
            <span className="h-1 w-8 bg-[hsl(var(--accent))] rounded" />
            Leçon Actuelle — {currentLesson.quarter}
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={currentLesson.coverImage}
                  alt={currentLesson.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute left-4 top-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
                  Leçon Actuelle
                </Badge>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-center">
              <Badge
                variant="outline"
                className="w-fit mb-3 text-[hsl(var(--primary))]"
              >
                {currentLesson.quarter}
              </Badge>
              <h3 className="text-3xl font-black tracking-tight text-[hsl(var(--foreground))]">
                {currentLesson.title}
              </h3>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                Publié le {formatDate(currentLesson.publishedAt)}
              </p>
              <p className="mt-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
                {currentLesson.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/lecon-sabbat/lire`}>
                    <BookOpen className="mr-2 h-5 w-5" /> Lire en ligne
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" id="download">
                  <a href={currentLesson.pdfUrl} download>
                    <Download className="mr-2 h-5 w-5" /> Télécharger PDF
                  </a>
                </Button>
                <Button variant="ghost" size="lg">
                  <Share2 className="mr-2 h-5 w-5" /> Partager
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Archive */}
        <section aria-labelledby="archive-heading">
          <div className="mb-6 flex items-center justify-between">
            <h2
              id="archive-heading"
              className="text-2xl font-bold flex items-center gap-2"
            >
              <Archive className="h-6 w-6 text-[hsl(var(--primary))]" />
              Archives
            </h2>
          </div>

          <Tabs defaultValue="2024">
            <TabsList className="mb-6">
              <TabsTrigger value="2024">2024</TabsTrigger>
              <TabsTrigger value="2023">2023</TabsTrigger>
            </TabsList>

            <TabsContent value="2024">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {archiveLessons
                  .filter((l) => l.year === 2024)
                  .map((lesson) => (
                    <Card
                      key={lesson.id}
                      className="overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={lesson.coverImage}
                          alt={lesson.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <Badge variant="outline" className="w-fit text-xs">
                          {lesson.quarter}
                        </Badge>
                        <CardTitle className="text-sm mt-2">
                          {lesson.title}
                        </CardTitle>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <a href={lesson.pdfUrl} download>
                            <Download className="mr-1.5 h-3.5 w-3.5" /> PDF
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="2023">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {archiveLessons
                  .filter((l) => l.year === 2023)
                  .map((lesson) => (
                    <Card
                      key={lesson.id}
                      className="overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={lesson.coverImage}
                          alt={lesson.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <Badge variant="outline" className="w-fit text-xs">
                          {lesson.quarter}
                        </Badge>
                        <CardTitle className="text-sm mt-2">
                          {lesson.title}
                        </CardTitle>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <a href={lesson.pdfUrl} download>
                            <Download className="mr-1.5 h-3.5 w-3.5" /> PDF
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
