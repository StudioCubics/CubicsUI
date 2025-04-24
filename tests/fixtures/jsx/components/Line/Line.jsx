import styles from "./Line.module.scss";

export default function Line({
  anime,
  className = "",
  length,
  orientation = "horizontal",
  sx,
  ...rest
}) {
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
