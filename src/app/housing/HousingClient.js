// app/housing/HousingClient.js
"use client";
import {
  Utensils,
  Coffee,
  Microwave,
  ShowerHead,
  Bed,
  Shirt,
  Wifi,
  Tv,
  Sprout,
  Car,
  Sparkles,
  Fan,
  Square,
  Waves,
  Sailboat,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HousingClient() {
  const housingImages = [
    {
      src: "/images/housing/photo1.jpg",
      alt: "Extérieur du gîte à Angoulins, avec terrasse en bois",
    },
    {
      src: "/images/housing/Photo2.jpg",
      alt: "Intérieur du gîte, coin cuisine équipé",
    },
    {
      src: "/images/housing/Photo3.jpg",
      alt: "Chambre à coucher avec lit double 160x200",
    },
    {
      src: "/images/housing/Photo4.jpg",
      alt: "Terrasse en bois avec vue sur le jardin",
    },
  ];

  const equipmentList = [
    {
      text: "Coin cuisine équipé (casseroles, poêles, vaisselle, huile, sel, poivre)",
      icon: Utensils,
    },
    { text: "Cafetière à filtre intégrée", icon: Coffee },
    { text: "Bouilloire électrique", icon: Microwave },
    { text: "Four à micro-ondes", icon: Microwave },
    { text: "Grille-pain", icon: Square },
    { text: "Serviettes de bain fournies", icon: ShowerHead },
    { text: "Gel douche et shampoing bio", icon: Sprout },
    { text: "Sèche-cheveux", icon: Fan },
    { text: "Draps, oreillers et couverture inclus", icon: Bed },
    { text: "Espace de rangement pour vêtements", icon: Shirt },
    { text: "Produits vaisselle et nettoyage écologiques", icon: Sparkles },
    { text: "WiFi haut débit gratuit", icon: Wifi },
    { text: "Télévision écran plat", icon: Tv },
  ];

  const pricing = [
    {
      season: "Basse Saison (1er février au 31 mars)",
      price: "65 €/nuit",
      description: "Période idéale pour les escapades tranquilles.",
    },
    {
      season: "Moyenne Saison (1er avril au 30 juin)",
      price: "75 €/nuit",
      description: "Profitez du printemps en bord de mer.",
    },
    {
      season: "Haute Saison (1er juillet au 31 août)",
      price: "85 €/nuit",
      description:
        "Saison estivale avec accès à toutes les activités nautiques.",
    },
  ];

  const nearbyActivities = [
    { name: "Plage de la Conche des Baleines", distance: "1 km", icon: Waves },
    { name: "Club de voile d'Angoulins", distance: "1,2 km", icon: Sailboat },
    { name: "Sentier côtier GR360", distance: "800 m", icon: Sprout },
    {
      name: "Commerces du village (boulangerie, épicerie)",
      distance: "500 m",
      icon: Store,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Titre avec mots-clés */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Notre Gîte Cosy à Angoulins, près de La Rochelle
        </h1>

        {/* Section Photos avec balises alt optimisées */}
        <section
          className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden shadow-xl"
          aria-labelledby="gallery-title"
        >
          <h2 id="gallery-title" className="sr-only">
            Galerie photos du gîte
          </h2>
          {housingImages.map((img) => (
            <div key={img.src} className="relative w-full h-64 md:h-80">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          ))}
        </section>

        {/* Section Description Générale avec balises sémantiques */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="presentation-title"
        >
          <h2
            id="presentation-title"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Présentation du Gîte
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              <strong>Capacité :</strong> 2 adultes (nous consulter pour les
              bébés).
              <br />
              <strong>Animaux :</strong> Non admis (pour préserver la propreté
              et le calme).
            </p>
            <p>
              Ouvert <strong>toute l&apos;année</strong> (sauf janvier), notre gîte
              de plain-pied est situé dans un <strong>quartier calme</strong> à
              seulement <strong>1 km de la mer</strong>. Il dispose d&apos;une{" "}
              <strong>place de parking privative</strong> et d&apos;une{" "}
              <strong>terrasse en bois</strong> pour profiter de l&apos;extérieur.
            </p>
            <p>
              Composé d&apos;un <strong>coin cuisine/séjour</strong>, d&apos;une{" "}
              <strong>salle de bains avec douche</strong> et d&apos;une{" "}
              <strong>chambre</strong> (lit 160x200), il est idéal pour un{" "}
              <strong>séjour en couple</strong> ou une escapade solo.
            </p>
            <div className="mt-6 space-y-3">
              <p className="flex items-center text-blue-400 font-semibold">
                <Car className="inline-block mr-2 text-2xl" /> Parking privatif
                inclus.
              </p>
              <p className="flex items-center text-blue-400 font-semibold">
                <Waves className="inline-block mr-2 text-2xl" /> Plage à 1 km
                (accès à pied ou à vélo).
              </p>
              <p className="flex items-center text-blue-400 font-semibold">
                <Sailboat className="inline-block mr-2 text-2xl" /> Club de
                voile et activités nautiques à proximité.
              </p>
              <p className="flex items-center text-blue-400 font-semibold">
                <Store className="inline-block mr-2 text-2xl" /> Commerces du
                village accessibles à pied.
              </p>
            </div>
          </div>
        </section>

        {/* Section Équipements avec liste structurée */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="equipment-title"
        >
          <h2
            id="equipment-title"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Équipements Inclus
          </h2>
          <p className="mb-6 text-lg">
            Tout est prévu pour votre confort : cuisine équipée, linge de
            maison, produits de base et connexion WiFi.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentList.map((item, index) => (
              <div
                key={item.text}
                className="flex items-start p-4 border border-gray-600 rounded-lg bg-gray-800/30"
              >
                <item.icon className="w-6 h-6 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section Tarifs avec détails */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="pricing-title"
        >
          <h2
            id="pricing-title"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Tarifs par Saison
          </h2>
          <p className="mb-4 text-lg">
            <strong>Petits-déjeuners non inclus</strong> | Taxes de séjour
            incluses.
          </p>
          <ul className="space-y-4">
            {pricing.map((item) => (
              <li
                key={item.season}
                className="p-4 border border-gray-600 rounded-lg bg-gray-800/30"
              >
                <p className="font-semibold text-blue-400">{item.season}</p>
                <p className="text-xl mt-1">{item.price}</p>
                <p className="text-sm text-gray-300 mt-1">{item.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-400">
            Pour les <strong>séjours longs</strong> ou les questions sur les
            tarifs,{" "}
            <Link href="/contact" className="text-blue-400 hover:underline">
              contactez-nous
            </Link>
            .
          </p>
        </section>

        {/* Section Activités à proximité (pour le SEO local) */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="activities-title"
        >
          <h2
            id="activities-title"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Activités à Proximité
          </h2>
          <p className="mb-6 text-lg">
            Angoulins et ses alentours offrent de nombreuses activités pour
            agrémenter votre séjour :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {nearbyActivities.map((activity) => (
              <div
                key={activity.season}
                className="flex items-start p-4 border border-gray-600 rounded-lg bg-gray-800/30"
              >
                <activity.icon className="w-6 h-6 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">{activity.name}</p>
                  <p className="text-sm text-gray-300">{activity.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section FAQ pour le SEO */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg"
          aria-labelledby="faq-title"
        >
          <h2 id="faq-title" className="text-3xl font-bold mb-6 text-[#FECD31]">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            <details className="p-4 border border-gray-600 rounded-lg bg-gray-800/30">
              <summary className="font-semibold cursor-pointer">
                Quels sont les horaires d&apos;arrivée et de départ ?
              </summary>
              <p className="mt-2">
                Arrivée à partir de 16h, départ avant 12h. Nous pouvons être
                flexibles selon les disponibilités.
              </p>
            </details>
            <details className="p-4 border border-gray-600 rounded-lg bg-gray-800/30">
              <summary className="font-semibold cursor-pointer">
                Fournissez-vous le linge de maison ?
              </summary>
              <p className="mt-2">
                Oui, draps, serviettes et torchons sont fournis et inclus dans
                le prix.
              </p>
            </details>
            <details className="p-4 border border-gray-600 rounded-lg bg-gray-800/30">
              <summary className="font-semibold cursor-pointer">
                Y a-t-il des restaurants à proximité ?
              </summary>
              <p className="mt-2">
                Plusieurs restaurants sont accessibles à moins de 2 km. Nous
                recommandons &quot;Le Carrelet&quot; pour ses fruits de mer (1,5 km).
              </p>
            </details>
            <details className="p-4 border border-gray-600 rounded-lg bg-gray-800/30">
              <summary className="font-semibold cursor-pointer">
                Peut-on louer des vélos sur place ?
              </summary>
              <p className="mt-2">
                Nous ne louons pas de vélos, mais le village d&apos;Angoulins propose
                un service de location (500 m du gîte).
              </p>
            </details>
          </div>
        </section>

        {/* Call-to-Action pour la réservation */}
        <section className="text-center mt-12">
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-[#FECD31] text-[#0C1824] font-bold rounded-lg hover:bg-[#FFB01F] transition-colors text-xl"
            aria-label="Réserver le gîte"
          >
            Réserver Votre Séjour
          </Link>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VacationRental",
            name: "Gîte Cosy à Angoulins",
            description:
              "Gîte pour 2 adultes à 1 km de la mer, avec terrasse en bois et parking privatif.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Angoulins",
              addressRegion: "Charente-Maritime",
              postalCode: "17690",
              addressCountry: "FR",
            },
            amenityFeature: [
              {
                "@type": "LocationFeatureSpecification",
                name: "Parking",
                value: "true",
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Terrasse",
                value: "true",
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "WiFi",
                value: "true",
              },
              {
                "@type": "LocationFeatureSpecification",
                name: "Cuisine équipée",
                value: "true",
              },
            ],
            numberOfRooms: "1",
            occupancy: {
              "@type": "QuantitativeValue",
              maxValue: "2",
            },
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/housing`,
          }),
        }}
      />
    </div>
  );
}
