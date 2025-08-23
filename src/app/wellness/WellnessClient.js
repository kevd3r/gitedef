// app/wellness/WellnessClient.js
"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  Hand,
  CalendarCheck,
  Phone,
  Info,
  LeafyGreen,
} from "lucide-react";

export default function WellnessClient() {
  const careServices = [
    {
      name: "Massage SHIATSU du VISAGE",
      duration: "20 mn",
      price: "10 €",
      description:
        "Idéal pour détendre les tensions du visage et du cuir chevelu.",
      icon: HeartPulse,
    },
    {
      name: "Massage SHIATSU du DOS",
      duration: "35 mn",
      price: "20 €",
      description:
        "Parfait pour soulager les tensions dorsales et améliorer la posture.",
      icon: HeartPulse,
    },
    {
      name: "Massage SHIATSU complet",
      duration: "45 mn",
      price: "30 €",
      description:
        "Séance complète pour un équilibre global du corps et de l'esprit.",
      icon: HeartPulse,
    },
  ];

  const wellnessImages = [
    {
      src: "/images/soins/sweetlights.jpg",
      alt: "Mains effectuant un massage Shiatsu relaxant à Angoulins",
    },
    {
      src: "/images/soins/massage1.jpg",
      alt: "Personne en séance de relaxation pendant un soin Shiatsu",
    },
  ];

  const benefits = [
    {
      title: "Réduction du stress",
      description:
        "Le Shiatsu aide à libérer les tensions accumulées et à retrouver un état de calme profond.",
      icon: LeafyGreen,
    },
    {
      title: "Amélioration de la circulation",
      description:
        "Les pressions douces stimulent la circulation sanguine et lymphatique.",
      icon: HeartPulse,
    },
    {
      title: "Soulagement des douleurs",
      description:
        "Efficace contre les maux de dos, les tensions musculaires et les migraines.",
      icon: Hand,
    },
    {
      title: "Équilibre énergétique",
      description:
        "Harmonise le flux d'énergie dans le corps selon les principes de la médecine traditionnelle japonaise.",
      icon: HeartPulse,
    },
  ];

  const faqItems = [
    {
      question: "Le Shiatsu est-il adapté à tout le monde ?",
      answer:
        "Oui, le Shiatsu est une technique douce adaptée à la plupart des personnes. Cependant, il est déconseillé en cas de fièvre, d'infections aiguës ou de problèmes de peau. N'hésitez pas à nous consulter en cas de doute.",
    },
    {
      question: "Comment se déroule une séance ?",
      answer:
        "La séance se déroule habillé, allongé sur un futon au sol. Le praticien exerce des pressions avec les paumes, les pouces et parfois les coudes, le long des méridiens d'acupuncture.",
    },
    {
      question: "Faut-il prévoir quelque chose de particulier ?",
      answer:
        "Prévoyez des vêtements souples et confortables. Évitez de manger juste avant la séance. Il est recommandé de boire de l'eau après le soin pour éliminer les toxines.",
    },
    {
      question: "À quelle fréquence peut-on recevoir un Shiatsu ?",
      answer:
        "Cela dépend de vos besoins. Pour un effet préventif, une séance par mois suffit. En cas de tensions importantes, une séance par semaine peut être bénéfique.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Titre avec mots-clés */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Soins Shiatsu à Angoulins
        </h1>

        {/* Section Hero avec images */}
        {wellnessImages.length > 0 && (
          <section
            className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg overflow-hidden shadow-xl"
            aria-labelledby="wellness-gallery"
          >
            <h2 id="wellness-gallery" className="sr-only">
              Galerie des soins Shiatsu
            </h2>
            {wellnessImages.map((img, index) => (
              <div key={index} className="relative w-full h-64 md:h-80">
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
        )}

        {/* Section Présentation avec balises sémantiques */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="presentation"
        >
          <h2
            id="presentation"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Détente et Harmonie par le Shiatsu
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              Pendant votre séjour à Angoulins, offrez-vous un{" "}
              <strong>moment de pure détente</strong> avec nos soins Shiatsu.
              Chaque séance est réalisée par un{" "}
              <strong>praticien qualifié</strong> et adaptée à vos besoins pour
              une expérience de bien-être <strong>personnalisée</strong>.
            </p>
            <p>
              Le Shiatsu, art traditionnel japonais, allie{" "}
              <strong>pressions douces</strong> et <strong>étirements</strong>
              pour libérer les tensions, améliorer la circulation énergétique et
              apporter une <strong>relaxation profonde</strong>.
            </p>
            <div className="mt-6 space-y-3">
              <p className="flex items-center text-blue-400 font-semibold">
                <LeafyGreen className="inline-block mr-2 text-2xl" /> Soins 100%
                naturels et non invasifs.
              </p>
              <p className="flex items-center text-blue-400 font-semibold">
                <CalendarCheck className="inline-block mr-2 text-2xl" /> Séances
                sur réservation (sous réserve de disponibilité).
              </p>
              <p className="flex items-center text-blue-400 font-semibold">
                <Info className="inline-block mr-2 text-2xl" /> Règlement en
                espèces ou chèque à la fin de la séance.
              </p>
              <p className="flex items-center text-blue-400 font-semibold">
                <Phone className="inline-block mr-2 text-2xl" />
                Contact : Christophe –{" "}
                <a href="tel:+33688648195" className="hover:underline">
                  06.88.64.81.95
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Section Bénéfices du Shiatsu */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="benefits"
        >
          <h2 id="benefits" className="text-3xl font-bold mb-6 text-[#FECD31]">
            Les Bienfaits du Shiatsu
          </h2>
          <p className="mb-6 text-lg">
            Le Shiatsu offre de nombreux bienfaits pour le corps et l&aspo;esprit :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="flex items-start p-4 border border-gray-600 rounded-lg bg-gray-800/30"
              >
                <benefit.icon className="w-6 h-6 mr-3 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Soins et Tarifs */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="services"
        >
          <h2 id="services" className="text-3xl font-bold mb-6 text-[#FECD31]">
            Nos Soins et Tarifs
          </h2>
          <p className="mb-6 text-lg">
            Choisissez le soin qui vous convient parmi nos prestations :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careServices.map((care, index) => (
              <div
                key={index}
                className="flex flex-col p-6 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md hover:shadow-lg transition-shadow"
              >
                <care.icon className="w-12 h-12 mb-4 text-[#FECD31] mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-center text-[#FECD31]">
                  {care.name}
                </h3>
                <p className="text-lg mb-1 text-center">{care.duration}</p>
                <p className="text-2xl font-bold text-blue-400 text-center mb-3">
                  {care.price}
                </p>
                <p className="text-sm text-gray-300 text-center">
                  {care.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-semibold">
            <Link href="/contact" className="text-blue-400 hover:underline">
              Contactez-nous pour réserver votre séance
            </Link>
          </p>
        </section>

        {/* Section "Qu'est-ce que le Shiatsu ?" */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="shiatsu-info"
        >
          <h2
            id="shiatsu-info"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Qu&apos;est-ce que le Shiatsu ?
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Hand className="w-8 h-8 mr-4 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg">
                  Le Shiatsu (指圧) est une{" "}
                  <strong>technique de massage japonaise</strong> qui signifie
                  &quot;pression des doigts&quot;. Il consiste à exercer des{" "}
                  <strong>pressions rythmées</strong> sur des points précis du
                  corps (méridiens d&apos;acupuncture) pour{" "}
                  <strong>stimuler l&apos;énergie vitale (Qi)</strong> et rétablir
                  l&apos;équilibre.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <HeartPulse className="w-8 h-8 mr-4 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg">
                  Reconnu pour ses vertus <strong>relaxantes</strong>, le
                  Shiatsu aide à :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                  <li>Réduire le stress et l&apos;anxiété</li>
                  <li>Améliorer la qualité du sommeil</li>
                  <li>Soulager les tensions musculaires et articulaires</li>
                  <li>Stimuler le système immunitaire</li>
                  <li>Favoriser la digestion</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="faq"
        >
          <h2 id="faq" className="text-3xl font-bold mb-6 text-[#FECD31]">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="p-4 border border-gray-600 rounded-lg bg-gray-800/30"
              >
                <summary className="font-semibold cursor-pointer text-lg">
                  {item.question}
                </summary>
                <p className="mt-2 text-gray-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Section Témoignages (optionnel - à remplir avec de vrais témoignages) */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="testimonials"
        >
          <h2
            id="testimonials"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Témoignages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-600 rounded-lg bg-gray-800/30">
              <p className="text-lg italic mb-4">
                &quot;Une expérience incroyable ! Le massage Shiatsu m&apos;a permis de me
                détendre comme jamais. Je recommande vivement.&quot;
              </p>
              <p className="font-semibold">— Sophie, 34 ans</p>
            </div>
            <div className="p-6 border border-gray-600 rounded-lg bg-gray-800/30">
              <p className="text-lg italic mb-4">
                &quot;Christophe est un praticien à l&apos;écoute et très professionnel.
                Le cadre est apaisant, parfait pour se ressourcer.&quot;
              </p>
              <p className="font-semibold">— Marc, 45 ans</p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#FECD31] text-[#0C1824] font-bold rounded-lg hover:bg-[#FFB01F] transition-colors text-xl"
            aria-label="Réserver un soin Shiatsu"
          >
            Réserver Votre Séance
          </Link>
          <p className="mt-4 text-lg">
            Ou appelez-nous au{" "}
            <a
              href="tel:+33688648195"
              className="text-blue-400 hover:underline"
            >
              06.88.64.81.95
            </a>
          </p>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Spa",
            name: "Soins Shiatsu à Angoulins",
            description:
              "Massages Shiatsu pour une détente profonde à Angoulins, près de La Rochelle.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Angoulins",
              addressRegion: "Charente-Maritime",
              postalCode: "17690",
              addressCountry: "FR",
            },
            telephone: "+33688648195",
            serviceType: [
              "Massage Shiatsu du visage",
              "Massage Shiatsu du dos",
              "Massage Shiatsu complet",
            ],
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/wellness`,
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
