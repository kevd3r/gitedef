// src/app/contact/page.jsx

"use client";
import React, { useState } from "react";
import Head from "next/head";
import { Mail, Phone, MapPin } from "lucide-react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactForm from "../components/ContactForm"; // Assurez-vous que le chemin est correct

const Contact = () => {
  const [obfuscated, setObfuscated] = useState(false);

  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <Head>
        <title>Contactez-nous - Votre Hébergement</title>
        <meta
          name="description"
          content="Contactez-nous pour toute demande d'information, réservation ou question sur nos services et soins bien-être."
        />
        <link rel="icon" href="../favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Contactez-nous
        </h1>

        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">
            Informations de contact
          </h2>
          <div className="space-y-4 text-lg text-white">
            <p className="flex items-center">
              <Mail className="inline-block mr-3 text-2xl text-blue-400" />{" "}
              Email :{" "}
              <a
                href="mailto:votre.email@example.com"
                className="hover:underline ml-2"
              >
                votre.email@example.com
              </a>
            </p>
            <p className="flex items-center">
              <Phone className="inline-block mr-3 text-2xl text-blue-400" />{" "}
              Téléphone :
              {!obfuscated ? (
                <span className="ml-2 flex items-center gap-2">
                  <span className="font-mono">06.88.**.**.95</span>
                  <button
                    onClick={() => setObfuscated(true)}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200 transition-colors"
                  >
                    Révéler
                  </button>
                </span>
              ) : (
                <a
                  href="tel:+33688648195"
                  className="hover:underline ml-2 font-mono"
                >
                  06.88.64.81.95
                </a>
              )}{" "}
              (Christophe)
            </p>
            <p className="flex items-center">
              <MapPin className="inline-block mr-3 text-2xl text-blue-400" />{" "}
              Adresse : Votre adresse ici, Ville, Code Postal
            </p>
            <p className="mt-6">
              N&apos;hésitez pas à nous contacter pour toute question, demande
              d&apos;information ou pour planifier votre séjour et vos soins.
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        </section>

        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        >
          <ContactForm />
        </GoogleReCaptchaProvider>
      </div>
    </div>
  );
};

export default Contact;
