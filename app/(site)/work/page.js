/* eslint-disable @next/next/no-img-element -- logo kecil, ukuran diatur lewat CSS */
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Glow from "@/components/Glow";
import PillButton from "@/components/PillButton";
import Reveal, { Words } from "@/components/Reveal";
import { hero, provide, clients, seo, events, media, uiux, cta } from "@/content/work";
import { asset, pageLinks } from "@/lib/site";
import styles from "./work.module.css";

export const metadata = { title: "Work — Beyondcy", ...pageLinks("/work/") };

export default function WorkPage() {
  const heroWordCount = hero.before.trim().split(" ").length;

  return (
    <main className={styles.page}>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <Reveal as="h1" variant="words" delay={0.2}>
          <Words text={hero.before.trim()} />{" "}
          <span className={`word text-gradient-soft ${styles.flow}`} style={{ "--i": heroWordCount + 1 }}>
            {hero.highlight}
          </span>
        </Reveal>
      </section>

      {/* ---------- WHAT WE'VE PROVIDE ---------- */}
      <section className={styles.provide}>
        <Glow color="purple" className="drift-a" style={{ top: 330, left: -330, width: 900, height: 900 }} />
        <Glow color="green" className="drift-b" style={{ top: 420, left: 150, width: 820, height: 820 }} />
        <Reveal variant="blur" className={styles.provideText}>
          <h2>
            {provide.title[0]}
            <br />
            {provide.title[1]}
          </h2>
          <p>
            {provide.subtitle[0]}
            <strong>{provide.subtitle[1]}</strong>
            {provide.subtitle[2]}
          </p>
        </Reveal>
        <div className={styles.provideList}>
          <Reveal as="ul" variant="stagger" delay={0.2}>
            {provide.items.map((item, i) => (
              <li key={item} style={{ "--i": i }}>
                {item}
              </li>
            ))}
          </Reveal>
          <Reveal as="p" variant="up" delay={0.3}>
            {provide.more}
          </Reveal>
        </div>
      </section>

      {/* ---------- TRUSTED BY ---------- */}
      <section className={styles.clients}>
        <Reveal as="h2" variant="blur" className={styles.sectionTitle}>
          {clients.title}
        </Reveal>
        {/* Desktop: baris-baris logo seperti desain, muncul berurutan */}
        <div className={`${styles.clientRows} desktop-only`}>
          {clients.rows.map((row, r) => (
            <Reveal key={r} as="ul" variant="stagger" className={styles.clientRow}>
              {row.map((logo, i) => (
                <li key={logo.name} style={{ "--i": i }}>
                  <img src={asset(logo.src)} alt={logo.name} style={{ "--w": `${logo.width}px` }} loading="lazy" />
                </li>
              ))}
            </Reveal>
          ))}
        </div>
        {/* Ponsel: semua logo dalam grid 3 kolom, tampil diam (tanpa animasi) */}
        <ul className={`${styles.clientGrid} mobile-only`}>
          {clients.rows.flat().map((logo) => (
            <li key={logo.name}>
              <img src={asset(logo.src)} alt={logo.name} style={{ "--w": `${logo.width}px` }} loading="lazy" />
            </li>
          ))}
        </ul>
        <Reveal as="p" variant="up" className={styles.more}>
          {clients.more}
        </Reveal>
      </section>

      {/* ---------- SEO MANAGEMENT ---------- */}
      <section className={styles.seo}>
        <Glow color="green" className="drift-b" style={{ top: 480, left: "calc(50% - 450px)", width: 900, height: 700 }} />
        {/* Dua laptop berdampingan, sama besar & simetris (desktop dan ponsel) */}
        <Reveal variant="up" delay={0.2} className={styles.devicePair}>
          <Image src={asset("/work/seo-macbook-1-trim.webp")} alt="" width={912} height={917} sizes="(max-width: 899px) 45vw, 600px" />
          <Image src={asset("/work/seo-macbook-2-trim.webp")} alt="" width={1035} height={931} sizes="(max-width: 899px) 50vw, 640px" />
        </Reveal>
        <div className={styles.seoText}>
          <Reveal as="h2" variant="blur" className={styles.sectionTitle}>
            {seo.title}
          </Reveal>
          <Reveal as="p" variant="blur" delay={0.15} className={styles.tags}>
            {seo.tags}
          </Reveal>
          <Reveal as="p" variant="up" delay={0.3} className={styles.seoBody}>
            <strong>{seo.bold}</strong>
            <br />
            {seo.text}
          </Reveal>
        </div>
      </section>

      {/* ---------- EVENT ORGANIZER ---------- */}
      <section className={styles.events}>
        <Reveal as="h2" variant="blur" className={styles.sectionTitle}>
          {events.title}
        </Reveal>
        <Reveal as="p" variant="blur" delay={0.15} className={`${styles.tags} ${styles.eventTags}`}>
          {events.tags}
        </Reveal>
        <Reveal as="ul" variant="stagger" delay={0.1} className={styles.eventGrid}>
          {events.items.map((ev, i) => {
            const inner = (
              <>
                <Image src={asset(ev.src)} alt={ev.title} fill sizes="(max-width: 899px) 100vw, 664px" className={styles.eventImg} />
                <span className={styles.eventCaption}>
                  {ev.title} <ArrowUpRight weight="bold" aria-hidden="true" />
                </span>
              </>
            );
            return (
              <li key={ev.title} className={styles.eventCard} style={{ "--i": i }}>
                {ev.href ? (
                  <a href={ev.href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div data-placeholder="link event belum ada">{inner}</div>
                )}
              </li>
            );
          })}
        </Reveal>
      </section>

      {/* ---------- PR & MEDIA ---------- */}
      <section className={styles.media}>
        <Reveal as="h2" variant="blur" className={styles.sectionTitle}>
          {media.title}
        </Reveal>
        <Reveal as="p" variant="blur" delay={0.15} className={styles.tags}>
          {media.subtitle}
        </Reveal>
        <div className={styles.mediaBody}>
          <Reveal variant="left" delay={0.2} className={styles.ipad}>
            <Image src={asset("/work/media-ipad.webp")} alt="" width={688} height={698} />
          </Reveal>
          <div className={styles.mediaLogos}>
            <Reveal as="h3" variant="blur">
              {media.heading}
            </Reveal>
            {media.rows.map((row, r) => (
              <Reveal key={r} as="ul" variant="stagger" delay={r * 0.08} className={styles.mediaRow}>
                {row.map((logo, i) => (
                  <li key={logo.name} style={{ "--i": i }}>
                    <img src={asset(logo.src)} alt={logo.name} width={logo.w} height={logo.h} loading="lazy" />
                  </li>
                ))}
                {r === media.rows.length - 1 && (
                  <li className={styles.mediaMore} style={{ "--i": row.length }}>
                    {media.more}
                  </li>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- UI/UX ---------- */}
      <section className={styles.uiux}>
        <div className={styles.uiuxText}>
          <Reveal as="h2" variant="blur" className={styles.sectionTitle}>
            {uiux.title}
          </Reveal>
          <Reveal as="p" variant="blur" delay={0.15} className={styles.tags}>
            {uiux.subtitle}
          </Reveal>
        </div>
        {/* Dua iMac berdampingan, sama besar & simetris (desktop dan ponsel) */}
        <Reveal variant="up" delay={0.2} className={styles.devicePair}>
          <Image src={asset("/work/uiux-imac-1-trim.webp")} alt="" width={943} height={866} sizes="(max-width: 899px) 45vw, 640px" />
          <Image src={asset("/work/uiux-imac-2-trim.webp")} alt="" width={943} height={866} sizes="(max-width: 899px) 45vw, 640px" />
        </Reveal>
      </section>

      {/* ---------- LET'S BUILD TOGETHER ---------- */}
      <section className={styles.cta}>
        <h2>
          <Reveal as="span" variant="blur" className={styles.line}>
            {cta.title[0]}
          </Reveal>
          <Reveal as="span" variant="blur" delay={0.15} className={styles.line}>
            {cta.title[1]}
          </Reveal>
        </h2>
        <Reveal as="p" variant="up" delay={0.2} className={styles.ctaQuestion}>
          {cta.question}
        </Reveal>
        <Reveal as="p" variant="up" delay={0.3} className={styles.ctaText}>
          {cta.text}
        </Reveal>
        <Reveal as="p" variant="up" delay={0.4} className={styles.ctaClosing}>
          {cta.closing}
        </Reveal>
        <Reveal variant="up" delay={0.5} className={styles.ctaButton}>
          <PillButton href={cta.href} external={cta.external}>
            START NOW
          </PillButton>
        </Reveal>
      </section>
    </main>
  );
}
