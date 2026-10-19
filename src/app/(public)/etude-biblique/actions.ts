"use server";

import { prisma } from "@/lib/prisma";
import { bibleStudySchema } from "@/lib/validations";
import { sendBibleStudyNotification } from "@/lib/mail";

export async function submitBibleStudyRequest(
  _prevState: unknown,
  formData: FormData,
) {
  const raw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string | undefined,
    country: formData.get("country") as string,
    city: formData.get("city") as string,
    message: formData.get("message") as string | undefined,
  };

  const parsed = bibleStudySchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await prisma.bibleStudyRequest.create({ data: parsed.data });

    // Fire-and-forget — do not fail the user if mail fails
    sendBibleStudyNotification(parsed.data).catch(console.error);

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { _form: ["Une erreur est survenue. Veuillez réessayer."] },
    };
  }
}
