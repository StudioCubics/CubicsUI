import {
  KBD_BUTTON_LIST,
  Kbd,
  type KbdProps,
  type KeyCombo,
  PageLayout,
} from "@cubicsui/components";

const sizes: NonNullable<KbdProps["size"]>[] = ["xs", "sm", "md", "lg", "xl"];

const combos: KeyCombo[] = [
  ["Ctrl", "C"],
  ["Ctrl", "Shift", "P"],
  ["Alt", "Tab"],
  ["⌘", "K"],
  ["Ctrl", "Alt", "Delete"],
  ["⏮", "⏯", "⏭"],
];

// Every key in buttonList, to verify each one renders correctly
const allKeys = Object.keys(KBD_BUTTON_LIST);

export default function Page() {
  return (
    <PageLayout title={<code>{"<Kbd />"}</code>}>
      <h2>Usage</h2>
      <Kbd buttons={["Ctrl", "C"]} />

      <h2>Combos</h2>
      {combos.map((buttons) => (
        <div key={buttons.join("+")}>
          <Kbd buttons={buttons} />
        </div>
      ))}

      <h2>Sizes</h2>
      {sizes.map((s) => (
        <div key={s}>
          <code>{s}</code> <Kbd size={s} buttons={["Ctrl", "Shift", "P"]} />
        </div>
      ))}

      <h2>Multi-line keys</h2>
      <Kbd
        buttons={["Tab", "CapsLock", "PrintScreen", "ScrollLock", "NumLock"]}
      />

      <h2>Special characters</h2>
      <Kbd
        buttons={["<", ">", "&", '"', "'", "{", "}", "[", "]", "Backslash"]}
      />

      <h2>Custom class</h2>
      <Kbd className="custom" buttons={["Esc"]} />

      <h2>Realistic</h2>
      <Kbd size="xl" realistic buttons={[" "]} />
      {sizes.map((s) => (
        <div key={s}>
          <code>{s}</code>{" "}
          <Kbd realistic size={s} buttons={["Ctrl", "Shift", "P"]} />
        </div>
      ))}

      <h2>All keys</h2>
      <div className="row">
        {allKeys.map((k) => (
          <div key={k}>
            <code>{k}</code> <Kbd buttons={[k]} />
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
