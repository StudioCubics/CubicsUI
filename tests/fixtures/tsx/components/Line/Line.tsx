import styles from "./Line.module.scss";
import { AnimatedDivProps } from "@/shared/interfaces/ElementProps";

interface LineProps extends AnimatedDivProps {
  length?: string;
  orientation?: "vertical" | "horizontal";
}
export default function Line({
  anime,
  className = "",
  length,
  orientation = "horizontal",
  sx,
  ...rest
}: LineProps) {
  return (
    <div
      className={`${styles[orientation]} ${styles.default} ${className}`}
      style={{
        height: orientation == "vertical" ? length : 0,
        width: orientation == "horizontal" ? length : 0,
        ...sx,
      }}
      {...anime}
      {...rest}
    />
  );
}
