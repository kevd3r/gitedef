import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // Cette option est essentielle si vous utilisez un certificat auto-signé ou non vérifié
    // pour que l'envoi d'e-mail fonctionne en local.
    rejectUnauthorized: false
  }
});

export async function POST(req) {
  try {
    const { name, email, phone, message, startDate, endDate } = await req.json();

    // 1. Enregistrement de la réservation dans la base de données
    const newReservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        message,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "PENDING",
      },
    });

    // 2. Envoi de l'e-mail de confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER, // Utilisation de votre variable d'environnement pour l'expéditeur
      to: email, // L'e-mail du client
      subject: `Confirmation de votre demande de réservation`,
      html: `
        <h1>Bonjour ${name},</h1>
        <p>Merci pour votre demande de réservation sur notre site. Voici les détails de votre demande :</p>
        <ul>
          <li><strong>Dates :</strong> Du ${new Date(startDate).toLocaleDateString()} au ${new Date(endDate).toLocaleDateString()}</li>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${phone || "Non fourni"}</li>
          <li><strong>Message :</strong> ${message || "Pas de message"}</li>
        </ul>
        <p>Nous la traiterons dans les plus brefs délais et vous recontacterons pour la confirmer.</p>
        <p>Cordialement,<br/>L'équipe de votre hébergement</p>
      `,
    };
    // 3. Envoi de l'e-mail de demande de réservation
    const confirmMailOptions = {
      from: process.env.EMAIL_USER, // Utilisation de votre variable d'environnement pour l'expéditeur
      to: process.env.EMAIL_USER, // L'e-mail du client
      subject: `Nouvelle demande de réservation de ${name}`,
      html: `
        <h1>Nouvelle Demande de Réservation</h1>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Pour la période du ${new Date(startDate).toLocaleDateString()} au ${new Date(endDate).toLocaleDateString()}  </strong></p>
        <p><strong>Téléphone :</strong> ${phone || "Non fourni"}</p>
        <p><strong>Message :</strong> ${message || "Pas de message"}</p>
      `,
    }
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmMailOptions);

    console.log("Réservation enregistrée et e-mail envoyé", { newReservation });

    return NextResponse.json({ message: 'Demande de réservation envoyée avec succès' }, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la réservation ou de l'envoi de l'e-mail :", error);
    return NextResponse.json({ error: 'Échec de la réservation ou de l\'envoi de l\'e-mail.' }, { status: 500 });
  }
}