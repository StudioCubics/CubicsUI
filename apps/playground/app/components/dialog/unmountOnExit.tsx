"use client";

import { Button, Card, Dialog } from "@cubicsui/components";
import { useDisclosure } from "@cubicsui/hooks";

export function UnmountOnExit() {
  const { open, handleOpen, handleClose } = useDisclosure();
  return (
    <section className={"column"}>
      <h3>Controlled</h3>
      <Button variant="outlined" onClick={handleOpen}>
        {open ? "Close" : "Open"}
      </Button>
      <Dialog open={open} onClose={handleClose} disablePortal unmountOnExit>
        <Card>Unmounted when closed</Card>
      </Dialog>

      <h3>Uncontrolled</h3>
      <Button
        variant="outlined"
        command="show-modal"
        commandfor="dialog-uncontrolled-exit"
      >
        Click here
      </Button>
      <Dialog id={"dialog-uncontrolled-exit"} disablePortal unmountOnExit>
        <Card>Unmounted when closed</Card>
      </Dialog>
    </section>
  );
}
