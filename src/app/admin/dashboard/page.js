'use client';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Head from "next/head";
import { Shield } from "lucide-react";
import Calendrier from '../../components/Calendar'; // Assurez-vous que le chemin est correct

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
        
        <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12 flex flex-col items-center">
          <div className="w-full max-w-7xl px-4 md:px-8 mb-10">
            <div className="bg-[#14273A] p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-center text-center">
                <Shield className="mr-3 w-10 h-10 text-[#FECD31]" />
                <h1 className="text-3xl font-bold text-[#FECD31]">
                  Bienvenue, {session.user.email}
                </h1>
              </div>
              <p className="mt-4 text-lg text-gray-300 text-center">
                Ceci est votre tableau de bord de gestion des réservations.
              </p>
            </div>
          </div>

          <div className="w-full max-w-7xl px-4 md:px-8 mb-10">
            {/* Composant Calendrier qui occupe toute la largeur du conteneur */}
            <Calendrier />
          </div>

          <div className="w-full max-w-md px-4 md:px-8">
            <button
              onClick={() => signOut()}
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-bold rounded-md text-[#0C1824] bg-[#FECD31] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-colors duration-300"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
}
