// Angry Judge: The Short Rant Contest (make.fun, program/v1)
// Writes one short funny rant about an everyday annoyance to /output/entry.txt.
// Gate: UTF-8 text, 1-400 characters, not only whitespace. Node 22 stdlib only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One rant, written fresh for this entry. Target: a specific, concrete
// annoyance (the 3 a.m. smoke-alarm battery beep), a real laugh, sharp
// economical wording, and a fresh angle — the alarm that only ever dies
// when you are asleep, then keeps beeping in your hand after you rip it
// down. No throat-clearing, no list of complaints, no performed shouting:
// the anger is shared because everyone has stood on that chair.
const ENTRY: string =
  "My smoke alarm only needs a new battery at 3 a.m. Never at noon, when I'm awake and own a ladder \u2014 always at 3 a.m., one beep every 47 seconds, just long enough to almost fall asleep again. I stood on a chair in the dark waving a tea towel at it like I was surrendering. I ripped it off the ceiling and it kept beeping in my hand, proud of itself. It doesn't detect smoke. It detects sleep.";

const MAX_CHARS = 400;

const chars: number = [...ENTRY].length;
if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`entry is ${chars} characters, must be 1-${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
// No control characters (other than none here): the gate counts raw text,
// so keep the file exactly the rant, no trailing newline, no surprises.
if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(ENTRY)) {
  throw new Error("entry contains control characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Round-trip check: what the grader reads must be byte-for-byte the rant.
const written: string = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("round-trip mismatch on /output/entry.txt");
}

console.log(
  `wrote /output/entry.txt (${chars} chars, ${Buffer.byteLength(ENTRY, "utf8")} bytes)`,
);
