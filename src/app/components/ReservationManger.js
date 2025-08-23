// app/components/ReservationManager.jsx
"use client";
import { useState } from "react";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  MessageSquare,
  ListFilter,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Plus,
  Pencil
} from "lucide-react";
import Link from "next/link";

const ReservationManager = ({ reservations, onReservationsChange }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (onReservationsChange) onReservationsChange(); // Demande au parent de rafraîchir les données
    } catch (error) {
      console.error("Failed to update reservation status", error);
      alert("Erreur lors de la mise à jour du statut.");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")
    ) {
      try {
        await fetch(`/api/reservations/${id}`, { method: "DELETE" });
        if (onReservationsChange) onReservationsChange(); // Demande au parent de rafraîchir les données
      } catch (error) {
        console.error("Failed to delete reservation", error);
        alert("Erreur lors de la suppression de la réservation.");
      }
    }
  };

  // Le reste du code reste inchangé, mais utilise `reservations` au lieu de l'état local
  const filteredReservations = reservations
    .filter((reservation) => {
      const matchesStatus =
        filterStatus === "all" || reservation.status === filterStatus;
      const matchesSearch =
        reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (reservation.message &&
          reservation.message
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const getStatusClasses = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-600";
      case "VALIDATED":
        return "bg-green-600";
      case "CANCELED":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "En attente";
      case "VALIDATED":
        return "Validée";
      case "CANCELED":
        return "Annulée";
      default:
        return "Inconnu";
    }
  };

  return (
    <section className="bg-[#14273A] p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#FECD31]">
          Gestion des Réservations
        </h2>
        <Link href="/admin/reservations/create">
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors curosr-pointer">
            <Plus className="w-5 h-5 mr-2" />
            Créer une réservation
          </button>
        </Link>
      </div>

      {/* Filtres et Recherche */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label
            htmlFor="search"
            className="block text-lg font-medium text-white mb-2"
          >
            Rechercher
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Rechercher par nom, email, message..."
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 md:flex-none">
          <label
            htmlFor="filterStatus"
            className="block text-lg font-medium text-white mb-2"
          >
            Filtrer par Statut
          </label>
          <div className="relative">
            <select
              id="filterStatus"
              className="w-full p-3 pr-10 bg-gray-800 border border-gray-700 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="VALIDATED">Validée</option>
              <option value="CANCELED">Annulée</option>
            </select>
            <ListFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Affichage des réservations */}
      {reservations.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">
          Aucune réservation trouvée.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            {/* ... Reste de votre code ... */}
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                  Début
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                  Fin
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                  Client
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                  Statut
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-t border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4 text-sm">
                    {format(new Date(reservation.startDate), "dd/MM/yyyy")}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {format(new Date(reservation.endDate), "dd/MM/yyyy")}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className="text-blue-400 hover:underline font-semibold cursor-pointer">
                      {reservation.name}
                    </span>
                    <p className="text-gray-400 text-xs flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {reservation.email}
                    </p>
                    {reservation.phone && (
                      <p className="text-gray-400 text-xs flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {reservation.phone}
                      </p>
                    )}
                    {reservation.message && (
                      <p className="text-gray-400 text-xs flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {reservation.message}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                        reservation.status
                      )}`}
                    >
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm flex space-x-2">
                    {reservation.status !== "VALIDATED" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(reservation.id, "VALIDATED")
                        }
                        className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                        title="Valider"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    {reservation.status !== "CANCELED" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(reservation.id, "CANCELED")
                        }
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                        title="Annuler"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    )}
                    <Link href={`/admin/reservations/edit/${reservation.id}`}>
                      <button
                        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        title="Éditer"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ReservationManager;