// Login page - not connected yet. Will be linked in a later update.
// (This folder is named _login so Next.js does not publish it as a page. To use it: rename it to app/login.)
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export const metadata = {
  title: "Login — Beyond 360°",
  robots: { index: false },
};

// Portal login (desain: "Dashboard Login - Dekstop.png" & "Dashboard Login.png").
// Tanpa navbar, sesuai desain; ada tombol kecil untuk kembali ke Home.
export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={`${styles.glowGreen} drift-a`} aria-hidden="true" />
      <div className={`${styles.glowPurple} drift-b`} aria-hidden="true" />

      <Reveal variant="up" className={styles.backWrap}>
        <Link href="/" className={styles.back}>
          <ArrowLeft weight="bold" aria-hidden="true" />
          Back to Home
        </Link>
      </Reveal>

      <div className={styles.content}>
        <Reveal as="h1" variant="blur" delay={0.1} className={styles.title}>
          Hi, Welcome to Beyond 360°
        </Reveal>
        <LoginForm />
      </div>
    </main>
  );
}
