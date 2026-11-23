"use client";

import { Card, PageLayout, Pressable, TextInput } from "@cubicsui/components";
import Link from "next/link";
export default function Page() {
  return (
    <PageLayout title={"<Pressable/>"}>
      <Pressable onClick={() => console.log("hello")}>
        <TextInput label="Name" placeholder="Click anywhere" />
      </Pressable>
      <Pressable as={Link} href="#">
        <Card color="primary" variant="colored">
          This is actually an href
        </Card>
      </Pressable>
      <Pressable onClick={() => alert("Wont ripple")}>
        <Card color="error" variant="colored">
          No ripple here, since alert{"()"} blocks the browser from painting the
          animation
        </Card>
      </Pressable>
    </PageLayout>
  );
}
