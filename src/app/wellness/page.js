// app/wellness/page.js
// PAS de 'use client' ici
import WellnessClient from "./WellnessClient";

export const metadata = {
  title: "Soins Shiatsu à Angoulins | Massages Bien-être près de La Rochelle",
  description:
    "Découvrez nos soins Shiatsu relaxants à Angoulins, près de La Rochelle : massage du visage, du dos ou complet. Séances sur réservation pour une détente profonde en bord de mer.",
  keywords: [
    "massage shiatsu Angoulins",
    "soins bien-être La Rochelle",
    "massage relaxant Charente-Maritime",
    "soin visage shiatsu bord de mer",
    "massage dos détente",
    "soin complet bien-être",
    "massage énergétique près de La Rochelle",
    "séance shiatsu détente",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  openGraph: {
    title: "Soins Shiatsu à Angoulins | Détente et Bien-être",
    description:
      "Offrez-vous un moment de pure détente avec nos massages Shiatsu à Angoulins, près de La Rochelle. Séances sur réservation pour un équilibre corps-esprit.",
    url: "/wellness",
    images: [
      {
        url: "@public/images/soins/sweetlights.jpg",
        width: 1200,
        height: 630,
        alt: "Massage Shiatsu relaxant à Angoulins, près de La Rochelle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soins Shiatsu à Angoulins | Détente et Bien-être",
    description:
      "Découvrez nos massages Shiatsu pour une relaxation profonde. Séances de 20 à 45 min à Angoulins, près de La Rochelle.",
    images: ["/images/soins/sweetlights.jpg"],
  },
};

export default function WellnessPage() {
  return <WellnessClient />;
}
