import type { ObjectWithId } from "@cubicsui/types";
import type {
  ComponentProps,
  ElementType,
  ReactElement,
  ReactNode,
} from "react";
import type {
  CardContentProps,
  CardFooterProps,
  CardProps,
} from "../../Display/Card/Card.types";
import type { ListProps } from "../../Display/List/List.types";
import type { DialogProps } from "../../Layout/Dialog/Dialog.types";
import type { PopoverProps } from "../../Layout/Popover/Popover.types";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";
import type { ButtonProps } from "../Button/Button.types";
import type {
  TextInputProps,
  TextInputSlotProps,
} from "../TextInput/TextInput.types";

type SearchResultConsumerType = ObjectWithId<Record<string, unknown>>;

export interface SearchInputBaseProps<
  Result extends SearchResultConsumerType = SearchResultConsumerType,
> {
  /** The type of trigger to be used if a ReactElement is passed then the
   * element should be able to recieve onClick handler
   * @type `full` - Shows the TextInput with an endAdornment of searchIcon
   * and the search query can be typed in it, when the `resultType={"dialog"}`
   * it acts as a trigger to open the dialog and sends focus to the TextInput inside the dialog
   * @type `icon` - Shows a search icon button with the searchIcon,
   * if the `resultType={"inline"}` or `resultType={"popover"}` then it expands a TextInput to type the search query.
   * @default "full" */
  triggerType?: "full" | "icon";
  /** The container that the results should be shown in.
   * @type `popover` - Shows the results in a Card in a Popover connected to the search query TextInput
   * @type `dialog` - Shows the results and the TextInput for the search query in a Card in a Dialog.
   * @type `inline` - Shows the results in a Card after the search query TextInput.
   * @default "inline" */
  resultType?: "inline" | "popover" | "dialog";

  /** The results in an array of type Result, make sure the Result object has unique keys */
  queryResults?: Result[];
  /** Renders a ListItem with an the `Result.key` if nothing is provided*/
  renderResult?: (o: Result) => ReactElement;
  /** The CardHeader component that will render on top of the results inside the Card */
  resultHeader?: ReactElement<PageHeaderProps>;
  /** The footer component that will render under the results inside the Card */
  resultFooter?: ReactElement<CardFooterProps>;
  /** If the search is ongoing or any other loading state */
  loading?: boolean;
  /** Custom loading spinner or text */
  renderLoading?: ReactNode;
  /** The search icon @default <SearchIcon/>  */
  searchIcon?: ReactNode;

  LinkComponent?: ElementType<{ href: string }>;
}

export interface SearchInputProps<
  Result extends SearchResultConsumerType = SearchResultConsumerType,
>
  extends Omit<TextInputProps, "slotProps">, SearchInputBaseProps<Result> {
  slotProps?: TextInputSlotProps & SearchInputSlotProps;
}

export interface SearchInputSlotProps {
  /** The props for the wrapper that wraps the TextInput and icon Button or only TextInput if the triggerType is full.*/
  trigger?: ComponentProps<"div">;
  /** The props for the icon Button containing the searchIcon */
  triggerButton?: ButtonProps;
  /** The props for the Card wrapping the CardContent containing the List */
  resultsCard?: CardProps;
  /** The props for the CardContent wrapping the List containing the results */
  resultsCardContent?: CardContentProps;
  /** The props for the List wrapping the ListItems results */
  resultsList?: ListProps;
  /** The props for the popover containing the resultCard, works when `resultType="popover"`*/
  resultsPopover?: PopoverProps;
  /** The props for the dialog containing the resultCard, works when `resultType="dialog"` */
  resultsDialog?: DialogProps;
}
export interface SearchInputContextProps extends SearchInputProps {}
