"use client"; // Indique que ce composant est un Client Component

import { usePathname } from 'next/navigation'; // Importe le hook pour obtenir le chemin actuel
import Header from '../components/Header'; // Assurez-vous que le chemin d'importation de votre Header est correct

/**
 * Composant wrapper pour le Header.
 * Il affiche le Header uniquement si le chemin actuel n'est PAS la page d'accueil ('/').
 */
export default function LayoutHeaderToggle() {
  const pathname = usePathname(); // Récupère le chemin d'accès de l'URL actuelle

  // Si le chemin est '/', nous ne rendons rien (le Header est masqué).
  if (pathname === '/') {
    return null;
  }

  // Pour toutes les autres pages, nous rendons le composant Header.
  return <Header />;
}