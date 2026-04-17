import type { MusicManager } from "@/lib/music-manager";

import { PlayerControls } from "@/components/control/player-controls";
import { SongList } from "@/components/control/song-list";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/cn";

export function Menu({ musicManager }: { musicManager: MusicManager }) {
  return (
    <Dialog>
      <DialogTrigger
        id="menu-trigger"
        aria-label="Menu"
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: "max-md:absolute max-md:top-8 max-md:right-8",
          }),
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        Menu
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <SongList musicManager={musicManager} />
          <PlayerControls musicManager={musicManager} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a
              href="https://github.com/area44/vite-lofi"
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
              )}
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <DialogClose
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
              )}
            >
              Close
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
