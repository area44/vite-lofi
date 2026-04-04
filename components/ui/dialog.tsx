import * as React from "react";
import { Dialog } from "@base-ui/react";
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
      "fixed inset-0 z-50 bg-black/20 backdrop-blur-lg data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
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
        "fixed left-[50%] top-[50%] rounded-lg text-purple-100 z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-purple-950/70 p-6 shadow-lg data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
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
