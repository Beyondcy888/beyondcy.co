"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// Login page - not connected yet. Will be linked in a later update.
// (loginHref is commented out in lib/site.js, together with the two Login links below.)
import { navLinks, asset, pageHref /* , loginHref */ } from "@/lib/site";
import styles from "./Navbar.module.css";

// prefetch: passed on to the links. Only the 404 page sets it (to false); everywhere else Next.js decides.
export default function Navbar({ prefetch }) {
  // The site is exported with trailingSlash ("/about/"), the menu uses "/about": compare without the last "/".
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const [open, setOpen] = useState(false);

  // Tutup menu ponsel setiap kali pindah halaman.
  useEffect(() => setOpen(false), [pathname]);

  // Sudah digulir? → tampilkan gradasi di belakang navbar.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu dengan tombol Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Ponsel: lapisan kaca di belakang menu yang terbuka (sesuai NAVBAR.png) */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />}

      {/* Gradasi gelap di belakang navbar: konten yang digulir menghilang halus
          sebelum sampai ke atas layar (tidak terlihat di atas navbar). */}
      <div className={`${styles.topFade} ${scrolled ? styles.topFadeOn : ""}`} aria-hidden="true" />

      <header className={styles.nav}>
        <Link href="/" prefetch={prefetch} className={styles.logo} aria-label="Beyondcy - Home">
          <Image src={asset("/brand/logo-wordmark.png")} alt="Beyondcy" width={733} height={156} priority />
        </Link>

        <nav className={styles.links} aria-label="Menu utama">
          {navLinks.map((l) => (
            <Link key={l.href} href={pageHref(l.href)} prefetch={prefetch} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Login page - not connected yet. Will be linked in a later update.
        <Link href={loginHref} className={`${styles.login} ${styles.loginDesktop}`}>
          Login
        </Link>
        */}

        <button
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </header>

      {open && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Menu ponsel">
          {navLinks.map((l) => (
            <Link key={l.href} href={pageHref(l.href)} prefetch={prefetch} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          {/* Login page - not connected yet. Will be linked in a later update.
          <Link href={loginHref} className={`${styles.login} ${styles.loginMobile}`}>
            Login
          </Link>
          */}
        </nav>
      )}
    </>
  );
}
