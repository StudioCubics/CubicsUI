"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@cubicsui/icons";
import { cn } from "@cubicsui/utils";
import { createContext, type ReactElement, useContext } from "react";
import { GlassCard } from "../../Display/GlassCard/GlassCard";
import { Button } from "../Button/Button";
import styles from "./Rolodex.module.css";
import type { RolodexContextProps, RolodexProps } from "./Rolodex.types";
import { useRolodexContext } from "./useRolodexContext";

const RolodexContext = createContext<RolodexContextProps | null>(null);
export function useRolodex(): RolodexContextProps {
  const c = useContext(RolodexContext);
  if (!c)
    throw new Error("Components must be used inside the <Rolodex/> items");
  return c;
}

function Rolodex(props: RolodexProps): ReactElement {
  const { items, showButtons = false, blurMultiplier = 1.5 } = props;
  const {
    triggerRef,
    popoverRef,
    itemRefs,
    activeItem,
    activeIndex,
    visible,
    half,
    open,
    setOpen,
    openPopover,
    shift,
    distance,
    heightAt,
    offsetOf,
    onPopoverKeyDown,
    onPopoverToggle,
  } = useRolodexContext(props);
  return (
    <RolodexContext.Provider value={{ open, setOpen, activeItem }}>
      <div className={cn(styles.root)}>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(styles.trigger)}
          onClick={openPopover}
        >
          {activeItem?.node}
        </button>
        <div
          ref={popoverRef}
          popover="auto"
          role="dialog"
          aria-label="Select item"
          tabIndex={-1}
          className={cn(styles.popover)}
          onToggle={onPopoverToggle}
          onKeyDown={onPopoverKeyDown}
        >
          {showButtons && (
            <Button
              fullWidth
              type="button"
              className={cn(styles.step)}
              aria-label="Previous item"
              onClick={() => shift(-1)}
              tabIndex={-1}
            >
              <ChevronUpIcon />
            </Button>
          )}
          <div
            role="listbox"
            className={cn(styles.viewport)}
            style={{ height: half * 2 }}
          >
            {/* Wraps the active item, whatever its height */}
            <GlassCard
              aria-hidden
              className={cn(styles.highlight)}
              style={{ height: heightAt(activeIndex) }}
            />
            {items.map((item, index) => {
              const offset = offsetOf(index);
              const far = Math.abs(offset) > visible;

              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard is handled on the popover (arrows, Enter, Space)
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  role="option"
                  tabIndex={-1}
                  aria-selected={offset === 0}
                  className={cn(styles.item)}
                  style={{
                    // only vertical positioning, -50% centers the item on its slot
                    translate: `0 calc(${distance(activeIndex, offset)}px - 50%)`,
                    filter: `blur(${(Math.abs(offset) / (visible + 1)) * blurMultiplier}px)`,
                    opacity: far ? 0 : 1,
                    scale: 1 - Math.abs(offset) * 0.015,
                    pointerEvents: far ? "none" : undefined,
                  }}
                  // Clicking the centered item confirms it, any other item moves to the center
                  onClick={() => {
                    if (offset === 0) popoverRef.current?.hidePopover();
                    else shift(offset);
                  }}
                >
                  {item.node}
                </div>
              );
            })}
          </div>
          {showButtons && (
            <Button
              fullWidth
              type="button"
              className={cn(styles.step)}
              aria-label="Next item"
              onClick={() => shift(1)}
              tabIndex={-1}
            >
              <ChevronDownIcon />
            </Button>
          )}
        </div>
      </div>
    </RolodexContext.Provider>
  );
}

export { Rolodex };
