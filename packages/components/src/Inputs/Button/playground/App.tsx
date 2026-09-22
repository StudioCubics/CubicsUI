import { content } from "./data";
import { Button } from "@cubicsui/components";
export default function Home() {
  return (
    <div>
      <Button variant="contained">{content}</Button>
    </div>
  );
}
