"use client";

import { useEffect, useRef, useState } from "react";

// Membungkus elemen supaya muncul halus saat terlihat di layar (sekali saja).
// variant: "up" | "blur" | "scale" | "sweep" | "words" | "line"  (lihat app/globals.css)
// delay: jeda dalam detik.
export default function Reveal({ as: Tag = "div", variant = "up", delay = 0, className, style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.__revealReady = true; // JS berjalan normal → pengaman tidak perlu aktif
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    // Elemen tanpa kotak sendiri (mis. display: contents di HP) → pantau induknya.
    const target = el.getClientRects().length === 0 && el.parentElement ? el.parentElement : el;
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={visible ? "" : undefined}
      className={className}
      style={{ ...style, "--delay": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Memecah teks menjadi kata-kata untuk variant="words".
export function Words({ text }) {
  return text.split(" ").map((word, i, arr) => (
    <span key={i}>
      <span className="word" style={{ "--i": i }}>
        {word}
      </span>
      {i < arr.length - 1 ? " " : null}
    </span>
  ));
}
