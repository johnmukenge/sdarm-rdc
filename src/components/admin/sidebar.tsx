"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  Mic,
  BookOpen,
  Church,
  Users,
  MessageSquare,
  Bell,
  Image,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navItems = [
  {
    href: "/admin",
    label: "Tableau de Bord",
    icon: LayoutDashboard,
    exact: true,
  },
  { href: "/admin/news", label: "Actualités", icon: Newspaper },
  { href: "/admin/annonces", label: "Annonces", icon: Bell },
  { href: "/admin/sermons", label: "Sermons", icon: Mic },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/lecon-sabbat", label: "École du Sabbat", icon: BookOpen },
  { href: "/admin/eglises", label: "Églises", icon: Church },
  { href: "/admin/bible-study", label: "Étude Biblique", icon: MessageSquare },
  { href: "/admin/media", label: "Médiathèque", icon: Image },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-[hsl(var(--border))] px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))]">
          <span className="text-[9px] font-black text-white leading-none">
            SDARM
          </span>
        </div>
        <div>
          <p className="text-sm font-bold text-[hsl(var(--primary))] leading-none">
            Administration
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] leading-none mt-0.5">
            SDARM-RDC
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--primary))] text-white"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[hsl(var(--border))] p-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Voir le site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
