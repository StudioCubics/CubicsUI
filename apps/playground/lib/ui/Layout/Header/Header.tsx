import Link from "next/link";
import { Settings } from "./Settings";
import styles from "./Header.module.css";

export function Header() {
  return (
    <nav className={styles.root}>
      <Link href="/">
        <span className={styles.logo}>Playground</span>
      </Link>
      <Settings />
    </nav>
  );
}
