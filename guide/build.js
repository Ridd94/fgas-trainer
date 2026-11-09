// Builds guide.html and the PDF. One topic per page from topics.js, figures from figures.js,
// icons from ./icons, questions and glossary pulled live from ../index.html so guide and app agree.
const fs = require("fs"), path = require("path");
const topics = require("./topics");
const figures = require("./figures");
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const heroFor = t => { for (const ext of ["png","webp","jpg","jpeg"]) { const f = path.join(__dirname,"images",t.slug+"."+ext); if (fs.existsSync(f)) { const mime = ext==="jpg"?"jpeg":ext; return `<img class="art" src="data:image/${mime};base64,${fs.readFileSync(f).toString("base64")}" alt="">`; } } return figures[t.fig]; };
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

// Refrigerant directory: [name, what it is, family, GWP (AR4), safety class, where you meet it / status]
const directory = [
 ["R12","Dichlorodifluoromethane","CFC","10900","A1","Old fridges and car air con. Ozone depleting; long banned."],
 ["R22","Chlorodifluoromethane","HCFC","1810","A1","Older air con and refrigeration. No top-ups of any kind since 2015."],
 ["R134a","Single HFC","HFC","1430","A1","Domestic fridges, chillers, older car air con."],
 ["R32","Single HFC","HFC","675","A2L","Most new split air con and heat pumps. Replaces R410A."],
 ["R404A","Zeotropic blend","HFC","3922","A1","Commercial and low-temperature refrigeration. Hit by the 2020 GWP 2500 bans."],
 ["R407C","Zeotropic blend, large glide","HFC","1774","A1","Air con and heat pumps. Was the main R22 replacement."],
 ["R410A","Near-azeotropic blend","HFC","2088","A1","Split air con and heat pumps. Not allowed in new single splits under 3 kg from 2025."],
 ["R507A","Azeotropic blend","HFC","3985","A1","Low-temperature commercial refrigeration. Hit by the 2020 GWP 2500 bans."],
 ["R448A","Zeotropic blend","HFC/HFO","1387","A1","Supermarket refrigeration. A lower-GWP replacement for R404A."],
 ["R454B","Zeotropic blend","HFC/HFO","466","A2L","New air con and heat pumps. A replacement for R410A."],
 ["R1234yf","Single HFO","HFO","4","A2L","Car air con, some chillers."],
 ["R1234ze","Single HFO","HFO","7","A2L","Chillers and heat pumps."],
 ["R290","Propane","Hydrocarbon","3","A3","Plug-in display fridges, small heat pumps. Highly flammable."],
 ["R600a","Isobutane","Hydrocarbon","3","A3","Almost every new domestic fridge. Highly flammable, tiny charges."],
 ["R744","Carbon dioxide (CO2)","Natural","1","A1","Supermarket packs and heat pumps. Very high pressures."],
 ["R717","Ammonia","Natural","0","B2L","Large industrial plant. Toxic and mildly flammable, strong smell."],
];
// Every short form used in the book or the app
const abbreviations = [
 ["A1, A2L, A3, B2L","Safety classes. Letter: A lower, B higher toxicity. Number: 1 no flame, 2L mildly, 2 flammable, 3 highly flammable"],
 ["ADR","The agreement on carrying dangerous goods by road"],
 ["AHRI 700","The purity standard reclaimed refrigerant must meet"],
 ["AR4","The IPCC Fourth Assessment Report: the GWP values the regulation uses"],
 ["CFC","Chlorofluorocarbon: ozone depleting, e.g. R12"],
 ["CO2","Carbon dioxide (refrigerant R744)"],
 ["CO2e","CO2 equivalent: kg × GWP ÷ 1000 = tonnes CO2e"],
 ["COSHH","Control of Substances Hazardous to Health Regulations"],
 ["EC / EU","European Community / European Union, as in EC 1005/2009 and EU 517/2014"],
 ["EN 378","The safety standard for refrigeration systems and heat pumps"],
 ["F-gas","Fluorinated greenhouse gas: HFCs, PFCs and SF6"],
 ["GB","Great Britain: England, Scotland and Wales, where the GB rules apply"],
 ["GWP","Global warming potential, compared with CO2 = 1"],
 ["HC","Hydrocarbon, e.g. R290 propane, R600a isobutane"],
 ["HCFC","Hydrochlorofluorocarbon: ozone depleting, e.g. R22"],
 ["HFC","Hydrofluorocarbon: the main F-gases, e.g. R32, R134a, R410A"],
 ["HFO","Hydrofluoro-olefin: very low GWP, e.g. R1234yf"],
 ["HP / LP","High pressure / low pressure, as in HP and LP cut-outs"],
 ["HSE","Health and Safety Executive"],
 ["IPCC","Intergovernmental Panel on Climate Change"],
 ["K","Kelvin: temperature difference, same size as 1 °C"],
 ["LPG","Liquefied petroleum gas (bottled propane or butane)"],
 ["ODP","Ozone depletion potential"],
 ["ODS","Ozone depleting substance"],
 ["OFN","Oxygen-free nitrogen"],
 ["PFC","Perfluorocarbon, a group of F-gases"],
 ["POE","Polyol ester oil, used with HFCs"],
 ["PPE","Personal protective equipment"],
 ["PS","Maximum allowable pressure of a system"],
 ["PSSR","Pressure Systems Safety Regulations 2000"],
 ["PT chart","Pressure-temperature chart"],
 ["R","Refrigerant, as in R32 or R410A"],
 ["REFCOM","A certification body for F-gas company certificates"],
 ["SDS","Safety data sheet"],
 ["SEPA","Scottish Environment Protection Agency"],
 ["SF6","Sulphur hexafluoride, an F-gas used in switchgear"],
 ["TEV","Thermostatic expansion valve"],
 ["UV","Ultraviolet, as in UV leak-detection dye"],
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
html += `<div class="part"><b>XI · PRACTICE</b><span><i>${backStart}</i>30 practice questions</span><span><i>${backStart+3}</i>Answers and explanations</span></div>
<div class="part"><b>XII · REFERENCE</b><span><i>${backStart+5}</i>Numbers to memorise</span><span><i>${backStart+6}</i>Refrigerant directory</span><span><i>${backStart+7}</i>Abbreviations</span><span><i>${backStart+8}</i>Glossary</span></div></div>
<p class="small" style="margin-top:10pt">Companion practice app: <strong>fgas-trainer.vercel.app</strong>. The questions and glossary in this book are the same ones the app uses, so they always agree. Tap any dotted word in the app for the glossary entry printed here.</p>
<p class="small">Independent revision material written from the published 2079-11 syllabus and the GB F-Gas and ODS Regulations, using the GWP values the regulation uses (IPCC AR4). Not official City &amp; Guilds content and not affiliated with City &amp; Guilds or any training provider. Where your course workbook or tutor differs, follow them.</p>${pn()}</section>`;

// Topic posters
topics.forEach((t,i) => {
  html += `<section class="sheet topic">${decoHtml(i)}
  <div class="band"><span class="part">${esc(t.part)}</span><span class="tag">${esc(t.tag)}</span></div>
  <h1>${esc(t.title)}</h1><p class="sub">${esc(t.sub)}</p>
  <div class="hero">${heroFor(t)}</div>
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
html += `<section class="flow chapter"><div class="chap-head"><span class="chapnum">XII</span><div><h2>Refrigerant directory</h2><p class="intro">The gases you will meet, what family each belongs to, and where. GWP values are the AR4 figures the regulation uses.</p></div></div><table class="dir"><thead><tr><th>Name</th><th>What it is</th><th>Family</th><th>GWP</th><th>Class</th><th>Where you meet it</th></tr></thead><tbody>${directory.map(r=>`<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td class="num">${esc(r[3])}</td><td>${esc(r[4])}</td><td>${esc(r[5])}</td></tr>`).join("")}</tbody></table>
<p class="small">Reading the names: see “Reading a refrigerant name” in Part III. HFC/HFO blends count as F-gases. CFCs and HCFCs come under the ODS Regulation, not the F-Gas Regulation.</p></section>`;
html += `<section class="flow chapter"><div class="chap-head"><span class="chapnum">XII</span><div><h2>Abbreviations</h2><p class="intro">Every short form used in this book and the practice app. Fuller explanations are in the glossary.</p></div></div><dl class="abbr">${abbreviations.map(a=>`<div><dt>${esc(a[0])}</dt><dd>${esc(a[1])}</dd></div>`).join("")}</dl></section>`;
html += `<section class="flow chapter"><div class="chap-head"><span class="chapnum">XII</span><div><h2>Glossary</h2><p class="intro">The trade's words in plain English. The same ${GL.length} terms are tappable in the practice app.</p></div></div><dl class="gl">${GL.slice().sort((a,b)=>a.k.localeCompare(b.k)).map(g=>`<dt>${esc(g.k)}${g.alt&&g.alt.length?` <span>(${esc(g.alt.slice(0,2).join(", "))})</span>`:""}</dt><dd>${esc(g.d)}</dd>`).join("")}</dl>
<p class="small" style="margin-top:14pt">F-Gas Category I in Pictures. Independent revision material for the City &amp; Guilds 2079-11 syllabus. Not affiliated with City &amp; Guilds, HSS Training or any awarding body. Regulations change: check the current GB F-Gas and ODS Regulations before relying on a date or threshold at work. Practice app: fgas-trainer.vercel.app</p></section>`;
html += `</body></html>`;
fs.writeFileSync(path.join(__dirname,"guide.html"), html);
const nImg = topics.filter(t=>["png","webp","jpg","jpeg"].some(e=>fs.existsSync(path.join(__dirname,"images",t.slug+"."+e)))).length;
console.log("illustrations found:", nImg, "of", topics.length);
console.log("guide.html:", (html.length/1024).toFixed(0), "KB,", topics.length, "topics,", practice.length, "questions,", GL.length, "terms");

(async () => {
  const { chromium } = require("playwright");
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto("file://" + path.join(__dirname,"guide.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  // The source PNGs are ~1.8 MB each, which made the PDF ~72 MB. Embed JPEG
  // copies (quality 0.85, full resolution) in the PDF and guide.html instead;
  // the PNGs in guide/images/ stay untouched.
  const nJpeg = await p.evaluate(async () => {
    const imgs = [...document.querySelectorAll("img.art")].filter(i => i.src.startsWith("data:image/png"));
    for (const img of imgs) {
      await img.decode();
      const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0);
      img.src = c.toDataURL("image/jpeg", 0.85); await img.decode();
    }
    return imgs.length;
  });
  if (nJpeg) { fs.writeFileSync(path.join(__dirname,"guide.html"), "<!doctype html>" + (await p.evaluate(() => document.documentElement.outerHTML))); console.log("embedded as JPEG:", nJpeg, "images; guide.html", (fs.statSync(path.join(__dirname,"guide.html")).size/1024).toFixed(0), "KB"); }
  const out = path.join(__dirname, "F-Gas-Cat-I-in-Pictures.pdf");
  await p.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true, margin:{top:"12mm",bottom:"14mm",left:"14mm",right:"14mm"},
    displayHeaderFooter: true, headerTemplate: `<div></div>`,
    footerTemplate: `<div style="width:100%;font-size:8px;color:#5b6b75;text-align:center;font-family:Arial,sans-serif"><span class="pageNumber"></span></div>` });
  await b.close();
  console.log("PDF:", out, (fs.statSync(out).size/1024).toFixed(0), "KB");
})();
