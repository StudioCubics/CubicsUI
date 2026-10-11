"use client";

import type { CubicsUISiteMapValue } from "@/app/meta";
import { Card, CardHeader, useRolodex } from "@cubicsui/components";
import { ChevronsUpDownIcon } from "@cubicsui/icons";

export function PkgSelectorCard(props: CubicsUISiteMapValue) {
  const { icon, label, pkg } = props;
  const { open } = useRolodex();
  return (
    <Card size="sm">
      <CardHeader
        as="h6"
        title={
          <>
            {icon} {label}
          </>
        }
        desc={pkg}
        actions={
          !open && <ChevronsUpDownIcon color="var(--color-on-background-low)" />
        }
      />
    </Card>
  );
}
