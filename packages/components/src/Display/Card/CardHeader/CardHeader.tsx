import type { ReactElement } from "react";
import { PageHeader } from "../../../Typography/PageHeader/PageHeader";
import type { PageHeaderProps } from "../../../Typography/PageHeader/PageHeader.types";

export function CardHeader(props: PageHeaderProps): ReactElement {
  const { as = "h3", ...rest } = props;
  return <PageHeader {...rest} as={as} data-slot={"card_header"} />;
}
