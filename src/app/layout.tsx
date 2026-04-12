import type { Metadata } from "next";
import { Inter, Roboto_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL("https://monadtour.co"),
  title: "Monad Tour Colombia 2026 | Hackathons MonadBlitz",
  description:
    "Recorre Colombia con Monad. Hackathons, workshops y comunidad blockchain en Cartagena, Barranquilla, Medellín y Bogotá.",
  keywords: [
    "Monad",
    "blockchain",
    "Colombia",
    "hackathon",
    "MonadBlitz",
    "EVM",
    "Web3",
    "crypto",
    "Medellín",
    "Bogotá",
    "developers",
    "smart contracts",
  ],
  authors: [{ name: "Monad Foundation" }],
  creator: "Monad Foundation",
  publisher: "Monad Foundation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Monad Tour Colombia 2026 | Hackathons MonadBlitz",
    description:
      "Recorre Colombia con Monad. Hackathons, workshops y comunidad blockchain en Cartagena, Barranquilla, Medellín y Bogotá.",
    type: "website",
    locale: "es_CO",
    url: "https://monadtour.co",
    siteName: "Monad Tour Colombia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monad Tour Colombia 2026 | Hackathons MonadBlitz",
    description:
      "Recorre Colombia con Monad. Hackathons, workshops y comunidad blockchain en Cartagena, Barranquilla, Medellín y Bogotá.",
    creator: "@monad_xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body
        className={`${inter.variable} ${robotoMono.variable} ${spaceGrotesk.variable} ${inter.className} min-h-full flex flex-col noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
