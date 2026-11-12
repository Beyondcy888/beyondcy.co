"use client";

import {
  Cube,
  TiktokLogo,
  InstagramLogo,
  PenNib,
  CreditCard,
  VideoCamera,
  Globe,
  CheckCircle,
  Lightning,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/site";
import { serviceWhatsappMessage } from "@/content/home";
import Reveal from "./Reveal";
import styles from "./ServiceCard.module.css";

// Ikon tidak tersedia sebagai file aset, jadi dipakai set ikon gratis
// Phosphor Icons yang bentuknya paling mirip dengan desain.
const ICONS = {
  cube: (p) => <Cube weight="fill" {...p} />,
  tiktok: (p) => <TiktokLogo weight="bold" {...p} />,
  instagram: (p) => <InstagramLogo weight="bold" {...p} />,
  pen: (p) => <PenNib weight="bold" {...p} />,
  card: (p) => <CreditCard weight="fill" {...p} />,
  video: (p) => <VideoCamera weight="fill" {...p} />,
  globe: (p) => <Globe weight="bold" {...p} />,
};

// Kartu layanan kaca. Seluruh kartu = link ke WhatsApp BYC dengan pesan
// sesuai layanannya.
// Desktop: kepala + isi tampil (sesuai desain desktop).
// Ponsel: hanya kepala kartu (sesuai desain mobile).
// Animasi: muncul berurutan saat digulir; di desktop, cahaya lembut
// mengikuti kursor di permukaan kaca dan kartu sedikit terangkat.
export default function ServiceCard({ service, index = 0 }) {
  const { icons, title, note, text, points, highlight, mobileOrder, whatsappMessage } = service;
  const href = whatsappLink(whatsappMessage ?? serviceWhatsappMessage(title));

  // Posisi kursor → variabel CSS untuk cahaya sorot.
  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const delay = (index % 3) * 0.12 + Math.floor(index / 3) * 0.15;

  return (
    <Reveal variant="scale" delay={delay} className={styles.slot} style={{ "--mobile-order": mobileOrder }}>
      <a
        className={styles.card}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} — chat with Beyondcy on WhatsApp`}
        onPointerMove={onPointerMove}
      >
        <ArrowUpRight className={styles.go} weight="bold" aria-hidden="true" />

        <div className={styles.head}>
          <span className={styles.icons}>
            {icons.map((name) => {
              const Icon = ICONS[name];
              return <Icon key={name} className={styles.icon} aria-hidden="true" />;
            })}
          </span>
          <span className={styles.rule} aria-hidden="true" />
          <span className={styles.title}>
            {title}
            {note && <small>{note}</small>}
          </span>
        </div>

        <div className={styles.body}>
          <p>{text}</p>
          {points && (
            <ul>
              {points.map((p) => (
                <li key={p}>
                  <CheckCircle className={styles.check} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          )}
          {highlight && (
            <p className={styles.highlight}>
              <span className={styles.bolt} aria-hidden="true">
                <Lightning weight="fill" />
              </span>
              {highlight}
            </p>
          )}
        </div>
      </a>
    </Reveal>
  );
}
