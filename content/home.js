// ============================================================
// KONTEN HALAMAN HOME — teks disalin persis dari desain.
// Ubah teks di sini; tampilan tidak perlu disentuh.
// ============================================================

export const hero = {
  kicker: "We’re Beyondcy",
  lead: "A creative agency built on one simple belief,",
  headline: ["Every brand has a purpose that", "deserves to be amplified."],
};

// Section orbit (garis: public/home/orbit.png)
export const process = [
  { id: "deliver", title: "Deliver", text: "Craft visuals that speak louder than words." },
  { id: "design", title: "Design", text: "Turn strategy into impact." },
  { id: "discover", title: "Discover", text: "Unlock insights, uncover opportunities." },
];

// Pesan WhatsApp saat kartu layanan diklik.
// Contoh: "Hello Beyondcy, i want to know more about your Brand Consultant Service"
// Untuk pesan khusus satu kartu, isi `whatsappMessage` di kartu tersebut.
export const serviceWhatsappMessage = (title) =>
  `Hello Beyondcy, i want to know more about your ${title} Service`;

// Kartu "Our Services". Seluruh kartu bisa diklik → WhatsApp BYC.
// icons: nama ikon (lihat components/ServiceCard.js).
// mobileOrder: urutan kartu di ponsel (desain mobile memakai urutan berbeda).
export const services = [
  {
    icons: ["cube"],
    title: "Brand Consultant",
    note: "(Bundled Service)",
    text: "Think of it as a brand’s evolution in one place. From uncovering insights and shaping personas, to crafting identity and launching activation strategies, we bring it all together into a single, seamless experience.",
    highlight: "The goal is made a brand that’s seen and felt at every touchpoint.",
    mobileOrder: 1,
  },
  {
    icons: ["tiktok", "instagram"],
    title: "Social Media Management",
    text: "We create strategic short-form content that reflects your brand’s voice and mission—building strong content pillars, curating visual identity, and ensuring consistency across every post and reel.",
    points: [
      "Strategic short-form content",
      "Content pillars and curated visual identity",
      "Consistency across platforms",
      "Beyond trends",
    ],
    mobileOrder: 5,
  },
  {
    icons: ["pen"],
    title: "Design On Demand",
    text: "We create one-off visuals, graphic requests, and custom assets for brands that move fast, always aligning them with your brand identity.",
    points: [
      "One-off visuals for immediate needs",
      "On-demand graphic requests",
      "Custom brand assets",
      "Tailored for fast-moving brands",
      "Always aligned with brand identity",
    ],
    mobileOrder: 6,
  },
  {
    icons: ["card"],
    title: "UI/UX Design",
    note: "(Project Based)",
    text: "We create clean, intuitive, business-driven interface and experience design tailored for products that need to work hard and look good.",
    mobileOrder: 2,
  },
  {
    icons: ["video"],
    title: "Company Video Profile",
    text: "We create high-impact brand storytelling in motion and full-service production from concept to final cut.",
    mobileOrder: 3,
  },
  {
    icons: ["globe"],
    title: "Website and Landing Page",
    text: "From brand showcases to lead generation, we create websites that look great and drive real results.",
    mobileOrder: 4,
  },
];

export const closing = {
  headline: "Turn what you sell into something people remember. Let’s build the brand.",
  tagline: "Let’s Go Beyond.",
};
