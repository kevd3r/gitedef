// app/admin/reservations/edit/[id]/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const EditReservationPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    message: "",
    origin: "",
    status: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch(`/api/reservations/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch reservation");
        }
        const data = await res.json();
        // Remplir le formulaire avec les données existantes
        setForm({
          ...data,
          startDate: format(new Date(data.startDate), "yyyy-MM-dd"),
          endDate: format(new Date(data.endDate), "yyyy-MM-dd"),
        });
      } catch (err) {
        setError("Impossible de charger les données de la réservation.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReservation();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("Mise à jour en cours...");

    try {
      const payload = {
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
      };

      const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitMessage(
          "Réservation mise à jour avec succès ! Redirection..."
        );
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de la mise à jour.");
      }
    } catch (error) {
      setSubmitMessage(`Erreur : ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C1824] text-white pt-20 flex justify-center items-center">
        <p className="text-xl">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0C1824] text-white pt-20 flex justify-center items-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12 flex flex-col items-center">
      <Head>
        <title>Éditer une Réservation</title>
      </Head>

      <div className="w-full max-w-2xl px-4 md:px-8">
        <Link href="/admin">
          <button className="cursor-pointer flex items-center text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </button>
        </Link>
        <div className="bg-[#14273A] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-[#FECD31]">
            Éditer la réservation de {form.name}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nom"
              required
              className="bg-[#0C1824] p-3 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="bg-[#0C1824] p-3 rounded-md"
            />
            <input
              type="text"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              placeholder="Téléphone (optionnel)"
              className="bg-[#0C1824] p-3 rounded-md"
            />
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="bg-[#0C1824] p-3 rounded-md"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="bg-[#0C1824] p-3 rounded-md"
            />
            <select
              name="origin"
              value={form.origin}
              onChange={handleChange}
              className="bg-[#0C1824] p-3 rounded-md"
            >
              <option value="PRIVATE">Privé</option>
              <option value="AIRBNB">Airbnb</option>
            </select>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="bg-[#0C1824] p-3 rounded-md"
            >
              <option value="PENDING">En attente</option>
              <option value="VALIDATED">Validée</option>
              <option value="CANCELED">Annulée</option>
            </select>
            <textarea
              name="message"
              value={form.message || ""}
              onChange={handleChange}
              placeholder="Message (optionnel)"
              className="bg-[#0C1824] p-3 rounded-md col-span-1 md:col-span-2"
            ></textarea>

            <button
              type="submit"
              className="cursor-pointer col-span-1 md:col-span-2 bg-blue-500 text-white py-3 rounded-md font-bold hover:bg-blue-600 transition-colors"
            >
              Mettre à jour la réservation
            </button>
          </form>
          {submitMessage && <p className="mt-4 text-center">{submitMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditReservationPage;
