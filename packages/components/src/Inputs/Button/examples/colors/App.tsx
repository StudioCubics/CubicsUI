import { Button, type ButtonProps } from "@cubicsui/components";
export default function App() {
  const variants: ButtonProps["variant"][] = [
    undefined,
    "outlined",
    "contained",
  ];
  const colors: ButtonProps["color"][] = [
    undefined,
    "primary",
    "secondary",
    "tertiary",
    "error",
    "warn",
    "success",
  ];
  return (
    <div>
      {variants.map((v) => (
        <div key={v ?? "default"}>
          {v ?? "default"}
          {colors.map((c) => (
            <Button key={c ?? "default"} variant={v} color={c}>
              {c ?? "default"}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
