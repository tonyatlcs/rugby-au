import { spawn, spawnSync } from "node:child_process";

const compiler = spawn("pnpm", ["exec", "tsc", "-p", "tsconfig.json", "--watch", "--preserveWatchOutput"], {
  stdio: ["inherit", "pipe", "inherit"],
});

let output = "";
compiler.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  output += text;
  if (output.includes("Found 0 errors. Watching for file changes.")) {
    output = "";
    const result = spawnSync("pnpm", ["exec", "tsc-alias", "-p", "tsconfig.json", "--resolve-full-paths"], {
      stdio: "inherit",
    });
    if (result.status !== 0) console.error("Failed to rewrite contract aliases.");
  }
});

compiler.on("exit", (code) => process.exit(code ?? 1));
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => compiler.kill(signal));
}
