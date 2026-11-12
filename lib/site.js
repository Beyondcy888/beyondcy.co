// Data yang dipakai di banyak halaman. Ubah di sini, otomatis berubah di semua halaman.

// ---------------------------------------------------------------------------
// BASE PATH (sub-folder of the site). It comes from ONE variable: BASE_PATH, read in
// next.config.mjs and passed on to the code as NEXT_PUBLIC_BASE_PATH.
//   GitHub Pages now: "/beyondcy.co"      local, and later at beyondcy.co: ""
// Never type "/beyondcy.co" in the code: use asset(), pageHref() and siteUrl below.
// ---------------------------------------------------------------------------
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Path to a file in public/ (image, video, poster): asset("/brand/logo-b.png").
// Needed wherever Next does not add the base path by itself: <img>, <video>, poster,
// next/image with a text src, inline style url(...). NOT for links to pages: next/link adds
// the base path automatically (see pageHref below). Addresses that are not a "/..." path are
// returned as they are.
export function asset(path) {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}

// Link to a page of the site, with the "/" at the end that the exported site uses:
// pageHref("/about") -> "/about/". Use it for every next/link to a page (Navbar and PillButton
// already do). Next normally adds that "/" itself; this is switched off in next.config.mjs
// (skipTrailingSlashRedirect, the reason is explained there). The base path is still added by next/link.
export function pageHref(href) {
  if (typeof href !== "string" || !href.startsWith("/")) return href; // external link, "#...", or null
  const [, path, rest] = /^([^?#]*)(.*)$/.exec(href);
  return (path.endsWith("/") ? path : `${path}/`) + rest;
}

// Public address of the site (used for the canonical / Open Graph links in app/layout.js).
// Follows the base path: with a base path the site is on GitHub Pages, without one it is on
// the domain. So connecting the domain (11_CONNECT_DOMAIN.md) needs no change here: removing
// BASE_PATH from the workflow switches these links to https://beyondcy.co by itself.
const githubPagesOrigin = "https://beyondcy888.github.io"; // only used while BASE_PATH is set
const domainOrigin = "https://beyondcy.co";
export const siteUrl = `${basePath ? githubPagesOrigin : domainOrigin}${basePath}`;

// Canonical link + og:url of one page, for its `metadata`:  ...pageLinks("/about/")
// Write the path like the menu links, plus a "/" at the end (the site is exported with
// trailingSlash). The address in front of it comes from siteUrl (metadataBase in app/layout.js).
export function pageLinks(path) {
  return {
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Beyondcy", url: path },
  };
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

// Login page - not connected yet. Will be linked in a later update.
// (The page is kept in app/_login; to bring it back, rename that folder to app/login,
//  restore this line and the two Login links in components/Navbar.js.)
// export const loginHref = "/login";

// Link luar. Jika diisi null → ikon/tombol tampil sebagai placeholder (tidak bisa diklik).
export const externalLinks = {
  whatsapp: "https://wa.me/6282128331383",
  instagram: "https://www.instagram.com/beyondcy.co",
  linkedin: "https://www.linkedin.com/company/beyondcy-kreatif-global",
  tiktok: "https://www.tiktok.com/@beyondcy.id",
};

// Link WhatsApp BYC dengan pesan yang sudah terisi otomatis.
export function whatsappLink(message) {
  return `${externalLinks.whatsapp}?text=${encodeURIComponent(message)}`;
}
