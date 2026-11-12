"use client";

import { useEffect, useRef, useState } from "react";
import ScrollArrow from "./ScrollArrow";
import styles from "./AboutVideo.module.css";

// Video hero About.
// Desktop memakai video horizontal, ponsel memakai video vertikal (sesuai desain mobile).
// Diputar otomatis, tanpa suara, berulang, tanpa kontrol — seperti latar.
// nextId: id section berikutnya, tujuan panah "gulir ke bawah".
export default function AboutVideo({ video, nextId }) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Muat ulang video saat sumber berganti (mis. ponsel diputar / jendela diubah).
  useEffect(() => {
    if (isMobile === null || !ref.current) return;
    ref.current.load();
    ref.current.play().catch(() => {});
  }, [isMobile]);

  const src = isMobile ? video.mobile : video.desktop;
  const poster = isMobile ? video.mobilePoster : video.desktopPoster;

  return (
    <section className={styles.hero} aria-label="Video Beyondcy">
      {isMobile !== null && (
        <video
          ref={ref}
          className={styles.video}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}
      {/* Panah supaya pengunjung tahu halaman bisa digulir */}
      {nextId && <ScrollArrow href={`#${nextId}`} delay={1.2} />}
    </section>
  );
}
