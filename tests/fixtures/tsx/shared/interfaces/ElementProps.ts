import { IAos } from "@/shared/interfaces/AOS";
//@ts-ignore
import { CSSProperties } from "react";

export interface AnimatedDivProps extends CommonProps {
  anime?: IAos;
}
export interface CommonProps {
  id?: string;
  sx?: CSSProperties;
  className?: string;
}
