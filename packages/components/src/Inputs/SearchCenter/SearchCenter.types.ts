import type { KeyboardInput } from "@cubicsui/types";
import type { ReactNode } from "react";
import type { SearchHitExpandableProps } from "../../Display/SearchHit/SearchHit.types";
import type { TextInputProps } from "../TextInput/TextInput.types";

/**
 * @template T - the type of object the hit is
 * @template H - the type of href
 */
export type SearchCenterProps<
  T extends object = object,
  H extends string = string,
> = Omit<TextInputProps, "type"> &
  Pick<
    SearchHitExpandableProps<T, H>,
    "ImgComponent" | "LinkComponent" | "renderHit" | "expandableHits"
  > & {
    /** The node that triggers the dialog, it is wrapped in a `<Pressable/>` so anything can be passed and will act like a button */
    trigger: ReactNode;
    /** When the search results are still pending a spinner will show up instead of the hits */
    loading?: boolean;
    /** Query result hits */
    hits: T[];
    /** Shown when the query is empty (e.g. suggestions, recent searches) */
    contentIdle?: ReactNode;
    /** Shown when a query returned no hits. Receives the current query */
    contentEmpty?: ReactNode | ((query: string) => ReactNode);
    /** Triggers when the dialog opens */
    onDialogOpen?: () => void;
    /** Triggers when the dialog closes */
    onDialogClose?: () => void;
    /** KeyboardInput to be used for opening the Dialog */
    shortcutKey?: KeyboardInput;
  };

export interface UseSearchCenterReturn {
  open: boolean;
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
}
