import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database…");

  // Admin user
  const hashedPassword = await bcrypt.hash("admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@sdarm-rdc.org" },
    update: {},
    create: {
      email: "admin@sdarm-rdc.org",
      name: "Administrateur SDARM",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user:", admin.email);

  // Article categories
  const categories = [
    { name: "Santé", slug: "sante", color: "#16a34a" },
    { name: "Famille", slug: "famille", color: "#2563eb" },
    { name: "Éducation", slug: "education", color: "#7c3aed" },
    { name: "Spiritualité", slug: "spiritualite", color: "#b45309" },
    {
      name: "Prophéties Bibliques",
      slug: "propheties-bibliques",
      color: "#dc2626",
    },
    { name: "Jeunesse", slug: "jeunesse", color: "#0891b2" },
  ];

  for (const cat of categories) {
    await prisma.articleCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Article categories seeded");

  // Sample church
  await prisma.church.upsert({
    where: { id: "church-kinshasa-centrale" },
    update: {},
    create: {
      id: "church-kinshasa-centrale",
      name: "Église Centrale de Kinshasa",
      address: "Avenue de la Paix, N° 12",
      city: "Kinshasa",
      country: "RDC",
      phone: "+243 810 000 001",
      email: "kinshasa@sdarm-rdc.org",
      latitude: -4.3217,
      longitude: 15.3125,
      worshipTimes: ["Sabbat : 9h30 — 12h30", "Mercredi : 18h00 — 20h00"],
    },
  });
  console.log("✅ Sample church seeded");

  // App settings
  await prisma.settings.upsert({
    where: { key: "site_name" },
    update: {},
    create: { key: "site_name", value: "SDARM-RDC" },
  });

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
