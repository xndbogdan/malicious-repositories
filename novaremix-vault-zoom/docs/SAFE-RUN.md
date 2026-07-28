# Safe run guide — for security-conscious reviewers

Senior engineers are right to hesitate before running unknown code. This document states **exactly what executes** and how to run in a **sandbox**.

## What this repo does NOT do

- No `postinstall` / `preinstall` npm hooks
- No wallet access, private keys, or `.env` secrets required
- No outbound chain transactions (no testnet/mainnet deploy)
- No `curl | bash` or remote script fetch
- No browser extension or system-level installers

## What `npm run server` runs (in order)

| Step | Command / file | Network |
|------|----------------|---------|
| 1 | `scripts/stop.mjs` — free ports | None |
| 2 | `npm run build` — compile all packages | None |
| 3 | `node packages/simulator/dist/cli.js run` | None |
| 4 | `node packages/simulator/dist/cli.js run --stress` | None |
| 5 | `node packages/api/dist/server.js` | **localhost:4000 only** |

Inspect scripts yourself:

```bash
cat package.json
cat scripts/server.mjs
cat packages/simulator/src/cli.ts
cat packages/api/src/server.ts
```

## Paranoid run (recommended for first pass)

### Option A — read first, run minimal

```bash
git clone [repo]
cd zendarox-vault
cat package.json scripts/server.mjs
npm install --ignore-scripts
npm run sim:stress    # terminal only, no server
```

### Option B — Docker sandbox

```bash
docker run -it --rm -p 4000:4000 -v "$PWD":/app -w /app node:20-bookworm bash
npm install --ignore-scripts
npm run server
# open http://localhost:4000 on host
```

### Option C — VM / Codespaces

Use GitHub Codespaces, a disposable VM, or a non-primary dev machine. No production keys on that environment.

### Option D — watch CEO run it (zero local execution)

Ask for a **5-minute screen-share** where we run `npm run server` on our side. You judge output; nothing runs on your machine.

## Dependencies (high level)

| Package | Purpose |
|---------|---------|
| `typescript` | Compile TS → JS |
| `fastify` | Local HTTP API |
| `@fastify/cors` | CORS for console |
| `concurrently` | Dev script only (not used in `demo`) |

Run `npm ls --depth=0` after install to verify tree.

## Verify integrity

- Prefer **public GitHub** with commit history (not a random zip)
- Compare `package-lock.json` after clone
- Run `npm run doctor` — checks Node version and folder layout only

## Report concerns

Security contact: **security@zendarox.com** (replace with your real alias)

If something looks wrong, tell us — we want that feedback before audit.
