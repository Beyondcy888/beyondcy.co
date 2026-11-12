import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Font utama (judul & teks) — terlihat seperti Plus Jakarta Sans di desain.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Font menu & tombol (navbar, tombol Login) — terlihat seperti Inter di desain.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  // siteUrl follows the base path (lib/site.js): the github.io address now, https://beyondcy.co later.
  // Each page adds its own canonical link and og:url with pageLinks() from lib/site.js.
  metadataBase: new URL(siteUrl),
  title: "Beyondcy",
  description:
    "A creative agency built on one simple belief, every brand has a purpose that deserves to be amplified.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Menandai bahwa JavaScript aktif → animasi "muncul saat digulir" dipakai */}
        {/* Jika setelah 5 detik animasi belum siap (JS gagal), tampilkan semua konten. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.add('reveal-fallback')},5000)",
          }}
        />
      </head>
      <body>
        {/* Cahaya interaktif: ikut kursor (desktop) / sentuhan jari (HP), di semua halaman */}
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
