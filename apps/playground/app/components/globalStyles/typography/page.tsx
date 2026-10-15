import { Select } from "@cubicsui/components";
import { CssVarValue } from "../CssVarValue";
import styles from "./page.module.css";
import { cn } from "@cubicsui/utils";

const text = `
  The quick brown fox jumps over the lazy dog
        \n
        THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
        \n
        0123456789!@#$%^&*()_-+=[]{}\\/|<>?,.\`~*
      `;
function TypographyDisplay({ fm, fs }: { fm?: string; fs?: string }) {
  return (
    <div className={cn(styles.display, "column", "row_separator")}>
      {fm && (
        <p>
          {fm}: <CssVarValue name={fm} />
        </p>
      )}
      {fs && (
        <p>
          {fs}: <CssVarValue name={fs} />
        </p>
      )}
      <div
        style={{
          fontSize: `var(${fs ?? "--font-xl"})`,
          fontFamily: fm ? `var(${fm})` : undefined,
        }}
      >
        {text}
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <main className="main">
      <h1>Typography</h1>
      <h2>Font family</h2>
      <section>
        <h3>Header font</h3>
        <TypographyDisplay fm="--font-h" />
        <h3>Paragraph font</h3>
        <TypographyDisplay fm="--font-p" />
        <h3>Code font</h3>
        <TypographyDisplay fm="--font-c" />
      </section>
      <h2>Font Sizes</h2>
      <section className="column">
        <div className={cn(styles.ffControlled, "column")}>
          <h3>Static Sizes</h3>
          <Select fullWidth label="Select Font Family" defaultValue={"p"}>
            <option value="h">--font-h</option>
            <option value="p">--font-p</option>
            <option value="c">--font-c</option>
          </Select>
          <div className={cn(styles.ff, "column")}>
            {[
              "xs",
              "sm",
              "md",
              "lg",
              "xl",
              "2xl",
              "3xl",
              "4xl",
              "5xl",
              "6xl",
              "7xl",
              "8xl",
              "9xl",
            ].map((s) => (
              <TypographyDisplay key={s} fs={`--fs-${s}`} />
            ))}
          </div>
        </div>
        <div className={cn(styles.ffControlled, "column")}>
          <h3>Responsive Sizes</h3>
          <Select fullWidth label="Select Font Family" defaultValue={"p"}>
            <option value="h">--font-h</option>
            <option value="p">--font-p</option>
            <option value="c">--font-c</option>
          </Select>
          <div className={cn(styles.ff, "column")}>
            {[
              "caption",
              "code",
              "body2",
              "body",
              "subtitle",
              "h6",
              "h5",
              "h4",
              "h3",
              "h2",
              "h1",
              "display",
              "display-lg",
            ].map((s) => (
              <TypographyDisplay key={s} fs={`--fs-${s}`} />
            ))}
          </div>
        </div>
      </section>
      <h2>Line Heights</h2>
      <section>
        {["none", "tight", "snug", "normal", "relaxed", "loose"].map((lh) => (
          <div key={lh} className={"column row_separator"}>
            <h3>
              --lh-{lh}: <CssVarValue name={`--lh-${lh}`} />
            </h3>
            <p style={{ lineHeight: `var(--lh-${lh})` }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              fuga rerum ipsam, dolore aut repellendus earum vel doloribus
              distinctio, cumque inventore asperiores sapiente excepturi nulla
              provident omnis, neque explicabo? Voluptates. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Optio fuga rerum ipsam,
              dolore aut repellendus earum vel doloribus distinctio, cumque
              inventore asperiores sapiente excepturi nulla provident omnis,
              neque explicabo? Voluptates.
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              fuga rerum ipsam, dolore aut repellendus earum vel doloribus
              distinctio, cumque inventore asperiores sapiente excepturi nulla
              provident omnis, neque explicabo? Voluptates.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
