"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Orbit.module.css";

// Garis orbit Home versi animasi.
// Bentuk ketiga ellips DIUKUR dari aset asli public/home/orbit.png
// (pusat, jari-jari, dan sudut sama persis), lalu digambar ulang sebagai SVG
// supaya bisa dianimasikan:
//   1. garis "tergambar" saat bagian ini terlihat,
//   2. tiap orbit berayun pelan dengan ritme berbeda,
//   3. SATU cahaya per orbit terus memutar penuh (posisinya dihitung tiap frame
//      dengan requestAnimationFrame — sengaja TIDAK memakai stroke-dasharray +
//      pathLength karena Safari iPhone menggambarnya berbeda/berulang),
//   4. seluruh sistem orbit berputar sedikit mengikuti scroll.
// Pengguna dengan pengaturan "kurangi gerakan" melihat garis diam.
// Tata letak HP (orbit + label) ada di app/(site)/home.module.css bagian ponsel.

// speed = detik untuk satu putaran penuh cahaya mengelilingi orbit
const RINGS = [
  { id: "inner", cx: 296.6, cy: 757.7, rx: 595.5, ry: 277.5, speed: 9, sway: 13 },
  { id: "middle", cx: 445.0, cy: 696.5, rx: 756.2, ry: 351.0, speed: 11, sway: 17 },
  { id: "outer", cx: 594.3, cy: 636.1, rx: 917.4, ry: 426.7, speed: 13, sway: 21 },
];
const ANGLE = 157.32;

// Bagian lengkungan yang terlihat → 88% waktu putaran; sisanya (di luar layar) dilewati cepat.
const VISIBLE_TIME = 0.88;

// Lintasan cahaya: SATU PUTARAN PENUH ellips. Dimulai dari ujung bawah bagian yang
// terlihat → naik melewati "hidung" orbit → kiri atas → terus memutar di luar layar
// → kembali ke awal. Mengembalikan d (path) dan f (porsi lengkungan yang terlihat).
const VISIBLE = { x0: -20, x1: 1620, y0: -20, y1: 905 };
const cometPath = ({ cx, cy, rx, ry }) => {
  const a = (ANGLE * Math.PI) / 180;
  const pt = (t) => [
    cx + rx * Math.cos(t) * Math.cos(a) - ry * Math.sin(t) * Math.sin(a),
    cy + rx * Math.cos(t) * Math.sin(a) + ry * Math.sin(t) * Math.cos(a),
  ];
  const inside = ([x, y]) => x >= VISIBLE.x0 && x <= VISIBLE.x1 && y >= VISIBLE.y0 && y <= VISIBLE.y1;
  const N = 720;
  // titik paling kanan ("hidung") pasti terlihat → telusuri ke dua arah sampai keluar
  let nose = 0;
  for (let i = 1; i < N; i++) if (pt((i / N) * 2 * Math.PI)[0] > pt((nose / N) * 2 * Math.PI)[0]) nose = i;
  let lo = nose;
  while (inside(pt(((lo - 1) / N) * 2 * Math.PI)) && nose - lo < N) lo--;
  let hi = nose;
  while (inside(pt(((hi + 1) / N) * 2 * Math.PI)) && hi - nose < N) hi++;
  // mulai dari ujung yang di bawah (y lebih besar), lalu memutar penuh ke arah lengkungan
  const P = (i) => pt((i / N) * 2 * Math.PI);
  const forward = P(lo)[1] >= P(hi)[1];
  const pts = [];
  for (let k = 0; k < N; k++) pts.push(P(forward ? lo + k : hi - k));
  return { pts, f: (hi - lo) / N };
};
const COMETS = RINGS.map(cometPath);

// Titik di lintasan pada posisi q (0..1 satu putaran), dengan interpolasi halus.
const pointAt = (pts, q) => {
  const n = pts.length;
  const x = (((q % 1) + 1) % 1) * n;
  const i = Math.floor(x);
  const t = x - i;
  const a = pts[i % n];
  const b = pts[(i + 1) % n];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
};

// Garis ekor dari posisi (head - panjang) sampai head.
const tailPath = (pts, head, len) => {
  const n = pts.length;
  const steps = Math.max(2, Math.ceil(len * n));
  let d = "";
  for (let s = 0; s <= steps; s++) {
    const [x, y] = pointAt(pts, head - len + (len * s) / steps);
    d += `${s ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
};

// Ekor cahaya: beberapa garis pendek bertumpuk, makin ke depan makin terang.
// Lapisan pertama (lebar & samar) berfungsi sebagai pendar/glow — tanpa filter
// SVG yang berat, jadi tetap mulus di HP.
const TAIL = [
  { len: 14, width: 10, opacity: 0.12 },
  { len: 140, width: 1.3, opacity: 0.16 },
  { len: 60, width: 1.9, opacity: 0.35 },
  { len: 22, width: 2.6, opacity: 0.7 },
  { len: 9, width: 3.4, opacity: 1 },
];

// Ellips yang sudah diputar ANGLE derajat, ditulis langsung sebagai path
// (tanpa atribut transform) supaya gradasi warna tetap di posisi aslinya.
const ellipsePath = ({ cx, cy, rx, ry }) => {
  const t = (ANGLE * Math.PI) / 180;
  const x1 = (cx - rx * Math.cos(t)).toFixed(2);
  const y1 = (cy - rx * Math.sin(t)).toFixed(2);
  const x2 = (cx + rx * Math.cos(t)).toFixed(2);
  const y2 = (cy + rx * Math.sin(t)).toFixed(2);
  return `M ${x1} ${y1} A ${rx} ${ry} ${ANGLE} 1 0 ${x2} ${y2} A ${rx} ${ry} ${ANGLE} 1 0 ${x1} ${y1}`;
};

export default function Orbit({ className = "" }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false); // sekali tergambar, tetap tergambar
  const [inView, setInView] = useState(false); // animasi jalan hanya saat terlihat
  const [ready, setReady] = useState(false); // panjang garis sudah dihitung

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // HP: skala "panggung" orbit = lebar layar / 402 (lebar desain mobile).
    const section = el.closest("section");
    const setScale = () => {
      const w = document.documentElement.clientWidth;
      section?.style.setProperty("--stage-scale", String(w < 900 ? w / 402 : 1));
      // --k = 1 / skala orbit di layar → garis tetap ±1px & cahaya tetap ukurannya
      requestAnimationFrame(() => {
        const m = el.getScreenCTM();
        if (m) el.style.setProperty("--k", String(1 / Math.hypot(m.a, m.b)));
      });
    };
    setScale();
    window.addEventListener("resize", setScale);

    // Mulai/jeda animasi sesuai terlihat atau tidak (hemat baterai).
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setDrawn(true);
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Semua panjang garis dihitung dari ukuran asli path (tidak memakai pathLength,
    // karena Safari iPhone tidak menerapkannya ke garis putus-putus → cahaya jadi
    // muncul berkali-kali di satu orbit).
    el.querySelectorAll("[data-line]").forEach((p) => {
      const L = p.getTotalLength();
      p.style.strokeDasharray = `${L} ${L}`;
      p.style.setProperty("--len", `${L}`);
    });

    // Cahaya: SATU per orbit, memutar penuh. Posisinya dihitung langsung tiap frame
    // (tidak memakai garis putus-putus), jadi hasilnya sama persis di Chrome, Safari,
    // dan browser HP lain. Bagian yang terlihat dilewati dengan kecepatan normal,
    // bagian di luar layar dilewati cepat.
    const cometEls = [...el.querySelectorAll("[data-comet]")].map((g) => ({
      i: Number(g.dataset.comet),
      paths: [...g.querySelectorAll("path")].map((p) => ({ p, len: Number(p.dataset.len) / 1000 })),
    }));
    const drawComets = (now) => {
      for (const { i, paths } of cometEls) {
        const period = RINGS[i].speed * 1000;
        const u = (((now + i * 2300) % period) + period) % period / period;
        const f = COMETS[i].f;
        const head = u < VISIBLE_TIME ? (u / VISIBLE_TIME) * f : f + ((u - VISIBLE_TIME) / (1 - VISIBLE_TIME)) * (1 - f);
        for (const { p, len } of paths) p.setAttribute("d", tailPath(COMETS[i].pts, head, len));
      }
    };
    let cometRaf = 0;
    const loop = (now) => {
      drawComets(now);
      cometRaf = requestAnimationFrame(loop);
    };
    el.__orbitPlay = (on) => {
      cancelAnimationFrame(cometRaf);
      cometRaf = 0;
      if (on && !reduce) cometRaf = requestAnimationFrame(loop);
    };
    drawComets(performance.now());
    setReady(true);

    // Putaran kecil mengikuti scroll (desktop & HP).
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height); // 0 → 1
        const clamped = Math.min(1, Math.max(0, progress));
        el.style.setProperty("--spin", `${(clamped - 0.5) * 10}deg`);
      });
    };
    if (!reduce) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      io.disconnect();
      el.__orbitPlay?.(false);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setScale);
    };
  }, []);

  // Jalankan cahaya saat orbit terlihat (setelah garis tergambar), jeda saat tidak.
  useEffect(() => {
    ref.current?.__orbitPlay?.(inView);
  }, [inView]);

  return (
    <svg
      ref={ref}
      className={`${styles.svg} ${ready ? styles.ready : ""} ${drawn ? styles.drawn : ""} ${inView ? styles.inView : ""} ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Warna garis seperti aslinya: hijau di "hidung" (ujung kanan) tiap orbit, ungu ke
            arah ekornya. Diukur relatif terhadap bentuk tiap orbit, jadi sama di desktop & HP. */}
        <radialGradient id="orbit-stroke" gradientUnits="objectBoundingBox" cx="0.97" cy="0.25" r="0.75">
          <stop offset="0" stopColor="#9bbf69" />
          <stop offset="0.36" stopColor="#9abc6b" />
          <stop offset="0.62" stopColor="#8c80ac" />
          <stop offset="1" stopColor="#7d7fb4" />
        </radialGradient>
      </defs>

      <g className={styles.system}>
        {RINGS.map((ring, i) => {
          const d = ellipsePath(ring);
          return (
            <g
              key={ring.id}
              className={styles.ring}
              style={{
                "--i": i,
                "--speed": `${ring.speed}s`,
                "--sway": `${ring.sway}s`,
                transformOrigin: `${ring.cx}px ${ring.cy}px`,
              }}
            >
              <path className={styles.line} d={d} data-line="" />
              <g className={styles.comet} data-comet={i}>
                {TAIL.map((t) => (
                  <path
                    key={`${t.len}-${t.width}`}
                    // bentuk ekor diisi tiap frame oleh useEffect (len = per 1000 bagian lintasan)
                    d="M0 0"
                    data-len={t.len}
                    style={{
                      strokeWidth: `calc(${t.width}px * var(--k, 1))`,
                      opacity: t.opacity,
                    }}
                  />
                ))}
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
