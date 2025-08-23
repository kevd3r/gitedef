import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls:{
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nouvelle demande de contact de ${name}`,
      html: `
        <h2>Nouvelle Demande de Contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Téléphone :</strong> ${phone || 'Non spécifié'}</p>
        <p><strong>Message :</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // Renvoyer une réponse en utilisant `NextResponse`
    return NextResponse.json({ message: 'E-mail envoyé avec succès !' }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    return NextResponse.json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' }, { status: 500 });
  }
}