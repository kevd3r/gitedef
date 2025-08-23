// app/housing/page.js

import HousingClient from "./HousingClient";

export const metadata = {
  title: "Hébergement Cosy à Angoulins | Gîte Proche de la Mer près de La Rochelle",
  description:
    "Découvrez notre gîte pour 2 adultes à Angoulins, à 1km de la mer et des activités nautiques. Terrasse en bois, parking privatif et équipement complet pour un séjour détente en Charente-Maritime.",
  keywords: [
    "gîte Angoulins",
    "location vacances bord de mer Charente-Maritime",
    "hébergement couple La Rochelle",
    "gîte avec terrasse près de la plage",
    "location saisonnière Angoulins",
    "séjour romantique côte Atlantique",
    "gîte plain-pied calme",
    "location avec parking privatif",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  openGraph: {
    title: "Gîte Cosy à Angoulins | Séjour en Bord de Mer",
    description:
      "Notre gîte pour 2 adultes à Angoulins, près de La Rochelle, offre une terrasse en bois, un parking privatif et un accès rapide à la plage et aux activités nautiques.",
    url: "/housing",
    images: [
      {
        url: "@public/images/housing/photo1.jpg",
        width: 1200,
        height: 630,
        alt: "Extérieur du gîte cosy à Angoulins, près de la mer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gîte Cosy à Angoulins | Séjour en Bord de Mer",
    description:
      "Profitez d'un hébergement calme et bien équipé à 1km de la plage. Idéal pour un séjour en couple ou une escapade détente.",
    images: ["/images/housing/photo1.jpg"],
  },
};

export default function HousingPage() {
  return <HousingClient />;
}
