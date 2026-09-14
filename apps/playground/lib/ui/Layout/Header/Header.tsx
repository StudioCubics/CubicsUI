import Link from "next/link";
import { Settings } from "./Settings";
import styles from "./Header.module.css";
import { CubicsUIPlaygroundLogo } from "@/public/logos/CubicsUIPlaygroundLogo";

export function Header() {
  return (
    <nav className={styles.root}>
      <Link href="/">
        <span className={styles.logo}>
          <CubicsUIPlaygroundLogo />
        </span>
      </Link>
      <Settings />
    </nav>
  );
}
