"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

// Cahaya lembut hijau-ungu (warna brand) yang interaktif di semua halaman.
// Desktop: mengikuti kursor dengan gerak halus.
// HP: muncul di titik jari menyentuh layar, ikut bergeser saat jari digeser,
//     lalu memudar setelah jari diangkat.
// Berada di belakang konten, jadi tidak menutupi teks/gambar.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let hideTimer = 0;

    // Gerak halus menuju posisi kursor/jari (hanya transform → ringan)
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const moveTo = (nx, ny, jump = false) => {
      tx = nx;
      ty = ny;
      if (jump) {
        x = nx;
        y = ny;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const show = () => {
      clearTimeout(hideTimer);
      el.classList.add(styles.on);
    };
    const hideSoon = (ms) => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => el.classList.remove(styles.on), ms);
    };

    // Desktop (mouse)
    const onMouseMove = (e) => {
      const first = !el.classList.contains(styles.on);
      moveTo(e.clientX, e.clientY, first);
      show();
    };
    const onMouseLeave = () => hideSoon(0);

    // HP (sentuhan)
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const first = e.type === "touchstart";
      el.classList.add(styles.touch);
      moveTo(t.clientX, t.clientY, first);
      show();
    };
    const onTouchEnd = () => hideSoon(500);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return <div ref={ref} className={styles.glow} aria-hidden="true" />;
}
