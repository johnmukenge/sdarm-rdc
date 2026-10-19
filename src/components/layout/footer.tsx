import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

// Inline SVG social icons (lucide-react doesn't include social brand icons)
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M4 4l16 16M4 20L20 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ fill: "none" }}
      />
      <path
        d="M2 3h6.5L21 20.5H14.5L2 3z M14.5 3 L21 3 M2 20.5 L8.5 20.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ fill: "none" }}
      />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

const quickLinks = [
  { href: "/actualites", label: "Actualités" },
  { href: "/sermons", label: "Sermons" },
  { href: "/leçon-sabbat", label: "EDS" },
  { href: "/eglises", label: "Trouver une Église" },
  { href: "/articles", label: "Articles" },
  { href: "/annonces", label: "Annonces Officielles" },
  { href: "/etude-biblique", label: "Étude Biblique" },
  { href: "/a-propos", label: "À Propos" },
];

const legalLinks = [
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions", label: "Conditions d'utilisation" },
];

export function Footer() {
  return (
    <footer className="bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] mt-auto">
      <div className="container mx-auto px-4 py-12 lg:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]">
                <span className="text-xs font-black text-white leading-none">
                  SDARM
                </span>
              </div>
              <div>
                <p className="font-bold text-[hsl(var(--primary))] leading-tight">
                  Adventiste Réforme
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  République Démocratique du Congo
                </p>
              </div>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              A la loi et au témoignage; Si on ne parle pas ansi il n&apos;y
              aura point d&apos;aurore pour le peuple.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FacebookIcon, href: "#", label: "Facebook" },
                { icon: YoutubeIcon, href: "#", label: "YouTube" },
                { icon: TwitterIcon, href: "#", label: "Twitter" },
                { icon: InstagramIcon, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--foreground))]">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[hsl(var(--foreground))]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                <span>Kinshasa, République Démocratique du Congo</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <Phone className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                <a
                  href="tel:+243000000000"
                  className="hover:text-[hsl(var(--primary))]"
                >
                  +243 000 000 000
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
                <Mail className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                <a
                  href="mailto:contact@sdarm-rdc.org"
                  className="hover:text-[hsl(var(--primary))]"
                >
                  contact@sdarm-rdc.org
                </a>
              </li>
            </ul>
          </div>

          {/* Gold accent block */}
          <div className="rounded-xl bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20 p-5">
            <h3 className="mb-2 font-semibold text-[hsl(var(--primary))]">
              Étude Biblique Gratuite
            </h3>
            <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
              Demandez une étude biblique personnalisée avec un de nos pasteurs.
            </p>
            <Link
              href="/etude-biblique"
              className="inline-flex h-9 items-center justify-center rounded-md bg-[hsl(var(--accent))] px-4 text-sm font-semibold text-[hsl(var(--accent-foreground))] transition-colors hover:bg-[hsl(var(--accent))]/90"
            >
              En savoir plus
            </Link>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            © {new Date().getFullYear()} SDARM-RDC. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
