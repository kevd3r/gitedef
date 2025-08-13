import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutHeaderToggle from "./lib/LayoutMenuToggle";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gite Bien-Etre Angoulins",
  description: "votre cocon de bien-etre",
  icons: {
    icon: "/favicon.ico", // Assurez-vous que le chemin est correct
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutHeaderToggle />
        {children}
        <Footer />
      </body>
    </html>
  );
}
