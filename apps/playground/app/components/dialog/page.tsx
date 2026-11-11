"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CloseButton,
  Dialog,
  PageLayout,
} from "@cubicsui/components";
import { useDisclosure } from "@cubicsui/hooks";
import { type ComponentProps, type ReactNode, useState } from "react";

type DemoProps = Omit<ComponentProps<typeof Dialog>, "open" | "onClose"> & {
  label: string;
  children: ReactNode;
};

// Wraps a trigger button + controlled dialog and logs the last close reason
function DialogDemo({ label, children, ...dialogProps }: DemoProps) {
  const { open, handleOpen, handleClose } = useDisclosure();
  const [reason, setReason] = useState<string | null>(null);

  return (
    <div className={"column"}>
      <Button variant="outlined" onClick={handleOpen}>
        {label}
      </Button>
      <Dialog
        {...dialogProps}
        open={open}
        onClose={(_, closeReason) => {
          setReason(closeReason);
          handleClose();
        }}
      >
        <Card fixedHeight="100%" fixedWidth="100%">
          <CardHeader
            title={label}
            actions={<CloseButton size={"sm"} relative onClick={handleClose} />}
          />
          <CardContent>{children}</CardContent>
        </Card>
      </Dialog>
      <small>Last close reason: {reason ?? "none"}</small>
    </div>
  );
}

export default function Page() {
  return (
    <PageLayout title={<code>{"<Dialog/>"}</code>}>
      <h2>Basic Usage</h2>
      <section>
        <DialogDemo label="Open dialog">This is a dialog</DialogDemo>
      </section>

      <h2>
        <code>modal</code>
      </h2>
      <section>
        <DialogDemo label="Modal (blocking)" modal>
          Uses <code>showModal()</code>, shows backdrop, blocks the page, and
          closes on backdrop click or Escape
        </DialogDemo>
        <DialogDemo label="Non-modal (default)" modal={false}>
          Uses <code>show()</code>, no backdrop, page stays interactive.
          Backdrop click never fires here
        </DialogDemo>
      </section>

      <h2>Sizing</h2>
      <section>
        <DialogDemo label="fullWidth" modal fullWidth>
          Takes the width of the viewport
        </DialogDemo>
        <DialogDemo label="fullHeight" modal fullHeight>
          Takes the height of the viewport
        </DialogDemo>
        <DialogDemo label="fullScreen" modal fullScreen>
          Takes the full size of the viewport
        </DialogDemo>
      </section>

      <h2>
        <code>overrideUAStyles</code>
      </h2>
      <section>
        <DialogDemo label="Browser default styles" modal>
          Default UA styles (border, padding, max size caps)
        </DialogDemo>
        <DialogDemo label="Overridden styles" modal overrideUAStyles>
          UA styles reset, with custom backdrop
        </DialogDemo>
        <DialogDemo
          label="Overridden + fullScreen"
          modal
          overrideUAStyles
          fullScreen
        >
          Reset styles combined with fullScreen
        </DialogDemo>
      </section>

      <h2>
        <code>disablePortal</code>
      </h2>
      <section>
        <DialogDemo label="Portal (default)">
          Rendered in <code>document.body</code>
        </DialogDemo>
        <DialogDemo label="Disabled portal" disablePortal>
          Rendered in place, inside nearest relative container
        </DialogDemo>
      </section>

      <h2>
        <code>keepMounted</code>
      </h2>
      <section>
        <DialogDemo label="Stays mounted (default)" modal>
          Remains in the DOM when closed
        </DialogDemo>
        <DialogDemo label="Unmount on exit" modal unmountOnExit>
          Removed from the DOM when closed
        </DialogDemo>
      </section>

      <h2>
        <code>onClose</code> reasons
      </h2>
      <section>
        <p>
          Close with Escape, then click the backdrop, and check the reason shown
          under the button. Expected: <code>escapeKeyDown</code> and{" "}
          <code>backdropClick</code>
        </p>
        <DialogDemo label="Check reasons" modal>
          Press Escape or click outside
        </DialogDemo>
      </section>

      <h2>
        <code>className</code> and native props
      </h2>
      <section>
        <DialogDemo
          label="Custom props"
          modal
          id="custom-dialog"
          className={"custom"}
          aria-labelledby="custom-title"
        >
          <h3 id="custom-title">Custom props</h3>
          Inspect the element for <code>id</code>, <code>className</code>, and{" "}
          <code>aria-labelledby</code>
        </DialogDemo>
      </section>

      <h2>
        <code>command</code> and <code>commandfor</code>
      </h2>
      <section>
        <p>
          Opens and closes the dialog natively through the Invoker Commands API,
          without React state. Escape and backdrop click should also close it
        </p>
        <div className={"column"}>
          <Button command="show-modal" commandfor="command-dialog">
            Open with command
          </Button>
          <Dialog id="command-dialog">
            <Card fixedHeight="100%" fixedWidth="100%">
              <CardHeader
                title="Invoker command"
                actions={
                  <CloseButton
                    size={"sm"}
                    relative
                    command="close"
                    commandfor="command-dialog"
                  />
                }
              />
              <CardContent>Opened and closed without React state</CardContent>
            </Card>
          </Dialog>
        </div>
      </section>
    </PageLayout>
  );
}
