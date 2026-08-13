// ─────────────────────────────────────────────────────────────────────────────
// canonicalScripts.ts — the lines the owner actually says, written once.
//
// ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
// The approach sequence is taught twice on purpose: `stop-1` is the first thing
// a new seller reads and gives them the whole thing end to end, and `close-1`
// is the detailed version they come back to in week three. Two lessons, one
// method — which is fine, right up until somebody improves the wording in one
// of them.
//
// These three lines had been copied into both files and hand-kept in step four
// separate times, in two languages. Each time was a chance for the app to start
// teaching two slightly different greetings, and a seller who reads both and
// finds they disagree stops trusting either.
//
// So they live here now. If the owner changes one of these lines, it changes in
// one place and both lessons follow. scripts/check-canonical-scripts.mjs fails
// the build if any of them is hand-written somewhere instead of imported.
//
// This is deliberately a SHORT list. It is not "every script in the app" — only
// the ones that genuinely appear in more than one lesson because the same beat
// is taught at two depths. A line that lives in exactly one place does not
// belong here; it belongs in the lesson.
// ─────────────────────────────────────────────────────────────────────────────

export interface CanonicalScript {
  text: string;
  textEs: string;
}

/** Step 2 of the sequence: get the look, from four or five metres, feet still. */
export const GREETING: CanonicalScript = {
  text: `"Hi guys, how you doing?"`,
  textEs: `"Hola chicos, ¿qué tal?"`,
};

/**
 * Step 5: say the rush before she can, then ask a question she has to answer
 * with a real answer. Runs whether or not she took the sample.
 */
export const THE_RUSH_AND_THE_QUESTION: CanonicalScript = {
  text: `"Listen, I know you're in a rush — but can I ask you something really quick? It's just that you look so good, I have to ask what you normally use on your skin."`,
  textEs: `"Mira, sé que vas con prisa — ¿pero te puedo preguntar una cosa rapidísima? Es que te veo tan bien que tengo que preguntarte qué usas normalmente para la piel."`,
};

/** Step 8: you are inside, you look back, you call them — then you walk again. */
export const CALL_THEM_IN: CanonicalScript = {
  text: `"Come on guys, it's two seconds, I promise. Come."`,
  textEs: `"Venga chicos, son dos segundos, os lo prometo. Venid."`,
};

/** Everything above, for the guard to check against. */
export const CANONICAL_SCRIPTS: Record<string, CanonicalScript> = {
  GREETING,
  THE_RUSH_AND_THE_QUESTION,
  CALL_THEM_IN,
};
