import { Button } from "@cubicsui/components";
import { content } from "./data";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
      }}
    >
      <Button variant="contained">{content}</Button>
    </div>
  );
}
