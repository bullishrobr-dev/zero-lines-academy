/*
 * The shape every printable document is reduced to before it is rendered.
 *
 * The point of this file is that the PDFs are GENERATED from the app's own
 * data rather than written by hand. A seller reading a printed sheet and a
 * seller reading the app have to be told the same thing, and the only way to
 * guarantee that is to have one source. Move a rung in pricing.ts, re-run
 * `npm run print`, and every sheet follows.
 *
 * Everything here is already substituted: currency symbols and the shop name
 * are resolved before a Doc is built, so a renderer never sees {currency}.
 */

export type Block =
  /** Opening paragraph under the title. */
  | { type: 'intro'; text: string }
  /** A section break. */
  | { type: 'heading'; text: string }
  /** Numbered beats — the demo, the approach, the close. */
  | { type: 'steps'; items: { n: string; title: string; body: string }[] }
  /** Words said OUT LOUD. Rendered as speech, visually distinct from advice. */
  | { type: 'script'; label?: string; lines: string[] }
  /** Short advice cards. */
  | { type: 'tips'; items: { title: string; body: string }[] }
  /** A price ladder. `tone` drives the colour of the rung. */
  | {
      type: 'ladder';
      rows: {
        price: string;
        label: string;
        note?: string;
        script?: string;
        tone?: 'anchor' | 'base' | 'promo' | 'parallel' | 'voucher' | 'floor';
        units?: number;
        each?: string;
      }[];
    }
  /** Hard rules, one line each. */
  | { type: 'rules'; items: string[] }
  /** The owner's voice, set apart. */
  | { type: 'quote'; text: string; attribution?: string }
  /** A boxed warning or reminder. */
  | { type: 'callout'; title: string; body: string }
  /** Label/value pairs — the quick-reference strip. */
  | { type: 'facts'; items: { label: string; value: string }[] };

export interface Doc {
  /** File stem, e.g. `syringe-en`. */
  slug: string;
  lang: 'en' | 'es';
  /** `lesson` prints A4 portrait; `card` prints A5, two to a sheet. */
  kind: 'lesson' | 'card';
  /** Shown in the header strip. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  blocks: Block[];
}
