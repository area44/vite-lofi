import * as React from "react";
import { Slider } from "@base-ui/react";
import { cn } from "@/lib/cn";

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value from 0 to 1 (percentage)
   */
  value: number;

  onValueChange: (v: number) => void;
  onSlideEnd?: (v: number) => void;
  onSlideStart?: () => void;
}

export const SliderComponent = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onValueChange, onSlideEnd, onSlideStart, className, ...props }, ref) => {
    return (
      <Slider.Root
        ref={ref}
        value={value * 100}
        onValueChange={(v) => {
          if (typeof v === "number") {
            onValueChange(v / 100);
          }
        }}
        onValueCommitted={(v) => {
          if (typeof v === "number") {
            onSlideEnd?.(v / 100);
          }
        }}
        onPointerDown={(e) => {
          onSlideStart?.();
          props.onPointerDown?.(e);
        }}
        min={0}
        max={100}
        step={1}
        className={cn("flex touch-none h-6 py-2 w-full group items-center", className)}
      >
        <Slider.Control className="relative flex w-full items-center">
          <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full border border-purple-100/30 bg-transparent">
            <Slider.Indicator className="absolute h-full bg-purple-100" />
          </Slider.Track>
          <Slider.Thumb className="hidden h-4 w-4 rounded-full border-2 border-purple-100 bg-purple-950 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-hover:block" />
        </Slider.Control>
      </Slider.Root>
    );
  },
);
SliderComponent.displayName = "Slider";

export { SliderComponent as Slider };
