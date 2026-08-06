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
