// app/page.js
import HomeClient from './HomeClient';


// Déclaration de la constante Metadata pour la page d'accueil
export const metadata = {
  title: "Havre de Paix à Angoulins | Hébergement & Soins Bien-être près de La Rochelle",
  description: "Découvrez notre gîte d'exception et nos soins bien-être à Angoulins, à deux pas de La Rochelle. Réservez votre escapade en bord de mer sur la côte Atlantique pour une expérience de détente et de sérénité unique.",
  keywords: [
    "gîte Angoulins",
    "location vacances La Rochelle",
    "soins bien-être Charente-Maritime",
    "hébergement bord de mer",
    "escapade détente Atlantique",
  ],
  openGraph: {
    title: "Havre de Paix à Angoulins | Hébergement & Soins Bien-être",
    description: "Profitez d'un hébergement confortable et de soins bien-être sur mesure à Angoulins, près de La Rochelle.",
    url: "https://escapadeangoulins.fr",
    images: [
      {
        url: "/images/homepage/carrelet_acc.jpg", // Le chemin doit être public, pas d'alias ici
        width: 1200,
        height: 630,
        alt: "Carrelet en bord de mer au lever du soleil à Angoulins",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Havre de Paix à Angoulins | Hébergement & Soins Bien-être",
    description: "Vivez une expérience unique en bord de mer à Angoulins, près de La Rochelle. Hébergement et soins bien-être pour vous ressourcer.",
    images: ["/images/homepage/carrelet_acc.jpg"], // Le chemin doit être public
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Le composant de la page principale (Server Component)
export default function Home() {
  return <HomeClient />;
}
