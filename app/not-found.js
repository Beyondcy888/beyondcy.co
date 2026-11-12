import Navbar from "@/components/Navbar";
import styles from "./not-found.module.css";

export const metadata = { title: "Page not found — Beyondcy" };

// 404 page. The build writes it to out/404.html, which GitHub Pages shows for every address
// that does not exist. It keeps the wording and layout of the Next.js default 404, but on the
// site's dark background (the default one is white for visitors in light mode) and with the
// navbar, so there is a way back to the site. prefetch={false}: the menu does not load the other
// pages ahead of time here (on a page that uses none of their styles, Chrome logs a warning for it).
export default function NotFound() {
  return (
    <>
      <Navbar prefetch={false} />
      <main className={styles.page}>
        <h1>404</h1>
        <p>This page could not be found.</p>
      </main>
    </>
  );
}
