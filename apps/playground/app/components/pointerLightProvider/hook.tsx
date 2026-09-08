"use client";

import {
  Button,
  Card,
  CardHeader,
  usePointerLight,
} from "@cubicsui/components";

export function Hook() {
  const { setPtrLightProps, resetPointerProps } = usePointerLight();
  return (
    <section>
      <h3>Hover to change color of pointer light</h3>
      <Card
        fixedWidth={"350px"}
        onMouseEnter={() =>
          setPtrLightProps((p) => {
            return {
              ...p,
              colorA: "var(--color-error)",
              colorB: "var(--color-error)",
            };
          })
        }
        onMouseLeave={() => resetPointerProps()}
      >
        <CardHeader
          title={"Pointer will turn to error color when hovering on this"}
          action={
            <Button size="sm" color="error" variant="contained">
              Delete
            </Button>
          }
        />
      </Card>

      <h3>Hover to make pointer light dissapear</h3>
      <Card
        fixedWidth={"350px"}
        onMouseEnter={() =>
          setPtrLightProps((p) => {
            return {
              ...p,
              opacity: 0,
            };
          })
        }
        onMouseLeave={() => resetPointerProps()}
      >
        <CardHeader
          title={"Pointer will dissapear when hovering on this"}
          action={
            <Button size="sm" variant="contained">
              Magic
            </Button>
          }
        />
      </Card>
    </section>
  );
}
