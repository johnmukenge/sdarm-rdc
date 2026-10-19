"use client";

import { Bell, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const { data: session } = useSession();
  return (
    <header className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] hidden lg:block">
          Espace Administration
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        {session?.user && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white text-xs font-bold">
            {session.user.name?.[0]?.toUpperCase() ?? "A"}
          </div>
        )}
      </div>
    </header>
  );
}
