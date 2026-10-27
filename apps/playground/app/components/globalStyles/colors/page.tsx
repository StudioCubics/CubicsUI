import { Card } from "@cubicsui/components";
import type { ReactNode } from "react";
import { CssVarValue } from "../CssVarValue";

function ColorPatch({
  color = "var(--color-on-background)",
  background,
  children,
}: {
  color?: string;
  background: string;
  children: ReactNode;
}) {
  return (
    <Card
      centered
      fixedWidth="40%"
      fixedHeight="90px"
      style={{
        color,
        background,
      }}
    >
      {children}
    </Card>
  );
}
function ColorPatchSoloColor({
  name,
  color,
}: {
  name: string;
  color?: string;
}) {
  return (
    <ColorPatch color={color} background={`var(--color-${name})`}>
      <b>{name}</b>
      <p>
        --color-{name} : <CssVarValue name={`--color-${name}`} />
      </p>
    </ColorPatch>
  );
}
function ColorPatchOnColor({
  name,
  color = `var(--color-on-${name})`,
}: {
  name: string;
  color?: string;
}) {
  return (
    <ColorPatch color={color} background={`var(--color-${name})`}>
      <b>{name}</b>
      <p>
        --color-{name} : <CssVarValue name={`--color-${name}`} />
      </p>
      <p>
        --color-on-{name} : <CssVarValue name={`--color-on-${name}`} />
      </p>
    </ColorPatch>
  );
}
export default function Page() {
  return (
    <main className="main">
      <h1>Colors</h1>
      <h2>Brand Colors</h2>
      <section>
        {["primary", "secondary", "tertiary"].map((b) => (
          <div key={b} className={"row"}>
            {[`${b}`, `${b}-container`].map((t) => {
              return <ColorPatchOnColor key={t} name={t} />;
            })}
          </div>
        ))}
      </section>
      <h2>State Colors</h2>
      <section>
        {["error", "warn", "success"].map((b) => (
          <div key={b} className={"row"}>
            {[`${b}`, `${b}-container`].map((t) => {
              return <ColorPatchOnColor key={t} name={t} />;
            })}
          </div>
        ))}
      </section>
      <h2>Surface Colors</h2>
      <section>
        <div className={"row"}>
          <ColorPatchOnColor name="background" />
          <ColorPatchOnColor name="surface" />
          <ColorPatchSoloColor name="surface-high" />
          <ColorPatchSoloColor name="surface-highest" />
          <ColorPatchSoloColor name="surface-dim" />
          <ColorPatchSoloColor name="surface-bright" />
          <ColorPatchSoloColor name="input-surface" />
        </div>
      </section>
      <h2>Alpha Colors</h2>
      <section>
        <div className={"row"}>
          {["primary", "secondary", "tertiary", "error", "warn", "success"].map(
            (a) => (
              <ColorPatchSoloColor key={a} name={`${a}-alpha`} />
            ),
          )}
        </div>
      </section>
      <h2>Misc Colors</h2>
      <section>
        <div className={"row"}>
          <ColorPatchSoloColor name="outline" />
          <ColorPatchSoloColor name="shadow" />
          <ColorPatchSoloColor name="scrim" />
          <ColorPatchSoloColor name="focus" color="var(--color-surface)" />
        </div>
      </section>
    </main>
  );
}
