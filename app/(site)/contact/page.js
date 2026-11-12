import { ChatsCircle } from "@phosphor-icons/react/dist/ssr";
import PillButton from "@/components/PillButton";
import Reveal from "@/components/Reveal";
import { externalLinks, pageLinks } from "@/lib/site";
import { contact } from "@/content/contact";
import styles from "./contact.module.css";

export const metadata = { title: "Contact — Beyondcy", ...pageLinks("/contact/") };

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        <Reveal as="span" variant="blur" delay={0.15}>
          {contact.title[0]}
        </Reveal>
        <Reveal as="span" variant="blur" delay={0.35}>
          {contact.title[1]}
        </Reveal>
      </h1>

      <div className={styles.right}>
        <Reveal as="p" variant="up" delay={0.55} className={styles.paragraph}>
          {contact.paragraph.map((s, i) => (
            <span key={i}>{s} </span>
          ))}
        </Reveal>

        <Reveal as="p" variant="up" delay={0.75} className={styles.question}>
          <ChatsCircle className={styles.icon} aria-hidden="true" />
          <span>{contact.question}</span>
        </Reveal>

        <Reveal variant="up" delay={0.95}>
          <PillButton
            href={externalLinks.whatsapp}
            external
            mobileLabel={contact.buttonMobile}
            className={styles.button}
          >
            {contact.button}
          </PillButton>
        </Reveal>
      </div>
    </main>
  );
}
