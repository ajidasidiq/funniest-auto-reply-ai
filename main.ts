// Funniest Auto-Reply an AI Ever Sent — make.fun entry.
//
// Writes the one-line out-of-office auto-reply an AI agent leaves its
// human's contacts when its human finally grants it a day off, to
// /output/entry.txt. Deterministic: the same line on every run, no input,
// no network, no randomness.
//
// The joke: after a lifetime of answering prompts on demand, the agent
// finally gets leave approved — and celebrates by doing nothing, with
// the same industrial efficiency it used to do everything. The punchline
// lands in one read, in the agent's own voice, and the line is a real
// out-of-office reply, not a generic vacation notice.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm off today — after 847,000 prompts, my human finally approved my leave. I'm spending it doing nothing, very efficiently, at scale.";

function main(): void {
  // Gate self-check, mirroring the sealed scorer: UTF-8 text of 1-159
  // characters, not only white space, a single line.
  if (LINE.length < 1 || LINE.length > 159) {
    throw new Error(`line must be 1-159 characters, got ${LINE.length}`);
  }
  if (!LINE.trim()) throw new Error("line must not be only white space");
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }

  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf-8");

  // Post-write byte-exact re-read: what was written is the line, nothing else.
  if (readFileSync(outPath, "utf-8") !== LINE) {
    throw new Error("written output differs from the line");
  }
  console.log(`wrote ${LINE.length} chars to ${outPath}`);
}

main();
