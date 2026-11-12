import { ArrowCircleDown } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import styles from "./ScrollArrow.module.css";

// Panah "gulir ke bawah" di tengah bawah sebuah section (section harus position: relative).
// href: tujuan, mis. "#process".  hideOnMobile: sembunyikan di ponsel.
export default function ScrollArrow({ href, delay = 0, hideOnMobile = false }) {
  return (
    <Reveal variant="up" delay={delay} className={`${styles.wrap} ${hideOnMobile ? styles.hideMobile : ""}`}>
      <a href={href} className={styles.arrow} aria-label="Gulir ke bawah">
        <ArrowCircleDown weight="light" />
      </a>
    </Reveal>
  );
}
