import { type RefObject, useEffect, useRef } from "react";

/** Scrolls long text towards the left end to reveal the whole text */
export function useScrollLongText(): RefObject<HTMLElement | null> {
  const longTextRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!longTextRef.current || typeof window === "undefined") return;
    function handleScrollLongTextStart() {
      const el = longTextRef.current;
      if (!el) return;
      if (el.scrollWidth > el.clientWidth) {
        // Animate scroll to end, then reset
        el.style.transition = `text-indent ${el.scrollWidth / 60}s linear`;
        el.style.textIndent = `-${el.scrollWidth - el.clientWidth}px`;
      }
    }

    function handleScrollLongTextEnd() {
      const el = longTextRef.current;
      if (!el) return;
      el.style.transition = "text-indent 0.3s ease";
      el.style.textIndent = "0px";
    }
    const content = longTextRef.current;
    content.addEventListener("mouseenter", handleScrollLongTextStart);
    content.addEventListener("mouseleave", handleScrollLongTextEnd);
    return () => {
      content.removeEventListener("mouseenter", handleScrollLongTextStart);
      content.removeEventListener("mouseleave", handleScrollLongTextEnd);
    };
  }, []);

  return longTextRef;
}
