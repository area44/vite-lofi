import defaultSongs from "@/music/data.json";
import { Song } from "@/music/data";

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
