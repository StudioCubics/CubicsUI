import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link href={"/dashboard"}>Dashboard</Link>
    </div>
  );
}
