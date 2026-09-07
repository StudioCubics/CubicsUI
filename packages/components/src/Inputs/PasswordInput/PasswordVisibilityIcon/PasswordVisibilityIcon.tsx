import { useId, type ComponentProps, type ReactElement } from "react";
import { cn } from "@cubicsui/utils";
import styles from "./PasswordVisibilityIcon.module.css";

export function PasswordVisibilityIcon(
  props: ComponentProps<"svg"> & {
    closed?: boolean;
  },
): ReactElement {
  const { width = 24, height = width, closed, ...rest } = props;
  const id = useId();
  return (
    <svg
      fill="none"
      stroke="currentColor"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn("lucide", styles.root, closed ? styles.closed : "")}
    >
      <mask id={id} style={{ maskType: "luminance" }}>
        <path
          d="M2.06251 11.6519C1.97916 11.8764 1.97916 12.1234 2.06251 12.3479C2.87421 14.316 4.25202 15.9988 6.02128 17.183C7.79053 18.3671 9.87155 18.9993 12.0005 18.9993C14.1295 18.9993 16.2105 18.3671 17.9797 17.183C19.749 15.9988 21.1268 14.316 21.9385 12.3479C22.0218 12.1234 22.0218 11.8764 21.9385 11.6519C21.1268 9.68373 19.749 8.00091 17.9797 6.81677C16.2105 5.63263 14.1295 5.00049 12.0005 5.00049C9.87155 5.00049 7.79053 5.63263 6.02128 6.81677C4.25202 8.00091 2.87421 9.68373 2.06251 11.6519Z"
          fill="white"
          className={styles.eyelidMaskPath}
        />
      </mask>
      <g className={styles.eyeGroup}>
        <path
          d="M2.06251 11.6519C2.87421 9.68373 4.25202 8.00091 6.02128 6.81677C7.79053 5.63263 9.87155 5.00049 12.0005 5.00049C14.1295 5.00049 16.2105 5.63263 17.9797 6.81677C19.749 8.00091 21.1268 9.68373 21.9385 11.6519"
          className={styles.eyelidUpper}
        />
        <path d="M2.06251 11.6519C2.74835 13.7027 4.10913 15.4738 5.8979 16.7252C7.68667 17.9766 9.81695 18.6478 12 18.6478C14.1831 18.6478 16.3133 17.9766 18.1021 16.7252C19.8909 15.4738 21.2516 13.7027 21.9385 11.6519" />
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          mask={`url(#${id})`}
        />
        <path
          d="M14.2773 18.4019L14.9993 21.6519"
          className={styles.lashes}
          pathLength="1"
        />
        <path
          d="M18.2734 16.6021L19.9994 18.6521"
          className={styles.lashes}
          pathLength="1"
        />
        <path
          d="M5.726 16.6021L4 18.6521"
          className={styles.lashes}
          pathLength="1"
        />
        <path
          d="M9.722 18.4019L9 21.6519"
          className={styles.lashes}
          pathLength="1"
        />
      </g>
    </svg>
  );
}
