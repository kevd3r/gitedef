"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Head from "next/head"; // Note: Le composant Head de Next.js est obsolète dans l'App Router

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    // Conteneur principal avec le même fond que les autres pages
    <div className="min-h-screen bg-[#0C1824] text-white flex items-center justify-center pt-20 pb-12">
      {/* Conteneur du formulaire avec le style des sections de la page wellness */}
      <div className="w-full max-w-md p-8 space-y-8 bg-[#14273A] rounded-lg shadow-lg">
        {/* Titre avec la couleur d'accent */}
        <h2 className="text-2xl font-bold text-center text-[#FECD31]">
          Connexion Admin
        </h2>
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full p-3 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full p-3 bg-gray-800 border border-gray-700 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-bold rounded-md text-[#0C1824] bg-[#FECD31] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-colors duration-300 cursor-pointer"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}