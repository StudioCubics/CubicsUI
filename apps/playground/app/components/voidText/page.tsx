import { PageLayout, VoidText } from "@cubicsui/components";
import { GhostIcon } from "@cubicsui/icons";

const voidSample = (
  <VoidText
    title={"Avoid the void"}
    subtitle="If you stare at the void long enough, the void starts staring back! wtf?"
    image={<GhostIcon />}
  />
);
export default function Page() {
  return (
    <PageLayout title={"<VoidText/>"}>
      <h2>Usage</h2>
      {voidSample}
      <h2>
        In <code>inline-size</code> container
      </h2>
      <div>
        <div
          style={{
            containerType: "inline-size",
            width: 250,
            height: 150,
            resize: "both",
            overflow: "auto",
            outline: "1px solid blue",
          }}
        >
          {voidSample}
        </div>
      </div>
    </PageLayout>
  );
}
