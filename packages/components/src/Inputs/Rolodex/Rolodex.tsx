"use client";

import { type ReactElement } from "react";
import type { RolodexProps } from "./Rolodex.types";
import { cn } from "@cubicsui/utils";
import styles from "./Rolodex.module.css";
import { GlassCard } from "../../Display/GlassCard/GlassCard";
import { Button } from "../Button/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@cubicsui/icons";
import { useRolodexContext } from "./useRolodexContext";

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
    openList,
    setOpen,
    shift,
    distance,
    heightAt,
    offsetOf,
    onPopoverKeyDown,
  } = useRolodexContext(props);
  return (
    <div className={cn(styles.root)}>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(styles.trigger)}
        onClick={openList}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openList();
          }
        }}
      >
        {activeItem?.node}
      </div>

      <div
        ref={popoverRef}
        popover="auto"
        tabIndex={-1}
        className={cn(styles.popover)}
        onToggle={(e) => {
          setOpen(e.newState === "open");
          if (e.newState === "closed") delete e.currentTarget.dataset.ready;
        }}
        onKeyDown={onPopoverKeyDown}
      >
        {showButtons && (
          <Button
            fullWidth
            type="button"
            className={cn(styles.step)}
            aria-label="Previous item"
            onClick={() => shift(-1)}
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
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                role="option"
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
                onClick={() =>
                  offset === 0
                    ? popoverRef.current?.hidePopover()
                    : shift(offset)
                }
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
          >
            <ChevronDownIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export { Rolodex };
