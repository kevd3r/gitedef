'use client';
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header"; // Assurez-vous que le chemin d'importation est correct
import Card from "./components/Card";
import LocationMap from "./lib/LocationMap";


export default function Home() {

  const cards = [
    {
      title: "Hébergement",
      link: "/housing",
      imagesrc: "/images/housing/photo1.jpg",
    },
    {
      title: "Réservations",
      link: "/booking",
      imagesrc: "/images/booking/schedule.jpg",
    },
    {
      title: "Soins",
      link: "/wellness",
      imagesrc: "/images/soins/sweetlights.jpg",
    },
    {
      title: "Contact",
      link: "/contact",
      imagesrc: "/images/contact/contact.jpg",
    },
  ];


  return (
    
    // Conteneur principal de la page.

    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src="/images/homepage/carrelet_acc.jpg"
          alt="Carrelet en bord de mer au lever du soleil"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay de dégradé : */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1824]/100 via-[#0C1824]/80 to-transparent"></div>

        {/* Le composant Header superposé : */}
        {/* `absolute top-0 left-0 w-full z-10`: Positionne le header en haut, à gauche, sur toute la largeur, au-dessus de l'image. */}
        {/* `bg-transparent`: Rends le fond du header transparent pour voir l'image. */}
        <header className="absolute top-0 left-0 w-full z-10 bg-transparent">
          <Header />
        </header>

        {/* Contenu textuel superposé : Titre et paragraphe */}
        {/* `absolute`: Positionne le bloc de texte par rapport à la section "hero" parente. */}
        {/* `top-1/2 -translate-y-1/2`: Centre verticalement le bloc de texte (utilise la moitié de la hauteur et le déplace de sa propre moitié vers le haut). */}
        {/* `left-[10vw]`: Aligne le texte avec le padding gauche du header (10% de la largeur du viewport). */}
        {/* `z-20`: S'assure que le texte est au-dessus de tout le reste (image, dégradé, header). */}
        {/* `text-white`: Rend le texte blanc pour un bon contraste avec le dégradé foncé. */}
        {/* `max-w-md`: Limite la largeur du texte sur les grands écrans pour une meilleure lisibilité. */}
        {/* `px-8 sm:px-12 md:px-16`: Padding horizontal pour les petits écrans. */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[10vw] z-5 text-white max-w-md px-8 sm:px-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Bienvenue dans votre havre de paix
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Découvrez une expérience unique où le confort moderne rencontre la
            sérénité de la nature. Nous vous offrons un lieu idéal pour vous
            ressourcer, loin du tumulte quotidien. Profitez de notre hébergement
            d&apos;exception et de nos soins bien-être sur mesure.
          </p>
          {/* Optionnel: Bouton d'appel à l'action */}
          <Link href={"/housing"}>
            <button className="mt-6 px-6 py-3 bg-[#FECD31] text-[#0C1824] font-semibold rounded-lg shadow-lg hover:bg-[#FFB01F] transition-colors duration-300 transform hover:scale-105 cursor-pointer">
              Découvrez notre offre
            </button>
          </Link>
        </div>
      </div>

      {/* Reste du contenu de la page (en dessous de la section hero) */}
      {/* `flex-grow`: Permet à cette section de prendre tout l'espace vertical restant. */}
      {/* `p-8 pb-20 sm:p-20`: Padding général. */}
      {/* `flex flex-col items-center justify-center`: Centrage du contenu. */}
      <div className="flex-grow p-8 pb-20 sm:p-20 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#FECD31]">
          Nos Services et Expériences
        </h2>
        <p className="text-lg text-center text-white max-w-2xl">
          Que vous recherchiez une escapade relaxante, une aventure en pleine
          nature ou un séjour axé sur le bien-être, nous avons ce qu&pos;il vous
          faut. Plongez dans un monde de tranquillité et de confort.
        </p>
      </div>
   
      <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-4 md:flex-row md:justify-center md:space-x-6 gap-6 p-10">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            link={card.link}
            imagesrc={card.imagesrc}
          />
        ))}
      </div>
      <LocationMap></LocationMap>
    </div>
  );
}
