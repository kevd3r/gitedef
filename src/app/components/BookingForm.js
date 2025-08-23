// app/components/BookingForm.js
"use client";
import { useState } from "react";
import { User, Mail, Phone, MessageSquare, ArrowRight } from "lucide-react";

const BookingForm = ({ startDate, endDate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("pending");

    if (!startDate || !endDate) {
      setStatus("error: dates");
      return;
    }

    const reservationData = {
      ...formData,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      const res = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await res.json();
        setStatus("error");
        console.error("Erreur de l'API :", errorData.error);
      }
    } catch (err) {
      setStatus("error");
      console.error("Erreur réseau :", err);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    startDate &&
    endDate &&
    status !== "pending";

  return (
    <section id="formulaire" className="bg-[#14273A] p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#FECD31] text-center">
        Formulaire de Demande
      </h2>

      {startDate && endDate ? (
        <div className="bg-blue-600 p-4 rounded-lg text-white mb-6">
          <p className="font-bold">Dates choisies :</p>
          <p>Arrivée : {startDate.toLocaleDateString("fr-FR")}</p>
          <p>Départ : {endDate.toLocaleDateString("fr-FR")}</p>
          <p className="text-sm mt-2">
            Remplissez le formulaire ci-dessous pour nous envoyer votre demande.
          </p>
        </div>
      ) : (
        <div className="bg-[#FECD31] p-4 rounded-lg text-black mb-6">
          <p>
            <strong>
              Veuillez sélectionner vos dates d&apos;arrivée et de départ sur le
              calendrier.
            </strong>
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="bg-green-600 p-4 rounded-lg text-white mb-6">
          <p className="font-bold">
            ✅ Votre demande de réservation a bien été envoyée !
          </p>
          <p className="text-sm">
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-600 p-4 rounded-lg text-white mb-6">
          <p className="font-bold">❌ Une erreur est survenue.</p>
          <p className="text-sm">
            Veuillez réessayer ou nous contacter directement.
          </p>
        </div>
      )}
      {status === "error: dates" && (
        <div className="bg-red-600 p-4 rounded-lg text-white mb-6">
          <p className="font-bold">
            ❌ Veuillez sélectionner des dates valides.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre Nom Complet"
            required
            className="w-full bg-[#0C1824] p-4 pl-12 rounded-lg border border-transparent focus:border-[#FECD31] focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre Email"
            required
            className="w-full bg-[#0C1824] p-4 pl-12 rounded-lg border border-transparent focus:border-[#FECD31] focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Votre Téléphone (optionnel)"
            className="w-full bg-[#0C1824] p-4 pl-12 rounded-lg border border-transparent focus:border-[#FECD31] focus:outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-4 text-gray-400" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message (nombre de personnes, demandes spéciales, etc.)"
            rows="5"
            className="w-full bg-[#0C1824] p-4 pl-12 rounded-lg border border-transparent focus:border-[#FECD31] focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full p-4 rounded-lg text-[#0C1824] font-bold text-lg flex items-center justify-center space-x-2 transition-colors ${
            isFormValid
              ? "bg-[#FECD31] hover:bg-[#E9B92A]"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          {status === "pending" ? (
            <span>Envoi en cours...</span>
          ) : (
            <>
              <span>Envoyer ma demande</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
