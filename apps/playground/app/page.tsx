import { Button } from "@cubicsui/components";
import Link from "next/link";

export default function Page() {
  return (
    <main className="main">
      <h1>Welcome to CubicsUI Playground</h1>
      <Link href="/components">
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
