// pages/wellness.js

import Head from 'next/head';
import Image from 'next/image';

import {
  HeartPulse, Hand, CalendarCheck, Phone, Info, LeafyGreen, // Icônes Lucide pertinentes
} from "lucide-react";

const wellness = () => {
  // Les informations sur les soins
  const careServices = [
    { name: "Massage SHIATSU du VISAGE", duration: "20 mn", price: "10 euros", icon: HeartPulse },
    { name: "Massage SHIATSU du DOS", duration: "35 mn", price: "20 euros", icon: HeartPulse },
    { name: "Massage SHIATSU complet", duration: "45 mn", price: "30 euros", icon: HeartPulse },
  ];

  // Images si vous en avez pour le bien-être
  const wellnessImages = [
    { src: "/images/soins/sweetlights.jpg", alt: "Mains effectuant un massage shiatsu" },
    { src: "/images/soins/massage1.jpg", alt: "Personne se relaxant pendant un soin" },
    // Ajoutez plus d'images si vous le souhaitez
  ];

  return (
    // Conteneur principal avec le même style de fond que housing
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <Head>
        <title>Soins Bien-être - Votre Hébergement</title>
        <meta name="description" content="Découvrez nos soins Shiatsu relaxants disponibles durant votre séjour : massage visage, dos, complet." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Section Titre */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Nos Soins Bien-être
        </h1>

        {/* Section Photos (Optionnelle, comme dans housing) */}
        {wellnessImages.length > 0 && (
          <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden shadow-xl">
            {wellnessImages.map((img, index) => (
              <div key={index} className="relative w-full h-64 md:h-80">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </section>
        )}

        {/* Section Présentation des Soins et Informations Pratiques */}
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">Détente et Harmonie</h2>
          <div className="space-y-4 text-lg text-white">
            <p>
              Lors de votre séjour dans notre hébergement, offrez-vous un moment de pure détente avec nos soins Shiatsu.
              Chaque séance est conçue pour apporter relaxation profonde et équilibre.
            </p>
            <p>
              Choisissez parmi notre sélection de massages Shiatsu, réalisés par un professionnel qualifié, pour une expérience de bien-être personnalisée.
            </p>

            {/* Informations clés avec icônes */}
            <p className="flex items-center text-blue-400 font-semibold mt-6">
              <LeafyGreen className="inline-block mr-2 text-2xl" /> Soins relaxants pour corps et esprit.
            </p>
            <p className="flex items-center text-blue-400 font-semibold">
              <CalendarCheck className="inline-block mr-2 text-2xl" /> Séances sur réservation et sous réserve de disponibilité.
            </p>
            <p className="flex items-center text-blue-400 font-semibold">
              <Info className="inline-block mr-2 text-2xl" /> Règlement par chèque ou espèces en fin de séance.
            </p>
            <p className="flex items-center text-blue-400 font-semibold">
              <Phone className="inline-block mr-2 text-2xl" /> Contact : Christophe – <a href="tel:+33688648195" className="hover:underline">06.88.64.81.95</a>
            </p>
          </div>
        </section>

        {/* Section Détails des Soins et Tarifs */}
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">Nos Soins et Tarifs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            {careServices.map((care, index) => (
              <div key={index} className="flex flex-col items-center p-6 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                {care.icon && <care.icon className="w-12 h-12 mb-4 text-[#FECD31]" />}
                <h3 className="text-xl font-semibold mb-2 text-[#FECD31]">{care.name}</h3>
                <p className="text-lg mb-1">{care.duration}</p>
                <p className="text-2xl font-bold text-blue-400">{care.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section "En savoir +" sur le Shiatsu */}
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">Qu&apos;est-ce que le Shiatsu ?</h2>
          <div className="space-y-4 text-lg text-white">
            <p className="flex items-start">
              <Hand className="w-8 h-8 mr-4 text-blue-400 flex-shrink-0 mt-1" />
              Le Shiatsu est une technique de massage d&apos;origine japonaise qui consiste à exercer des séries de pressions - relâchements sur l&apos;ensemble du corps à l&apos;aide des paumes et des pouces.
            </p>
            <p className="flex items-start">
              <HeartPulse className="w-8 h-8 mr-4 text-blue-400 flex-shrink-0 mt-1" />
              C&apos;est une technique douce, profondément relaxante, qui vise à harmoniser l&apos;énergie corporelle et à diminuer les douleurs musculaires et articulaires, favorisant un bien-être général.
            </p>
          </div>
        </section>

      </div>

    </div>
  );
};

export default wellness;