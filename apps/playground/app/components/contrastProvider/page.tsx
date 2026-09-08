import { Button, Card, Checkbox, TextInput } from "@cubicsui/components";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<ContrastProvider/>"}</code>
      </h1>
      <h2>Using in the root</h2>
      <section>
        <p>
          Wrap the RootLayout with the provider and, make sure to add the{" "}
          <code>suppressHydrationWarning</code> to the html tag
        </p>
        <code>
          <pre>{`
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ContrastProvider>
          {children}
        </ContrastProvider>
      </body>
    </html>
  );
}
          `}</pre>
        </code>
      </section>
      <h2>Using in a Component</h2>
      <section>
        <p>
          You can set a component to be high contrast by setting the{" "}
          <code>data-contrast</code> attribute of the component to true.
        </p>
        <h3>
          Set <code>data-contrast="true"</code> in <code>{"<Card/>"}</code>
        </h3>
        <p> This will always be high contrast mode</p>
        <Card data-contrast={"true"} className="column">
          <Button variant={"contained"}>Button</Button>
          <Button variant={"contained"} color="primary">
            Button
          </Button>
          <TextInput label="TextInput" />
          <Checkbox label="Checkbox" />
          <Checkbox label="Checkbox" color="primary" />
        </Card>
        <h3>Same card without it</h3>
        <Card className="column">
          <Button variant={"contained"}>Button</Button>
          <Button variant={"contained"} color="primary">
            Button
          </Button>
          <TextInput label="TextInput" />
          <Checkbox label="Checkbox" />
          <Checkbox label="Checkbox" color="primary" />
        </Card>
      </section>
    </main>
  );
}
