"use client";

import { SearchIcon, SpinnerIcon } from "@cubicsui/icons";
import { cn } from "@cubicsui/utils";
import {
  type KeyboardEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Card } from "../../Display/Card/Card";
import { CardContent } from "../../Display/Card/CardContent/CardContent";
import { CardHeader } from "../../Display/Card/CardHeader/CardHeader";
import { List } from "../../Display/List/List";
import { SearchHitExpandable } from "../../Display/SearchHit/SearchHitExpandable/SearchHitExpandable";
import { Dialog } from "../../Layout/Dialog/Dialog";
import { TextOrList } from "../../Typography/TextOrList/TextOrList";
import { VoidText } from "../../Typography/VoidText/VoidText";
import { CloseButton } from "../CloseButton/CloseButton";
import { Pressable } from "../Pressable/Pressable";
import { TextInput } from "../TextInput/TextInput";
import styles from "./SearchCenter.module.css";
import type { SearchCenterProps } from "./SearchCenter.types";
import { useSearchCenter } from "./useSearchCenter";

export function SearchCenter<
  T extends object = object,
  H extends string = string,
>(props: SearchCenterProps<T, H>): ReactElement {
  const {
    hits,
    renderHit,
    loading,
    error,
    trigger,
    contentIdle,
    contentEmpty,
    size = "sm",
    startAdornment,
    fullWidth = true,
    ImgComponent = "img",
    LinkComponent = "a",
    expandableHits,
    onDialogOpen,
    onDialogClose,
    onKeyDown,
    shortcutKey,
    ...rest
  } = props;

  const { open, handleDialogClose, handleDialogOpen } = useSearchCenter(props);
  const [internalQuery, setInternalQuery] = useState(String(rest.value ?? ""));
  const query = (
    rest.value !== undefined ? String(rest.value) : internalQuery
  ).trim();
  const noHits = hits.length == 0;
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented || hits.length === 0) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, hits.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        if (activeIndex < 0) break;
        e.preventDefault();
        listRef.current
          ?.querySelector<HTMLElement>('[data-active="true"]')
          ?.click();
        break;
    }
  }
  // Reset the highlighted hit whenever the query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [open, internalQuery]);

  // Keep the active hit visible while navigating
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [activeIndex]);
  return (
    <>
      <Pressable onClick={handleDialogOpen}>{trigger}</Pressable>
      <Dialog
        modal
        open={open}
        onClose={handleDialogClose}
        className={cn(styles.dialog)}
      >
        <Card removeBg size="xs" className={cn(styles.dialogCard)}>
          <CardHeader
            title={
              <TextInput
                autoFocus={open}
                size={"md"}
                {...rest}
                onChange={(e) => {
                  rest.onChange?.(e);
                  setInternalQuery(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                fullWidth={fullWidth}
                type="search"
                startAdornment={
                  <>
                    {startAdornment}{" "}
                    {loading ? <SpinnerIcon /> : <SearchIcon />}
                  </>
                }
              />
            }
            desc={
              <TextOrList text={error} role="alert" className={styles.error} />
            }
            actions={
              <CloseButton
                relative
                onClick={() => {
                  handleDialogClose();
                  setInternalQuery("");
                }}
              />
            }
          />
          <CardContent>
            <Card removeBg size="xs">
              {noHits && !query && contentIdle}
              {noHits && !!query && !loading && (
                <div role="status" aria-live="polite" className={styles.state}>
                  {typeof contentEmpty === "function"
                    ? contentEmpty(query)
                    : (contentEmpty ?? (
                        <VoidText
                          title={`No results for "${query}"`}
                          subtitle="Try a different keyword or check the spelling."
                        />
                      ))}
                </div>
              )}
              {hits.length > 0 && (
                <List
                  renderGlider
                  ref={listRef}
                  size={"lg"}
                  LinkComponent={LinkComponent}
                >
                  {hits.map((h, i) => {
                    const key =
                      "id" in h &&
                      (typeof h.id === "string" || typeof h.id === "number")
                        ? h.id
                        : i;
                    return (
                      <SearchHitExpandable
                        key={key}
                        hit={h}
                        active={i === activeIndex}
                        renderHit={renderHit}
                        expandableHits={expandableHits}
                        ImgComponent={ImgComponent}
                        LinkComponent={LinkComponent}
                      />
                    );
                  })}
                </List>
              )}
            </Card>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
}
