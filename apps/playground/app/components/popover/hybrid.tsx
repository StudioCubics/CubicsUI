"use client";

import { Button, Card, Popover } from "@cubicsui/components";
import { useAnchorElement } from "@cubicsui/hooks";

export function Hybrid() {
  const { anchorEl, open, handleClick, handleClose } = useAnchorElement();
  return (
    <section className={"column"}>
      <h3>Uncontrolled</h3>
      <Button variant="outlined" popoverTarget="hybridPopover">
        Uncontrolled popover
      </Button>
      <Popover id={"hybridPopover"}>
        <Card>Controlled by :popover-open</Card>
      </Popover>
      <h3>Controlled</h3>
      <hr />
      <Button variant="outlined" onClick={handleClick}>
        {open ? "Close" : "Open"} controlled popover
      </Button>
      <Popover
        positionArea="center left"
        
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Card>Controlled by the open prop</Card>
      </Popover>
    </section>
  );
}
