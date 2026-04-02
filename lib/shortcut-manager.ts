import { MusicManager } from "@/lib/music-manager";

export interface ShortcutManagerOptions {
  musicManager: MusicManager;
}

export interface ShortcutManager {
  bind(): void;
  onPress(this: void, event: KeyboardEvent): void;
  destroy(): void;
}

export function createShortcutManager({ musicManager }: ShortcutManagerOptions): ShortcutManager {
  const onPress = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target !== document.body && target.id !== "menu-trigger") return;

    switch (event.key) {
      case "ArrowUp":
        musicManager.queueManager.previous();
        event.preventDefault();
        break;
      case "ArrowDown":
        musicManager.queueManager.next();
        event.preventDefault();
        break;
      case "ArrowLeft":
        musicManager.setTime(musicManager.getTime() - 1);
        event.preventDefault();
        break;
      case "ArrowRight":
        musicManager.setTime(musicManager.getTime() + 1);
        event.preventDefault();
        break;
      case " ":
        if (musicManager.isPaused()) musicManager.play();
        else musicManager.pause();

        event.preventDefault();
        break;
    }
  };

  return {
    onPress,
    bind() {
      window.addEventListener("keydown", onPress);
    },
    destroy() {
      window.removeEventListener("keydown", onPress);
    },
  };
}
