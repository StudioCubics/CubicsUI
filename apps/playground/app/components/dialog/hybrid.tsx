"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CloseButton,
  Dialog,
} from "@cubicsui/components";
import { useDisclosure } from "@cubicsui/hooks";

export function Hybrid() {
  const { open, handleToggle, handleClose } = useDisclosure();
  const {
    open: open2,
    handleToggle: handleToggle2,
    handleClose: handleClose2,
  } = useDisclosure();
  return (
    <section className={"column"}>
      <h3>Uncontrolled</h3>
      <div className="column">
        <Button
          variant="outlined"
          command="show-modal"
          commandfor="hybridDialog"
        >
          Uncontrolled modal
        </Button>
        <Dialog id={"hybridDialog"}>
          <Card>Controlled by Invoker Commands API</Card>
        </Dialog>
        <p>
          When the dialog is uncontrolled it can only be a modal as there is no
          <code>command="show"</code> but only <code>command="show-modal"</code>
          , Dont use <code>command="show-popover"</code>
        </p>
      </div>
      <hr />

      <h3>Controlled</h3>
      <div className="column">
        <Button variant="outlined" onClick={handleToggle}>
          {open ? "Close" : "Open"} controlled modal
        </Button>
        <Dialog
          modal
          open={open}
          onClose={handleClose}
          closedby="none"
          preventBackdropClick
        >
          <Card>
            <CardHeader
              actions={<CloseButton relative onClick={handleClose} />}
            />
            <CardContent>
              Controlled by the open prop, this can be prevented to close by
              using <code>preventBackdropClick</code> and{" "}
              <code>closedBy="none"</code> so only the cross in the top can be
              used to close this dialog.
            </CardContent>
          </Card>
        </Dialog>

        <Button variant="outlined" onClick={handleToggle2}>
          {open2 ? "Close" : "Open"} controlled dialog
        </Button>
        <Dialog
          open={open2}
          onClose={handleClose2}
          closedby="none"
          preventBackdropClick
        >
          <Card>
            <CardHeader
              actions={<CloseButton relative onClick={handleClose2} />}
            />
            <CardContent>
              Controlled by the open prop, this can be prevented to close by
              using <code>preventBackdropClick</code> and{" "}
              <code>closedBy="none"</code> so only the cross in the top can be
              used to close this dialog.
            </CardContent>
          </Card>
        </Dialog>
      </div>
    </section>
  );
}
