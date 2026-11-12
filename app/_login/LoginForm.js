// Login page - not connected yet. Will be linked in a later update.
"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { whatsappLink } from "@/lib/site";
import { register } from "@/content/login";
import styles from "./login.module.css";

// ============================================================
// FORM LOGIN — TAMPILAN SAJA (PLACEHOLDER)
// Login sungguhan BELUM dihubungkan: menunggu kesepakatan dengan
// partner soal back office (penetapan email → Client / Team).
// Nanti di handleSubmit: kirim email+password ke layanan login,
// lalu arahkan Client → 360 Dashboard, Team → Tracker.
// ============================================================
export default function LoginForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setNotice("Login portal is not connected yet.");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Reveal variant="stagger" delay={0.35} className={styles.fields}>
        <label className={styles.field} style={{ "--i": 0 }}>
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className={styles.field} style={{ "--i": 1 }}>
          <span>Password</span>
          <input type="password" name="password" autoComplete="current-password" required />
        </label>
      </Reveal>

      <Reveal variant="up" delay={0.6}>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </Reveal>

      <Reveal as="p" variant="up" delay={0.75} className={styles.register}>
        {register.question}{" "}
        <a href={whatsappLink(register.whatsappMessage)} target="_blank" rel="noopener noreferrer">
          {register.link}
        </a>
      </Reveal>

      <p className={styles.notice} role="status" data-placeholder="login belum terhubung">
        {notice}
      </p>
    </form>
  );
}
