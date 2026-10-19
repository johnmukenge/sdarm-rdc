"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/actualites", label: "Actualités" },
  { href: "/articles", label: "Articles" },
  { href: "/sermons", label: "Sermons" },
  { href: "/lecon-sabbat", label: "EDS" },
  { href: "/eglises", label: "Trouver une Église" },
  { href: "/annonces", label: "Annonces" },
  { href: "/etude-biblique", label: "Étude Biblique" },
  { href: "/a-propos", label: "À Propos" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold"
          aria-label="SDARM-RDC Accueil"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))]">
            <span className="text-xs font-black text-white leading-none">
              SDARM
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-[hsl(var(--primary))] leading-tight">
              Adventiste Réforme
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-tight">
              République Démocratique du Congo
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[hsl(var(--primary))]",
                pathname === link.href
                  ? "text-[hsl(var(--primary))] font-semibold"
                  : "text-[hsl(var(--muted-foreground))]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:flex">
            <Link href="/etude-biblique">Étude Biblique</Link>
          </Button>
          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu mobile"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <nav
            className="container mx-auto px-4 py-4 flex flex-col gap-1"
            aria-label="Navigation mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-semibold"
                    : "hover:bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
