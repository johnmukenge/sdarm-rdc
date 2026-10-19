import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Navigation, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trouver une Église",
  description:
    "Trouvez l'Église Adventiste du Septième Jour Mouvement de Réforme la plus proche de chez vous.",
};

const churches = [
  {
    id: "1",
    name: "Église Centrale de Kinshasa",
    address: "Avenue de la Paix, N° 12",
    city: "Kinshasa",
    country: "RDC",
    phone: "+243 810 000 001",
    email: "kinshasa@sdarm-rdc.org",
    worshipTimes: ["Sabbat : 9h30 — 12h30", "Mercredi : 18h00 — 20h00"],
    distance: "0.5 km",
  },
  {
    id: "2",
    name: "Église de Gombe",
    address: "Blvd du 30 Juin, N° 45",
    city: "Kinshasa",
    country: "RDC",
    phone: "+243 820 000 002",
    email: "gombe@sdarm-rdc.org",
    worshipTimes: ["Sabbat : 10h00 — 13h00"],
    distance: "3 km",
  },
  {
    id: "3",
    name: "Église de Lubumbashi",
    address: "Avenue Kasaï, N° 78",
    city: "Lubumbashi",
    country: "RDC",
    phone: "+243 830 000 003",
    email: "lubumbashi@sdarm-rdc.org",
    worshipTimes: ["Sabbat : 9h00 — 12h00", "Vendredi : 17h30 — 19h00"],
    distance: "1 430 km",
  },
  {
    id: "4",
    name: "Église de Goma",
    address: "Quartier Himbi, Route Sake",
    city: "Goma",
    country: "RDC",
    phone: "+243 840 000 004",
    email: "goma@sdarm-rdc.org",
    worshipTimes: ["Sabbat : 9h30 — 12h00"],
    distance: "1 670 km",
  },
  {
    id: "5",
    name: "Église de Mbuji-Mayi",
    address: "Avenue Lumumba, N° 22",
    city: "Mbuji-Mayi",
    country: "RDC",
    phone: "+243 850 000 005",
    email: "mbuji@sdarm-rdc.org",
    worshipTimes: ["Sabbat : 10h00 — 13h00"],
    distance: "1 050 km",
  },
  {
    id: "6",
    name: "Église de Kisangani",
    address: "Boulevard Mobutu, N° 5",
    city: "Kisangani",
    country: "RDC",
    phone: "+243 860 000 006",
    email: "kisangani@sdarm-rdc.org",
    worshipTimes: ["Sabbat : 9h00 — 12h30"],
    distance: "1 190 km",
  },
];

export default function EglisesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--primary))] py-16 text-white">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
            Communauté
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Trouver une Église
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-xl">
            Rejoignez la communauté adventiste réformée la plus proche de chez
            vous en RDC et dans le monde.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input placeholder="Rechercher par ville…" className="pl-9" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input placeholder="Pays…" className="pl-9" />
          </div>
          <Button className="gap-2">
            <Navigation className="h-4 w-4" />
            Utiliser ma position
          </Button>
        </div>

        {/* Map placeholder */}
        <div className="mb-10 h-72 overflow-hidden rounded-2xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-[hsl(var(--primary))]/40" />
            <p className="text-[hsl(var(--muted-foreground))] font-medium">
              Carte Google Maps
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Configurez NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            </p>
          </div>
        </div>

        {/* Church List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {churches.map((church) => (
            <Card
              key={church.id}
              className="hover:shadow-md transition-shadow group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">
                    {church.name}
                  </CardTitle>
                  {church.distance && (
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {church.distance}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <p className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                  {church.address}, {church.city}, {church.country}
                </p>
                {church.phone && (
                  <p className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <Phone className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                    <a
                      href={`tel:${church.phone}`}
                      className="hover:text-[hsl(var(--primary))]"
                    >
                      {church.phone}
                    </a>
                  </p>
                )}
                {church.email && (
                  <p className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <Mail className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                    <a
                      href={`mailto:${church.email}`}
                      className="hover:text-[hsl(var(--primary))] truncate"
                    >
                      {church.email}
                    </a>
                  </p>
                )}
                <div className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                  <div>
                    {church.worshipTimes.map((time) => (
                      <p key={time}>{time}</p>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full gap-1.5"
                  asChild
                >
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(church.address + " " + church.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Itinéraire
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
