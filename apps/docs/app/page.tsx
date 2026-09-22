import { Button } from "@cubicsui/components";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/components/inputs/button"}>
        <Button>Go to Button</Button>
      </Link>
    </>
  );
}
