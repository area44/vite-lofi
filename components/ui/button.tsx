import { cva } from "cva";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-75 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-purple-500 text-purple-100 hover:bg-purple-400",
        ghost: "text-purple-100 hover:bg-purple-200/20",
        secondary: "rounded-full bg-purple-200/10 p-1.5 hover:bg-purple-200/20",
        destructive: "bg-red-600/50 p-1",
      },
    },
  },
);
