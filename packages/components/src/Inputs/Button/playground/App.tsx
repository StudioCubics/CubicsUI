import { Button } from "@cubicsui/components";
import { content } from "./data";
export default function Home() {
  return (
    <div>
      <Button variant="contained">{content}</Button>
    </div>
  );
}
