"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Upload, X, Loader2 } from "lucide-react";

const newsFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  excerpt: z.string().min(1, "L'extrait est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  coverImage: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  featured: z.boolean().default(false),
});

type NewsFormData = z.infer<typeof newsFormSchema>;

interface NewsFormProps {
  initialData?: {
    id?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string | null;
    status?: string;
    featured?: boolean;
  };
  isEditing?: boolean;
}

export function NewsForm({ initialData, isEditing = false }: NewsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    (initialData?.coverImage as string) ?? null,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
      coverImage: initialData?.coverImage ?? "",
      status: (initialData?.status ?? "DRAFT") as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured: initialData?.featured ?? false,
    },
  });

  const status = watch("status");
  const featured = watch("featured");

  async function onSubmit(data: NewsFormData) {
    try {
      setIsLoading(true);
      const url = isEditing
        ? `/api/news/${initialData?.id}`
        : "/api/news";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          coverImage: uploadedImage || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la sauvegarde");
      }

      const result = await response.json();
      toast.success(isEditing ? "Actualité mise à jour" : "Actualité créée");
      router.push("/admin/news");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Titre */}
      <div className="space-y-2">
        <Label htmlFor="title">Titre *</Label>
        <Input
          id="title"
          placeholder="Titre de l'actualité"
          {...register("title")}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Image de couverture */}
      <div className="space-y-2">
        <Label>Image de couverture</Label>
        {uploadedImage ? (
          <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
            <Image
              src={uploadedImage}
              alt="Aperçu"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setUploadedImage(null);
                setValue("coverImage", "");
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-lg p-2 text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                if (res?.[0]) {
                  setUploadedImage(res[0].url);
                  setValue("coverImage", res[0].url);
                  toast.success("Image uploadée");
                }
              }}
              onUploadError={(error: any) => {
                toast.error(`Erreur: ${error.message}`);
              }}
              content={{
                button({ ready }: { ready: boolean }) {
                  if (ready)
                    return (
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Cliquer pour uploader
                      </div>
                    );

                  return "Upload en cours...";
                },
              }}
            />
          </div>
        )}
      </div>

      {/* Extrait */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">Extrait *</Label>
        <Textarea
          id="excerpt"
          placeholder="Courte description (visible dans les listes)"
          rows={3}
          {...register("excerpt")}
          aria-invalid={!!errors.excerpt}
        />
        {errors.excerpt && (
          <p className="text-sm text-red-500">{errors.excerpt.message}</p>
        )}
      </div>

      {/* Contenu */}
      <div className="space-y-2">
        <Label htmlFor="content">Contenu *</Label>
        <Textarea
          id="content"
          placeholder="Contenu complet de l'actualité"
          rows={8}
          {...register("content")}
          aria-invalid={!!errors.content}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Statut */}
      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select
          defaultValue={initialData?.status || "DRAFT"}
          onValueChange={(value) =>
            setValue("status", value as "DRAFT" | "PUBLISHED" | "ARCHIVED")
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Brouillon</SelectItem>
            <SelectItem value="PUBLISHED">Publié</SelectItem>
            <SelectItem value="ARCHIVED">Archivé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Épinglé */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          {...register("featured")}
          className="rounded border-border"
        />
        <Label htmlFor="featured" className="font-normal cursor-pointer">
          Épingler en avant (mise en évidence)
        </Label>
      </div>

      {/* Boutons */}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEditing ? "Mettre à jour" : "Créer l'actualité"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
