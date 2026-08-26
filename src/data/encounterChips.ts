// ─────────────────────────────────────────────────────────────────────────────
// encounterChips.ts — the vocabulary of the journal.
//
// The journal is written with thumbs, not sentences. When someone leaves without
// buying, the seller taps ONE tile saying why; when someone buys, they tap what
// closed it. No typing, ever, unless they want to.
//
// That single tap is the whole point of the product: the POS already knows what
// sold. Only this can know about the four people who did not buy, and why —
// which is the thing a seller can actually get better at.
//
// The walk-away reasons deliberately mirror the objection lessons in
// objectionLessons.ts (ids O1-O10), so "you lost five to 'let me think'" can
// link straight to the lesson that answers it.
// ─────────────────────────────────────────────────────────────────────────────

export interface Chip {
  id: string;
  label: string;
  labelEs: string;
  /** Objection lesson this maps to, where one exists. */
  lessonId?: string;
}

/** Why they walked. Eight tiles, one screen, no scrolling. */
export const WALK_REASONS: Chip[] = [
  { id: 'price', label: 'Too expensive', labelEs: 'Muy caro', lessonId: 'O1' },
  { id: 'think', label: 'Let me think', labelEs: 'Me lo pienso', lessonId: 'O2' },
  { id: 'partner', label: 'Ask my partner', labelEs: 'Consultar pareja', lessonId: 'O3' },
  { id: 'trust', label: 'Been scammed', labelEs: 'Ya me han timado', lessonId: 'O4' },
  { id: 'skin', label: 'Wrong for my skin', labelEs: 'No es para mi piel', lessonId: 'O5' },
  { id: 'online', label: 'Cheaper online', labelEs: 'Más barato online', lessonId: 'O7' },
  { id: 'time', label: 'No time', labelEs: 'Sin tiempo', lessonId: 'O2' },
  { id: 'looking', label: 'Just looking', labelEs: 'Solo mirando' },
  // Not an objection — sometimes there simply was not one, and pretending
  // otherwise would poison the data.
  { id: 'none', label: 'Nothing, they just left', labelEs: 'Nada, se fueron' },
];

/** What closed it. Only shown after a sale. */
export const CLOSE_REASONS: Chip[] = [
  { id: 'demo', label: 'The demo', labelEs: 'La demo' },
  { id: 'ladder', label: 'The price ladder', labelEs: 'La escalera de precios' },
  { id: 'second', label: 'Second product', labelEs: 'Segundo producto' },
  { id: 'asked', label: 'They asked first', labelEs: 'Preguntaron ellos' },
  { id: 'compliment', label: 'A compliment', labelEs: 'Un cumplido' },
  { id: 'clicked', label: 'It just clicked', labelEs: 'Fluyó sin más' },
];

/*
 * ── WHERE DID YOU LOSE HER? ─────────────────────────────────────────────────
 *
 * A different axis from WALK_REASONS above, and both are worth having. That one
 * records what SHE said. This one records what the seller thinks THEY did — and
 * it is the half a till can never see, because the till only knows about the
 * ones who paid.
 *
 * The list is the demo in the order it happens, from the owner's own run
 * through it: you take the hand, you talk her through it while you work (once a
 * week, a year in the syringe, do not touch it, five hours), you get them
 * talking about themselves and you get the husband on board, you show the
 * mirror, you shut up, you collect the two yeses — and only then do you start
 * walking down the ladder.
 *
 * `none` is not padding. It is the honest answer on the days it is true, and
 * close-fault is the lesson that says so: if you really did all of it and she
 * still walked, that one is not yours to carry.
 */
export const DEMO_STEPS: Chip[] = [
  { id: 'hand', label: 'Never got her hand', labelEs: 'No le cogí la mano', lessonId: 'close-demo' },
  { id: 'speech', label: 'Rushed the speech', labelEs: 'Corrí con la explicación', lessonId: 'close-demo' },
  { id: 'connection', label: 'Never got them talking', labelEs: 'No conecté con ellos', lessonId: 'connect-5' },
  { id: 'partner', label: 'Lost the husband', labelEs: 'Perdí al marido', lessonId: 'connect-4' },
  { id: 'mirror', label: 'No reaction at the mirror', labelEs: 'El espejo no dio reacción', lessonId: 'close-demo' },
  { id: 'silence', label: 'I filled the silence', labelEs: 'Rellené el silencio', lessonId: 'close-demo' },
  { id: 'yeses', label: 'Never got the two yeses', labelEs: 'No conseguí los dos síes', lessonId: 'close-demo' },
  { id: 'ladder', label: 'Stopped early on the ladder', labelEs: 'Paré pronto en la escalera', lessonId: 'close-2' },
  { id: 'none', label: 'Nothing — I did all of it', labelEs: 'Nada — lo hice todo', lessonId: 'close-fault' },
];

/*
 * ── WHAT DID YOU PUT ON THE TABLE? ──────────────────────────────────────────
 *
 * The owner on gifts, and note what is NOT here:
 *
 *   "We have a lot of different things, like day cream, night cream, and
 *    occasional different products that we have. Those are gifts... They are
 *    not inside the speech because all the time they change."
 *
 * They change, so there are no prices on these chips and no gift list anywhere
 * in the lessons. What is stable is the shape: a gift is a real product off the
 * shelf, and it is almost always attached to a syringe, because the syringe is
 * what we are always trying to sell. The peeling is sometimes the gift itself.
 */
export const GIFTS: Chip[] = [
  { id: 'cream', label: 'Day / night cream', labelEs: 'Crema de día / de noche' },
  { id: 'peeling', label: 'The peeling', labelEs: 'El peeling' },
  { id: 'scrub', label: 'The scrub', labelEs: 'El exfoliante' },
  { id: 'other', label: 'Something else', labelEs: 'Otra cosa' },
];

export function demoStep(id: string | undefined): Chip | undefined {
  return id ? DEMO_STEPS.find((c) => c.id === id) : undefined;
}

export function gift(id: string | undefined): Chip | undefined {
  return id ? GIFTS.find((c) => c.id === id) : undefined;
}

export function walkReason(id: string | undefined): Chip | undefined {
  return id ? WALK_REASONS.find((c) => c.id === id) : undefined;
}

export function closeReason(id: string | undefined): Chip | undefined {
  return id ? CLOSE_REASONS.find((c) => c.id === id) : undefined;
}

/** The chip label in the reader's language. */
export function chipLabel(chip: Chip, isEs: boolean): string {
  return isEs ? chip.labelEs : chip.label;
}
