import { readFileSync } from "node:fs";

// Verify the entry: exactly one sentence, 1–320 chars, matches the approved text.
const EXPECTED =
  "Congress will happily write the rules for the internet, then email you a photo of a printed Word document and call it the PDF.";

const text = readFileSync(new URL("./entry.txt", import.meta.url), "utf8").trimEnd();
if (text.length < 1 || text.length > 320) {
  throw new Error("entry must be 1-320 chars, got " + text.length);
}
const enders = (text.match(/[.?!]/g) || []).length;
if (enders !== 1) throw new Error("expected exactly 1 sentence-ender, got " + enders);
if (!text.endsWith(".")) throw new Error("entry must end with a period");
if (text !== EXPECTED) throw new Error("entry.txt does not match the approved entry text");
console.log("entry OK: 1 sentence, " + text.length + " chars");
