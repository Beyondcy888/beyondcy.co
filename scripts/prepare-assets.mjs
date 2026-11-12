// Menyalin aset asli Beyondcy ke folder public/ dengan nama rapi
// dan ukuran yang ringan untuk web. File asli TIDAK diubah.
//
// Cara pakai (dari folder proyek):
//   node scripts/prepare-assets.mjs "<folder ASSETS - BYC WEBSITE>"
//
// Butuh: sharp (sudah ikut terpasang bersama Next.js) dan ffmpeg untuk video.

import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
if (!SRC) {
  console.error('Berikan path folder aset, mis. "C:\\...\\ASSETS - BYC WEBSITE"');
  process.exit(1);
}
const OUT = path.resolve("public");

// [file sumber (relatif ke SRC), file tujuan (relatif ke public/), opsi]
// width = lebar maksimum; trim = buang area transparan di tepi.
const images = [
  // Logo Beyondcy
  ["LOGO BYC/logo typo-04 1.png", "brand/logo-wordmark.png", { width: 733 }],
  ["LOGO BYC/byc b.png", "brand/logo-b.png", { width: 1024, trim: true }],

  // Catatan: latar gradasi dibuat dengan CSS, jadi file "BLUR GRADIENT - BG" tidak dipakai.

  // Home - section Discover: garis orbit asli. Tidak ditampilkan langsung — bentuk
  // ellips di components/Orbit.js DIUKUR dari gambar ini (disimpan sebagai acuan).
  ["PAGE HOME - SECTION DISCOVER/CIRCLE.png", "home/orbit.png", {}],

  // Logo klien (section "Trusted by")
  ["LOGO CLIENT/MASK LOGO(3).png", "clients/homy8.png", {}],
  ["LOGO CLIENT/Mask group(1).png", "clients/beefix.png", {}],
  ["LOGO CLIENT/Logo Behomy 3 1.png", "clients/behomy-group.png", {}],
  ["LOGO CLIENT/Mask group.png", "clients/sora-spring.png", {}],
  ["LOGO CLIENT/MASK LOGO(2).png", "clients/dr-gadget.png", {}],
  ["LOGO CLIENT/Behomy LOGO PNG 1.png", "clients/behomy.png", {}],
  ["LOGO CLIENT/Untitled design (5).png", "clients/tujju.png", { width: 600, trim: true }],
  ["LOGO CLIENT/Untitled (4000 x 3000 px) 1.png", "clients/corvel.png", {}],
  ["LOGO CLIENT/Untitled (4000 x 3000 px) (1) 1.png", "clients/purnava-village.png", {}],
  ["LOGO CLIENT/Untitled design (6) 1 (2).png", "clients/irvi.png", {}],
  ["LOGO CLIENT/MASK LOGO.png", "clients/comunee.png", {}],
  ["LOGO CLIENT/Mask group (1).png", "clients/kedai-makmoer-88.png", {}],
  ["LOGO CLIENT/MASK LOGO(1).png", "clients/8bowls.png", {}],
  ["LOGO CLIENT/Untitled design (7) 1.png", "clients/maxone.png", {}],

  // Logo media (section PR & Media Management)
  ["SECTION MEDIA/Mask group (4).png", "media/antaranews.png", {}],
  ["SECTION MEDIA/Mask group (5).png", "media/liputan6.png", {}],
  ["SECTION MEDIA/Mask group (6).png", "media/sindonews-tv.png", {}],
  ["SECTION MEDIA/Mask group (7).png", "media/jpnn.png", {}],
  ["SECTION MEDIA/Mask group (8).png", "media/inews.png", {}],
  ["SECTION MEDIA/Mask group (9).png", "media/republika.png", {}],
  ["SECTION MEDIA/Mask group (10).png", "media/media-indonesia.png", {}],
  ["SECTION MEDIA/Mask group (11).png", "media/rmol.png", {}],
  ["SECTION MEDIA/Mask group (12).png", "media/media-12.png", {}], // logo burung, nama media belum dikonfirmasi
  ["SECTION MEDIA/Mask group (13).png", "media/tvone.png", {}],
  ["SECTION MEDIA/Mask group (14).png", "media/msn.png", {}],
  ["SECTION MEDIA/Mask group (15).png", "media/beritakini.png", {}],
  ["SECTION MEDIA/Mask group (16).png", "media/mjnews.png", {}],
  ["SECTION MEDIA/Mask group (17).png", "media/rcti-plus.png", {}],
  ["SECTION MEDIA/iPad Pro 2020.png", "work/media-ipad.webp", {}],

  // Mockup perangkat — dipotong rapat (tanpa ruang kosong) supaya dua perangkat
  // bisa ditampilkan sama besar berdampingan.
  ["SECTION SEO/MacBook Air (15 inch) (1).png", "work/seo-macbook-1-trim.webp", { trim: true }],
  ["SECTION SEO/MacBook Air (15 inch) (2).png", "work/seo-macbook-2-trim.webp", { trim: true }],
  ["SECTION UIUX/iMac 24 inch.png", "work/uiux-imac-1-trim.webp", { trim: true }],
  ["SECTION UIUX/iMac 24 inch (2).png", "work/uiux-imac-2-trim.webp", { trim: true }],

  // Foto event (section Event Organizer)
  ["SECTION EVENT ORGANIZER/DSC02845.JPG", "events/talkshow-ui.webp", { width: 1400 }],
  ["SECTION EVENT ORGANIZER/DSC01989.JPG", "events/badminton.webp", { width: 1400 }],
  ["SECTION EVENT ORGANIZER/DSC05317.JPG", "events/gathering-homyeight.webp", { width: 1400 }],
  ["SECTION EVENT ORGANIZER/seminar.JPG", "events/seminar-behomy.webp", { width: 1400 }],
  ["SECTION EVENT ORGANIZER/WhatsApp Image 2025-11-22 at 13.18.06_b33022cc (1).jpg", "events/poundfit.webp", { width: 1400 }],
  ["SECTION EVENT ORGANIZER/DSC00654.JPG", "events/corvel-launch.webp", { width: 1400 }],
];

// Video About: re-encode H.264 agar ringan + poster (frame pertama).
const videos = [
  ["VIDEO PAGE ABOUT/VIDEO LOOPING PAGE ABOUT.mp4", "video/about-loop"],
  ["VIDEO PAGE ABOUT/BYC Out Vertical.mp4", "video/about-vertical"],
];

for (const [from, to, opt] of images) {
  const src = path.join(SRC, from);
  const dest = path.join(OUT, to);
  mkdirSync(path.dirname(dest), { recursive: true });
  let img = sharp(src, { limitInputPixels: false }).rotate();
  if (opt.width) img = img.resize({ width: opt.width, withoutEnlargement: true });
  if (opt.trim) img = sharp(await img.png().toBuffer()).trim();
  if (to.endsWith(".webp")) await img.webp({ quality: 80 }).toFile(dest);
  else await img.png({ compressionLevel: 9 }).toFile(dest);
  console.log("✓", to);
}

for (const [from, to] of videos) {
  const src = path.join(SRC, from);
  const dest = path.join(OUT, to);
  mkdirSync(path.dirname(dest), { recursive: true });
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", src,
    "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
    "-an", "-movflags", "+faststart", `${dest}.mp4`]);
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", src,
    "-frames:v", "1", "-q:v", "3", `${dest}-poster.jpg`]);
  console.log("✓", `${to}.mp4 (+ poster)`);
}
