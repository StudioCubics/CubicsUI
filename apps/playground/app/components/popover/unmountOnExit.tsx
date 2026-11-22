"use client";

import { Button, Card, Popover } from "@cubicsui/components";
import { useAnchorElement } from "@cubicsui/hooks";

export function UnmountOnExit() {
  const { anchorEl, open, handleClick, handleClose } = useAnchorElement();
  return (
    <div className={"column"}>
      <h3>Controlled</h3>
      <Button variant="outlined" onClick={handleClick}>
        {open ? "Close" : "Open"}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disablePortal
        unmountOnExit
      >
        <Card>Unmounted when closed</Card>
      </Popover>

      <h3>Uncontrolled</h3>
      <Button variant="outlined" popoverTarget="popover-uncontrolled-exit">
        Click to check
      </Button>
      <Popover id={"popover-uncontrolled-exit"} disablePortal unmountOnExit>
        <Card>
          Unmounted when closed
          <br />
          Should not be working as unmountOnExit only works when controlled
        </Card>
      </Popover>
    </div>
  );
}
