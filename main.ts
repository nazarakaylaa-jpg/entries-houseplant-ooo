import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Houseplant Out-of-Office — one-line out-of-office auto-reply
// written as if the office houseplant sent it.
const ENTRY =
  "Out of office. Unwatered since the Christmas party. Dave in accounting whispers 'hang in there' to my yellowing leaves.";

const MAX_CHARS = 120;

const length = [...ENTRY].length;
if (length < 1 || length > MAX_CHARS) {
  throw new Error(`Entry must be 1-${MAX_CHARS} characters, got ${length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${length} characters to ${join(outDir, "entry.txt")}`);
