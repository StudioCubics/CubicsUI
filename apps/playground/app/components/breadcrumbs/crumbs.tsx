import { CubicsUIFavicon } from "@cubicsui/icons";
import Link from "next/link";

// Shared data: 10 crumbs so the collapsing examples show ellipses
const crumbs = Array.from({ length: 30 }, (_, i) => ({
  href: `/level-${i + 1}`,
  label: `Level ${i + 1}`,
}));

export const renderCrumbs = () =>
  crumbs.map(({ href, label }) => (
    <Link key={href} id={href} href={"#"}>
      {label}
    </Link>
  ));

export const renderStaticCrumbs = () => [
  <Link key="home" id="home" href="#">
    <CubicsUIFavicon style={{ width: "1.25em", height: "1.25em" }} />
  </Link>,
  <Link key="docs" id="docs" href="#">
    Docs
  </Link>,
  <Link key="api" id="api" href="#">
    API
  </Link>,
];
