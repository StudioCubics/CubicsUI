import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";

function Item({ children, href }: { children: ReactNode; href: Route }) {
  return (
    <li>
      <h3>
        <Link href={href}>{children}</Link>
      </h3>
    </li>
  );
}
export default function Page() {
  return (
    <div className={"main"}>
      <h1>Components</h1>
      <h2>Display</h2>
      <ol className={"column"}>
        <Item href={"/components/chip"}>Chip ✅</Item>
        <Item href={"/components/glassCard"}>GlassCard ✅</Item>
        <Item href={"/components/card"}>Card 🚧</Item>
      </ol>
      <h2>Inputs</h2>
      <ol className={"column"}>
        <Item href={"/components/button"}>Button ✅</Item>
        <Item href={"/components/checkbox"}>Checkbox ✅</Item>
        <Item href={"/components/closeButton"}>CloseButton ✅</Item>
        <Item href={"/components/passwordInput"}>PasswordInput ✅</Item>
        <Item href={"/components/select"}>Select ✅</Item>
        <Item href={"/components/switch"}>Switch ✅</Item>
        <Item href={"/components/textAreaInput"}>TextAreaInput ✅</Item>
        <Item href={"/components/textInput"}>TextInput ✅</Item>
        <Item href={"/components/themeToggle"}>ThemeToggle ✅</Item>
      </ol>
      <h2>Layout</h2>
      <ol className="column">
        <Item href="/components/popover">Popover ✅</Item>
      </ol>
      <h2>Misc</h2>
      <ol className={"column"}>
        <Item href="/components/pointerLight">PointerLight 🚧</Item>
      </ol>
      <h2>Providers</h2>
      <ol className={"column"}>
        <Item href="/components/themeProvider">ThemeProvider ✅</Item>
      </ol>
      <h2>Typography</h2>
      <ol className={"column"}>
        <Item href="/">TextOrList ✅</Item>
      </ol>
    </div>
  );
}
