export type PositionHorizontal = "left" | "right" | "center";
export type PositionVertical = "top" | "bottom" | "center";

export type PositionString = `${PositionVertical} ${PositionHorizontal}`;
export type PositionStringExclude<E extends PositionString> = Exclude<
  PositionString,
  E
>;
export type PositionStringEdge = PositionStringExclude<"center center">;
