# Security

## Reporting

Email **security@novaremix.com** with:

- Description and reproduction steps
- Impact assessment if known
- Your environment (OS, Node version)

We respond to good-faith reports within **5 business days**.

## Scope

| In scope | Out of scope |
|----------|----------------|
| `contracts/src/**` | Third-party npm dependency vulns (report upstream) |
| `packages/**` | Social engineering |
| `scripts/demo.mjs`, `scripts/doctor.mjs` | Live deployments (none in v0.4) |

## Safe evaluation

See **`docs/SAFE-RUN.md`** for what executes when you run the demo, sandbox options, and `--ignore-scripts` install path.

## Version

Protocol version **0.4.0-internal** · audit sprint August 2026.
