# 📰 Gestion des Actualités

## Comment ça fonctionne?

### 🎯 Architecture complète créée:

#### 1️⃣ **Upload d'images**
- Intégration **UploadThing** configurée
- API route: `/api/uploadthing/route.ts`
- Configuration: `src/lib/uploadthing.ts`
- Les images sont uploadées directement au service UploadThing (cloud)

#### 2️⃣ **API REST**
- **POST** `/api/news` - Créer une actualité
- **PUT** `/api/news/[id]` - Mettre à jour une actualité
- **GET** `/api/news/[id]` - Récupérer une actualité
- **DELETE** `/api/news/[id]` - Supprimer une actualité
- **GET** `/api/news` - Lister les actualités publiées (pagination)

#### 3️⃣ **Formulaire complet** (`NewsForm`)
- Titre avec validation
- Upload d'image drag & drop
- Extrait (résumé court)
- Contenu texte long
- Statut (Brouillon / Publié / Archivé)
- Épingler en avant (featured)

#### 4️⃣ **Pages Admin**
- **Liste**: `/admin/news` - Voir toutes les actualités
- **Créer**: `/admin/news/new` - Nouveau formulaire
- **Éditer**: `/admin/news/[id]` - Modifier une actualité
- **Supprimer**: Avec confirmation

#### 5️⃣ **Accès contrôlé**
- Authentification NextAuth (obligatoire)
- Autorisation: Auteur ou Admin
- Proxy sécurisé pour les routes admin

---

## 📝 Processus étape par étape

### Pour créer une actualité:

1. **Aller à** → `/admin/news/new`
2. **Remplir le formulaire:**
   - Titre: "Mon événement important"
   - Image: Cliquer pour uploader
   - Extrait: "Résumé court"
   - Contenu: "Texte complet"
   - Statut: "Publié" pour la rendre visible
   - Épinglé: ✓ pour la mettre en avant

3. **Cliquer** "Créer l'actualité"
   - Les données sont envoyées à `/api/news` (POST)
   - L'image est uploadée à UploadThing
   - L'actualité est sauvegardée en DB

4. **Résultat**: Apparaît immédiatement sur `/actualites`

### Pour modifier une actualité:

1. **Aller à** → `/admin/news`
2. **Cliquer le bouton pencil** (modifier)
3. **Changer les données**
4. **Cliquer** "Mettre à jour"
   - Appel `/api/news/[id]` (PUT)
   - Mise à jour en DB

### Pour supprimer:

1. **Aller à** → `/admin/news`
2. **Cliquer le bouton trash** (supprimer)
3. **Confirmer** "Êtes-vous sûr?"
   - Appel `/api/news/[id]` (DELETE)
   - Suppression en DB

---

## 🗄️ Structure en base de données

```sql
News {
  id           String    @primary
  title        String    -- "Mon événement"
  slug         String    @unique -- "mon-evenement" (auto-généré)
  excerpt      String    -- Résumé court
  content      String    -- Texte long
  coverImage   String?   -- URL UploadThing
  status       Enum      -- DRAFT | PUBLISHED | ARCHIVED
  featured     Boolean   -- Épinglée?
  authorId     String    -- Qui a créé?
  publishedAt  DateTime? -- Quand?
  createdAt    DateTime
  updatedAt    DateTime
}
```

---

## 🔗 Routes publiques

Les actualités publiées s'affichent sur:
- **Page d'accueil** - `/` (dernières)
- **Page actualités** - `/actualites` (toutes)
- **Article détail** - `/actualites/[slug]` (complet)

---

## 🔐 Sécurité

✅ **Authentification** - Connexion requise pour l'admin
✅ **Autorisation** - Auteur/Admin uniquement
✅ **Validation** - Zod + React Hook Form
✅ **Upload sécurisé** - Middleware UploadThing
✅ **Protection BD** - Prisma + Typescript
✅ **Proxy Edge** - Migration middleware v13+

---

## 🚀 Utilisation API

### Créer une actualité (curl):
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon événement",
    "excerpt": "Description courte",
    "content": "Contenu complet...",
    "coverImage": "https://utfs.io/f/...",
    "status": "PUBLISHED",
    "featured": true
  }'
```

### Récupérer une actualité:
```bash
curl http://localhost:3000/api/news/[id]
```

### Lister les actualités publiées:
```bash
curl "http://localhost:3000/api/news?status=PUBLISHED&limit=10&page=1"
```

---

C'est prêt! 🎉 Tu peux maintenant aller à `/admin/news/new` pour ajouter tes premières actualités.
