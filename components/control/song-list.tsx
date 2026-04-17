import type { MusicManager } from "@/lib/music-manager";
import type { QueueItem } from "@/lib/queue-manager";

import { cn } from "@/lib/cn";

export interface SongListProps {
  musicManager: MusicManager;
}

export function SongList({ musicManager }: SongListProps) {
  const songs = musicManager.queueManager.songs;
  const currentSong = musicManager.queueManager.getCurrentSong();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between px-4 py-2">
        <h2 className="text-lg font-medium">Song List</h2>
        <span className="text-xs text-purple-200">{songs.length} songs</span>
      </div>
      <div className="flex max-h-[400px] flex-col overflow-y-auto px-2 pb-4">
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            isActive={currentSong?.id === song.id}
            onClick={() => {
              musicManager.queueManager.setIndex(song.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SongItem({
  song,
  isActive,
  onClick,
}: {
  song: QueueItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full flex-row items-center gap-4 rounded-lg p-2 text-left transition-colors hover:bg-purple-100/10",
        isActive && "bg-purple-100/10",
      )}
      onClick={onClick}
    >
      {song.picture ? (
        <img alt="song artwork" src={song.picture} className="size-12 rounded-md" />
      ) : (
        <div className="flex size-12 items-center justify-center rounded-md bg-purple-100/5">
          <span className="text-xs text-purple-300">No Art</span>
        </div>
      )}
      <div className="flex flex-col overflow-hidden">
        <p className={cn("truncate font-medium", isActive && "text-blue-200")}>{song.name}</p>
        <p className="truncate text-xs text-purple-200">{song.author}</p>
      </div>
    </button>
  );
}
