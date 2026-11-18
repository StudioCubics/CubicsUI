import { type RefObject, useEffect, useState } from "react";

export function useInView(ref: RefObject<HTMLElement | null>): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" }, // start slightly before it enters the viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
