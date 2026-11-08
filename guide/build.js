// Builds guide.html and the PDF from content.js, figures.js and the question bank in ../index.html.
const fs = require("fs"), path = require("path");
const { chapters, numbers } = require("./content");
const figures = require("./figures");
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

// Pull Q, T and GL out of the app so guide and quiz always agree.
const app = fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const js = app.slice(app.indexOf("<script>")+8, app.lastIndexOf("</script>"));
const grab = (start, end) => js.slice(js.indexOf(start), js.indexOf(end, js.indexOf(start)));
const { T, Q, GL } = new Function(grab("const T = {","Q.forEach") + grab("const GL = [","const GLmap") + "; return {T,Q,GL};")();

// 30 practice questions, spread across topics, deterministic.
const byTopic = {}; Q.forEach((q,i)=>{(byTopic[q.t]=byTopic[q.t]||[]).push(i)});
const pick = []; const want = {R:5,G:5,L:4,V:3,I:4,S:4,H:3,D:2};
for (const t in want) { const ids = byTopic[t]; const step = ids.length/want[t]; for (let k=0;k<want[t];k++) pick.push(ids[Math.floor(k*step)]); }
const letters = "ABCD";
// Shuffle options deterministically per question so the answer is not always A.
const rot = i => [0,1,2,3].map(k => (k + (i*7)%4) % 4);

const practice = pick.map((id, n) => { const q = Q[id]; const order = rot(n); const ans = letters[order.indexOf(q.c)];
  return { n:n+1, q, order, ans }; });

const style = fs.readFileSync(path.join(__dirname,"style.css"),"utf8");

let html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>F-Gas Category I Study Guide</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">
<style>${style}</style></head><body>`;

// Cover
html += `<section class="cover">
 <div class="eyebrow">City &amp; Guilds 2079-11 · Level 2 Award · F-Gas &amp; ODS Regulations · Category I</div>
 <h1>F-Gas Category I<br>Study Guide</h1>
 <p class="sub">The refrigeration cycle, refrigerants, the law, leak checking, recovery, commissioning and safety, explained in pictures, with every number you need on one page and 30 practice questions.</p>
 <div class="coverfig">${figures.cycle}</div>
 <p class="edition">Great Britain edition · 2026 · Written for the GB F-Gas Regulation (retained EU 517/2014) and the ODS Regulation</p>
</section>`;

// Contents
html += `<section class="page toc"><h2>Contents</h2><ol>`;
chapters.forEach(c => html += `<li><span class="n">${c.n}</span><span class="t">${esc(c.title)}</span><span class="d">${esc(c.intro)}</span></li>`);
html += `<li><span class="n">11</span><span class="t">Practice questions</span><span class="d">30 exam-style questions with an answer key and explanations.</span></li>
<li><span class="n">12</span><span class="t">Numbers to memorise</span><span class="d">Every threshold, date and value on one page.</span></li>
<li><span class="n">13</span><span class="t">Glossary</span><span class="d">${GL.length} terms in plain English.</span></li></ol>
<p class="small">Companion practice app: <strong>fgas-trainer.vercel.app</strong>. The questions and glossary in this guide are the same ones the app uses, so they always agree.</p>
<p class="small">This is independent revision material written from the published syllabus and the GB regulations, using the GWP values the regulation uses (IPCC AR4). It is not official City &amp; Guilds content and is not affiliated with City &amp; Guilds or any training provider. Where your course workbook or tutor differs, follow them.</p></section>`;

// Chapters
chapters.forEach(c => {
  html += `<section class="page chapter"><div class="chap-head"><span class="chapnum">${c.n}</span><div><h2>${esc(c.title)}</h2><p class="intro">${esc(c.intro)}</p></div></div>`;
  c.sections.forEach(s => {
    html += `<div class="sec"><h3>${esc(s.h)}</h3>${s.fig?`<figure>${figures[s.fig]}</figure>`:""}${s.body}</div>`;
  });
  html += `</section>`;
});

// Practice questions
html += `<section class="page chapter"><div class="chap-head"><span class="chapnum">11</span><div><h2>Practice questions</h2><p class="intro">Thirty exam-style questions. Mark yourself with the key on the next pages, then read the explanations for anything you missed.</p></div></div><ol class="qs">`;
practice.forEach(p => {
  html += `<li><p class="qt"><span class="topic">${esc(T[p.q.t])}</span>${esc(p.q.q)}</p><ol class="opts">${p.order.map((oi,k)=>`<li><span class="k">${letters[k]}</span>${esc(p.q.a[oi])}</li>`).join("")}</ol></li>`;
});
html += `</ol></section>`;
html += `<section class="page chapter"><div class="chap-head"><span class="chapnum">11</span><div><h2>Answers and explanations</h2></div></div><div class="answers">`;
practice.forEach(p => html += `<div class="ans"><span class="k">${p.n}</span><div><strong>${p.ans}.</strong> ${esc(p.q.a[p.q.c])}<p>${esc(p.q.e)}</p></div></div>`);
html += `</div></section>`;

// Numbers
html += `<section class="page chapter"><div class="chap-head"><span class="chapnum">12</span><div><h2>Numbers to memorise</h2><p class="intro">If you learn one page, learn this one.</p></div></div><table class="numbers"><tbody>`;
numbers.forEach(n => html += `<tr><th>${esc(n[0])}</th><td>${esc(n[1])}</td></tr>`);
html += `</tbody></table></section>`;

// Glossary
html += `<section class="page chapter"><div class="chap-head"><span class="chapnum">13</span><div><h2>Glossary</h2><p class="intro">The trade's words, in plain English. The same ${GL.length} terms are tappable in the practice app.</p></div></div><dl class="gl">`;
GL.slice().sort((a,b)=>a.k.localeCompare(b.k)).forEach(g => html += `<dt>${esc(g.k)}${g.alt&&g.alt.length?` <span>(${esc(g.alt.slice(0,2).join(", "))})</span>`:""}</dt><dd>${esc(g.d)}</dd>`);
html += `</dl></section>`;

html += `<section class="page back"><p>F-Gas Category I Study Guide. Independent revision material for the City &amp; Guilds 2079-11 syllabus. Not affiliated with City &amp; Guilds, HSS Training or any awarding body. Regulations change: check the current GB F-Gas and ODS Regulations before relying on a date or threshold at work.</p><p>Practice app: fgas-trainer.vercel.app</p></section>`;
html += `</body></html>`;
fs.writeFileSync(path.join(__dirname,"guide.html"), html);
console.log("guide.html written:", (html.length/1024).toFixed(0), "KB,", practice.length, "practice questions,", GL.length, "glossary terms");

// PDF
(async () => {
  const { chromium } = require("playwright");
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto("file://" + path.join(__dirname,"guide.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const out = path.join(__dirname, "F-Gas-Cat-I-Study-Guide.pdf");
  await p.pdf({ path: out, format: "A4", printBackground: true, margin: { top:"18mm", bottom:"18mm", left:"16mm", right:"16mm" },
    displayHeaderFooter: true,
    headerTemplate: `<div style="width:100%;font-size:8px;color:#5b6b75;padding:0 16mm;font-family:Arial,sans-serif;display:flex;justify-content:space-between"><span>F-Gas Category I Study Guide</span><span>City &amp; Guilds 2079-11</span></div>`,
    footerTemplate: `<div style="width:100%;font-size:8px;color:#5b6b75;padding:0 16mm;font-family:Arial,sans-serif;text-align:center"><span class="pageNumber"></span> of <span class="totalPages"></span></div>` });
  await b.close();
  console.log("PDF written:", out, (fs.statSync(out).size/1024).toFixed(0), "KB");
})();
