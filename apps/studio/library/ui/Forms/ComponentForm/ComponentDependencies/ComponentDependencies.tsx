"use client";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { AutoFixHighRounded } from "@mui/icons-material";
import CollapsibleSection from "@/library/ui/Layout/CollapsibleSection";
import { useComponentForm } from "@/library/contexts/ComponentFormContext";
import ExternalDependencyTable from "./ExternalDependencyTable";
import LocalDependencyTable from "./LocalDependencyTable/LocalDependencyTable";
import { dependencyAnalyser } from "@cubicsui/helpers";

export function DependencySectionLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Stack
      width={"100%"}
      gap={4}
    >
      <Typography variant="body2">{title}</Typography>
      <Stack gap={2}>{children}</Stack>
    </Stack>
  );
}

export default function ComponentDependencies() {
  const { scriptCode, setDeps, formState, formPending } = useComponentForm();

  async function analyseDependencies() {
    const newDeps = await dependencyAnalyser(scriptCode, { "@/*": ["./*"] });
    if (newDeps.ext.length !== 0 || newDeps.lcl.length !== 0) {
      setDeps(newDeps);
    }
  }

  return (
    <CollapsibleSection
      expanded
      title="Dependencies"
    >
      <Stack gap={3}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={3}
        >
          <Typography variant="body2">
            Dependencies are how components are linked with one another and
            between external packages found in npm registry, you can
            automatically analyse and add your dependencies.
            <br />
            <Typography
              component={"span"}
              variant="body2"
              color="text.primary"
            >
              Note* : Make sure all the dependencies are accounted for, and add
              dependencies that you think are missing below
            </Typography>
          </Typography>
        </Stack>
        <Button
          variant="text"
          onClick={analyseDependencies}
          startIcon={<AutoFixHighRounded />}
          sx={{ minWidth: "max-content" }}
          disabled={formPending}
        >
          Analyse Dependencies
        </Button>
        {formState?.errors?.deps && (
          <Typography
            color="error"
            component={"pre"}
          >
            {formState.errors.deps}
          </Typography>
        )}
        <Stack
          component={Paper}
          direction={"row"}
          gap={2}
          px={3}
          py={4}
        >
          <ExternalDependencyTable />
          <Divider
            orientation="vertical"
            flexItem
          />
          <LocalDependencyTable />
        </Stack>
      </Stack>
    </CollapsibleSection>
  );
}
