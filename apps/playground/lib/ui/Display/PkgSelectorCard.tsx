"use client";

import { Card, CardHeader, useRolodex } from "@cubicsui/components";
import { ChevronsUpDownIcon } from "@cubicsui/icons";
import type { ReactNode } from "react";

export interface PkgSelectorCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  desc?: string;
}

export function PkgSelectorCard(props: PkgSelectorCardProps) {
  const { icon, title, desc, id } = props;
  const { open, activeItem } = useRolodex();
  const isActive = activeItem.id === id;
  return (
    <Card size="sm" color={open && isActive ? "primary" : undefined}>
      <CardHeader
        as="h6"
        title={
          <>
            {icon} {title}
          </>
        }
        desc={desc}
        actions={
          !open && <ChevronsUpDownIcon color="var(--color-on-background-low)" />
        }
      />
    </Card>
  );
}
