import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Switch,
} from "@cubicsui/components";
import { CssVarValue } from "./CssVarValue";
import { cn } from "@cubicsui/utils";
import styles from "./page.module.css";

export default function Page() {
  const gaps = [];
  for (let v = 1; v <= 32; v += 2 ** Math.floor(v / 8)) gaps.push(v);
  return (
    <main className={"main"}>
      <h1>Global Styles</h1>
      <h2>Spacing</h2>
      <section>
        <div className="grid">
          {gaps.map((n) => {
            const name = n === 1 ? "--gap" : `--gap-${n}`;
            return (
              <Card key={n}>
                <CardHeader title={<>var({name})</>} />
                <CardContent style={{ display: "flex" }}>
                  <Card fixedWidth="40px" variant="colored" color="primary" />
                  <Card
                    disablePadding
                    fixedWidth={`var(${name})`}
                    style={{ background: "var(--color-error-alpha)" }}
                  />
                  <Card fixedWidth="40px" variant="colored" color="secondary" />
                </CardContent>
                <CardFooter>
                  <CssVarValue name={name} />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
      <h2>Border Radii</h2>
      <section className={"row"}>
        {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].map((s) => (
          <Card
            centered
            disablePadding
            key={s}
            fixedWidth="90px"
            fixedHeight="90px"
            variant="colored"
            style={{
              borderRadius: `var(--br-${s})`,
              fontWeight: "bold",
              flexDirection: "column",
            }}
          >
            <span>--br-{s}</span>
            <CssVarValue name={`--br-${s}`} />
          </Card>
        ))}
      </section>
      <h2>Transitions</h2>
      <section className={"column"}>
        <h4>Timing function</h4>
        <p>
          --transition-tf: <CssVarValue name="--transition-tf" />
        </p>
        <hr />
        <h4>Times</h4>
        <h5>For general use if confused which to use use this.</h5>
        <p>
          --transition-time: <CssVarValue name="--transition-time" />
        </p>
        <TransitionExampleCard className={styles.transition} />

        <h5>
          For longer animations or when there are too many things going on
        </h5>
        <p>
          --transition-time-slow: <CssVarValue name="--transition-time-slow" />
        </p>
        <TransitionExampleCard className={styles.transition_slow} />

        <h5>For animations that respond to some user action, snappy </h5>
        <p>
          --transition-time-fast: <CssVarValue name="--transition-time-fast" />
        </p>
        <TransitionExampleCard className={styles.transition_fast} />
      </section>

      <h2>Backdrop Blur</h2>
      <section>
        <div className={"row image_bg"}>
          {["heavy", "light", "gradient"].map((b) => (
            <Card
              key={b}
              removeBg
              style={{ backdropFilter: `blur(var(--blur-${b}))` }}
              fixedHeight="250px"
              fixedWidth="250px"
              centered
            >
              --blur-{b} : <CssVarValue name={`--blur-${b}`} />
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
function TransitionExampleCard({ className }: { className: string }) {
  return (
    <Card disablePadding fixedWidth="200px" className={styles.transitionRoot}>
      <CardContent style={{ position: "relative", height: "50px" }}>
        <Card
          className={cn(styles.transitionBox, className)}
          variant="colored"
          fixedWidth="50px"
          fixedHeight="50px"
        />
      </CardContent>
      <CardFooter>
        <Switch label="Play/Pause" />
      </CardFooter>
    </Card>
  );
}
