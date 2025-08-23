"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Shield, Home, CalendarCheck, Users, Moon, Sun } from "lucide-react";
import Calendar from "../../components/Calendar";
import ReservationManager from "@/app/components/ReservationManger";
import DataFetcher from "../../components/Datafetcher"; // Importez le nouveau composant
import { differenceInDays, isSameMonth, isSameYear, startOfMonth, endOfMonth, max, min } from 'date-fns';


export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0C1824] text-white flex items-center justify-center">
        <p className="text-xl">Chargement...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Tableau de bord Admin</title>
        </Head>
        <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12 flex flex-col items-center ">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl flex justify-center items-center mb-16">
            <Shield className="mr-3 w-10 h-10 text-[#FECD31]" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#FECD31]">
              Tableau de bord Admin
            </h1>
          </div>
          <section className="p-8 rounded-lg mb-16 max-w-7xl w-full px-4 md:px-8">
            <div className="bg-[#14273A] p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#FECD31] text-center">
                Bienvenue, Christophe.
              </h2>
              <p className="mt-4 text-lg text-gray-300 text-center">
                Ceci est votre tableau de bord de gestion des réservations.
              </p>
            </div>
          </section>

          <div className="w-full max-w-7xl px-4 md:px-8 mb-10">
            <h1 className="text-5xl font-bold mb-6 text-[#FECD31] text-center">
              Calendrier
            </h1>
            <div className="bg-[#0C1824] rounded-lg shadow-lg">
              <DataFetcher>
                {({ data, refreshData }) => {
                  const validatedReservations = data.filter(
                    (res) => res.status === "VALIDATED"
                  );
                  const pendingReservations = data.filter(
                    (res) => res.status === "PENDING"
                  );
                  const totalReservations = data.length;

                  // Calcul des nuitées du mois en cours
                  const currentMonth = new Date();
                  const firstDayOfMonth = startOfMonth(currentMonth);
                  const lastDayOfMonth = endOfMonth(currentMonth);

                  const totalNightsThisMonth = validatedReservations.reduce(
                    (total, res) => {
                      const startDate = new Date(res.startDate);
                      const endDate = new Date(res.endDate);

                      // Si la réservation ne chevauche pas du tout le mois en cours, on l'ignore
                      if (
                        endDate < firstDayOfMonth ||
                        startDate > lastDayOfMonth
                      ) {
                        return total;
                      }

                      // On détermine la date de début et de fin réelle pour le calcul dans le mois en cours
                      const effectiveStartDate = max([
                        startDate,
                        firstDayOfMonth,
                      ]);
                      const effectiveEndDate = min([endDate, lastDayOfMonth]);

                      const nights = differenceInDays(
                        effectiveEndDate,
                        effectiveStartDate
                      );
                      return total + nights;
                    },
                    0
                  );
                   // Nouveau calcul des nuitées de l'année en cours
                  const currentYear = new Date().getFullYear();
                  const totalNightsThisYear = validatedReservations.reduce((total, res) => {
                      const startDate = new Date(res.startDate);
                      const endDate = new Date(res.endDate);
                      
                      // On compte toutes les nuitées des réservations validées qui se déroulent dans l'année en cours
                      if (isSameYear(startDate, new Date()) || isSameYear(endDate, new Date())) {
                          return total + differenceInDays(endDate, startDate);
                      }
                      return total;
                  }, 0);
                  return (
                    <>
                      {/* Section Statistiques dynamiques */}
                      <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">
                          Statistiques Rapides
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                          <div className="bg-gray-800 p-6 rounded-lg">
                            <Home className="mx-auto w-10 h-10 text-blue-400 mb-2" />
                            <p className="text-xl font-semibold">
                              Total Réservations
                            </p>
                            <p className="text-3xl font-bold text-[#FECD31]">
                              {totalReservations}
                            </p>
                          </div>
                          <div className="bg-gray-800 p-6 rounded-lg">
                            <CalendarCheck className="mx-auto w-10 h-10 text-green-400 mb-2" />
                            <p className="text-xl font-semibold">Confirmées</p>
                            <p className="text-3xl font-bold text-green-400">
                              {validatedReservations.length}
                            </p>
                          </div>
                          <div className="bg-gray-800 p-6 rounded-lg">
                            <Users className="mx-auto w-10 h-10 text-yellow-400 mb-2" />
                            <p className="text-xl font-semibold">En Attente</p>
                            <p className="text-3xl font-bold text-yellow-400">
                              {pendingReservations.length}
                            </p>
                          </div>
                          {/* Nouvelle carte pour les nuitées du mois */}
                          <div className="bg-gray-800 p-6 rounded-lg">
                            <Moon className="mx-auto w-10 h-10 text-purple-400 mb-2" />
                            <p className="text-xl font-semibold">
                              Nuitées ce mois-ci
                            </p>
                            <p className="text-3xl font-bold text-purple-400">
                              {totalNightsThisMonth}
                            </p>
                          </div>
                          {/* Nouvelle carte pour les nuitées de l'année */}
                          <div className="bg-gray-800 p-6 rounded-lg">
                            <Sun className="mx-auto w-10 h-10 text-yellow-500 mb-2" />
                            <p className="text-xl font-semibold">Nuitées cette année</p>
                            <p className="text-3xl font-bold text-yellow-500">{totalNightsThisYear}</p>
                          </div>
                        </div>
                      </section>
                      <div className="w-full  mb-10">
                        {/* Le composant Calendar reçoit uniquement les réservations validées */}
                        <Calendar
                          validatedReservations={validatedReservations}
                        />
                      </div>

                      <div className="w-full ">
                        {/* Le composant ReservationManager reçoit toutes les données et la fonction pour les rafraîchir */}
                        <ReservationManager
                          reservations={data}
                          onReservationsChange={refreshData}
                        />
                      </div>
                    </>
                  );
                }}
              </DataFetcher>

              <div className="w-full max-w-md px-4 md:px-8 mt-6">
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-bold rounded-md text-[#0C1824] bg-[#FECD31] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-colors duration-300"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
