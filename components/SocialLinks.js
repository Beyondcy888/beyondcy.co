import { InstagramLogo, LinkedinLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { externalLinks } from "@/lib/site";
import styles from "./SocialLinks.module.css";

const items = [
  { key: "instagram", label: "Instagram", Icon: InstagramLogo },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinLogo },
  { key: "tiktok", label: "TikTok", Icon: TiktokLogo },
];

// Ikon sosial media bulat kaca. URL diambil dari lib/site.js;
// jika masih null, ikon tampil sebagai placeholder (tidak bisa diklik).
export default function SocialLinks() {
  return (
    <ul className={styles.list}>
      {items.map(({ key, label, Icon }) => {
        const href = externalLinks[key];
        const icon = <Icon weight="fill" className={styles.icon} aria-hidden="true" />;
        return (
          <li key={key}>
            {href ? (
              <a className={styles.circle} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                {icon}
              </a>
            ) : (
              <span className={styles.circle} data-placeholder="URL belum ada" title={`${label} (URL belum diisi)`}>
                {icon}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
