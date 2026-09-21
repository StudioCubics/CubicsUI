import type { ReactElement } from "react";
import styles from "./ComboBox.module.css";
import { cn } from "@cubicsui/utils";
import type { ComboBoxChipsProps } from "./ComboBox.types";
import { Chip } from "../../Display/Chip/Chip";

export function ComboBoxChips<T>(props: ComboBoxChipsProps<T>): ReactElement {
  const { name, size, selected, options, getOptionKey, removeChip } = props;
  return (
    <div className={cn(styles.chips)}>
      {selected.map((val, i) => {
        const opt = options?.find(
          (o) =>
            (o.type === "item" || o.type === undefined) &&
            getOptionKey(o) === val,
        );
        const optLabel = opt && opt.type == "item" ? opt.label : String(val);
        const optIcon = opt && opt.type == "item" ? opt.icon : undefined;
        return (
          <Chip
            variant="outlined"
            key={i}
            size={size === "xs" || size === "xl" ? "md" : size}
            onClose={(e) => {
              e.stopPropagation();
              removeChip(val);
            }}
            icon={optIcon}
          >
            {optLabel}
            {name && <input type="hidden" name={name} value={String(val)} />}
          </Chip>
        );
      })}
    </div>
  );
}
