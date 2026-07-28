#!/usr/bin/env node
/** Stop dashboard servers on ports 4000–4005 (Windows + Unix) */
import { execSync } from "node:child_process";

const ports = [4000, 4001, 4002, 4003, 4004, 4005];

for (const port of ports) {
  try {
    if (process.platform === "win32") {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
      const pids = [...new Set(
        out.split("\n")
          .filter((l) => l.includes("LISTENING"))
          .map((l) => l.trim().split(/\s+/).pop())
          .filter(Boolean)
      )];
      for (const pid of pids) {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        console.log(`  Stopped PID ${pid} on port ${port}`);
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null`, { shell: true, stdio: "ignore" });
      console.log(`  Cleared port ${port}`);
    }
  } catch {
    /* port free */
  }
}
console.log("\n  Ports cleared. Run: npm run server\n");
