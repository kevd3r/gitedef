'use client'
import { CalendarCheck, Info, User, Mail, Phone, MessageSquare, Home, ArrowRight, BookOpenCheck, Clock } from "lucide-react";
import Link from "next/link";
import Head from "next/head"; 

const Booking = () => {
  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <Head>
        <title>Réservation Hébergement - Votre Hébergement</title>
        <meta name="description" content="Réservez votre hébergement directement avec notre calendrier interactif." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 md:px-8 max_w-7xl">

        {/* Section Titre */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Réservez Votre Hébergement
        </h1>

        {/* Section Présentation et Informations */}
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">Comment réserver votre séjour ?</h2>
          <div className="space-y-4 text-lg text-white">
            <p>
              Utilisez le calendrier ci-dessous pour vérifier la disponibilité et **sélectionner vos dates d&apos;arrivée et de départ** en cliquant et glissant.
              Une fois vos dates choisies, remplissez le formulaire pour nous envoyer votre demande de réservation.
            </p>
            <p className="flex items-center text-blue-400 font-semibold mt-6">
              <CalendarCheck className="inline-block mr-2 text-2xl" /> Sélectionnez vos dates d&apos;arrivée et de départ sur le calendrier.
            </p>
            <p className="flex items-center text-blue-400 font-semibold">
              <Clock className="inline-block mr-2 text-2xl" /> **Arrivée à partir de 16h**, **Départ avant 12h**.
            </p>
            <p className="flex items-center text-blue-400 font-semibold">
              <Info className="inline-block mr-2 text-2xl" /> Les dates sélectionnées apparaîtront automatiquement dans le formulaire.
            </p>
            <p className="flex items-center text-blue-400 font-semibold">
              <BookOpenCheck className="inline-block mr-2 text-2xl" /> Nous vous confirmerons la réservation dans les plus brefs délais.
            </p>
          </div>
        </section>
        </div>
    </div>
  )
}

export default Booking