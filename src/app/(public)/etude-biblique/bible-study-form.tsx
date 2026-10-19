"use client";

import { useActionState } from "react";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { submitBibleStudyRequest } from "./actions";
import type { Metadata } from "next";

// Metadata must be in server component — page.tsx exports it separately
// This file is the client form component used by the page

type State = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

function BibleStudyForm() {
  const [state, action, isPending] = useActionState<State, FormData>(
    submitBibleStudyRequest,
    {},
  );

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Demande Enregistrée !</h2>
        <p className="text-[hsl(var(--muted-foreground))] max-w-md text-lg">
          Votre demande a bien été enregistrée. Un responsable vous contactera
          prochainement.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            Prénom <span className="text-red-500">*</span>
          </Label>
          <Input id="firstName" name="firstName" placeholder="Jean" required />
          {state.errors?.firstName && (
            <p className="text-xs text-red-500">{state.errors.firstName[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Nom <span className="text-red-500">*</span>
          </Label>
          <Input id="lastName" name="lastName" placeholder="Mukendi" required />
          {state.errors?.lastName && (
            <p className="text-xs text-red-500">{state.errors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jean@exemple.com"
            required
          />
          {state.errors?.email && (
            <p className="text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+243 800 000 000"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="country">
            Pays <span className="text-red-500">*</span>
          </Label>
          <Input
            id="country"
            name="country"
            placeholder="République Démocratique du Congo"
            required
          />
          {state.errors?.country && (
            <p className="text-xs text-red-500">{state.errors.country[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">
            Ville <span className="text-red-500">*</span>
          </Label>
          <Input id="city" name="city" placeholder="Kinshasa" required />
          {state.errors?.city && (
            <p className="text-xs text-red-500">{state.errors.city[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (optionnel)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Partagez vos questions ou attentes particulières…"
          className="min-h-[120px]"
        />
      </div>

      {state.errors?._form && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
          {state.errors._form[0]}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi en cours…
          </>
        ) : (
          <>
            <BookOpen className="mr-2 h-5 w-5" /> Envoyer ma Demande
          </>
        )}
      </Button>

      <p className="text-xs text-center text-[hsl(var(--muted-foreground))]">
        En soumettant ce formulaire, vous acceptez d&apos;être contacté par un
        responsable de notre église.
      </p>
    </form>
  );
}

export default BibleStudyForm;
