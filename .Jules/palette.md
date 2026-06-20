# UX Journal

## 2024-06-20

- Updated vite-plus toolchain to v0.2.0.
- Encountered toolchain resolution error for 'vitest' bin entry in v0.2.0 (and 0.2.1), preventing 'vp test' from running. 'vp check' remains functional.

## 2024-06-20 (Addendum)

- Resolved 'vitest' bin resolution error by removing the manual dependency and override.
- Discovered that includes its own internal version of (v4.1.9), which is now correctly utilized.

## 2024-06-20 (Addendum)

- Resolved 'vitest' bin resolution error by removing the manual vitest dependency and override.
- Discovered that vite-plus@0.2.0 includes its own internal version of vitest (v4.1.9), which is now correctly utilized.
