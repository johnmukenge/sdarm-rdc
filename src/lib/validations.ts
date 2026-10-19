import { z } from "zod";

export const bibleStudySchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  country: z.string().min(2, "Le pays est requis"),
  city: z.string().min(2, "La ville est requise"),
  message: z.string().max(1000).optional(),
});

export type BibleStudyFormData = z.infer<typeof bibleStudySchema>;

export const newsSchema = z.object({
  title: z.string().min(5, "Le titre est requis (min. 5 caractères)"),
  excerpt: z.string().min(10, "Le résumé est requis"),
  content: z.string().min(20, "Le contenu est requis"),
  coverImage: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
});

export type NewsFormData = z.infer<typeof newsSchema>;

export const sermonSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
  preacher: z.string().min(2),
  videoUrl: z.string().url().optional().or(z.literal("")),
  downloadUrl: z.string().url().optional().or(z.literal("")),
  thumbnail: z.string().url().optional().or(z.literal("")),
  category: z.string().optional(),
  sermonDate: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
});

export type SermonFormData = z.infer<typeof sermonSchema>;

export const churchSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(5),
  city: z.string().min(2),
  country: z.string().min(2),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  worshipTimes: z.array(z.string()).default([]),
});

export type ChurchFormData = z.infer<typeof churchSchema>;

export const articleSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().min(1, "La catégorie est requise"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
