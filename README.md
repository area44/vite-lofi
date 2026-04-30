## Vite Lofi

Some nice lofi music and a music player.

**Demo:** https://vite-lofi.onrender.com

### Run on local

Setup [Vite+](https://github.com/voidzero-dev/vite-plus) and [Node.js](https://nodejs.org), then follows this step:

```bash
git clone https://github.com/area44/vite-lofi.git
vp install
vp dev
```

Run formatting, linting, and type checks.

```bash
vp check
```

### Add Songs

Put your songs in the `./public` folder, and run `pnpm run generate:music` to sync songs data with web player.
