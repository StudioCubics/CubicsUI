/**
 * Use for img video etc kinda elements
 */
export interface MediaProps {
  src: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  alt: string;
  [key: string]: unknown;
}
