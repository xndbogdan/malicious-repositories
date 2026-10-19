# MiIies/mvp: extracted stages

Payloads recovered from the `MiIies/mvp` fake coding assessment (README section 19). Everything here is inert text (`.txt`); **do not run any of it**.

| File | Stage |
|------|-------|
| `stage1-ipfs-dropper.json.txt` | JSON served from IPFS (`{"content": "..."}`), obfuscated dropper, SHA-256 `032fafc99b6eca32c55b44446b8f386201e39cb701595826a6db5d4211cf74d5` |
| `stage1-dropper-deobfuscated.js.txt` | Stage 1 after webcrack (string table not substituted) |
| `stage2-main.js.txt` | `main.js` written to `~/.vs_cache/` (obfuscated), SHA-256 `fe0ffbbde5b46b1cf17429c26f485d5d6201d6d763cba1975259590abcdc27b9` |
| `stage3-obfuscated.js.txt` | Blob decrypted from the BSC transaction input, SHA-256 `1856068cc3960e23df6ef4f8599332e30a58154f1dbb243e0839594e32e6648a` |
| `stage3-deobfuscated.js.txt` | Stage 3 after webcrack |

Stage 4 (served by the C2 per session) was not obtained.
