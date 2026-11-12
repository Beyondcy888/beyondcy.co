import Navbar from "@/components/Navbar";

// Layout untuk website publik (Home, About, Work, Contact): semuanya memakai navbar.
// Halaman /login sengaja berada di luar grup ini karena desainnya tanpa navbar.
export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
