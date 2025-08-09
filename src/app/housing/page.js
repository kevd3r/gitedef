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
  Store, // Remplaçant pour Toaster (grille-pain)
} from "lucide-react";
import Image from "next/image";


const housing = () => {
  const housingImages = [
    { src: "/images/housing/photo1.jpg", alt: "Extérieur de l'hébergement" },
    { src: "/images/housing/photo2.jpg", alt: "Intérieur, coin cuisine" },
    { src: "/images/housing/photo3.jpg", alt: "Chambre à coucher" },
    { src: "/images/housing/photo4.jpg", alt: "Terrasse en bois" },
  ];

  // Liste des équipements avec une icône correspondante (nom de l'icône de lucide-react)
  const equipmentList = [
    {
      text: "Coin cuisine avec équipement standard (casseroles, poêles, vaisselle, huile, sel, poivre)",
      icon: Utensils,
    },
    { text: "Cafetière à filtre intégrée", icon: Coffee },
    { text: "Bouilloire électrique", icon: Microwave },
    { text: "Four à micro-ondes", icon: Microwave },
    { text: "Grille-pain", icon: Square }, // 'Square' comme alternative pour un appareil de cuisine
    { text: "Serviettes de bain", icon: ShowerHead },
    { text: "Gel douche, shampoing", icon: Sprout },
    { text: "Sèche-cheveux", icon: Fan }, // 'Fan' comme alternative pour un sèche-cheveux (ventilateur/séchage)
    { text: "Draps, oreillers et couverture", icon: Bed },
    { text: "Espace de rangement pour les vêtements", icon: Shirt },
    { text: "Produit vaisselle et de nettoyage", icon: Sparkles },
    { text: "WIFI", icon: Wifi },
    { text: "TV", icon: Tv },
  ];

  const pricing = [
    { season: "Basse Saison (du 1 février au 31 mars)", price: "65 €/nuit" },
    { season: "Moyenne Saison (du 1 avril au 30 juin)", price: "75 €/nuit" },
    { season: "Haute Saison (du 1 juillet au 31 août)", price: "85 €/nuit" },
  ];

  return (
    // Conteneur principal de la page, avec padding et couleur de fond.
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Titre */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Découvrez notre Hébergement
        </h1>

        {/* Section Photos */}
        {/* Grille responsive pour 2 colonnes sur les écrans moyens et grands */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden shadow-xl">
          {housingImages.map((img, index) => (
            <div key={index} className="relative w-full h-64 md:h-80">
              {/* Utilisation d'une balise <img> standard au lieu de Next.js <Image> */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                // Pour simuler 'fill' et 'object-cover' avec <img>
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                loading="lazy" // Simule le lazy loading
              />
            </div>
          ))}
        </section>

        {/* Section Description Générale */}
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">
            Présentation du Gîte
          </h2>
          <div className="space-y-4 text-lg text-white">
            <p>
              Capacité d&apos;accueil :{" "}
              <span className="font-semibold">2 adultes</span> (si bébé, nous
              consulter). Les animaux de compagnie{" "}
              <span className="font-semibold">ne sont pas admis</span>.
            </p>
            <p>
              Ouvert toute l&apos;année (à l&apos;exception du mois de janvier) et
              disposant d&apos;une place de parking privative, l&apos;hébergement proposé
              est une petite maison de plain-pied située dans un quartier très
              calme et proche du bord de mer (1km environ).
            </p>
            <p>
              L&apos;hébergement est constitué d&apos;un coin cuisine/séjour, d&apos;une salle
              de bains avec toilettes et douche, et d&apos;une chambre (lit de
              160x200) donnant sur une terrasse en bois.
            </p>
            <p className="flex items-center text-blue-600 font-semibold mt-6">
              <Car className="inline-block mr-2 text-2xl" /> Place de parking
              privative incluse.
            </p>
            <p className="flex items-center text-blue-600 font-semibold">
              <Sprout className="inline-block mr-2 text-2xl" /> Quartier calme
              et proche du bord de mer (1km).
            </p>
            <p className="flex items-center text-blue-600 font-semibold">
              <Waves className="inline-block mr-2 text-2xl" /> Plage proche
              (1km).
            </p>
            <p className="flex items-center text-blue-600 font-semibold">
              <Sailboat className="inline-block mr-2 text-2xl" /> Acivités
              nautiques au club de voile.
            </p>
            <p className="flex items-center text-blue-600 font-semibold">
              <Store className="inline-block mr-2 text-2xl" /> Toutes commodités
              dans le village.
            </p>
          </div>
        </section>

        {/* Section Équipements */}
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">
            Équipements Fournis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            {equipmentList.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50"
              >
                {/* Rendu de l'icône Lucide en utilisant la syntaxe JSX directement */}
                {item.icon && (
                  <item.icon className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" />
                )}
                <span className="text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section Tarifs */}
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">Nos Tarifs</h2>
          <div className="space-y-4 text-lg text-white">
            <p className="mb-4">
              <span className="font-semibold">
                Petit-déjeuners non compris, taxes de séjour incluses.
              </span>
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {pricing.map((item, index) => (
                <li key={index}>
                  <span className="font-semibold text-blue-600">
                    {item.season} :
                  </span>{" "}
                  {item.price}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-400">
              Pour toute question sur les tarifs ou pour les séjours de longue
              durée, n&apos;hésitez pas à nous contacter.
            </p>
          </div>
        </section>
      </div>

    </div>
  );
};

export default housing;
