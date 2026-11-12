// ============================================================
// KONTEN HALAMAN WORK — teks disalin persis dari desain desktop.
// Gambar ada di folder public/ (clients/, media/, events/, work/).
// ============================================================
import { externalLinks } from "@/lib/site";

export const hero = {
  before: "Think of Us as Your ",
  highlight: "Brand Translator",
};

export const provide = {
  // Catatan: teks persis seperti desain ("What We’ve Provide").
  title: ["What We’ve", "Provide"],
  subtitle: ["Let’s build it with ", "Beyondcy", "."],
  items: [
    "Brand Consultant",
    "Social Media Management",
    "Company Profile Video",
    "Website Development",
    "SEO Management",
    "UI/UX Design",
    "Offline Activation",
  ],
  more: "And many more.",
};

// Logo klien, per baris seperti di desain. width = lebar tampil di desktop (px).
export const clients = {
  title: "Trusted by Brands Who Know What They’re Building",
  rows: [
    [
      { name: "Homy8", src: "/clients/homy8.png", width: 192 },
      { name: "Beefix", src: "/clients/beefix.png", width: 211 },
      { name: "Behomy Group", src: "/clients/behomy-group.png", width: 209 },
      { name: "Sora Spring Cibubur", src: "/clients/sora-spring.png", width: 173 },
    ],
    [
      { name: "Dr Gadget", src: "/clients/dr-gadget.png", width: 169 },
      { name: "beHomy", src: "/clients/behomy.png", width: 137 },
      { name: "Tujju", src: "/clients/tujju.png", width: 128 },
      { name: "Corvel Jakarta Pusat", src: "/clients/corvel.png", width: 226 },
      { name: "Purnava Village", src: "/clients/purnava-village.png", width: 113 },
    ],
    [
      { name: "iRVi", src: "/clients/irvi.png", width: 97 },
      { name: "Comunee Coffee & Eatery", src: "/clients/comunee.png", width: 177 },
      { name: "Kedai Makmoer 88", src: "/clients/kedai-makmoer-88.png", width: 155 },
      { name: "8Bowls", src: "/clients/8bowls.png", width: 171 },
      { name: "Maxone Hotels", src: "/clients/maxone.png", width: 169 },
    ],
  ],
  more: "And many more.",
};

export const seo = {
  title: "SEO Management",
  tags: "Keyword Research · Article · SEO Audit · UI/UX Designer · etc.",
  bold: "From zero visibility to #1 on Google.",
  text: "Our SEO strategy consistently pushes brands into top rankings and even Google’s AI Overview spotlight.",
};

// Kartu event. href: link tujuan panah ↗ — BELUM ADA DATA (null = tidak bisa diklik).
export const events = {
  title: "Event Organizer",
  tags: "Offline Activation · Event Concept & Creative Direction · Brand Activation · Multimedia Coverage · etc.",
  items: [
    { title: "Talkshow with Tya Ariestya at Universitas Indonesia", src: "/events/talkshow-ui.webp", href: null },
    { title: "Badminton Community Event", src: "/events/badminton.webp", href: null },
    { title: "Gathering HomyEight", src: "/events/gathering-homyeight.webp", href: null },
    { title: "Seminar Behomy", src: "/events/seminar-behomy.webp", href: null },
    { title: "Poundfit Event: Behomy x Fit Hub", src: "/events/poundfit.webp", href: null },
    { title: "Corvel by Behomy Launch Event", src: "/events/corvel-launch.webp", href: null },
  ],
};

// Logo media, per baris seperti di desain (ukuran asli file = ukuran desain).
export const media = {
  title: "PR & Media Management",
  subtitle: "Strategic PR & Media Exposure to Elevate Brand Trust.",
  heading: "Featured across Indonesia’s leading media outlets.",
  rows: [
    [
      { name: "Antaranews.com", src: "/media/antaranews.png", w: 270, h: 50 },
      { name: "Liputan6", src: "/media/liputan6.png", w: 288, h: 55 },
    ],
    [
      { name: "SindoNews TV", src: "/media/sindonews-tv.png", w: 311, h: 33 },
      { name: "JPNN.com", src: "/media/jpnn.png", w: 106, h: 35 },
      { name: "iNews", src: "/media/inews.png", w: 129, h: 39 },
    ],
    [
      { name: "Republika", src: "/media/republika.png", w: 276, h: 39 },
      { name: "Media Indonesia", src: "/media/media-indonesia.png", w: 125, h: 39 },
      { name: "RMOL.ID", src: "/media/rmol.png", w: 148, h: 39 },
    ],
    [
      // PLACEHOLDER nama: logo burung ini belum diketahui nama medianya.
      { name: "Logo media (nama belum dikonfirmasi)", src: "/media/media-12.png", w: 39, h: 39 },
      { name: "tvOne", src: "/media/tvone.png", w: 144, h: 39 },
      { name: "MSN", src: "/media/msn.png", w: 101, h: 39 },
      { name: "Beritakini", src: "/media/beritakini.png", w: 38, h: 39 },
      { name: "MjNews.id", src: "/media/mjnews.png", w: 146, h: 39 },
    ],
    [{ name: "RCTI+", src: "/media/rcti-plus.png", w: 110, h: 38 }],
  ],
  more: "And many more.",
};

export const uiux = {
  title: "UI/UX Design",
  subtitle: "Providing end-to-end UI/UX design solutions to ensure consistent, user-friendly, and engaging digital products.",
};

export const cta = {
  title: ["Let’s Build", "Together"],
  question: "Tired of the noise?",
  text: "Let’s create opportunities for genuine growth by sharing meaningful stories, implementing impactful strategies, and establishing a presence that makes an impact when it matters most. We don’t just execute. We co-create with you, think with you, and build lasting systems.",
  closing: "Are you ready? Let’s start building what your brand truly needs.",
  // PLACEHOLDER: tujuan START NOW tidak tertulis di desain. Sementara ke WhatsApp BYC.
  href: externalLinks.whatsapp,
  external: true,
};
