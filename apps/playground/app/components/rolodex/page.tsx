import { Card, PageHeader, Rolodex } from "@cubicsui/components";

export default function Page() {
  return (
    <main className="main">
      <PageHeader title={<code>{"<Rolodex/>"}</code>} />
      <section>
        <div
          className={"image_bg column"}
          style={{ height: "50vh", justifyContent: "center" }}
        >
          <Rolodex
            defaultValue="value3"
            items={[
              {
                id: "value0",
                node: (
                  <Card fullWidth variant="contained">
                    Value 0
                    <br />
                    with a br
                  </Card>
                ),
              },
              {
                id: "value1",
                node: (
                  <Card fullWidth variant="contained">
                    Value 1
                  </Card>
                ),
              },
              {
                id: "value2",
                node: (
                  <Card fullWidth variant="contained">
                    Value 2
                  </Card>
                ),
              },
              {
                id: "value3",
                node: (
                  <Card fullWidth variant="contained">
                    Value 3
                  </Card>
                ),
              },
              {
                id: "value4",
                node: (
                  <Card fullWidth variant="contained">
                    Value 4
                  </Card>
                ),
              },
              {
                id: "value5",
                node: (
                  <Card fullWidth variant="contained">
                    Value 5
                  </Card>
                ),
              },
              {
                id: "value6",
                node: (
                  <Card fullWidth variant="contained">
                    Value 6
                  </Card>
                ),
              },
              {
                id: "value7",
                node: (
                  <Card fullWidth variant="contained">
                    Value 7
                  </Card>
                ),
              },
              {
                id: "value8",
                node: (
                  <Card fullWidth variant="contained">
                    Value 8
                  </Card>
                ),
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
