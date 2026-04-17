# UX Journal

## Learning: Vite+ Toolchain Integration
- Using `vp check` and `vp test` is highly efficient for a unified workflow.
- `vp check` includes formatting, linting, and type checking, but some specific flags like `--type-aware` should be passed to `vp lint` directly if needed (though `vite.config.ts` usually handles this).
- `vp install` is necessary to populate `node_modules/.bin` for these tools to work.

## Learning: Logic Errors in Library Code
- Discovered a hardcoded reference to a JSON file's length in `lib/queue-manager.ts` that prevented the manager from working correctly with custom song lists.
- Fixed by using `this.songs.length` to refer to the actual instance's queue.

## Learning: CI Configuration
- `voidzero-dev/setup-vp@v1` simplifies GitHub Actions significantly by handling setup, caching, and installation in one step.
