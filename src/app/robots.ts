import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/pick', '/result'],
    },
    sitemap: 'https://steam-game-picker.vercel.app/sitemap.xml',
  };
}
