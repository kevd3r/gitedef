/**
 * Composant LocationMapSection pour afficher une carte Google Maps.
 * Il est conçu pour être placé entre le contenu principal et le pied de page.
 */
const LocationMap = () => {
  return (
    // Conteneur principal de la section de la carte.
    // bg-[#0C1824] pour un fond sombre qui correspond à votre thème.
    // text-white pour un texte lisible sur ce fond.
    // py-12 pour le padding vertical.
    // px-[5vw] pour l'espacement latéral.
    // flex flex-col items-center pour centrer le contenu.
    <section className="bg-[#0C1824] text-white py-12 px-[5vw] flex flex-col items-center mb-8">
      {/* Titre de la section */}
      <h2 className="text-3xl font-bold text-center mb-8 text-[#FECD31]">
        Où nous situer
      </h2>
      <p className="text-lg text-center text-white max-w-2xl mb-8">
        Situés à Angoulins, village côtier idéalement localisé entre la ville
        historique de La Rochelle et la station balnéaiire de
        Chatelaillon-Plage, nous vous proposons un hébergement destiné à la
        location touristique ainsi que des soins de bien-être. Posez vos bagages
        en toute tranquilité le temps d&apos;une nuit ou plus, et profitez du charme
        des espaces naturels et du bord de mer. Angoulins-sur-mer a été élu
        premier village de France où il fait bon vivre en 2025 et ce pour la
        troisième année consécutive
      </p>

      {/* Conteneur pour la carte Google Maps responsive */}
      {/* w-full max-w-4xl limite la largeur de la carte sur les grands écrans. */}
      {/* `relative`, `h-0`, `overflow-hidden` et `pb-[75%] md:pb-[56.25%]` pour le ratio d'aspect responsive. */}
      <div className="w-full max-w-4xl relative h-0 pb-[75%] md:pb-[56.25%] overflow-hidden rounded-lg shadow-xl">
        <iframe
          // Nouvelle URL d'intégration simplifiée avec le paramètre 'q' pour l'adresse du gîte.
          // Cela permet à Google Maps d'afficher son marqueur rouge standard à cet endroit.
          // 'z=15' pour le niveau de zoom.
          src="https://maps.google.com/maps?q=28 Allée Adèle 17690 Angoulins, France&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute top-0 left-0 w-full h-full" // L'iframe remplit le conteneur
          title="Localisation du Gîte de la Plage d'Aytré"
        ></iframe>
      </div>
    </section>
  );
};

export default LocationMap;
