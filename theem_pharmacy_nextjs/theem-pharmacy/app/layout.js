import { Poppins, Montserrat, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorAnimation from "@/components/CursorAnimation";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig, generateStructuredData } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: 'swap',
  preload: false,
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.social.twitter,
    site: siteConfig.social.twitter,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: 'Education',
  classification: 'Business',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

import { db } from "@/lib/db";
import { navigationItems } from "@/lib/db/schema";

async function getNavigationData() {
  try {
    const items = await db.query.navigationItems.findMany({
      where: (table, { eq }) => eq(table.isActive, true),
      orderBy: (table, { asc }) => [asc(table.order), asc(table.id)],
    });

    const byId = new Map();
    const roots = [];

    for (const item of items) {
      byId.set(item.id, { ...item, children: [] });
    }

    for (const item of items) {
      const current = byId.get(item.id);
      if (!item.parentId || !byId.has(item.parentId)) {
        roots.push(current);
      } else {
        byId.get(item.parentId).children.push(current);
      }
    }

    const sortByOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);
    const sortRecursive = (nodes) => {
      nodes.sort(sortByOrder);
      for (const node of nodes) {
        sortRecursive(node.children);
      }
    };

    sortRecursive(roots);
    return roots;
  } catch (error) {
    console.error("Layout: Error fetching navigation:", error);
    return [];
  }
}

export default async function RootLayout({ children }) {
  const [navData, structuredData] = await Promise.all([
    getNavigationData(),
    Promise.resolve(generateStructuredData('organization'))
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <meta name="theme-color" content="#223975" />
        <meta name="application-name" content={siteConfig.shortName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.shortName} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="contact" content={siteConfig.contact.email} />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Boisar, Maharashtra" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${playfair.variable} antialiased font-poppins`}
        suppressHydrationWarning
      >
        <div className="cursor" id="cursor"></div>
        <div className="cursor-follower" id="cursor-follower"></div>
        <CursorAnimation />
        <Header initialNavItems={navData} />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />

        {/* Performance optimization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  fetch('/sw.js', { method: 'HEAD' })
                    .then((response) => {
                      if (!response.ok) {
                        return;
                      }

                      return navigator.serviceWorker.register('/sw.js');
                    })
                    .catch(() => {
                      // Ignore missing service worker in environments where sw.js is not configured.
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
