# SDARM-RDC — Guide d'Installation & Déploiement

## Prérequis

| Outil      | Version minimale |
| ---------- | ---------------- |
| Node.js    | 18.17+           |
| npm / pnpm | 9+               |
| PostgreSQL | 14+              |
| Git        | 2.x              |

---

## 1. Installation locale

```bash
# Cloner le dépôt
git clone https://github.com/votre-org/sdarm-rdc.git
cd sdarm-rdc

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local
```

### 1.1 Configurer `.env.local`

```env
# Générer AUTH_SECRET avec :  openssl rand -base64 32
AUTH_SECRET="votre-secret-généré"
AUTH_URL="http://localhost:3000"

# PostgreSQL local (ou Neon/Supabase)
DATABASE_URL="postgresql://postgres:mot_de_passe@localhost:5432/sdarm_rdc"

# Email SMTP (Gmail, SendGrid, Mailgun…)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre@gmail.com"
SMTP_PASS="votre-mot-de-passe-app"  # Mot de passe d'application Gmail
SMTP_FROM="SDARM-RDC <noreply@sdarm-rdc.org>"
ADMIN_EMAIL="admin@sdarm-rdc.org"

# Google Maps (optionnel)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="votre-clé-google-maps"

# UploadThing (pour les uploads)
UPLOADTHING_SECRET="sk_..."
UPLOADTHING_APP_ID="votre-app-id"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 1.2 Base de données

```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables (développement)
npm run db:push

# Ou avec migrations
npm run db:migrate --name init

# Alimenter la base avec les données initiales
npm run db:seed
```

### 1.3 Lancer le serveur de développement

```bash
npm run dev
# Accéder à http://localhost:3000
```

---

## 2. Connexion Admin par défaut

| Champ        | Valeur                            |
| ------------ | --------------------------------- |
| URL          | http://localhost:3000/admin/login |
| Email        | admin@sdarm-rdc.org               |
| Mot de passe | **admin123!**                     |

> ⚠️ **Changez le mot de passe immédiatement en production !**

---

## 3. Déploiement sur Vercel

### 3.1 Base de données PostgreSQL cloud

Créez une base de données PostgreSQL sur l'un de ces services :

- **Neon** (recommandé, plan gratuit) : https://neon.tech
- **Supabase** : https://supabase.com
- **Railway** : https://railway.app

Récupérez la `DATABASE_URL` et notez-la.

### 3.2 Déploiement Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Suivez les instructions interactives
```

**Ou** connectez votre dépôt GitHub directement sur [vercel.com](https://vercel.com).

### 3.3 Variables d'environnement Vercel

Dans le dashboard Vercel → **Settings → Environment Variables**, ajoutez :

```
AUTH_SECRET          → votre-secret (openssl rand -base64 32)
AUTH_URL             → https://votre-domaine.vercel.app
DATABASE_URL         → postgresql://... (Neon/Supabase)
SMTP_HOST            → smtp.gmail.com
SMTP_PORT            → 587
SMTP_USER            → votre@email.com
SMTP_PASS            → mot-de-passe-app
SMTP_FROM            → SDARM-RDC <noreply@sdarm-rdc.org>
ADMIN_EMAIL          → admin@sdarm-rdc.org
NEXT_PUBLIC_APP_URL  → https://votre-domaine.vercel.app
```

### 3.4 Migrations en production

```bash
# Après chaque changement de schéma
DATABASE_URL="postgresql://..." npx prisma migrate deploy
DATABASE_URL="postgresql://..." npx tsx prisma/seed.ts
```

---

## 4. Structure du projet

```
src/
├── app/
│   ├── (public)/           # Pages publiques
│   │   ├── page.tsx         # Accueil
│   │   ├── actualites/
│   │   ├── articles/
│   │   ├── sermons/
│   │   ├── lecon-sabbat/
│   │   ├── eglises/
│   │   ├── etude-biblique/
│   │   ├── annonces/
│   │   └── a-propos/
│   ├── (admin)/            # Dashboard admin (protégé)
│   │   └── admin/
│   │       ├── page.tsx     # Dashboard
│   │       ├── login/
│   │       ├── news/
│   │       ├── articles/
│   │       ├── sermons/
│   │       ├── annonces/
│   │       ├── eglises/
│   │       ├── lecon-sabbat/
│   │       ├── bible-study/
│   │       ├── users/
│   │       └── media/
│   └── api/                # API Routes
│       ├── auth/
│       ├── news/
│       └── churches/
├── components/
│   ├── ui/                 # Composants UI (shadcn-like)
│   ├── layout/             # Header, Footer
│   └── admin/              # Sidebar, Header admin
├── lib/
│   ├── prisma.ts           # Client Prisma
│   ├── auth.ts             # NextAuth config
│   ├── mail.ts             # Service email
│   ├── validations.ts      # Schémas Zod
│   └── utils.ts            # Utilitaires
├── middleware.ts            # Protection routes admin
└── types/
    └── next-auth.d.ts      # Types NextAuth
prisma/
├── schema.prisma            # Modèles de données
└── seed.ts                  # Données initiales
```

---

## 5. Bonnes pratiques de sécurité

- ✅ `AUTH_SECRET` unique et fort (minimum 32 caractères)
- ✅ Mots de passe hashés avec bcrypt (12 rounds)
- ✅ Validation côté serveur avec Zod sur tous les formulaires
- ✅ Routes admin protégées par middleware NextAuth
- ✅ Headers de sécurité (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`)
- ✅ Paramètres SQL via Prisma (protection injection SQL)
- ✅ Fichiers uploadés validés côté serveur
- ✅ SMTP avec authentification (pas de relay ouvert)
- ⚠️ En production : activez HTTPS, configurez CORS, utilisez des variables secrètes Vercel

---

## 6. Optimisations SEO & Performance

### SEO

- Metadata dynamique par page (`generateMetadata`)
- Open Graph / Twitter Cards configurés dans le layout root
- `sitemap.xml` : créez `src/app/sitemap.ts` pour la génération automatique
- `robots.txt` : créez `src/app/robots.ts`
- Images optimisées via `next/image` avec lazy loading

### Performance

- Server Components par défaut (réduction du JS client)
- `next/image` avec optimisation automatique (WebP)
- Polices Google chargées via `next/font` (auto-hébergement)
- Pagination côté serveur sur les listes
- Revalidation avec `revalidatePath` ou `revalidateTag` après mutations

---

## 7. Intégration Google Maps

```tsx
// Dans src/app/(public)/eglises/page.tsx
// Remplacez le placeholder par :
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
});
```

---

## 8. Upload de fichiers (UploadThing)

Créez `src/app/api/uploadthing/route.ts` et `src/lib/uploadthing.ts` selon la documentation officielle : https://uploadthing.com/docs

---

## 9. Ajout de Contenu (Admin)

1. Accédez à `/admin/login`
2. Connectez-vous avec vos identifiants
3. Utilisez les modules du dashboard pour gérer le contenu
4. Les formulaires d'édition permettent de créer/modifier/archiver tout le contenu

---

_Développé pour SDARM-RDC — Tous droits réservés_
