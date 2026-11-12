import styles from "./Glow.module.css";

// Cahaya buram di latar (seperti di hero Home dan halaman Login).
// color: "purple" | "green"
// style: posisi & ukuran, mis. { top: -200, left: -250, width: 800, height: 800 }
// className: kelas tambahan (mis. animasi bergerak pelan)
export default function Glow({ color = "purple", style, className = "" }) {
  return <div aria-hidden="true" className={`${styles.glow} ${styles[color]} ${className}`} style={style} />;
}
