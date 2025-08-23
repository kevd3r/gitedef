// app/contact/page.js
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contactez Havre de Paix à Angoulins | Réservations & Soins Bien-être",
  description:
    "Contactez-nous pour réserver votre séjour ou vos soins bien-être à Angoulins, près de La Rochelle. Réponse rapide par email ou téléphone.",
  keywords: [
    "contact gîte Angoulins",
    "réservation hébergement La Rochelle",
    "soins bien-être Charente-Maritime contact",
    "téléphone gîte bord de mer",
    "email réservation séjour Atlantique",
    "adresse hébergement Angoulins",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  openGraph: {
    title: "Contactez Havre de Paix à Angoulins",
    description:
      "Besoin d’informations ou de réserver ? Contactez-nous par email, téléphone ou via notre formulaire en ligne.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    images: [
      {
        url: `@public/images/contact/contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contactez Havre de Paix pour réserver votre séjour à Angoulins",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactez Havre de Paix à Angoulins",
    description:
      "Réservez votre hébergement ou vos soins bien-être en bord de mer. Réponse sous 24h !",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/contact/hero-contact.jpg`],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
