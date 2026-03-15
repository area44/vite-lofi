import * as React from "react";
import { Popover } from "@base-ui/react";
import { cn } from "@/lib/cn";

const PopoverRoot = Popover.Root;
const PopoverTrigger = Popover.Trigger;

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Popover.Popup> & {
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
  }
>(({ className, align = "center", side = "top", sideOffset = 4, ...props }, ref) => (
  <Popover.Portal>
    <Popover.Positioner side={side} sideOffset={sideOffset} align={align}>
      <Popover.Popup
        ref={ref}
        className={cn(
          "z-50 w-72 rounded-md bg-purple-950/40 backdrop-blur-lg text-purple-200 p-4 shadow-lg outline-none data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
          className as string,
        )}
        {...props}
      />
    </Popover.Positioner>
  </Popover.Portal>
));
PopoverContent.displayName = "PopoverContent";

export { PopoverRoot as Popover, PopoverTrigger, PopoverContent };
