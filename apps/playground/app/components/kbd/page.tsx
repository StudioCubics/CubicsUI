import {
  KBD_BUTTON_LIST,
  Kbd,
  type KbdKeys,
  type KbdProps,
  PageLayout,
} from "@cubicsui/components";
import { KeyboardEventTest } from "./keyboardEventTest";

const sizes: NonNullable<KbdProps["size"]>[] = ["xs", "sm", "md", "lg", "xl"];
const colors: NonNullable<KbdProps["color"]>[] = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "warn",
  "success",
];

const combos: KbdKeys[] = [
  ["Control", "C"],
  ["Control", "Shift", "P"],
  ["Alt", "Tab"],
  ["Meta", "K"],
  ["Control", "Alt", "Delete"],
  ["MediaTrackPrevious", "MediaPlayPause", "MediaStop", "MediaTrackNext"],
  ["Custom key", "This is also a key"],
];

export default function Page() {
  return (
    <PageLayout title={<code>{"<Kbd />"}</code>}>
      <h2>Usage</h2>
      <Kbd keys={["Ctrl", "C"]} />

      <h2>Combos</h2>
      {combos.map((buttons, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: dqweqw
        <div key={i}>
          <Kbd keys={buttons} />
        </div>
      ))}

      <h2>Sizes</h2>
      {sizes.map((s) => (
        <div className={"column"} key={s}>
          <code>{s}</code> <Kbd size={s} keys={["Ctrl", "Shift", "P"]} />
        </div>
      ))}
      <h2>Colors</h2>
      {colors.map((s) => (
        <div className={"column"} key={s}>
          <code>{s}</code>{" "}
          <Kbd color={s} fitContent keys={["Ctrl", "Shift", "P"]} />
        </div>
      ))}

      <h2>Multi-line keys</h2>
      <Kbd keys={["Tab", "CapsLock", "PrintScreen", "ScrollLock", "NumLock"]} />

      <h2>Special characters</h2>
      <Kbd keys={["<", ">", "&", '"', "'", "{", "}", "[", "]", "Backslash"]} />

      <h2>Custom class</h2>
      <Kbd className="custom" keys={["Esc"]} />

      <h2>Realistic</h2>
      <div className="column">
        <div className="row">
          <Kbd size="xl" realistic keys={[" "]} />
          <Kbd size="xl" realistic fitContent keys={["BigButtonBabeee"]} />
        </div>
        <div className={"row"}>
          {sizes.map((s) => (
            <div className={"column"} key={s}>
              <code>{s}</code>{" "}
              <Kbd realistic size={s} keys={["Ctrl", "Shift", "P"]} />
            </div>
          ))}
        </div>
      </div>
      <h2>Fit Content</h2>
      <div className="column">
        <div className="row">
          <Kbd size="xl" keys={["BigButtonBabeee"]} />
          <Kbd size="xl" fitContent keys={["BigButtonBabeee"]} />
        </div>
        <div className="row">
          <Kbd size="xl" realistic keys={["BigButtonBabeee"]} />
          <Kbd size="xl" realistic fitContent keys={["BigButtonBabeee"]} />
        </div>
      </div>

      <h2>All mapped keys</h2>
      <div className="row">
        {Object.entries(KBD_BUTTON_LIST).map(([key, props]) => (
          <div key={key}>
            <code>{key}</code>
            <Kbd keys={[key]} />
            <small>{props.content}</small>
          </div>
        ))}
      </div>
      <h2>Test key event</h2>
      <KeyboardEventTest />
    </PageLayout>
  );
}
