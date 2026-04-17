import { Dialog } from "@base-ui/react";
import * as React from "react";

import { cn } from "@/lib/cn";

const DialogRoot = Dialog.Root;
const DialogTrigger = Dialog.Trigger;
const DialogPortal = Dialog.Portal;
const DialogClose = Dialog.Close;

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(({ className, ...props }, ref) => (
  <Dialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/20 backdrop-blur-lg data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
      className as string,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Popup>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <Dialog.Popup
      ref={ref}
      className={cn(
        "fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg bg-purple-950/70 p-6 text-purple-100 shadow-lg data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in",
        className as string,
      )}
      {...props}
    >
      {children}
    </Dialog.Popup>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

export {
  DialogRoot as Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogClose,
};
