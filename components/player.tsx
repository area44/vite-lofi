import type { MouseEventHandler } from "react";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useMemo, memo } from "react";

import type { DurationControl } from "@/components/control/timeline";
import type { MusicManager } from "@/lib/music-manager";
import type { QueueItem } from "@/lib/queue-manager";

import { Timeline } from "@/components/control/timeline";
import { Gradient } from "@/components/gradient";
import { Menu } from "@/components/menu";
import { MusicVisualizer } from "@/components/music-visualizer";
import { formatSeconds } from "@/lib/format";
import { createMusicManager } from "@/lib/music-manager";
import { createShortcutManager } from "@/lib/shortcut-manager";

export default function MusicPlayer() {
  const timelineRef = useRef<DurationControl>(undefined);
  const timeLabelRef = useRef<HTMLParagraphElement>(null);

  const [musicManager, setMusicManager] = useState<MusicManager | undefined>(undefined);
  // trigger re-renders
  const [, setDigit] = useState(0);

  const paused = musicManager?.isPaused() ?? true;
  const currentSong = musicManager?.queueManager.getCurrentSong();

  useEffect(() => {
    const manager = createMusicManager({
      onTimeUpdate: (currentTime, duration) => {
        if (timeLabelRef.current) {
          timeLabelRef.current.innerText = formatSeconds(currentTime);
        }

        timelineRef.current?.((currentTime / duration) * 100);
      },
      onStateChange: () => {
        setDigit((prev) => prev + 1);
      },
      onNext() {
        setDigit((prev) => prev + 1);
      },
      onSongListUpdated() {
        setDigit((prev) => prev + 1);
      },
    });

    const shortcut = createShortcutManager({ musicManager: manager });

    shortcut.bind();
    setMusicManager(manager);

    return () => {
      shortcut.destroy();
      manager.destroy();
    };
  }, []);

  const onClick: MouseEventHandler = (e) => {
    if (!musicManager || e.button !== 0) return;

    const target = e.target as Element;

    // Ignore interactive elements
    if (target.closest("button, a, input, [role='button']")) {
      return;
    }

    const isTrigger = target.matches(
      "[data-trigger-container] *, [data-trigger-container], [data-trigger]",
    );

    if (!isTrigger) return;

    if (musicManager.isPaused()) musicManager.play();
    else musicManager.pause();
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      className="relative z-[2] flex h-svh flex-col px-12 py-16 text-purple-100 md:p-24"
      onMouseDown={onClick}
    >
      <AnimatedTitle text={paused ? "Click to Play" : "Vite Lofi"} />
      <div className="mt-2 w-full max-w-[500px]">
        <Timeline musicManager={musicManager} durationRef={timelineRef} />
        <AnimatePresence mode="wait" initial={false}>
          {currentSong ? <SongDisplay key={currentSong.id} song={currentSong} /> : null}
        </AnimatePresence>
      </div>
      <div className="mt-auto flex flex-row items-end justify-center gap-4 md:justify-between">
        {musicManager && <Menu musicManager={musicManager} />}
        <div className="w-full max-w-[250px]" data-trigger={true} data-trigger-container={true}>
          {musicManager && (
            <MusicVisualizer
              className="h-[150px] w-full"
              analyser={musicManager.analyser}
              paused={paused}
              fftSize={4096}
              barWidth={2}
              gap={6}
              smoothingTimeConstant={0.4}
              minDecibels={-100}
              maxDecibels={0}
            />
          )}
          <p ref={timeLabelRef} className="mt-2 text-xs text-blue-200">
            --:--
          </p>
        </div>
      </div>
      <motion.div
        data-trigger-container={true}
        className="absolute inset-0 z-[-1]"
        animate={{
          opacity: paused ? 0.3 : 1,
        }}
        initial={{
          opacity: 0,
        }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
      >
        <Gradient currentId={currentSong?.id ?? 0} />
      </motion.div>
    </motion.main>
  );
}

const SongDisplay = memo(({ song }: { song: QueueItem }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="flex flex-row items-center gap-4 rounded-xl p-3"
    >
      {song.picture && <img alt="song artwork" src={song.picture} className="size-14 rounded-md" />}
      <div>
        <p className="font-medium">{song.name}</p>
        <p className="text-xs text-purple-200">{song.author}</p>
      </div>
    </motion.div>
  );
});

const AnimatedTitle = memo(({ text }: { text: string }) => {
  const words = useMemo(() => text.split(" "), [text]);
  let index = 0;

  return (
    <h1 className="text-8xl leading-[0.9] font-light tracking-[-0.1em] md:text-9xl md:leading-[0.9] md:tracking-[-0.1em]">
      {words.map((word, i) => (
        <motion.span key={i} className="mr-8 inline-block break-keep">
          {word.split("").map((c, j) => (
            <motion.span
              key={`${c}-${j}`}
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  ease: "easeInOut",
                  delay: index++ * 0.02,
                  duration: 0.2,
                },
              }}
            >
              {c}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </h1>
  );
});
