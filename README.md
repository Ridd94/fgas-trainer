# F-Gas Cat I Trainer

A single-file practice quiz for the City & Guilds 2079-11 Level 2 Award in F-Gas & ODS Regulations (Category I).

- 124 multiple-choice questions across the syllabus, marked instantly with an explanation of why.
- Practice mode (feedback per question, choose topics) and a 30-question mock exam marked at the end.
- A glossary of 94 jargon terms; terms are dotted-underlined in questions and open a definition when tapped.
- Progress is stored in the browser's localStorage only.

It is plain HTML, CSS and JavaScript with no build step and no backend. Fonts load from Google Fonts; everything else is inline.

## Deploy

Any static host works. Point the host at the repo root and serve `index.html`.

- **Vercel / Netlify:** import the repo. No build command, no root directory change, output directory `.`.
- **GitHub Pages:** enable Pages for the `main` branch, root folder.
- **Locally:** open `index.html` in a browser.

The questions are revision material written from the syllabus and the GB F-Gas and ODS Regulations. They are not official City & Guilds content.

## Study guide

`guide/` holds "F-Gas Category I in Pictures", the illustrated PDF that goes with the app: one topic per page with a drawing, four key-point boxes and a takeaway line, plus practice questions, a numbers page and the glossary.

- `guide/topics.js` page content, `guide/figures.js` inline SVG drawings, `guide/icons/` line icons (Lucide, ISC licence), `guide/style.css` print styles.
- `guide/build.js` pulls the question bank and glossary out of `index.html` so guide and app stay in step, writes `guide/guide.html`, and prints `guide/F-Gas-Cat-I-in-Pictures.pdf` with Playwright's Chromium.

Rebuild with `node guide/build.js` (needs Node and Playwright with Chromium).

### Illustrations

Each topic page has an image slot. Drop a picture at `guide/images/<slug>.png` (slugs and a ready-made prompt for each page are in `guide/IMAGE-PROMPTS.md`), rebuild, and that page uses the picture instead of its schematic drawing. Pages without a picture keep the drawing.
