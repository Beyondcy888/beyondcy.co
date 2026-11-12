import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { pageHref } from "@/lib/site";
import styles from "./PillButton.module.css";

// Tombol kapsul kaca dengan panah ↑ (EXPLORE, START NOW, CONTACT US).
// href null  → tombol ditampilkan tapi belum mengarah ke mana pun (placeholder).
// external   → buka di tab baru (mis. WhatsApp).
// mobileLabel → teks berbeda di ponsel (mis. "Contact Us" vs "CONTACT US").
export default function PillButton({ href, external = false, children, mobileLabel, className = "" }) {
  const content = (
    <>
      {mobileLabel ? (
        <>
          <span className="desktop-only">{children}</span>
          <span className="mobile-only">{mobileLabel}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
      <ArrowUp className={styles.icon} weight="bold" aria-hidden="true" />
    </>
  );

  const cls = `${styles.pill} ${className}`;

  if (!href) {
    return (
      <span className={cls} data-placeholder="link belum ditentukan" title="Tujuan tombol belum ditentukan">
        {content}
      </span>
    );
  }
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link className={cls} href={pageHref(href)}>
      {content}
    </Link>
  );
}
