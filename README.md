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

`guide/` holds the illustrated PDF study guide that goes with the app.

- `guide/content.js` chapter text, `guide/figures.js` inline SVG diagrams, `guide/style.css` print styles.
- `guide/build.js` pulls the question bank and glossary out of `index.html` so guide and app stay in step, writes `guide/guide.html`, and prints `guide/F-Gas-Cat-I-Study-Guide.pdf` with Playwright's Chromium.

Rebuild with `node guide/build.js` (needs Node and Playwright with Chromium).
