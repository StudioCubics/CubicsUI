import { useComponentForm } from "@/library/contexts/ComponentFormContext";
import {
  ArrowBackRounded,
  RemoveCircleOutlineRounded,
  AddRounded,
} from "@mui/icons-material";
import { Stack, Tooltip, IconButton, TextField, Button } from "@mui/material";
import LinkLocalDependencyButton from "./LinkLocalDependencyButton";
import { createExternalDependency } from "@cubicsui/helpers";
import { DependencySectionLayout } from "../ComponentDependencies";

export default function LocalDependencyTable() {
  const { deps, setDeps, formPending } = useComponentForm();

  async function shiftFromLclToExt(index: number) {
    let lcl = [...deps.lcl],
      ext = [...deps.ext];
    ext.push(await createExternalDependency(lcl[index].name));
    lcl.splice(index, 1);
    setDeps({ lcl, ext });
  }

  function addLclDeps() {
    let lcl = [...deps.lcl];
    lcl.push({ name: "", cmpId: "" });
    setDeps({ ...deps, lcl });
  }

  function removeLclDeps(index: number) {
    let lcl = [...deps.lcl];
    lcl.splice(index, 1);
    setDeps({ ...deps, lcl });
  }

  return (
    <DependencySectionLayout title={"Local Dependencies"}>
      {deps.lcl.map((l, i) => {
        return (
          <Stack
            key={l.name}
            direction={"row"}
            alignItems={"center"}
            gap={1}
          >
            <Stack direction={"row"}>
              <Tooltip title={`Shift "${l.name}" to External Dependencies`}>
                <IconButton
                  disabled={formPending}
                  onClick={() => shiftFromLclToExt(i)}
                >
                  <ArrowBackRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Remove "${l.name}"`}>
                <IconButton
                  disabled={formPending}
                  onClick={() => removeLclDeps(i)}
                >
                  <RemoveCircleOutlineRounded color="error" />
                </IconButton>
              </Tooltip>
            </Stack>
            <TextField
              label={i == 0 ? "Relative Path" : undefined}
              name="depsLclName"
              value={l.name}
              fullWidth
              onChange={(e) => {
                let lclDeps = [...deps.lcl];
                lclDeps[i]["name"] = e.target.value;
                setDeps({ ...deps, lcl: lclDeps });
              }}
              disabled={formPending}
            />
            <LinkLocalDependencyButton index={i} />
          </Stack>
        );
      })}
      <Button
        variant="text"
        startIcon={<AddRounded />}
        onClick={addLclDeps}
        disabled={formPending}
      >
        Add Missing Local Dependency
      </Button>
    </DependencySectionLayout>
  );
}
