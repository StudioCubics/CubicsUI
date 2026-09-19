import { Hook } from "./hook";

export default function Page() {
  return (
    <main className="main">
      <h1>
        <code>{"<PointerLightProvider/>"}</code>
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
        <PointerLightProvider>
          {children}
        </PointerLightProvider>
      </body>
    </html>
  );
}
          `}</pre>
        </code>
      </section>
      <h2>
        <code>usePointerLight</code>
      </h2>
      <Hook />
    </main>
  );
}
