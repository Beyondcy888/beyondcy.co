// ============================================================
// KONTEN HALAMAN ABOUT — teks disalin persis dari desain.
// ============================================================

// Video asli dari folder "VIDEO PAGE ABOUT" (sudah dikecilkan oleh scripts/prepare-assets.mjs).
// Diputar otomatis, berulang (loop), tanpa suara — sesuai nama file "VIDEO LOOPING".
export const video = {
  desktop: "/video/about-loop.mp4",          // VIDEO LOOPING PAGE ABOUT.mp4 (1920×1080)
  desktopPoster: "/video/about-loop-poster.jpg",
  mobile: "/video/about-vertical.mp4",       // BYC Out Vertical.mp4 (1080×1920)
  mobilePoster: "/video/about-vertical-poster.jpg",
};

export const intro = {
  founded: "Founded in 2025.",
  text: "We connect ideas, audiences, and experiences to turn brands into something people trust and believe in.",
  because: "Because at Beyondcy, we’re connecting dreams.",
  tagline: "It’s who we are.",
};

export const statement = {
  // [teks, warna] — warna: null (putih), "green", "periwinkle"
  line1: [
    ["Beyond ", null],
    ["Brands", "green"],
    [" & Beyond ", null],
    ["Buzz", "periwinkle"],
  ],
  line2: "This is What We’re All About",
  // PLACEHOLDER: tujuan tombol EXPLORE belum ditentukan di desain.
  // Sementara diarahkan ke halaman Work. Ganti/hapus sesuai keputusan.
  exploreHref: "/work",
};
