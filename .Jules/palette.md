# UX Journal - Vite Lofi

## Issue: Global Click Toggling Play/Pause

The application had a global `onMouseDown` handler that toggled the player's play/pause state. This was designed to allow users to click anywhere (like the background) to play or pause. However, the implementation used a `data-trigger` system that was too broad and didn't account for all interactive elements.

### Learning

- Global interaction handlers must be carefully scoped.
- Using `target.closest('button, a, input, [role="button"]')` is a robust way to avoid intercepting clicks on interactive elements.
- UI elements like Menus should be clearly separated from "click-to-action" zones to prevent unintended behavior.

### Fix

- Updated `components/player.tsx` to ignore any interactive elements in its global `onMouseDown`.
- Moved the `Menu` component out of the `data-trigger` container.
- Simplified the `Menu` by removing the custom song feature as requested by the user.
