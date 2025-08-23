// app/contact/ContactClient.js
"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactForm from "../components/ContactForm";

export default function ContactClient() {
  const [obfuscated, setObfuscated] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Titre optimisé avec mots-clés locaux */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Nous Contacter
        </h1>

        {/* Section "Informations de contact" avec balises sémantiques */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="contact-info"
        >
          <h2
            id="contact-info"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Nos Coordonnées
          </h2>
          <div className="space-y-6 text-lg">
            <address className="not-italic space-y-4">
              <p className="flex items-start">
                <Mail className="inline-block mr-3 text-2xl text-blue-400 mt-1" />
                <a
                  href={`mailto:${process.env.EMAIL_USER}`}
                  className="hover:underline"
                >
                  contact@escapadesangoulins.fr
                </a>
              </p>
              <p className="flex items-start">
                <Phone className="inline-block mr-3 text-2xl text-blue-400 mt-1" />
                {!obfuscated ? (
                  <span className="flex items-center gap-2">
                    <span className="font-mono">06.88.**.**.95</span>
                    <button
                      onClick={() => setObfuscated(true)}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
                      aria-label="Afficher le numéro de téléphone"
                    >
                      Révéler
                    </button>
                  </span>
                ) : (
                  <a
                    href="tel:+33688648195"
                    className="hover:underline font-mono"
                    aria-label="Téléphone : 06.88.64.81.95"
                  >
                    06.88.64.81.95
                  </a>
                )}
                <span className="ml-2 text-sm">(Christophe)</span>
              </p>
              <p className="flex items-start">
                <MapPin className="inline-block mr-3 text-2xl text-blue-400 mt-1" />
                <span>
                  12 Rue des Carrelets,
                  <br />
                  17690 Angoulins,
                  <br />
                  <span className="text-sm">
                    près de La Rochelle, Charente-Maritime
                  </span>
                </span>
              </p>
              <p className="flex items-start">
                <Clock className="inline-block mr-3 text-2xl text-blue-400 mt-1" />
                <span>
                  Ouvert tous les jours de 9h à 19h
                  <br />
                  <span className="text-sm">
                    Réponse sous 24h (sauf dimanches)
                  </span>
                </span>
              </p>
            </address>
            <p className="mt-4">
              Nous sommes à votre disposition pour toute question sur nos
              hébergements, nos soins bien-être ou pour vous aider à planifier
              votre séjour.
              <strong> Réponse garantie sous 24h</strong> (hors dimanches).
            </p>
          </div>
        </section>

        {/* Section "Formulaire de contact" */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg"
          aria-labelledby="contact-form"
        >
          <h2
            id="contact-form"
            className="text-3xl font-bold mb-6 text-[#FECD31] text-center"
          >
            Envoyez-nous un Message
          </h2>
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          >
            <ContactForm />
          </GoogleReCaptchaProvider>
        </section>

        {/* Section FAQ pour le SEO (optionnel) */}
        <section
          className="mt-16 bg-[#14273A] p-8 rounded-lg"
          aria-labelledby="faq"
        >
          <h2 id="faq" className="text-2xl font-bold mb-6 text-[#FECD31]">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            <details>
              <summary className="font-semibold cursor-pointer">
                Quels sont vos horaires d’ouverture ?
              </summary>
              <p className="mt-2">
                Nous sommes joignables par email 24h/24. Pour les appels
                téléphoniques, nos horaires sont de 9h à 19h, du lundi au
                samedi.
              </p>
            </details>
            <details>
              <summary className="font-semibold cursor-pointer">
                Comment modifier ou annuler une réservation ?
              </summary>
              <p className="mt-2">
                Contactez-nous par email ou téléphone au moins 48h avant votre
                arrivée. Les annulations sont gratuites jusqu’à 7 jours avant le
                séjour.
              </p>
            </details>
            <details>
              <summary className="font-semibold cursor-pointer">
                Proposez-vous des soins bien-être pour les enfants ?
              </summary>
              <p className="mt-2">
                Nos soins sont adaptés aux adultes, mais nous proposons des
                activités relaxantes pour les familles (ex: balades en bord de
                mer).
              </p>
            </details>
          </div>
        </section>

        {/* Section "Comment nous trouver" avec carte (optionnel) */}
        <section
          className="mt-16 bg-[#14273A] p-8 rounded-lg text-center"
          aria-labelledby="location"
        >
          <h2 id="location" className="text-2xl font-bold mb-6 text-[#FECD31]">
            Comment nous Trouver ?
          </h2>
          <p className="mb-4">
            Nous sommes situés à Angoulins, à 10 minutes de La Rochelle, en bord
            de mer. Accès facile depuis l’autoroute A837.
          </p>
          {/* Intègre ici une carte Google Maps ou un lien vers Google Maps */}
          <a
            href="https://www.google.com/maps?daddr=12+Rue+des+Carrelets,17690+Angoulins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#FECD31] text-[#0C1824] font-semibold rounded-lg hover:bg-[#FFB01F] transition-colors"
          >
            Ouvrir dans Google Maps
          </a>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: "Havre de Paix",
            description:
              "Gîte et soins bien-être à Angoulins, près de La Rochelle.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "12 Rue des Carrelets",
              addressLocality: "Angoulins",
              postalCode: "17690",
              addressRegion: "Charente-Maritime",
              addressCountry: "FR",
            },
            telephone: "+33688648195",
            email: "contact@havre-de-paix-angoulins.fr",
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
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
          }),
        }}
      />
    </div>
  );
}
