// Les imports de 'next/link' et 'next/image' ont été remplacés par des balises HTML standards
// et des placeholders pour assurer la compilation dans cet environnement.
// Dans une application Next.js réelle, vous utiliseriez les imports originaux.

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const menuLinks = [
    { title: "Accueil", href: "/" },
    { title: "Hébergement", href: "/housing" },
    { title: "Soins Bien-Être", href: "/wellness" },
    { title: "Réservations", href: "/booking" },
    { title: "Contact", href: "/contact" },
  ];



  return (
    // Conteneur principal du pied de page.
    // Utilise votre couleur personnalisée comme fond.
    // `text-gray-300` pour un texte clair sur fond sombre.
    // `py-12 px-[5vw]` pour le padding vertical et l'espacement latéral.
    // `flex flex-col items-center` pour centrer le contenu sur mobile.
    // `md:flex-row md:justify-between` pour aligner les sections sur desktop.
    <footer className="bg-[#0C1824] text-gray-300 py-12 px-[5vw] flex flex-col items-center md:flex-row md:justify-between gap-8">
      {/* Section Logo et Copyright */}
      <div className="flex flex-col items-center md:items-start gap-4">
        {/* Remplacé Link par <a> et Image par <img> avec un placeholder */}
        <Link href="/">
          <Image
            src="/images/logo/logo.svg" // Placeholder pour le logo
            alt="Logo du site"
            width={80}
            height={80}
            className="rounded-full" // Si vous voulez que votre logo soit rond
          />
        </Link>
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} www.escapadeangoulins.fr. Tous droits
          réservés.
        </p>
      </div>

      {/* Section Liens de Navigation */}
      <div className="flex flex-col items-center md:items-start gap-4">
        <h3 className="text-xl font-semibold text-white mb-2">Navigation</h3>
        <ul className="flex flex-col items-center md:items-start gap-2">
          {menuLinks.map((item) => (
            <li key={item.title}>
              
              <Link
                href={item.href}
                className="hover:text-white transition-colors duration-200"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Section Contact et Médias Sociaux */}
      <div className="flex flex-col items-center md:items-start gap-4">
        <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
        <p className="text-center md:text-left">
          28 Allée Adèle
          <br />
          17690 Angoulins, 
     
          <br />
          <a
                  href={`mailto:${process.env.EMAIL_USER}`}
                  className="hover:underline"
                >
                  {process.env.EMAIL_USER}
                </a>
          
          <br />
          +33 6 88 64 81 95
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
