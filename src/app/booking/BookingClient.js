// app/booking/BookingClient.js
"use client";
import { useState } from "react";
import { CalendarCheck, Info, BookOpenCheck, Clock } from "lucide-react";
import Calendar from "@/app/components/Calendar";
import DataFetcher from "../components/Datafetcher";
import BookingForm from "../components/BookingForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function BookingClient() {
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateSelectionChange = (startDate, endDate) => {
    setSelectedDates({ startDate, endDate });
  };

  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Titre optimisé pour le SEO local */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#FECD31]">
          Réservez Votre Hébergement à Angoulins
        </h1>

        {/* Section "Comment réserver" avec balises sémantiques */}
        <section
          className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16"
          aria-labelledby="how-to-book"
        >
          <h2
            id="how-to-book"
            className="text-3xl font-bold mb-6 text-[#FECD31]"
          >
            Comment réserver votre séjour ?
          </h2>
          <div className="space-y-4 text-lg">
            <p>
              Utilisez le calendrier ci-dessous pour vérifier la disponibilité
              et
              <strong> sélectionner vos dates d’arrivée et de départ</strong>.
              Une fois vos dates choisies, remplissez le formulaire pour nous
              envoyer votre demande.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-center text-blue-400 font-semibold">
                <CalendarCheck className="inline-block mr-2 text-2xl" />
                Sélectionnez vos dates sur le calendrier interactif.
              </li>
              <li className="flex items-center text-blue-400 font-semibold">
                <Clock className="inline-block mr-2 text-2xl" />
                <strong>Arrivée à partir de 16h</strong>,{" "}
                <strong>départ avant 12h</strong>.
              </li>
              <li className="flex items-center text-blue-400 font-semibold">
                <Info className="inline-block mr-2 text-2xl" />
                Les dates sélectionnées s’affichent automatiquement dans le
                formulaire.
              </li>
              <li className="flex items-center text-blue-400 font-semibold">
                <BookOpenCheck className="inline-block mr-2 text-2xl" />
                Confirmation sous 24h par email.
              </li>
            </ul>
          </div>
        </section>

        {/* Section interactive (calendrier + formulaire) */}
        <div className="w-4/5 mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="flex-1">
              <DataFetcher>
                {({ data }) => {
                  const validatedReservations = data.filter(
                    (res) => res.status === "VALIDATED"
                  );
                  return (
                    <Calendar
                      validatedReservations={validatedReservations}
                      onDateSelectionChange={handleDateSelectionChange}
                      aria-label="Calendrier de disponibilités pour la réservation"
                    />
                  );
                }}
              </DataFetcher>
            </div>
            <div className="flex-1">
              <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              >
                <BookingForm
                  startDate={selectedDates.startDate}
                  endDate={selectedDates.endDate}
                  aria-labelledby="how-to-book"
                />
              </GoogleReCaptchaProvider>
            </div>
          </div>
        </div>

        {/* Section FAQ pour le SEO (optionnel mais recommandé) */}
        <section className="mt-16 bg-[#14273A] p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-[#FECD31]">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            <details>
              <summary className="font-semibold cursor-pointer">
                Quelles sont les horaires d’arrivée et de départ ?
              </summary>
              <p className="mt-2">Arrivée à partir de 16h, départ avant 12h.</p>
            </details>
            <details>
              <summary className="font-semibold cursor-pointer">
                Comment annuler ou modifier ma réservation ?
              </summary>
              <p className="mt-2">
                Contactez-nous par email ou téléphone au moins 48h à l’avance.
              </p>
            </details>
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: "Havre de Paix à Angoulins",
            description:
              "Gîte et soins bien-être à Angoulins, près de La Rochelle.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Angoulins",
              addressRegion: "Charente-Maritime",
              postalCode: "17690",
              addressCountry: "FR",
            },
            telephone: "+33688648195", 
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/wellness`,
          }),
        }}
      />
    </div>
  );
}
