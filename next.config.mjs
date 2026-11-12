// BASE PATH: the ONE place the sub-folder of the site comes from.
//   GitHub Pages now:  BASE_PATH=/beyondcy.co  (set only in .github/workflows/deploy.yml)
//   Local, and later at https://beyondcy.co:  not set  ->  "" (the site sits at the root)
// Never type "/beyondcy.co" anywhere else in the code. Everything reads this value:
//   - Next itself (basePath): links, scripts, styles, fonts, the favicon
//   - lib/site.js (through NEXT_PUBLIC_BASE_PATH below): asset() for files in public/, and siteUrl
const basePath = (process.env.BASE_PATH || "").replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages only serves static files: "npm run build" writes the whole site to out/.
  output: "export",
  basePath,
  // /about/ -> out/about/index.html, the form GitHub Pages serves without a redirect.
  trailingSlash: true,
  // Next must not add or remove the "/" at the end of links by itself: it reads the ".co" of
  // "/beyondcy.co" as a file extension, turns the Home link into "/beyondcy.co" (no "/") and then
  // asks GitHub Pages for "/beyondcy.co.txt", which does not exist (a 404 on every page).
  // So internal links carry their own "/" at the end: pageHref() in lib/site.js adds it.
  skipTrailingSlashRedirect: true,
  // No image server on GitHub Pages: next/image outputs the files in public/ as they are.
  images: { unoptimized: true },
  // Passes the base path on to the code that runs in the browser (see lib/site.js).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // Mengizinkan membuka server pengembangan (npm run dev) dari HP
  // lewat alamat IP komputer di jaringan. Tidak berpengaruh di website online.
  allowedDevOrigins: ["100.110.247.20", "10.50.50.97", "192.168.*.*", "10.*.*.*", "172.*.*.*"],

  // The team's "Cache-Control: no-cache" rule for pages (async headers()) was removed here:
  // a static export cannot send its own headers. GitHub Pages sets the cache headers itself
  // (pages are re-checked after 10 minutes; files in /_next/static change name on every update).
};

export default nextConfig;
