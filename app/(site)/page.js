import Glow from "@/components/Glow";
import ScrollArrow from "@/components/ScrollArrow";
import Orbit from "@/components/Orbit";
import Reveal, { Words } from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import SocialLinks from "@/components/SocialLinks";
import { hero, process, services, closing } from "@/content/home";
import { pageLinks } from "@/lib/site";
import styles from "./home.module.css";

export const metadata = pageLinks("/");

// Urutan munculnya label orbit: dari orbit dalam ke luar.
const stepDelay = { discover: 0.9, design: 1.3, deliver: 1.7 };

export default function HomePage() {
  return (
    <main className={styles.page}>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <Glow color="purple" className={styles.driftA} style={{ top: -170, left: -300, width: 820, height: 820 }} />
        <Glow color="green" className={styles.driftB} style={{ top: 420, right: -380, width: 900, height: 900 }} />

        <div className={styles.heroText}>
          <Reveal as="p" variant="blur" delay={0.15} className={styles.kicker}>
            {hero.kicker}
          </Reveal>
          <Reveal as="p" variant="blur" delay={0.45} className={styles.lead}>
            {hero.lead}
          </Reveal>
          <Reveal variant="sweep" delay={0.8}>
            <h1 className={styles.headline}>
              <span>{hero.headline[0]}</span> <span>{hero.headline[1]}</span>
            </h1>
          </Reveal>
        </div>

        <ScrollArrow href="#process" delay={2.2} hideOnMobile />
      </section>

      {/* ---------- DISCOVER / DESIGN / DELIVER ---------- */}
      <section id="process" className={styles.process} aria-label="Discover, Design, Deliver">
        {/* "Panggung" orbit: di HP berukuran desain (402px) lalu diskalakan ke lebar layar,
            supaya garis & label selalu tersusun sama seperti desain mobile. */}
        <div className={styles.stage}>
          <Orbit className={styles.orbit} />
          {process.map((p) => (
            <div key={p.id} className={`${styles.step} ${styles[p.id]}`}>
              <Reveal variant="blur" delay={stepDelay[p.id]}>
                <h2>{p.title}</h2>
                <p>{p.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- OUR SERVICES ---------- */}
      <section className={styles.services}>
        <Reveal as="h2" variant="blur" className={`${styles.servicesTitle} text-gradient`}>
          Our Services
        </Reveal>
        <div className={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- PENUTUP ---------- */}
      <section className={styles.closing}>
        <Reveal as="h2" variant="words">
          <Words text={closing.headline} />
        </Reveal>
        <Reveal as="p" variant="blur" delay={0.7} className={`text-green ${styles.tagline}`}>
          {closing.tagline}
        </Reveal>
        <Reveal as="hr" variant="line" delay={1} className="desktop-only" />
        <Reveal variant="up" delay={1.2}>
          <SocialLinks />
        </Reveal>
      </section>
    </main>
  );
}
