import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Newspaper,
  FileText,
  Mic,
  BookOpen,
  Church,
  Users,
  MessageSquare,
  Bell,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tableau de Bord | Admin" };

async function getStats() {
  const [news, articles, sermons, churches, bibleRequests, announcements] =
    await Promise.all([
      prisma.news.count(),
      prisma.article.count(),
      prisma.sermon.count(),
      prisma.church.count(),
      prisma.bibleStudyRequest.count(),
      prisma.announcement.count(),
    ]);
  const pendingRequests = await prisma.bibleStudyRequest.count({
    where: { status: "PENDING" },
  });
  return {
    news,
    articles,
    sermons,
    churches,
    bibleRequests,
    announcements,
    pendingRequests,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats().catch(() => ({
    news: 0,
    articles: 0,
    sermons: 0,
    churches: 0,
    bibleRequests: 0,
    announcements: 0,
    pendingRequests: 0,
  }));

  const statCards = [
    {
      title: "Actualités",
      value: stats.news,
      icon: Newspaper,
      href: "/admin/news",
    },
    {
      title: "Articles",
      value: stats.articles,
      icon: FileText,
      href: "/admin/articles",
    },
    {
      title: "Sermons",
      value: stats.sermons,
      icon: Mic,
      href: "/admin/sermons",
    },
    {
      title: "Annonces",
      value: stats.announcements,
      icon: Bell,
      href: "/admin/annonces",
    },
    {
      title: "Églises",
      value: stats.churches,
      icon: Church,
      href: "/admin/eglises",
    },
    {
      title: "Demandes Bibliques",
      value: stats.bibleRequests,
      icon: BookOpen,
      href: "/admin/bible-study",
      badge: stats.pendingRequests > 0 ? stats.pendingRequests : undefined,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de Bord</h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Vue d&apos;ensemble de votre contenu
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map(({ title, value, icon: Icon, href, badge }) => (
          <Card
            key={title}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                {title}
              </CardTitle>
              <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black">{value}</span>
                {badge !== undefined && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                    {badge} en attente
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
