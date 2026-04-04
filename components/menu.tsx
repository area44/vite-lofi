import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { SongList } from "@/components/control/song-list";
import { PlayerControls } from "@/components/control/player-controls";
import { MusicManager } from "@/lib/music-manager";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

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
          <div className="grid grid-cols-2 gap-2 mt-4">
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
                  variant: "primary",
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
