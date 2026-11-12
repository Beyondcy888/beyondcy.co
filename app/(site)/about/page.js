import Image from "next/image";
import AboutVideo from "@/components/AboutVideo";
import PillButton from "@/components/PillButton";
import Reveal from "@/components/Reveal";
import { video, intro, statement } from "@/content/about";
import { asset, pageLinks } from "@/lib/site";
import styles from "./about.module.css";

export const metadata = { title: "About — Beyondcy", ...pageLinks("/about/") };

const colorClass = { green: styles.brands, periwinkle: styles.buzz };

// The video files and posters are in public/: asset() adds the base path (lib/site.js).
const videoFiles = Object.fromEntries(Object.entries(video).map(([key, path]) => [key, asset(path)]));

export default function AboutPage() {
  return (
    <main>
      <AboutVideo video={videoFiles} nextId="about-intro" />

      <section id="about-intro" className={styles.intro}>
        <Reveal as="p" variant="blur" className={styles.lead}>
          <span className={styles.founded}>{intro.founded}</span> <span className={styles.connect}>{intro.text}</span>
        </Reveal>
        <Reveal as="p" variant="blur" delay={0.25} className={styles.because}>
          {intro.because}
        </Reveal>
        <Reveal as="p" variant="blur" delay={0.45} className={`${styles.tagline} ${styles.taglineGlow}`}>
          {intro.tagline}
        </Reveal>
        <Reveal variant="spin" delay={0.7} className={styles.logoWrap}>
          <Image src={asset("/brand/logo-b.png")} alt="Beyondcy" width={984} height={642} className={`${styles.logo} float`} />
        </Reveal>
      </section>

      <section className={styles.statement}>
        <h1>
          <Reveal as="span" variant="blur" className={styles.line}>
            {statement.line1.map(([text, color], i) => (
              <span key={i} className={color ? colorClass[color] : undefined}>
                {text}
              </span>
            ))}
          </Reveal>
          <Reveal as="span" variant="blur" delay={0.25} className={styles.line}>
            {statement.line2}
          </Reveal>
        </h1>
        <Reveal variant="up" delay={0.5}>
          <PillButton href={statement.exploreHref}>EXPLORE</PillButton>
        </Reveal>
      </section>
    </main>
  );
}
