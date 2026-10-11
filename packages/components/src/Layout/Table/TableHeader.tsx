import type { ReactElement } from "react";
import { PageHeader } from "../../Typography/PageHeader/PageHeader";
import type { PageHeaderProps } from "../../Typography/PageHeader/PageHeader.types";

export function TableHeader(props: PageHeaderProps): ReactElement {
  const { as = "h2", ...rest } = props;
  return <PageHeader {...rest} as={as} />;
}
