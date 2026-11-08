// Builds guide.html and the PDF. One topic per page from topics.js, figures from figures.js,
// icons from ./icons, questions and glossary pulled live from ../index.html so guide and app agree.
const fs = require("fs"), path = require("path");
const topics = require("./topics");
const figures = require("./figures");
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const icon = n => { try { return fs.readFileSync(path.join(__dirname,"icons",n+".svg"),"utf8").replace(/<svg /,'<svg aria-hidden="true" ') } catch(e){ return "" } };

const app = fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const js = app.slice(app.indexOf("<script>")+8, app.lastIndexOf("</script>"));
const grab = (a, b) => js.slice(js.indexOf(a), js.indexOf(b, js.indexOf(a)));
const { T, Q, GL } = new Function(grab("const T = {","Q.forEach") + grab("const GL = [","const GLmap") + "; return {T,Q,GL};")();

const byTopic = {}; Q.forEach((q,i)=>{(byTopic[q.t]=byTopic[q.t]||[]).push(i)});
const want = {R:5,G:5,L:4,V:3,I:4,S:4,H:3,D:2}; const pick = [];
for (const t in want) { const ids = byTopic[t], step = ids.length/want[t]; for (let k=0;k<want[t];k++) pick.push(ids[Math.floor(k*step)]); }
const letters = "ABCD", rot = i => [0,1,2,3].map(k => (k + (i*7)%4) % 4);
const practice = pick.map((id,n) => { const q=Q[id], order=rot(n); return { n:n+1, q, order, ans: letters[order.indexOf(q.c)] }; });

const numbers = [
 ["3 kg / 6 kg hermetic","Charge limits for Category II and III work"],
 ["3 g per year","Maximum leak rate to count as hermetically sealed"],
 ["5 / 50 / 500 t CO2e","Leak check every 12 / 6 / 3 months (24 / 12 / 6 with detection)"],
 ["10 t CO2e","Leak check threshold for labelled hermetic equipment"],
 ["500 t CO2e","Fixed leak detection system compulsory"],
 ["1 month","Re-check after a leak repair"],
 ["12 months","Check interval for leak detection systems and electronic detectors"],
 ["5 g per year","Minimum sensitivity of an electronic leak detector"],
 ["5 years","F-gas records kept by operator and contractor"],
 ["3 years","Hazardous waste consignment notes kept"],
 ["80%","Maximum recovery cylinder fill, by weight"],
 ["500 microns","Target vacuum before charging"],
 ["1.1 × PS","Strength test pressure with OFN; tightness test at PS"],
 ["5 to 10 K / 3 to 8 K","Typical superheat / subcooling"],
 ["40 °C","Maximum for warming a cylinder (no flames)"],
 ["25 kW","Compressor motor power above which a PSSR written scheme applies"],
 ["2010 / 2015","Virgin R22 banned / recycled R22 banned for service"],
 ["2020","No new stationary refrigeration ≥2500 GWP; no virgin ≥2500 GWP servicing in ≥40 t CO2e systems"],
 ["2025","Single splits under 3 kg: no refrigerant ≥750 GWP"],
 ["2030","Recycled and reclaimed ≥2500 GWP also banned for service"],
 ["675 / 1430 / 1774 / 1810 / 2088 / 3922","GWP of R32 / R134a / R407C / R22 / R410A / R404A"],
 ["1 / 0","GWP of CO2 / ODP of all HFCs and HFOs"],
];

const style = fs.readFileSync(path.join(__dirname,"style.css"),"utf8");
const decos = ["snowflake","sun","droplets","wrench","thermometer","fan"];
const decoHtml = (seed) => decos.map((d,i)=>{ const left = i%2===0; const top = 75 + ((i*53+seed*17)%150); return `<div class="deco" style="${left?"left:-9mm":"right:-9mm"};top:${top}mm">${icon(d)}</div>`; }).join("");

let pageNo = 0; const pn = () => `<div class="pn">${++pageNo}</div>`;
let html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>F-Gas Category I in Pictures</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">
<style>${style}</style></head><body>`;

html += `<section class="sheet cover">
 <div class="eyebrow">City &amp; Guilds 2079-11 · Level 2 Award · F-Gas &amp; ODS Regulations · Category I</div>
 <h1>F-Gas Category I<br>in Pictures</h1>
 <p class="sub">${topics.length} topics, one per page. Each has the drawing that shows how it works, four boxes with what you need to know, and the one line to remember. Then 30 practice questions, every number on one page, and a plain-English glossary.</p>
 <div class="coverfig">${figures.cycle}</div>
 <p class="edition">Great Britain edition · 2026 · Written for the GB F-Gas Regulation (retained EU 517/2014) and the ODS Regulation · Independent revision material, not official City &amp; Guilds content</p>${pn()}
</section>`;

// Contents grouped by part
const parts = []; topics.forEach((t,i)=>{ let p = parts.find(x=>x.name===t.part); if(!p){p={name:t.part,items:[]};parts.push(p)} p.items.push({t,page:i+3}); });
html += `<section class="sheet toc"><h2>Contents</h2><div class="parts">`;
parts.forEach(p => { html += `<div class="part"><b>${esc(p.name)}</b>${p.items.map(it=>`<span><i>${it.page}</i>${esc(it.t.title)}</span>`).join("")}</div>`; });
const backStart = topics.length + 3;
html += `<div class="part"><b>XI · PRACTICE</b><span><i>${backStart}</i>30 practice questions</span><span><i>${backStart+2}</i>Answers and explanations</span></div>
<div class="part"><b>XII · REFERENCE</b><span><i>${backStart+4}</i>Numbers to memorise</span><span><i>${backStart+5}</i>Glossary</span></div></div>
<p class="small" style="margin-top:10pt">Companion practice app: <strong>fgas-trainer.vercel.app</strong>. The questions and glossary in this book are the same ones the app uses, so they always agree. Tap any dotted word in the app for the glossary entry printed here.</p>
<p class="small">Independent revision material written from the published 2079-11 syllabus and the GB F-Gas and ODS Regulations, using the GWP values the regulation uses (IPCC AR4). Not official City &amp; Guilds content and not affiliated with City &amp; Guilds or any training provider. Where your course workbook or tutor differs, follow them.</p>${pn()}</section>`;

// Topic posters
topics.forEach((t,i) => {
  html += `<section class="sheet topic">${decoHtml(i)}
  <div class="band"><span class="part">${esc(t.part)}</span><span class="tag">${esc(t.tag)}</span></div>
  <h1>${esc(t.title)}</h1><p class="sub">${esc(t.sub)}</p>
  <div class="hero">${figures[t.fig]}</div>
  <div class="tiles">${t.tiles.map((tl,k)=>`<div class="tile c${k+1}"><div class="ic">${icon(tl.i)}</div><div><h3>${esc(tl.h)}</h3><p>${esc(tl.t)}</p></div></div>`).join("")}</div>
  <div class="foot"><h3>${esc(t.foot.h)}</h3><p>${esc(t.foot.t)}</p></div>${pn()}</section>`;
});

// Practice questions (flowing pages)
html += `<section class="flow chapter"><div class="chap-head"><span class="chapnum">XI</span><div><h2>Practice questions</h2><p class="intro">Thirty exam-style questions. Mark yourself with the key that follows, then read the explanation for anything you missed.</p></div></div><ol class="qs">`;
practice.forEach(p => { html += `<li><p class="qt"><span class="topic-lbl">${esc(T[p.q.t])}</span>${esc(p.q.q)}</p><ol class="opts">${p.order.map((oi,k)=>`<li><span class="k">${letters[k]}</span>${esc(p.q.a[oi])}</li>`).join("")}</ol></li>`; });
html += `</ol></section>`;
html += `<section class="flow chapter"><div class="chap-head"><span class="chapnum">XI</span><div><h2>Answers and explanations</h2></div></div><div class="answers">`;
practice.forEach(p => html += `<div class="ans"><span class="k">${p.n}</span><div><strong>${p.ans}.</strong> ${esc(p.q.a[p.q.c])}<p>${esc(p.q.e)}</p></div></div>`);
html += `</div></section>`;
html += `<section class="flow chapter"><div class="chap-head"><span class="chapnum">XII</span><div><h2>Numbers to memorise</h2><p class="intro">If you learn one page, learn this one.</p></div></div><table class="numbers"><tbody>${numbers.map(n=>`<tr><th>${esc(n[0])}</th><td>${esc(n[1])}</td></tr>`).join("")}</tbody></table></section>`;
html += `<section class="flow chapter"><div class="chap-head"><span class="chapnum">XII</span><div><h2>Glossary</h2><p class="intro">The trade's words in plain English. The same ${GL.length} terms are tappable in the practice app.</p></div></div><dl class="gl">${GL.slice().sort((a,b)=>a.k.localeCompare(b.k)).map(g=>`<dt>${esc(g.k)}${g.alt&&g.alt.length?` <span>(${esc(g.alt.slice(0,2).join(", "))})</span>`:""}</dt><dd>${esc(g.d)}</dd>`).join("")}</dl>
<p class="small" style="margin-top:14pt">F-Gas Category I in Pictures. Independent revision material for the City &amp; Guilds 2079-11 syllabus. Not affiliated with City &amp; Guilds, HSS Training or any awarding body. Regulations change: check the current GB F-Gas and ODS Regulations before relying on a date or threshold at work. Practice app: fgas-trainer.vercel.app</p></section>`;
html += `</body></html>`;
fs.writeFileSync(path.join(__dirname,"guide.html"), html);
console.log("guide.html:", (html.length/1024).toFixed(0), "KB,", topics.length, "topics,", practice.length, "questions,", GL.length, "terms");

(async () => {
  const { chromium } = require("playwright");
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto("file://" + path.join(__dirname,"guide.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const out = path.join(__dirname, "F-Gas-Cat-I-in-Pictures.pdf");
  await p.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true, margin:{top:"12mm",bottom:"14mm",left:"14mm",right:"14mm"},
    displayHeaderFooter: true, headerTemplate: `<div></div>`,
    footerTemplate: `<div style="width:100%;font-size:8px;color:#5b6b75;text-align:center;font-family:Arial,sans-serif"><span class="pageNumber"></span></div>` });
  await b.close();
  console.log("PDF:", out, (fs.statSync(out).size/1024).toFixed(0), "KB");
})();
