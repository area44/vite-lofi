# UX Journal - July 2026

- **TypeScript 7 Migration**: Successfully migrated to TypeScript 7.0.2.
  - Key new compiler option: `noUncheckedSideEffectImports`.
  - Parallel compilation enabled via `--checkers` flag.
  - `target` and `module` should be set to `esnext` for optimal modern support.
- **Vite+ v0.2.4**: Updated the toolchain to the latest version.
  - `vp migrate` confirms project status.
  - `vp check -- --checkers 4` allows passing flags to the underlying `tsc`.
- **pnpm Workspace Settings**: Added `minimumReleaseAge`, `shellEmulator`, `trustLockfile`, `trustPolicy`, and `trustPolicyIgnoreAfter` to `pnpm-workspace.yaml`.
- **Fix for CI failure**: Reverted the `check` script to `vp check --fix` because `vp check` does not support passing `--checkers` via `--`. Added a separate `typecheck` script (`tsc --noEmit --checkers 4`) to utilize the TypeScript 7 parallel compilation feature.
