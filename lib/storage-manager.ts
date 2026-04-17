import type { Song } from "@/music/data";

import defaultSongs from "@/music/data.json";

export interface StorageManager {
  loadSongs(): Song[];
}

export function createStorageManager(): StorageManager {
  return {
    loadSongs() {
      return [...defaultSongs];
    },
  };
}
