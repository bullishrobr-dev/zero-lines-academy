# Zero Lines Academy — what this is, and how to write for it

Read this before you touch a single line of seller-facing copy.

This is a training app for people selling cosmetics from kiosks in a shopping
centre. Two shops: **Andorra (€)** and **Gibraltar (£)**. The sellers are on
their feet all day stopping strangers who did not come here to buy anything.

## Who we are

**We are hustlers, not scientists.** This is street selling. It is direct
selling. It is a market, not a pharmacy — there is a bit of bargaining in it,
a bit of theatre, and a lot of confidence. Every seller in the world talks
their product up and so do we.

Write like that. Direct, warm, cheeky, a touch aggressive, always with a smile
and a good attitude. **Not** Mr Nice Guy. **Not** corporate. **Not** a clinic.
If a line reads like it was written by a compliance department, it is wrong for
this app and a seller will never say it out loud.

The owner's words, and they are the whole brief:

> "It's a bloody grey area. It's a hustle. A little bit of a bargain, a little
> bit of a market. We're not scientists, we're hustlers. Get it into your mind.
> Otherwise you're gonna be too much of a Mr. Nice Guy."

Puffery is fine. Not every claim has to be scientifically proven. That is the
register — but see **Lines we do not cross** below, which is short and real.

## THE RULE: they do not leave the shop

This is the one that overrides everything else.

**If they walk out, they are never coming back.** Treat every exit as a lost
sale, because it is one. So no piece of copy anywhere in this app may ever
suggest, teach, praise, or reward:

- ❌ "Come back later / tomorrow / when you have decided"
- ❌ "Think about it" / "sleep on it" / "take your time" / "no rush"
- ❌ Handing them a card, a sample, or a price to take away with them
- ❌ Sending them off to ask a partner who is not standing there
- ❌ "No pressure" as an exit — keep the softness, lose the door

If a script's answer to an objection ends with the customer leaving, the script
is wrong, however polite it sounds. The card-with-the-price-written-on-it is
the perfect example: it feels helpful, it feels professional, and it walks a
customer who was ready to buy straight out of the door.

**The only exception**, and it is rare: you have genuinely gone A to Z, given it
100%, and nothing worked. Then you let them go. That is a last resort, never a
plan, and never the "correct answer" in a quiz.

## The voucher is a device, not a gift

There is no real voucher. **We make it up on the spot.** It exists to justify a
price drop inside the shop — the moment where you go from {currency}175 to
{currency}140 and give her a second to breathe:

> "You know what — I'll do that for you. But you're being greedy. I can only do
> it on the regular size."

That is what the voucher is for. It is a reason to come down, invented in the
moment, with a small piece of theatre attached.

**We do not hand out vouchers to take away.** A voucher that leaves the shop is
just a customer leaving the shop with extra steps. Any copy that has the seller
issuing a voucher "for next time", holding one at the counter, or telling
someone the voucher will be waiting for them is wrong — rewrite it.

## The two yeses

Get these during the demo, while her hand is still in yours:

> "Do you like it?" — *Yes.*
> "If you had it at home, would you use it?" — *Yes.*

Once she has said yes to both, **she cannot object to anything except the
price.** That is the point of them, and it is why the answers to "I need to
think about it" and "I need to ask my partner" both work the same way: remind
her she already said yes, then put the decision back in her hands, right now,
in front of you.

"Ask my partner" is not really about the partner:

> "Ladies' business, my darling. He is playing golf — he is not thinking about
> your face. You said you like it, you said you would use it. So it is your
> call, not his. Spoil yourself. And if you really would not use it, keep your
> money — no hard feelings."

Note the ending. Being willing to walk away from her money is part of the
close, not a softener bolted on.

## Lines we do not cross

Short list, and none of it is about being nice — it is about things that come
back on the shop. Each one is enforced by a script in `scripts/` that runs in
CI, so a regression fails the build rather than reaching a customer.

- **No tax claims.** No "tax free", "tax haven", "duty free", VAT or IVA.
  Andorra's status is not a selling point we voice. (`check-no-tax-claims.mjs`)
- **No promise the shop has to honour after the sale.** No refunds, no returns,
  no money-back, no guarantees of future service. We do not do returns.
  (`check-no-lasting-promises.mjs`)
- **The buffer warranty is the one exception, and it is real.** Bring the old
  buffer back, get a new one, forever. Say it with confidence — the owner
  honours it.
- **No medical or therapeutic claims.** "Natural", "no chemicals", "no
  parabens", "gentle enough for the most sensitive skin" — all fine, all in
  register. Naming a disease or a medical condition the product helps with is
  not, and that is not squeamishness: it is a claim about a vulnerable person
  that a seller would be saying out loud to their face.
- **Prices come from `src/data/pricing.ts`.** Never write a number by hand.
  Use `{currency}` and `{locationName}` and let `sub()` resolve them, so
  Gibraltar never reads a euro price.

Everything outside that list is fair game. Talk it up.

## Language

Every seller-facing string needs an English and a Spanish twin
(`check-spanish-parity.mjs` enforces it). Spanish is **European Spanish,
informal tú** — the sellers and customers are in Andorra and Gibraltar, not
Latin America. "Vale", "cariño", "venga", "date un capricho". Not "ustedes",
not LatAm vocabulary.

## Before you commit

```
npm run typecheck && npm run lint && npm run check:content
```

`check:content` runs every guard above plus the quiz and tier checks. If you
change `src/data/lessons.ts`, run `npm run gen:meta` — `src/data/lessonMeta.ts`
is generated from it and CI fails if it has drifted.

Other things worth knowing:

- `src/backend/supabaseClient.ts` holds the **publishable/anon** key, which is
  meant to be public. Never put a `service_role` / `sb_secret_…` key in this
  repo — it bypasses every row-level-security policy, and the repo is public.
- `LESSON_QUIZZES` in `lessonQuizzes.ts` **overlays** a lesson's inline `quiz`.
  Fixing the inline copy for a lesson that has an overlay entry edits dead code.
- Lesson bodies live in `lessons.ts` and load only on the lesson and quiz
  screens. Everything else should import from `lessonMeta.ts` or
  `categories.ts`, or the home screen starts downloading the whole corpus again.

## When in doubt

Read the line out loud as if a customer is standing in front of you, in a
shopping centre, with somewhere else to be. If you would not say it, or if
saying it would end with them walking away, it does not go in the app.
