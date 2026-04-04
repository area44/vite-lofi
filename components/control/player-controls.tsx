import { cn } from "@/lib/cn";
import { MusicManager } from "@/lib/music-manager";
import { buttonVariants } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export interface TimeControlsProps {
  musicManager: MusicManager;
}

export function PlayerControls({ musicManager }: TimeControlsProps) {
  return (
    <div className="flex flex-row items-center gap-2 mt-2">
      {musicManager.isPaused() ? (
        <button
          aria-label="play"
          className={cn(buttonVariants({ variant: "secondary" }))}
          onClick={() => musicManager.play()}
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
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </button>
      ) : (
        <button
          aria-label="pause"
          className={cn(buttonVariants({ variant: "secondary" }))}
          onClick={() => musicManager.pause()}
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
            <rect width="4" height="16" x="6" y="4" />
            <rect width="4" height="16" x="14" y="4" />
          </svg>
        </button>
      )}
      <VolumeSlider musicManager={musicManager} />
    </div>
  );
}

function VolumeSlider({ musicManager }: { musicManager: MusicManager }) {
  const [value, setValue] = useState(() => musicManager.getVolume());
  const [previousVolume, setPreviousVolume] = useState(0.5);

  const toggleMute = () => {
    if (value > 0) {
      setPreviousVolume(value);
      musicManager.setVolume(0);
      setValue(0);
    } else {
      musicManager.setVolume(previousVolume);
      setValue(previousVolume);
    }
  };

  return (
    <>
      <button
        aria-label={value === 0 ? "Unmute volume" : "Mute volume"}
        className={cn(buttonVariants({ variant: "ghost" }), "p-1.5 h-auto rounded-full")}
        onClick={toggleMute}
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
          className="size-4"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {value > 0 && (
            <>
              {value > 0.2 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
              {value > 0.7 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
            </>
          )}
          {value === 0 && <line x1="23" x2="1" y1="1" y2="23" />}
        </svg>
      </button>
      <Slider
        className="flex-1 rounded-full"
        aria-valuetext="Volume"
        value={value}
        onValueChange={(v) => {
          setValue(v);
          musicManager.setVolume(v);
          if (v > 0) {
            setPreviousVolume(v);
          }
        }}
      />
    </>
  );
}
