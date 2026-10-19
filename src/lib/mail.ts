import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBibleStudyNotification(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  city: string;
  message?: string;
}) {
  const adminHtml = `
    <h2>Nouvelle demande d'étude biblique</h2>
    <table>
      <tr><td><strong>Nom :</strong></td><td>${data.lastName} ${data.firstName}</td></tr>
      <tr><td><strong>Email :</strong></td><td>${data.email}</td></tr>
      <tr><td><strong>Téléphone :</strong></td><td>${data.phone ?? "—"}</td></tr>
      <tr><td><strong>Pays :</strong></td><td>${data.country}</td></tr>
      <tr><td><strong>Ville :</strong></td><td>${data.city}</td></tr>
      <tr><td><strong>Message :</strong></td><td>${data.message ?? "—"}</td></tr>
    </table>
  `;

  const userHtml = `
    <h2>Votre demande d'étude biblique</h2>
    <p>Cher(e) ${data.firstName},</p>
    <p>Votre demande a bien été enregistrée. Un responsable vous contactera prochainement.</p>
    <p>Que Dieu vous bénisse.</p>
    <p><em>L'Équipe SDARM-RDC</em></p>
  `;

  await Promise.all([
    transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "Nouvelle demande d'étude biblique",
      html: adminHtml,
    }),
    transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: "Confirmation de votre demande d'étude biblique",
      html: userHtml,
    }),
  ]);
}
