// app/booking/page.js
// PAS de 'use client' ici
import BookingClient from "./BookingClient";

export const metadata = {
  title: "Réservation en Ligne | Havre de Paix à Angoulins",
  description:
    "Réservez votre hébergement à Angoulins près de La Rochelle en quelques clics. Calendrier interactif, disponibilités en temps réel et confirmation rapide.",
  keywords: [
    "réservation gîte Angoulins",
    "location vacances La Rochelle",
    "calendrier disponibilités Charente-Maritime",
    "hébergement bord de mer réservation",
    "réserver séjour bien-être Atlantique",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  openGraph: {
    title: "Réservez Votre Séjour à Angoulins",
    description:
      "Utilisez notre calendrier interactif pour réserver votre hébergement en bord de mer à Angoulins, près de La Rochelle.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/booking`,
    images: [
      {
        url: `@public/images/booking/schedule.jpg`, // Remplace par une image représentative
        width: 1200,
        height: 630,
        alt: "Réservation en ligne pour un gîte à Angoulins",
      },
    ],
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
