/*
 * Doc → HTML → PDF.
 *
 * Two formats, because the two things are used differently. A LESSON is read
 * sitting down, on a break or before a shift, so it gets A4 and room to
 * breathe. A CARD is read standing up with a customer three feet away, so it
 * gets A5 — half a sheet, folds into an apron pocket — and everything on it is
 * either a number or a line you say out loud.
 *
 * The design rule throughout: a seller must be able to tell at a glance which
 * text they SAY and which text is advice ABOUT saying it. Spoken lines are set
 * in the serif, in quotes, against a tinted panel. Everything else is the sans.
 * Get that wrong on a printed sheet and somebody reads a stage direction to a
 * customer, which is exactly the bug the app's own cheat sheets had.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = process.env.ZL_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Authored copy uses <strong> in a few places and straight quotes everywhere.
   Curly them for print — it is the single cheapest thing that stops a page
   looking like a terminal dump. */
const typo = (s = '') =>
  esc(s)
    .replace(/&lt;strong&gt;/g, '<strong>')
    .replace(/&lt;\/strong&gt;/g, '</strong>')
    .replace(/"([^"]*)"/g, '“$1”')
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/ -- /g, ' — ');

/* Bracketed stage directions are instructions, never words said aloud. They get
   their own mark so nobody reads one to a customer. */
const marked = (s = '') =>
  typo(s).replace(/\[([^\]]+)\]/g, '<span class="cue">$1</span>');

const TONE_LABEL = {
  en: {
    anchor: 'Anchor',
    base: 'Normal',
    promo: 'Offer',
    parallel: 'Option B — beside, not below',
    voucher: 'Voucher — once only',
    floor: 'Minimum',
  },
  es: {
    anchor: 'Ancla',
    base: 'Normal',
    promo: 'Oferta',
    parallel: 'Opción B — al lado, no debajo',
    voucher: 'Cupón — una sola vez',
    floor: 'Mínimo',
  },
};

function renderBlock(b, lang) {
  switch (b.type) {
    case 'intro':
      return `<p class="intro">${typo(b.text)}</p>`;

    case 'heading':
      return `<h2>${typo(b.text)}</h2>`;

    case 'steps':
      return `<ol class="steps">${b.items
        .map(
          (s) =>
            `<li><span class="n">${typo(s.n)}</span><div><h3>${typo(s.title)}</h3><p>${marked(
              s.body,
            )}</p></div></li>`,
        )
        .join('')}</ol>`;

    case 'script':
      return `<div class="say">${
        b.label ? `<p class="say-label">${typo(b.label)}</p>` : ''
      }${b.lines.map((l) => `<p class="line">${marked(l)}</p>`).join('')}</div>`;

    case 'tips':
      return `<div class="tips">${b.items
        .map((t) => `<div class="tip"><h4>${typo(t.title)}</h4><p>${marked(t.body)}</p></div>`)
        .join('')}</div>`;

    case 'rules':
      return `<ul class="rules">${b.items.map((i) => `<li>${marked(i)}</li>`).join('')}</ul>`;

    case 'quote':
      return `<blockquote>${typo(b.text)}${
        b.attribution ? `<cite>${typo(b.attribution)}</cite>` : ''
      }</blockquote>`;

    case 'callout':
      return `<div class="callout"><h4>${typo(b.title)}</h4><p>${marked(b.body)}</p></div>`;

    case 'facts':
      return `<div class="facts">${b.items
        .map((f) => `<div><dt>${typo(f.label)}</dt><dd>${typo(f.value)}</dd></div>`)
        .join('')}</div>`;

    case 'ladder':
      return `<div class="ladder">${b.rows
        .map((r) => {
          const tone = r.tone || 'promo';
          const label = (TONE_LABEL[lang] || TONE_LABEL.en)[tone];
          return `<div class="rung t-${tone}">
            <div class="amt"><span class="price">${typo(r.price)}</span>${
              r.units && r.units > 1
                ? `<span class="each">${r.units} × ${typo(r.each || '')}</span>`
                : ''
            }</div>
            <div class="body">
              <p class="rl">${typo(r.label)}<span class="badge">${typo(label)}</span></p>
              ${r.note ? `<p class="when">${marked(r.note)}</p>` : ''}
              ${r.script ? `<p class="line">${marked(r.script)}</p>` : ''}
            </div>
          </div>`;
        })
        .join('')}</div>`;

    default:
      return '';
  }
}

const CSS = `
@page { size: A4; margin: 17mm 15mm 16mm; }
@page card { size: A5; margin: 10mm 9mm; }

:root {
  --ink: #171210;
  --ink-2: #514841;
  --ink-3: #8a7f76;
  --rule: #e2d9cf;
  --paper: #ffffff;
  --tint: #f7f2eb;
  --teal: #0b6f68;
  --teal-tint: #e7f1ef;
  --coral: #c4392f;
  --coral-tint: #fbeae7;
  --gold: #9a6b14;
  --gold-tint: #f9f0dd;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: "Carlito", "Calibri", "DejaVu Sans", sans-serif;
  font-size: 10.2pt;
  line-height: 1.5;
  color: var(--ink);
  background: var(--paper);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.serif { font-family: "Caladea", "Cambria", "DejaVu Serif", Georgia, serif; }

/* ── Masthead ───────────────────────────────────────────────────────── */
header.mast { border-bottom: 2.5pt solid var(--ink); padding-bottom: 6pt; margin-bottom: 14pt; }
.brand {
  font-size: 7pt; letter-spacing: .19em; text-transform: uppercase;
  color: var(--teal); font-weight: 700; margin: 0 0 3pt;
}
.mast h1 {
  font-family: "Caladea", "Cambria", Georgia, serif;
  font-size: 25pt; line-height: 1.04; margin: 0; font-weight: 700;
  letter-spacing: -.01em;
}
.mast .sub { margin: 4pt 0 0; color: var(--ink-2); font-size: 10.5pt; }
.mast .meta { margin: 6pt 0 0; font-size: 7.5pt; color: var(--ink-3); letter-spacing: .04em; }

/* ── Flow ───────────────────────────────────────────────────────────── */
h2 {
  font-family: "Caladea", "Cambria", Georgia, serif;
  font-size: 14pt; margin: 17pt 0 7pt; padding-bottom: 3pt;
  border-bottom: .8pt solid var(--rule); break-after: avoid;
}
h2:first-of-type { margin-top: 4pt; }
p { margin: 0 0 7pt; }
.intro { font-size: 11pt; color: var(--ink-2); margin-bottom: 11pt; }

/* ── Numbered beats ─────────────────────────────────────────────────── */
ol.steps { list-style: none; margin: 0 0 10pt; padding: 0; }
ol.steps li { display: flex; gap: 9pt; margin-bottom: 9pt; break-inside: avoid; }
ol.steps .n {
  flex: none; width: 19pt; height: 19pt; border-radius: 50%;
  background: var(--teal); color: #fff; font-weight: 700; font-size: 9pt;
  display: flex; align-items: center; justify-content: center; margin-top: 1pt;
}
ol.steps h3 { font-size: 10.5pt; margin: 0 0 2pt; font-weight: 700; }
ol.steps p { margin: 0; color: var(--ink-2); }

/* ── Said out loud ──────────────────────────────────────────────────── */
.say {
  background: var(--teal-tint); border-left: 2.5pt solid var(--teal);
  padding: 8pt 10pt; margin: 0 0 10pt; break-inside: avoid;
}
.say-label {
  font-size: 7pt; letter-spacing: .14em; text-transform: uppercase;
  color: var(--teal); font-weight: 700; margin: 0 0 4pt;
}
.line {
  font-family: "Caladea", "Cambria", Georgia, serif;
  font-size: 11pt; line-height: 1.42; margin: 0 0 5pt; color: var(--ink);
}
.line:last-child { margin-bottom: 0; }
.cue {
  display: inline-block; font-family: "Carlito", sans-serif;
  font-size: 7.5pt; letter-spacing: .05em; text-transform: uppercase;
  color: var(--coral); font-weight: 700; background: var(--coral-tint);
  padding: .5pt 3.5pt; border-radius: 2pt; margin: 0 1.5pt;
}

/* ── Tips ───────────────────────────────────────────────────────────── */
.tips { display: grid; grid-template-columns: 1fr 1fr; gap: 7pt; margin-bottom: 10pt; }
.tip {
  background: var(--tint); border-radius: 3pt; padding: 7pt 8pt; break-inside: avoid;
}
.tip h4 { margin: 0 0 2pt; font-size: 9.5pt; font-weight: 700; }
.tip p { margin: 0; font-size: 9.3pt; color: var(--ink-2); }

/* ── Rules ──────────────────────────────────────────────────────────── */
ul.rules { margin: 0 0 10pt; padding: 0; list-style: none; }
ul.rules li {
  position: relative; padding-left: 13pt; margin-bottom: 5pt; break-inside: avoid;
}
ul.rules li::before {
  content: ""; position: absolute; left: 0; top: 4.5pt;
  width: 5pt; height: 5pt; border-radius: 1pt; background: var(--coral);
}

blockquote {
  margin: 0 0 10pt; padding: 0 0 0 11pt; border-left: 2.5pt solid var(--gold);
  font-family: "Caladea", "Cambria", Georgia, serif; font-style: italic;
  font-size: 11pt; color: var(--ink); break-inside: avoid;
}
blockquote cite { display: block; font-style: normal; font-size: 8pt; color: var(--ink-3); margin-top: 3pt; }

.callout {
  border: 1pt solid var(--gold); background: var(--gold-tint);
  border-radius: 3pt; padding: 8pt 10pt; margin: 0 0 10pt; break-inside: avoid;
}
.callout h4 { margin: 0 0 3pt; font-size: 9.5pt; color: var(--gold); font-weight: 700;
  letter-spacing: .04em; text-transform: uppercase; }
.callout p { margin: 0; }

/* ── Quick facts ────────────────────────────────────────────────────── */
.facts {
  display: flex; gap: 0; margin: 0 0 11pt;
  border: 1pt solid var(--rule); border-radius: 3pt; overflow: hidden;
}
.facts > div { flex: 1; padding: 6pt 8pt; border-right: 1pt solid var(--rule); }
.facts > div:last-child { border-right: 0; }
.facts dt {
  font-size: 7pt; letter-spacing: .1em; text-transform: uppercase;
  color: var(--ink-3); font-weight: 700; margin: 0 0 1pt;
}
.facts dd { margin: 0; font-size: 12pt; font-weight: 700; }

/* ── The ladder ─────────────────────────────────────────────────────── */
.ladder { margin: 0 0 11pt; }
.rung {
  display: flex; gap: 9pt; padding: 7pt 9pt; margin-bottom: 4pt;
  border-radius: 3pt; background: var(--tint);
  border-left: 3pt solid var(--ink-3); break-inside: avoid;
}
.rung .amt { flex: none; width: 52pt; text-align: right; }
.rung .price {
  display: block; font-family: "Caladea", Georgia, serif;
  font-size: 15pt; font-weight: 700; line-height: 1.1;
}
.rung .each { display: block; font-size: 7.5pt; color: var(--ink-3); margin-top: 1pt; }
.rung .body { flex: 1; min-width: 0; }
.rung .rl { margin: 0 0 2pt; font-weight: 700; font-size: 9.8pt; }
.rung .badge {
  display: inline-block; margin-left: 5pt; font-size: 6.8pt; font-weight: 700;
  letter-spacing: .07em; text-transform: uppercase; color: var(--ink-3);
  border: .7pt solid var(--rule); border-radius: 2pt; padding: .4pt 3pt;
  vertical-align: 1.5pt;
}
.rung .when { margin: 0 0 3pt; font-size: 8.6pt; color: var(--ink-2); font-style: italic; }
.rung .line { font-size: 10pt; margin: 0; }

.t-anchor { border-left-color: var(--ink-3); }
.t-base   { border-left-color: var(--ink-3); }
.t-promo  { border-left-color: var(--teal); background: var(--teal-tint); }
/* Option B is drawn as a sibling, not a descent: a dashed rail and an inset,
   so the eye never reads it as the next step down. */
.t-parallel {
  border-left: 3pt dashed var(--gold); background: var(--gold-tint);
  margin-left: 14pt;
}
.t-voucher { border-left-color: var(--gold); background: var(--gold-tint); }
.t-floor   { border-left-color: var(--coral); background: var(--coral-tint); }

/* ── Card format ────────────────────────────────────────────────────── */
body.card { page: card; font-size: 9pt; }
body.card .mast h1 { font-size: 19pt; }
body.card .mast .sub { font-size: 9pt; }
body.card header.mast { border-bottom-width: 2pt; padding-bottom: 5pt; margin-bottom: 9pt; }
body.card .facts dd { font-size: 11pt; }
body.card .rung { padding: 5pt 7pt; margin-bottom: 3pt; }
body.card .rung .price { font-size: 13pt; }
body.card .rung .amt { width: 46pt; }
body.card .rung .line { font-size: 9pt; }
body.card .rung .when { font-size: 7.8pt; }
body.card ul.rules li { font-size: 8.6pt; }
body.card .callout { padding: 6pt 8pt; }

footer.foot {
  margin-top: 13pt; padding-top: 6pt; border-top: .8pt solid var(--rule);
  font-size: 7.2pt; color: var(--ink-3); display: flex; justify-content: space-between;
}
`;

export function docToHtml(doc) {
  const isEs = doc.lang === 'es';
  const foot = isEs
    ? ['Zero Lines · Andorra · precios en €', 'Generado desde la app — no lo edites a mano']
    : ['Zero Lines · Andorra · prices in €', 'Generated from the app — do not hand-edit'];

  return `<!DOCTYPE html>
<html lang="${doc.lang}">
<head>
<meta charset="utf-8">
<title>${esc(doc.title)}</title>
<style>${CSS}</style>
</head>
<body class="${doc.kind}">
<header class="mast">
  <p class="brand">${esc(doc.eyebrow)}</p>
  <h1>${typo(doc.title)}</h1>
  ${doc.subtitle ? `<p class="sub">${typo(doc.subtitle)}</p>` : ''}
</header>
${doc.blocks.map((b) => renderBlock(b, doc.lang)).join('\n')}
<footer class="foot"><span>${esc(foot[0])}</span><span>${esc(foot[1])}</span></footer>
</body>
</html>`;
}

export async function renderAll(docs, outDir) {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const written = [];

  for (const doc of docs) {
    const html = docToHtml(doc);
    await page.setContent(html, { waitUntil: 'load' });
    const path = join(outDir, `${doc.slug}.pdf`);
    await page.pdf({
      path,
      format: doc.kind === 'card' ? 'A5' : 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin:
        doc.kind === 'card'
          ? { top: '10mm', bottom: '10mm', left: '9mm', right: '9mm' }
          : { top: '17mm', bottom: '16mm', left: '15mm', right: '15mm' },
      displayHeaderFooter: false,
    });
    written.push(path);
    /* The HTML is kept beside the PDF: it is how you check a layout without
       opening a PDF viewer, and it is what you edit if the CSS is wrong. */
    writeFileSync(join(outDir, `${doc.slug}.html`), html, 'utf8');
  }

  await browser.close();
  return written;
}
