// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://escapadeangoulins.fr',
  generateRobotsTxt: true, // Génère aussi un robots.txt (optionnel si tu as déjà le tien)
  exclude: ['/admin', '/login'], // Exclut les pages privées
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/', '/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      // Ajoute ici d'autres sitemaps si besoin (ex: pour un blog)
    ],
  },
  // Configuration pour les pages statiques
  transform: async (config, path) => {
    // Ajoute des métadonnées spécifiques par page
    if (path === '/housing') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    if (path === '/wellness') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    if (path === '/booking' || path === '/contact') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
      
    }
    // Page d'accueil
    return {
      loc: path,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    };
  },
};
