# DCI Mental Models Scorecard: Draft 1 review notes

Status: **Draft 1, a pilot-ready prototype requiring user testing. Not a validated psychological assessment.**
Content foundation: the Lead Consultant's "DCI Mental Models: ten Model pages, pilot draft 2".
Content version string (travels with feedback): `draft-1.0`.

## Where everything lives

| What | Where |
|---|---|
| The ten Models (all wording) | `src/lib/mental-models/models.ts` |
| Questions, options, scoring constants | `src/lib/mental-models/questions.ts` |
| Scoring engine | `src/lib/mental-models/scoring.ts` |
| Next steps (pathways) and state messages | `src/lib/mental-models/pathways.ts` |
| Pilot wording variants | `src/lib/mental-models/variants.ts` |
| Share card | `src/lib/mental-models/share.ts` |
| Version string | `src/lib/mental-models/version.ts` |
| Pages | `src/routes/mental-models/` (landing, `take`, `[model]`), `src/routes/support/` |
| Tests | `src/lib/mental-models/__tests__/` (run `npm test`) |

To refine questions, wording or scoring after pilot feedback, edit the files above and bump `CONTENT_VERSION`.

## The experience

1. **Landing** (`/mental-models`): the lead question, the teaching idea, the four steps, the two separate things, the ten Models, what this is and is not.
2. **Right now** (not scored): Steady, Strained, Overwhelmed or Rather not say. Overwhelmed shows a support-first pause before the questions.
3. **Twelve scenario questions**: tap "most like me" (2 points), optionally tap a second that also fits (1 point). Up to 4 can be skipped.
4. **One optional question** (the consultant's "what feels hardest about letting someone see"): never scored.
5. **A clarifier, only if two patterns are too close**: one question, no Model names shown.
6. **Result**: primary Model, optional "also strong" Model, the five-section Model page, next steps, voluntary share card, private-by-default note, optional anonymous feedback.
7. **Ten public Model pages** (`/mental-models/<model>`) for browsing, with no personal data.
8. **A support page** (`/support`).

## How scoring works

- Each question gives the Model behind the "most like me" option 2 points, and the Model behind an optional "also like me" option 1 point. Skipped questions score nothing.
- Every Model appears in exactly 6 of the 12 questions, so every Model's maximum is 12 and totals are directly comparable.
- Models are ranked by total. Exact ties are broken by a hash of the person's own answers, never by a fixed Model order, so no Model is favoured.
- If first and second place are within 2 points, no Model is named yet. The person answers one clarifier choosing between the two underlying reasons, "both" or "neither". A choice names that Model (the other stays as "also strong"). "Both" or "neither" shows the two together as a blend.
- Otherwise the top Model is named. A second Model is shown as "also strong" only if it scores at least 4 points and at least 70 percent of the first.
- **The current stress state is never an input.** `scoring.ts` accepts no state, and a test asserts that the file never mentions one. State changes only the tone, the order of next steps, and whether a support card comes first.
- Question layout: 12 questions, 5 options each. Every pair of Models meets in at least one question. Observer, Drifter and Navigator meet each other in 4 questions, and three questions hold all three. Three "discriminator" questions are written around the inside reason for going quiet, which is what separates the three.

### Simulation evidence (design check only)

Simulated respondents are not real people and say nothing about validity. They show whether the structure can recover a known pattern from noisy answers, and where it confuses Models. Seeded, 1,500 respondents per Model, noise drifting toward related Models:

| Respondent picks their own Model | Right Model after the clarifier | Clarifier asked | Observer/Drifter/Navigator confused with each other |
|---|---|---|---|
| 70 percent of the time | 85 percent | 39 percent | 4 to 6 percent |
| 50 percent of the time | 61 percent | 66 percent | 15 to 18 percent |

With purely random answers every Model comes first about 10 percent of the time (an earlier version tilted from 6 to 14 percent because of its tie-break rules; that was fixed).

Accuracy by first-versus-second margin, for respondents at the 70 percent level, is why the threshold is 2:

| Margin | Share of respondents | Top pick right |
|---|---|---|
| 0 | 5 percent | 40 percent |
| 1 | 9 percent | 71 percent |
| 2 | 11 percent | 89 percent |
| 3 | 13 percent | 97 percent |
| 4 or more | 60 percent | 99 to 100 percent |

## Decisions that need human review

Each is a first-pass call, made so the product is complete. None is final.

1. **Question and option wording is entirely new.** The consultant's draft contained Model pages, not questions. All 60 options (and the 12 prompts) were written for this draft from the consultant's own lines (first move, autopilot, "what it may be protecting", the Observer/Drifter/Navigator contrasts). They need the consultant's review and youth cognitive testing. Likely weak spots: Drifter options read as avoidant, so people may under-choose them (social desirability); Receiver and Advocate sit in a few less natural questions (Q6, Q7).
2. **Section 05 label defaults to "Learn from"**, not "Most compatible with". The consultant asked for this to be tested. I chose "Learn from" because "compatible" suggests matching and invites "incompatible" inferences, and the draft itself says it means a skill to learn from. Preview the other with `?sectionFive=compatible`.
3. **Drifter verb defaults to "I GET STUCK"** (the draft's choice). Preview `?drifterVerb=hide` and `?drifterVerb=withdraw`. Active variants are sent with feedback.
4. **Connector's "learn from" line.** The draft says Navigator should try "CONNECT", but Connector's verb is "I FIND someone". I used "FIND someone" so it matches. Confirm.
5. **Stress state is asked first**, with a support-first pause if someone says Overwhelmed (they can still continue). Asking it first lets support lead; asking it last would avoid priming the answers. This is a real trade-off and needs a decision.
6. **Clarifier threshold of 2** (see the table). Raising it to 3 gives about 97 percent accuracy at the cost of asking about 38 percent of people instead of about 25.
7. **Weights of 2 and 1, and a skip limit of 4.** Both are judgment calls.
8. **"Does that fit your experience?"** is now three optional chips (Yes, Partly, Not really), kept only in memory unless the person sends feedback. Drifter's text already contains its own invitation ("Your reason may be different"), so the line is not added there. The feedback form asks whether the lines felt like an invitation or a label, which is the consultant's pilot question.
9. **Optional origin reflections** are collapsed by default and say "one possible influence, not the cause". The technical words (Parentification, Avoidant attachment, overparenting) appear only in an optional "You may have heard" row inside that section, never as a label. They may still sound clinical to young people; review.
10. **Next steps (pathways) are my mapping**, one learn, one community and one support step per Model, on real site routes only. Items to confirm with the programme team: Advocate pointing to the Community Champion path (could add load to someone prone to burnout); Sponsor pointing to DCI Angels; the Drifter clinic line "you decide how much to say" and the Mood Tracker line "a one-minute daily check" make claims about clinic norms and the product that I could not verify.
11. **Support page has no hotline numbers.** The draft said contacts are to be confirmed by Restless, and I will not invent or guess crisis numbers. It gives generic emergency guidance, DCI's own phone and contact form (already on the site), and says verified local services are being gathered. **Verified contacts must be added before any wider launch.** DCI's own site states it does not provide clinical care, so no page implies it does.
12. **Placement.** The hero's secondary button "Sponsor a Toolkit" is replaced by a DCI-red "Take the free scorecard". Sponsor remains in the "Start where you are" support option, the "Get involved" section, and the Toolkit menu. A "Free scorecard" item sits in the Toolkit menu and two links in the footer. The scorecard fits the hero audience better than the Blueprint Assessment, which is about leadership performance.
13. **Draft pages are `noindex` and excluded from the sitemap** until reviewed. To publish, remove the rule in `src/routes/+layout.svelte` (`draftPage`) and the `DRAFT_PREFIXES` lines in `src/routes/sitemap.xml/+server.ts`.
14. **Feedback goes by email** through Resend (same as the Blueprint Assessment), not into a database. It needs `RESEND_API_KEY` set in Vercel; without it the form says it could not deliver. Feedback is anonymous (no name, email or IP read), and the stress state and "hardest" answer are included only if the person ticks a box. A proper store (a database table) would make analysis much easier and needs an explicit decision.
15. **Youth safeguarding and consent.** There is no age gate, and a youth pilot collecting even anonymous comments needs the organisation's ethics, consent and safeguarding sign-off. The "not feeling safe" answer triggers a safety note; a clinician should review that logic and wording.
16. **English only.** Reading level was not measured, and the Models rely on idiom. Local-language and reading-level review is advisable.

### Edits to the consultant's wording
- Section 05 "Why" lines were split into the reason and a "try the move" line (for example "ASK FOR HELP: let someone share the load.").
- "DCI Journal" is written "DCI Reflection Journal" (the product name on the site).
- Origin lines were split into stage, age note, journal letter and body for layout; the text is otherwise as drafted.
- Added: blend wording, the clarifier, the support-first pause, the state card, share and privacy panels.
- Kept as drafted: the ten Models' firstMove, strength, autopilot, tooMuch, protecting, blindSpot, onPurpose, tinyStep, reflect, canTeach and shareLine.
- No em dashes are used anywhere in visible copy (a test checks this).

## What the consultant asked to test in the pilot, and how this build supports it

| Pilot question | Support in Draft 1 |
|---|---|
| Observer vs Drifter vs Navigator: can readers tell them apart? | Three discriminator questions, the dedicated clarifier lines using the consultant's own contrasts, and simulation confusion rates to compare against real data. |
| Drifter label (stuck, hide, withdraw) | `?drifterVerb=` variants; variant is sent with feedback. |
| "Most compatible with" vs "Learn from" | `?sectionFive=` variants; variant is sent with feedback. |
| "Does that fit your experience?": invitation or diagnosis | Feedback question, plus Yes/Partly/Not really chips. |
| Optional "what feels hardest" question | Asked, never scored, shared only by choice. |
| Retake stability | **Not built.** It needs a way to link two attempts, which conflicts with private-by-default. Suggest a recruited pilot where testers email both results. |

Pilot research hypotheses (not shown to users; for analysis only). Possible directions under overwhelm, to track and not treat as facts: Champion toward burnout, going quiet or pulling away; Angel toward resentment or pulling away; Connector toward constant busyness or suddenly going quiet; Sponsor toward overwork and emotional distance; Navigator toward going inward and shutting people out; Intellectual toward overthinking or numbness; Observer toward Drifter if thinking turns into stuck; Receiver toward Navigator if support does not land; Drifter toward deeper hiding, numbness or disappearing; Advocate toward burnout, then silence.

## Known limits of Draft 1

- No real-user testing has happened. Everything above is design and simulation.
- In-progress answers are not saved; a refresh restarts the quiz (a privacy choice).
- The share card is on-screen text plus copy and share buttons, not a downloadable image.
- Keyboard and screen-reader support follow standard buttons, labels and headings, but were not tested with assistive technology.
- Feedback delivery is untested against a live email key.

## Draft 1.1 (branch mental-models-draft-1)

What changed:
- Two taps per scenario: "First, you..." builds the Go-to Model and "If that doesn't help, you..." builds the Under-pressure Model. The second Model is shown only when it has at least 3 taps, leads the next Model by 1, and differs from the Go-to; otherwise one Model is shown. Every ordered pair is reachable from answers alone (tested); there is no combination table.
- All 12 scenarios rewritten as situations with action options, on the same balanced layout. The old Q2 (inside reason), Q7 (what others say) and Q12 (pride) could not work as two taps.
- Wording: "Reaction" and "Response" replace "On autopilot" and "On purpose"; headline "Your Model is your go-to way of coping."; section 05 is now "A skill to borrow" (a strength of a pattern, not a kind of person).
- Results page order: hero (combination, signature, share), reaction and response with the tiny step, blind spot, a line you can send, full report preview unlocked by email, Keep going and Pass it on cards, footer.
- "Keep noticing" (the email opt-in) now also unlocks the full report and carries the 90-day retake reminder that the "Keep going" card points to.
- Consent and privacy wording moved into src/lib/mental-models/consent-copy.ts for legal review.

Simulation (not validity evidence), respondents picking their own option 70% of the time: Go-to right 87%; Under-pressure right 96% when shown and shown 85% of the time when the person really has a different one; a second Model is wrongly shown 14% of the time when the person has none. Raising UNDER_MIN_LEAD to 2 would lower that false second Model at the cost of showing fewer.

Open for review:
- models.json (12 Models including the pilot Models) was not available. src/lib/mental-models/merge.ts and pilot.ts are ready; the pilot Models are not scored until their content and scenario options exist.
- Brief said "free without email: a to d, g and h"; there is no h. Built as a to d, f and g free.
- The DCI EWS is not open for individual sign-up yet, so "Keep going" says it is coming soon and offers the 14-day check and the 90-day reminder.
- Unlocking the report requires opting in to a reminder. Legal review: is that freely given consent? The same content is readable without email on the public Model pages.
- Model names "Sponsor", "Champion" and "Angel" overlap DCI ontology terms (Sponsor, Community Champion, DCI Angel). Worth a naming review.
