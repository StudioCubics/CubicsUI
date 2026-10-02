import {
  Button,
  Card,
  CloseButton,
  PageHeader,
  type PageHeaderProps,
} from "@cubicsui/components";

const PageHeaderMap = (p: PageHeaderProps) => {
  return (["h1", "h2", "h3", "h4", "h5", "h6"] as PageHeaderProps["as"][]).map(
    (as) => (
      <Card key={as} fixedWidth="min(100%, 600px)">
        <PageHeader
          title={
            as &&
            (as === "h1"
              ? `Header ${as.slice(1)} (default)`
              : `Header ${as.slice(1)}`)
          }
          as={as}
          {...p}
        />
      </Card>
    ),
  );
};

export default function Page() {
  return (
    <main className="main">
      <PageHeader title={<code>{"<PageHeader/>"}</code>} />
      <h2>
        Polymorphic Component <code>as</code>
      </h2>
      <section>
        <p>You can use from h1 to h6</p>
        <PageHeaderMap />
      </section>
      <h2>
        With <code>desc</code>
      </h2>
      <section>
        <PageHeaderMap desc="This is a short description" />
      </section>
      <h2>
        With <code>actions</code>
      </h2>
      <section>
        <PageHeaderMap
          actions={<CloseButton relative />}
          desc="This is a short description"
        />
      </section>
      <h2>
        With multiple<code>actions</code>
      </h2>
      <section>
        <PageHeaderMap
          actions={
            <>
              <Button variant="contained" size="sm">
                Some action
              </Button>
              <Button variant="outlined" size="sm">
                Another action
              </Button>
            </>
          }
          desc="This is a short description"
        />
      </section>
    </main>
  );
}
