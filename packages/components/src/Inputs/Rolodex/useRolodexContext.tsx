import {
  type KeyboardEvent,
  type ToggleEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { RolodexProps, UseRolodexContextReturn } from "./Rolodex.types";

export function useRolodexContext(
  props: RolodexProps,
): UseRolodexContextReturn {
  const {
    items,
    defaultValue,
    value: _value,
    itemsPerSide = 1,
    gap = 8,
    wheelStep = 100,
    onChange,
    onClose,
  } = props;
  const [value, setValue] = useState(defaultValue ?? items[0]?.id);
  const [open, setOpen] = useState(false);
  const [heights, setHeights] = useState<number[]>([]);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const wheelDelta = useRef(0);

  const count = items.length;
  const activeValue = _value ?? value;
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.id === activeValue),
  );
  const activeItem = items[activeIndex];
  // Never show more slots than there are items, otherwise items would repeat
  const visible = Math.min(itemsPerSide, Math.floor((count - 1) / 2));
  // Largest distance from an active item's center to the edge of its visible window,
  // over every possible active item, so the height never changes while shifting
  const half = Math.max(
    0,
    ...items.flatMap((_, a) =>
      [-1, 1].map(
        (side) =>
          Math.abs(distance(a, side * visible)) +
          heightAt(a + side * visible) / 2,
      ),
    ),
  );

  // Moves the active item by `delta` positions, wrapping around
  const shift = useCallback(
    (by: number) => {
      if (!count) return;
      const next = items[(activeIndex + by + count) % count];
      setValue(next.id);
      onChange?.(next.id);
    },
    [items, count, activeIndex, onChange],
  );
  const shiftRef = useRef(shift);

  function heightAt(i: number) {
    return heights[((i % count) + count) % count] ?? 0;
  }
  // Distance between the center of item `from` and the center of the item `d` positions away
  // (neighbours are half of both heights plus the gap apart)
  function distance(from: number, d: number) {
    const sign = Math.sign(d);
    let y = 0;
    for (let k = 0; k < Math.abs(d); k++) {
      y +=
        (heightAt(from + sign * k) + heightAt(from + sign * (k + 1))) / 2 + gap;
    }
    return sign * y;
  }

  function openPopover() {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;
    if (!trigger || !popover) return;
    const rect = trigger.getBoundingClientRect();
    const { style } = popover;
    style.width = `${rect.width}px`;
    style.left = `${rect.left}px`;
    // Centered on the trigger (translate: 0 -50% in CSS), so the active row lands on it
    style.top = `${rect.top + rect.height / 2}px`;
    popover.showPopover();

    // Items can only be measured once the popover is displayed
    setHeights(items.map((_, i) => itemRefs.current[i]?.offsetHeight ?? 0));
    // Enables transitions only after the first layout, so items don't fly in on open
    requestAnimationFrame(() => (popover.dataset.ready = ""));
    popover.focus({ preventScroll: true }); // so arrow keys work without tabbing in
  }

  // Shortest signed distance from the active item, so items wrap around
  function offsetOf(index: number) {
    let d = (index - activeIndex + count) % count;
    if (d > count / 2) d -= count;
    return d;
  }

  function onPopoverKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      shift(-1);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      shift(1);
    }
    if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
      e.preventDefault();
      popoverRef.current?.hidePopover();
    }
  }
  // Runs for every way the popover can open or close (outside click, Escape, hidePopover())
  function onPopoverToggle(e: ToggleEvent<HTMLDivElement>) {
    const isOpen = e.newState === "open";
    setOpen(isOpen);
    if (!isOpen) {
      delete e.currentTarget.dataset.ready;
      if (activeItem) onClose?.(activeItem.id);
    }
  }
  // Non-passive listener so the page doesn't scroll behind the list
  useEffect(() => {
    const el = popoverRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelDelta.current += e.deltaY;
      const steps = Math.trunc(wheelDelta.current / wheelStep);
      if (steps) {
        wheelDelta.current -= steps * wheelStep;
        shiftRef.current(steps);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [wheelStep]);

  // The popover is position: fixed, so close it if the page moves underneath
  useEffect(() => {
    if (!open) return;
    const close = () => popoverRef.current?.hidePopover();
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  return {
    triggerRef,
    popoverRef,
    itemRefs,
    activeItem,
    activeIndex,
    visible,
    half,
    open,
    openPopover,
    setOpen,
    shift,
    distance,
    heightAt,
    offsetOf,
    onPopoverKeyDown,
    onPopoverToggle,
  };
}
