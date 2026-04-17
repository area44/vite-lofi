import { expect, test, vi } from "vite-plus/test";

import type { Song } from "@/music/data";

import { createQueueManager, type QueueItem } from "./queue-manager";

const mockSongs: Song[] = [
  { name: "Song 1", author: "Artist 1", url: "url1" },
  { name: "Song 2", author: "Artist 2", url: "url2" },
];

test("setSongs initializes the queue and calls callbacks", () => {
  const onUpdate = vi.fn<(song: QueueItem | undefined) => void>();
  const onSongListUpdated = vi.fn<(songs: QueueItem[]) => void>();
  const manager = createQueueManager({ onUpdate, onSongListUpdated });

  manager.setSongs(mockSongs);

  expect(manager.songs).toHaveLength(2);
  expect(manager.songs[0].id).toBe(0);
  expect(manager.currentIndex).toBe(0);
  expect(onUpdate).toHaveBeenCalledWith(manager.songs[0]);
  expect(onSongListUpdated).toHaveBeenCalledWith(manager.songs);
});

test("setIndex handles valid indices", () => {
  const manager = createQueueManager({});
  manager.setSongs(mockSongs);

  manager.setIndex(1);
  expect(manager.currentIndex).toBe(1);
});

test("setIndex handles bounds and wrapping", () => {
  const manager = createQueueManager({});
  manager.setSongs(mockSongs);

  // Over bounds (should wrap to 0)
  manager.setIndex(2);
  expect(manager.currentIndex).toBe(0);

  // Under bounds (should wrap to last)
  manager.setIndex(-1);
  expect(manager.currentIndex).toBe(1); // mockSongs.length - 1 = 1
});

test("next and previous navigation", () => {
  const manager = createQueueManager({});
  manager.setSongs(mockSongs);

  manager.next();
  expect(manager.currentIndex).toBe(1);

  manager.next();
  expect(manager.currentIndex).toBe(0);

  manager.previous();
  expect(manager.currentIndex).toBe(1);
});

test("getCurrentSong returns the current song", () => {
  const manager = createQueueManager({});
  manager.setSongs(mockSongs);

  expect(manager.getCurrentSong()).toEqual({ ...mockSongs[0], id: 0 });
  manager.next();
  expect(manager.getCurrentSong()).toEqual({ ...mockSongs[1], id: 1 });
});

test("setIndex does not trigger onUpdate if index is the same", () => {
  const onUpdate = vi.fn<(song: QueueItem | undefined) => void>();
  const manager = createQueueManager({ onUpdate });
  manager.setSongs(mockSongs);
  onUpdate.mockClear();

  manager.setIndex(0);
  expect(onUpdate).not.toHaveBeenCalled();
});
