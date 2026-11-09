# Handover: F-Gas Category I Trainer and Study Guide

## What this is

Revision material for the City & Guilds 2079-11 Level 2 Award in F-Gas and ODS
Regulations, Category I. Built for Luke's father, who is sitting the exam after an
HSS Training course. Two deliverables share one content source:

1. **The practice app** (`index.html`): a single-file web app. Multiple-choice
   questions marked instantly with an explanation, practice and mock exam modes,
   and a tap-to-define glossary. Live on Vercel at fgas-trainer.vercel.app.
2. **The study guide** (`guide/`): "F-Gas Category I in Pictures", a 50-page A4
   PDF. One topic per page: title, subtitle, a drawing, four icon boxes and a
   takeaway bar. Then 30 practice questions with answers, a numbers-to-memorise
   page and the glossary.

Everything is written to **Great Britain** rules: the GB F-Gas Regulation
(retained EU 517/2014) and the GB ODS Regulation. The newer EU 2024/573 applies
in Northern Ireland only. Several competing products teach the EU categories and
dates, which are wrong for this exam. Do not "update" the content to EU rules.

## Repository layout

```
index.html              the whole app: HTML, CSS, JS, question bank (Q), topics (T), glossary (GL)
vercel.json             static hosting config
README.md               short public readme
HANDOVER.md             this file
guide/
  topics.js             38 topic pages: part, tag, slug, title, sub, fig, 4 tiles, foot
  figures.js            38 inline SVG schematic drawings, keyed by name
  icons/                Lucide line icons (ISC licence), one SVG per tile icon
  images/               drop generated illustrations here as <slug>.png (empty so far)
  IMAGE-PROMPTS.md      style line plus one written prompt per page, with filenames
  style.css             print stylesheet (A4, poster layout, back-matter styles)
  build.js              builds guide.html and the PDF
  guide.html            generated, committed for convenience
  F-Gas-Cat-I-in-Pictures.pdf   generated output
```

## How the pieces connect

- `guide/build.js` reads `index.html`, extracts `T`, `Q` and `GL` with a regex and
  evaluates them. The 30 practice questions and the printed glossary come from
  there, so **edit questions and glossary terms only in `index.html`** and rebuild.
- Questions are `{t, q, a:[4 options], c: index of correct, e: explanation}`.
  In source `c` is always 0; the app shuffles options at runtime. Question ids are
  array positions and are stored in users' localStorage as "wrong answers", so
  **append new questions at the end**, do not insert in the middle.
- Glossary entries are `{k: term, alt:[aliases], d: definition}`. The app
  underlines any match in question text and explanations and opens a bottom sheet.
- Each topic page's hero is `figures[t.fig]` unless `guide/images/<slug>.png`
  (or .webp/.jpg) exists, in which case the image is used instead.

## Build

```
node guide/build.js
```

Needs Node 18+ and Playwright with Chromium (`npm i playwright` then
`npx playwright install chromium` if not present). It prints how many
illustrations it found, writes `guide/guide.html`, and prints the PDF with
Chromium. Fonts load from Google Fonts at build time; without network it falls
back to system fonts and still builds.

## Deployment

The app is a static site on Vercel from the repo root, no build step. Pushing to
`main` redeploys. Vercel Web Analytics script tag is in `index.html`; it only
reports once Analytics is enabled in the Vercel project dashboard.

## State of play

Done:
- App: 124 questions across 8 topics, 94 glossary terms, practice and mock modes,
  progress in localStorage, mobile layout verified at 390 px.
- Guide: 38 topic pages with schematic drawings, questions, numbers, glossary.
  Layout verified page by page.

Not done:
- **Illustrations.** In progress on branch `guide-illustrations`; see the next
  section.
- **Sales page and checkout**, if Luke decides to sell it. Would need a landing
  page with real company details, a Stripe Payment Link or Gumroad product that
  delivers the PDF, and a price. Nothing built yet.

## Illustrations: where it stands (2026-11-09)

Branch: `guide-illustrations`. Goal: one image per topic page, in the style and
with the filenames given in `guide/IMAGE-PROMPTS.md`.

Done so far:
- 3 of 38 pages have a hand-drawn SVG illustration (no image generator was
  available on LukeHomePC): `the-cycle-in-four-stages`, `the-manifold-gauge-set`,
  `the-recovery-cylinder`. The sources are in `guide/art/<slug>.svg` and the
  rendered PNGs are in `guide/images/`. The PDF was rebuilt and those pages
  checked: no cropping, and the checklist below passes.
- `guide/render-art.js` renders `guide/art/*.svg` to `guide/images/*.png`
  at 1600x900 (`node guide/render-art.js [slug ...]`).
- `node_modules` added to `.gitignore` (Playwright is installed locally for
  the build, not saved to package.json).

Decision: Luke wants the images made with the image generator that the SWCC
assistant uses on the SWCC server, not hand-drawn. Generate **all 38**,
including the three pilots, so the style matches. Generated files with the
same name overwrite the pilot PNGs. `build.js` uses whatever is in
`guide/images/`.

Next steps for the session on the SWCC machine:
1. `git fetch && git switch guide-illustrations`, then `npm i --no-save playwright`
   and `npx playwright install chromium`.
2. Find out from Luke what the generator is (ComfyUI, Automatic1111,
   OpenAI-style API, etc.) and its address. Any key goes in an env var or
   `.env` (already git-ignored), never in chat or in a committed file.
3. Write a small script that, for each `### n. Title` + `` `guide/images/<slug>.png` ``
   block in `IMAGE-PROMPTS.md`, sends the style line + the prompt, and saves the
   result at that path (landscape, at least 1600x900). Start with 2 or 3 pages,
   show Luke, then do the rest.
4. Check every image against the checklist below. Image models often add
   fake text or labels; regenerate any image that has them.
5. `node guide/build.js` should print "illustrations found: 38 of 38". Skim the
   pages for cropping, then commit and open a PR into `main`.

Fallback if the generator does not work out: carry on hand-drawing SVGs in
`guide/art/` in the same style as the three pilots, then run `render-art.js`.

## Checks before accepting generated images

- No text, letters or numbers in the image. The page carries the words.
- Colour code everywhere: blue = cold / low pressure, orange = hot / high pressure.
- UK recovery cylinders are grey with a yellow shoulder. Nitrogen cylinders dark
  grey. Manifold: blue gauge left, red right, yellow centre hose.
- Nothing shown as correct that is a safety violation (flame near a cylinder,
  brazing a charged line) unless the prompt asks for it with a red cross overlay.
- After rebuilding, skim the PDF for cropped or undersized images.

## Facts the content relies on (do not change without checking)

- Category II/III charge limit: under 3 kg, or 6 kg if hermetically sealed and labelled.
- Leak checks: 5 / 50 / 500 t CO2e at 12 / 6 / 3 months, doubled with a fixed
  leak detection system; detection system compulsory at 500 t; labelled hermetic
  threshold 10 t; re-check within 1 month of a repair; detection systems checked
  every 12 months; electronic detectors 5 g/yr sensitivity, checked yearly.
- Records kept 5 years by operator and contractor. Consignment notes 3 years.
- GWP (AR4, as the regulation uses): R32 675, R134a 1430, R407C 1774, R22 1810,
  R410A 2088, R404A 3922, R1234yf 4, R290 3, R744 1, R717 0.
- Dates: R22 virgin banned 2010, recycled 2015. GWP ≥2500 new stationary
  refrigeration banned 2020; virgin ≥2500 service ban in ≥40 t CO2e systems from
  2020, recycled/reclaimed allowed to 2030. Single splits <3 kg below GWP 750 from 2025.
- Recovery cylinder 80% by weight. Vacuum target below 500 microns. Strength test
  1.1 × PS, tightness test at PS, OFN only. PSSR written scheme above 25 kW.

## Disclaimers to keep

Every output states it is independent revision material, not official City &
Guilds content, not affiliated with City & Guilds or HSS Training, and that the
course workbook wins where it differs. Keep that wording on the cover, contents
page and back page of the PDF and on the app's home screen.
