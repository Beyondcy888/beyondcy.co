> **Note (added when the site moved into this repo, Nov 2026).** This is the team's original README,
> kept as written. It describes the project as it was delivered. What is different now
> (see the [README](../README.md) in the repo root):
> - the site is a **static export on GitHub Pages**, not Vercel: `npm run build` writes `out/`,
>   and there is no `npm run start` (the "Deploy" section and the cache header in note 4 no longer apply);
> - the login page moved from `app/login/` to **`app/_login/`**: kept, not published, not linked;
> - files in `public/` are referenced through `asset()` from `lib/site.js` (the base path);
> - the `supabase/` folder mentioned below was not part of the delivered project folder.

# Website Beyondcy — beyondcy.co

Website company profile Beyondcy: **Home, About, Work, Contact** + tampilan **portal Login**.
Dibangun dengan **Next.js 15 (App Router, JavaScript)**, CSS Modules biasa (tanpa Tailwind),
dan ikon [Phosphor Icons](https://phosphoricons.com).

> **Status:** website publik selesai (desktop & HP) beserta animasinya.
> Login **baru tampilan** — belum terhubung ke sistem login/back office (lihat [Langkah berikutnya](#langkah-berikutnya-untuk-tim)).

---

## Daftar isi

1. [Menjalankan proyek](#menjalankan-proyek)
2. [Struktur folder](#struktur-folder)
3. [Mengubah konten & aset](#mengubah-konten--aset)
4. [Desain & tampilan](#desain--tampilan)
5. [Animasi](#animasi)
6. [Catatan kompatibilitas (penting)](#catatan-kompatibilitas-penting)
7. [Placeholder yang perlu diisi](#placeholder-yang-perlu-diisi)
8. [Login & back office](#login--back-office)
9. [Deploy](#deploy)
10. [Langkah berikutnya untuk tim](#langkah-berikutnya-untuk-tim)

---

## Menjalankan proyek

Butuh **Node.js 18.18+** (disarankan versi LTS terbaru).

```bash
npm install        # sekali saja
npm run dev        # mode pengembangan → http://localhost:3000
```

Mode produksi (lebih cepat, sama seperti di hosting):

```bash
npm run build
npm run start      # → http://localhost:3000
```

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm run lint` | Pemeriksaan kode (ESLint) |
| `npm run assets -- "<folder ASSETS - BYC WEBSITE>"` | Menyiapkan ulang semua gambar/video dari folder aset asli (butuh `ffmpeg`) |

**Tes dari HP:** jalankan mode produksi, lalu buka `http://<IP-komputer>:3000` dari HP di Wi-Fi yang sama.
Mode `dev` terasa lambat di HP — selalu tes HP dengan `build` + `start`.
Tidak ada variabel lingkungan (`.env`) yang dibutuhkan saat ini.

---

## Struktur folder

```
beyondcy-website/
├── app/
│   ├── layout.js            # kerangka HTML, font (Plus Jakarta Sans & Inter), CursorGlow
│   ├── globals.css          # warna, aturan dasar, animasi "muncul saat digulir"
│   ├── icon.png             # favicon (logo b)
│   ├── (site)/              # website publik — semua memakai Navbar
│   │   ├── layout.js
│   │   ├── page.js          # Home            + home.module.css
│   │   ├── about/           # About           + about.module.css
│   │   ├── work/            # Work            + work.module.css
│   │   └── contact/         # Contact         + contact.module.css
│   └── login/               # Portal login (tanpa navbar) — tampilan saja
├── components/              # komponen yang dipakai ulang (lihat tabel di bawah)
├── content/                 # SEMUA TEKS halaman (home, about, work, contact, login)
├── lib/site.js              # menu, link WhatsApp & sosial media, helper link WhatsApp
├── public/                  # gambar, logo, video yang sudah dioptimalkan
├── scripts/prepare-assets.mjs  # menyalin & mengecilkan aset dari folder aset asli
├── supabase/                # draf skrip database login (lihat bagian Login)
└── next.config.mjs          # izin akses dari HP (dev) & header cache halaman
```

### Komponen

| Komponen | Fungsi |
|---|---|
| `Navbar` | Navbar kapsul kaca; versi HP dengan menu ☰; gradasi gelap di atas saat digulir |
| `Reveal` (+ `Words`) | Animasi "muncul saat digulir" (dipakai hampir di semua bagian) |
| `Orbit` | Garis orbit Home: tergambar, berayun, 1 cahaya berputar per orbit |
| `ServiceCard` | Kartu Our Services — link WhatsApp dengan pesan per layanan, cahaya ikut kursor |
| `AboutVideo` | Video hero About (horizontal di desktop, vertikal di HP, autoplay loop tanpa suara) |
| `ScrollArrow` | Panah "gulir ke bawah" di tengah |
| `PillButton` | Tombol kapsul (EXPLORE, START NOW, CONTACT US) |
| `SocialLinks` | Ikon Instagram, LinkedIn, TikTok |
| `Glow` | Cahaya buram di latar (bergerak pelan) |
| `CursorGlow` | Cahaya interaktif: ikut kursor (desktop) / sentuhan jari (HP) di semua halaman |

---

## Mengubah konten & aset

- **Teks** → `content/*.js` (sudah diberi komentar per bagian).
- **Nomor WhatsApp & sosial media** → `lib/site.js`.
- **Pesan WhatsApp kartu layanan** → `serviceWhatsappMessage` di `content/home.js`
  (contoh: "Hello Beyondcy, i want to know more about your Brand Consultant Service").
- **Pesan WhatsApp "Register here"** di Login → `content/login.js`.
- **Logo klien / media, foto event** → `content/work.js` + file di `public/clients`, `public/media`, `public/events`.
- **Gambar/video** → ganti file di `public/` dengan nama yang sama, atau jalankan `npm run assets`.

| Folder `public/` | Isi |
|---|---|
| `brand/` | `logo-wordmark.png` (navbar), `logo-b.png` (About) |
| `clients/` | 14 logo klien |
| `media/` | 14 logo media |
| `events/` | 6 foto event |
| `work/` | `media-ipad.webp`, mockup laptop & iMac (`*-trim.webp`, dipotong rapat) |
| `video/` | `about-loop.mp4` (desktop), `about-vertical.mp4` (HP) + poster |
| `home/orbit.png` | Gambar orbit asli — **acuan** bentuk ellips di `Orbit.js` (tidak ditampilkan langsung) |

---

## Desain & tampilan

- **Warna** (diambil dari desain) ada di `:root` pada `app/globals.css`: latar `#0a0a0a`,
  hijau `#9ecd5a`, tombol Login `#799c46`, ungu `#8472b6` / `#686daf`.
- **Font:** Plus Jakarta Sans (teks) & Inter (menu/tombol) via `next/font/google`.
- **Batas HP/desktop:** `899px`. Gaya HP ada di bagian `@media (max-width: 899px)` tiap file CSS.
- **Gaya kaca (glass):** latar semi transparan + `backdrop-filter`. Di HP `backdrop-filter`
  sengaja dimatikan di kartu/tombol supaya ringan.
- **Orbit di HP:** dibuat sebagai "panggung" 402px yang diskalakan ke lebar layar
  (`--stage-scale`, diisi `Orbit.js`), sehingga susunannya sama di semua lebar HP.
- **Halaman Work di HP & desktop:** mockup SEO/UI-UX ditampilkan berdampingan sama besar
  (bukan posisi asli desain desktop) atas permintaan pemilik.

---

## Animasi

| Jenis | Di mana diatur |
|---|---|
| Muncul saat digulir (`up`, `blur`, `scale`, `sweep`, `words`, `stagger`, `left/right`, `spin`, `line`) | `components/Reveal.js` + bagian "ANIMASI" di `app/globals.css` |
| Hero Home: kilau berulang pada judul, cahaya "We're Beyondcy" | `home.module.css` (`heroLoop`, `kickerGlow`) |
| Gradasi latar bergerak (hero, Work, Login, kartu layanan) | kelas `drift-a`/`drift-b` (`globals.css`), `bgDrift` (`work.module.css`), `cardGlow` (`ServiceCard.module.css`) |
| Orbit | `components/Orbit.js` + `Orbit.module.css` |
| Cahaya ikut kursor/sentuhan | `components/CursorGlow.js` |

- Semua animasi otomatis **mati** bila pengguna mengaktifkan "Reduce Motion".
- **Pengaman:** bila JavaScript gagal/lambat, konten tetap muncul setelah 5 detik
  (`reveal-fallback` di `app/layout.js`).
- Lapisan gradasi yang bergerak dibuat **lebih lebar dari area tampilnya** supaya tepinya
  tidak pernah terlihat sebagai "kotak".

---

## Catatan kompatibilitas (penting)

Hal-hal ini sudah diuji dan sebaiknya **tidak diubah** tanpa tes di iPhone (Safari):

1. **Orbit — jangan pakai `pathLength` + `stroke-dasharray` untuk cahaya.** Safari iPhone
   menggambarnya berulang (beberapa cahaya per orbit). Cahaya sekarang digambar ulang tiap
   frame (`requestAnimationFrame`).
2. **Orbit — jangan pakai `vector-effect: non-scaling-stroke`.** Membuat gradasi warna garis
   salah di ukuran kecil. Ketebalan garis dijaga lewat variabel `--k`.
3. **Gradasi garis orbit** memakai `gradientUnits="objectBoundingBox"` (relatif terhadap bentuk
   tiap orbit) supaya warnanya sama di desktop & HP.
4. **Cache halaman:** `next.config.mjs` mengirim `Cache-Control: no-cache` untuk halaman supaya
   HP tidak menampilkan versi lama setelah update. Hosting (mis. Vercel) dapat mengatur ulang ini.
5. Teks HP tidak diperbesar otomatis (`text-size-adjust: 100%`) dan halaman tidak bisa digeser ke
   samping (`overflow-x: clip` di `main`).
6. Di Windows ini, compiler native Next (SWC) sempat diblokir kebijakan sistem sehingga build
   memakai versi WASM (lebih lambat, tetapi berhasil). Di komputer lain biasanya tidak terjadi.

---

## Placeholder yang perlu diisi

Cari kata `PLACEHOLDER` atau atribut `data-placeholder`:

- Tujuan tombol **EXPLORE** (sementara → `/work`) — `content/about.js`
- Tujuan tombol **START NOW** (sementara → WhatsApp) — `content/work.js`
- Link panah ↗ di **kartu event** (belum ada) — `content/work.js`
- Nama logo media "burung" (`media/media-12.png`) — `content/work.js`
- **Form login** belum terhubung — `app/login/LoginForm.js`

---

## Login & back office

**Yang sudah ada:** tampilan `/login` (desktop & HP), tombol "Back to Home", dan tautan
"Don't have a Beyondcy account? Register here" (→ WhatsApp). Saat tombol Login ditekan hanya
muncul pesan "Login portal is not connected yet."

**Belum dibuat (sengaja):** login sungguhan, pembagian peran Client/Team, back office
superadmin, Client / 360 Dashboard, dan Team / Tracker.

**Rencana yang sudah dibahas dengan pemilik:**
- Pengguna masuk dengan email + password; peran ditetapkan di back office.
- `client` → Client / 360 Dashboard, `team` → Team / Tracker.
- Back office hanya untuk `superadmin@beyondcy.co`: tambah email, ubah peran Client/Team,
  nonaktifkan, hapus.
- Semua pemeriksaan login & peran **di server**; password di-hash; tidak ada rahasia di frontend/repo.

**Draf database Supabase** ada di `supabase/` (`setup.sql` + `README.md`): tabel daftar akses
email→peran, log audit, fungsi `current_user_role()` / `is_superadmin()`, dan aturan RLS.
Sudah diuji di Postgres lokal (35 uji lolos) tetapi **belum dijalankan di project Supabase mana pun**
— silakan sesuaikan dengan kebutuhan dashboard & tracker.

Titik sambung di kode: fungsi `handleSubmit` di `app/login/LoginForm.js`.

---

## Deploy

Disarankan **Vercel** (paling mudah untuk Next.js):

1. Simpan proyek ke repositori Git (GitHub/GitLab).
2. Import ke Vercel → framework terdeteksi otomatis (build `npm run build`).
3. Hubungkan domain **beyondcy.co** di pengaturan domain Vercel.

Hosting lain yang mendukung Node.js juga bisa (`npm run build` lalu `npm run start`).

---

## Langkah berikutnya untuk tim

- [ ] Inisialisasi repositori Git & simpan proyek ini (proyek belum memakai Git).
- [ ] Isi placeholder di atas.
- [ ] Sepakati arsitektur login: Supabase (draf tersedia) atau lainnya, dan cara berbagi sesi dengan Tracker.
- [ ] Bangun login sungguhan, back office superadmin, Client / 360 Dashboard, integrasi Tracker.
- [ ] Uji di beberapa HP (iPhone Safari & Android Chrome) sebelum rilis.
- [ ] Deploy & hubungkan domain beyondcy.co.
