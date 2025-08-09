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

  const socialLinks = [
    // Remplacé les chemins locaux d'icônes par des placeholders ou des icônes SVG/emoji si possible
    {
      name: "Facebook",
      icon: "https://placehold.co/24x24/FFFFFF/000000?text=FB",
      href: "#",
      alt: "Icône Facebook",
    },
    {
      name: "Instagram",
      icon: "https://placehold.co/24x24/FFFFFF/000000?text=IG",
      href: "#",
      alt: "Icône Instagram",
    },
    {
      name: "Twitter",
      icon: "https://placehold.co/24x24/FFFFFF/000000?text=TW",
      href: "#",
      alt: "Icône Twitter",
    },
    // Si vous préférez des icônes SVG inline (sans besoin de fichiers externes):
    // Exemple pour Facebook (vous pouvez trouver les chemins SVG en ligne pour d'autres)
    // { name: "Facebook", icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3 8h-2v4h2v2h-2v4h-3v-4H8V10h1.5l.5-2h2.5l.5 2H15z"/></svg>', href: "#", alt: "Icône Facebook" },
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
          &copy; {new Date().getFullYear()} Votre Nom de Site. Tous droits
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
          123 Rue de l&apos;Exemple
          <br />
          75000 Paris, France
          <br />
          contact@votresite.com
          <br />
          +33 1 23 45 67 89
        </p>
        <div className="flex space-x-4 mt-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              {/* Remplacé Image par <img> avec un placeholder */}
              <img
                src={social.icon}
                alt={social.alt}
                width={24} // Taille des icônes sociales
                height={24}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
