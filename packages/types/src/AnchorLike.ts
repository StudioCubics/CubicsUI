/** Anything that can be positioned against, a real element or a virtual one like the pointer in usePointerPosition */
export type AnchorLike = Pick<HTMLElement, "getBoundingClientRect">;
