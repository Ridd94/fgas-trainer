// Inline SVG figures for the study guide. Colours use CSS variables set in the page.
const C = { hot:"#c4511d", cold:"#0b6e8f", ink:"#15232b", mute:"#5b6b75", line:"#9fb0b9", soft:"#eef2f4", good:"#1b7f4a", bad:"#b8322b", amber:"#b85f05" };

function box(x,y,w,h,label,sub,fill,stroke){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
  <text x="${x+w/2}" y="${y+h/2-(sub?6:0)}" text-anchor="middle" font-weight="700" font-size="15" fill="${C.ink}">${label}</text>
  ${sub?`<text x="${x+w/2}" y="${y+h/2+14}" text-anchor="middle" font-size="12" fill="${C.mute}">${sub}</text>`:""}`;
}
const arrowDefs = `<defs><marker id="ah" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.ink}"/></marker>
<marker id="ahh" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.hot}"/></marker>
<marker id="ahc" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${C.cold}"/></marker></defs>`;

const figures = {
cycle: `<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" font-family="inherit">${arrowDefs}
<rect x="320" y="20" width="300" height="320" rx="10" fill="#fbe9e0" opacity=".55"/>
<rect x="20" y="20" width="300" height="320" rx="10" fill="#e1f0f6" opacity=".7"/>
<text x="470" y="42" text-anchor="middle" font-size="12" font-weight="700" fill="${C.hot}" letter-spacing="1">HIGH SIDE  ·  hot  ·  high pressure</text>
<text x="170" y="42" text-anchor="middle" font-size="12" font-weight="700" fill="${C.cold}" letter-spacing="1">LOW SIDE  ·  cold  ·  low pressure</text>
${box(390,70,180,70,"Compressor","vapour in, hot vapour out","#fff",C.hot)}
${box(390,230,180,70,"Condenser","rejects heat, vapour → liquid","#fff",C.hot)}
${box(70,230,180,70,"Expansion device","pressure drops, liquid cools","#fff",C.cold)}
${box(70,70,180,70,"Evaporator","absorbs heat, liquid → vapour","#fff",C.cold)}
<path d="M480,140 L480,222" stroke="${C.hot}" stroke-width="4" fill="none" marker-end="url(#ahh)"/>
<path d="M390,265 L258,265" stroke="${C.hot}" stroke-width="4" fill="none" marker-end="url(#ahh)"/>
<path d="M160,230 L160,148" stroke="${C.cold}" stroke-width="4" fill="none" marker-end="url(#ahc)"/>
<path d="M250,105 L382,105" stroke="${C.cold}" stroke-width="4" fill="none" marker-end="url(#ahc)"/>
<text x="492" y="185" font-size="12" fill="${C.hot}">hot high‑pressure vapour</text>
<text x="324" y="257" font-size="12" fill="${C.hot}" text-anchor="middle">warm liquid</text>
<text x="172" y="192" font-size="12" fill="${C.cold}">cold low‑pressure liquid</text>
<text x="316" y="96" font-size="12" fill="${C.cold}" text-anchor="middle">cool vapour</text>
<text x="40" y="330" font-size="12" fill="${C.mute}">Heat IN from the room or product</text>
<text x="600" y="330" font-size="12" fill="${C.mute}" text-anchor="end">Heat OUT to the outside air</text>
</svg>`,

shsc: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<text x="20" y="28" font-size="14" font-weight="700" fill="${C.cold}">Superheat is measured here</text>
<rect x="20" y="50" width="600" height="60" rx="30" fill="#e1f0f6" stroke="${C.cold}" stroke-width="2"/>
<rect x="20" y="50" width="200" height="60" rx="30" fill="${C.cold}" opacity=".45"/>
<rect x="200" y="50" width="220" height="60" fill="${C.cold}" opacity=".2"/>
<text x="110" y="85" text-anchor="middle" font-size="12" fill="${C.ink}">liquid boiling</text>
<text x="310" y="85" text-anchor="middle" font-size="12" fill="${C.ink}">last drop boils off</text>
<text x="520" y="85" text-anchor="middle" font-size="12" fill="${C.ink}">vapour warming up</text>
<text x="320" y="135" text-anchor="middle" font-size="12" fill="${C.mute}">Evaporator → suction line. Saturation temperature from the suction pressure, actual temperature from a probe on the pipe.</text>
<text x="320" y="155" text-anchor="middle" font-size="13" font-weight="700" fill="${C.ink}">Superheat = pipe temperature − saturated evaporating temperature     (normal 5 to 10 K)</text>
<text x="20" y="200" font-size="14" font-weight="700" fill="${C.hot}">Subcooling is measured here</text>
<rect x="20" y="215" width="600" height="60" rx="30" fill="#fbe9e0" stroke="${C.hot}" stroke-width="2"/>
<rect x="20" y="215" width="200" height="60" rx="30" fill="${C.hot}" opacity=".2"/>
<rect x="200" y="215" width="220" height="60" fill="${C.hot}" opacity=".35"/>
<rect x="420" y="215" width="200" height="60" rx="30" fill="${C.hot}" opacity=".55"/>
<text x="110" y="250" text-anchor="middle" font-size="12" fill="${C.ink}">hot vapour cooling</text>
<text x="310" y="250" text-anchor="middle" font-size="12" fill="${C.ink}">condensing</text>
<text x="520" y="250" text-anchor="middle" font-size="12" fill="#fff">liquid cooling further</text>
<text x="320" y="296" text-anchor="middle" font-size="13" font-weight="700" fill="${C.ink}">Subcooling = saturated condensing temperature − liquid line temperature     (normal 3 to 8 K)</text>
</svg>`,

safety: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="24" font-size="13" font-weight="700" fill="${C.ink}">Letter = toxicity</text>
<text x="330" y="24" font-size="13" font-weight="700" fill="${C.ink}">Number = flammability</text>
${["1  no flame propagation","2L  lower flammability, slow flame","2  flammable","3  higher flammability"].map((t,i)=>`<text x="${175+i*115}" y="62" text-anchor="middle" font-size="11" fill="${C.mute}">${t.split("  ")[0]}</text><text x="${175+i*115}" y="76" text-anchor="middle" font-size="9" fill="${C.mute}">${t.split("  ")[1]}</text>`).join("")}
<text x="70" y="128" text-anchor="middle" font-size="12" fill="${C.mute}">A  lower toxicity</text>
<text x="70" y="208" text-anchor="middle" font-size="12" fill="${C.mute}">B  higher toxicity</text>
${[["A1","R134a, R410A, R404A, R744",C.good],["A2L","R32, R1234yf, R454B",C.amber],["A2","R152a",C.hot],["A3","R290, R600a",C.bad]].map((c,i)=>`<rect x="${120+i*115}" y="90" width="110" height="70" rx="6" fill="${c[2]}" opacity=".18" stroke="${c[2]}"/><text x="${175+i*115}" y="118" text-anchor="middle" font-weight="700" font-size="16" fill="${C.ink}">${c[0]}</text><text x="${175+i*115}" y="140" text-anchor="middle" font-size="10" fill="${C.ink}">${c[1]}</text>`).join("")}
${[["B1","R123",C.good],["B2L","R717 ammonia",C.amber],["B2","",C.hot],["B3","",C.bad]].map((c,i)=>`<rect x="${120+i*115}" y="170" width="110" height="70" rx="6" fill="${c[2]}" opacity=".18" stroke="${c[2]}"/><text x="${175+i*115}" y="198" text-anchor="middle" font-weight="700" font-size="16" fill="${C.ink}">${c[0]}</text><text x="${175+i*115}" y="220" text-anchor="middle" font-size="10" fill="${C.ink}">${c[1]||"rare"}</text>`).join("")}
</svg>`,

ladder: `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
<text x="20" y="26" font-size="13" font-weight="700" fill="${C.ink}">Charge in tonnes CO2e → how often a certified person must leak check</text>
${[["under 5 t","No set interval. Still prevent and repair leaks.","",C.line],["5 t or more","Every 12 months","24 months with a leak detection system",C.good],["50 t or more","Every 6 months","12 months with a leak detection system",C.amber],["500 t or more","Every 3 months","6 months with detection. Detection system compulsory.",C.bad]].map((r,i)=>{const y=50+i*58;return `<rect x="20" y="${y}" width="${270+i*110}" height="44" rx="6" fill="${r[3]}" opacity=".22" stroke="${r[3]}" stroke-width="2"/><text x="32" y="${y+27}" font-size="14" font-weight="700" fill="${C.ink}">${r[0]}</text><text x="160" y="${y+19}" font-size="12" font-weight="600" fill="${C.ink}">${r[1]}</text><text x="160" y="${y+36}" font-size="11" fill="${C.mute}">${r[2]}</text>`}).join("")}
<text x="20" y="290" font-size="11" fill="${C.mute}">Hermetically sealed and labelled: threshold is 10 t instead of 5 t. Leak detection systems must themselves be checked every 12 months.</text>
</svg>`,

cylinder: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="40" width="120" height="190" rx="18" fill="#cfd6da" stroke="${C.ink}" stroke-width="2"/>
<path d="M60,70 Q60,40 120,40 Q180,40 180,70 Z" fill="#f2c200" stroke="${C.ink}" stroke-width="2"/>
<rect x="108" y="18" width="24" height="24" fill="${C.ink}"/>
<rect x="62" y="${230-0.8*160}" width="116" height="${0.8*160}" rx="4" fill="${C.cold}" opacity=".5"/>
<line x1="40" y1="${230-0.8*160}" x2="200" y2="${230-0.8*160}" stroke="${C.bad}" stroke-width="3" stroke-dasharray="6 4"/>
<text x="210" y="${234-0.8*160}" font-size="14" font-weight="700" fill="${C.bad}">80% of rated capacity, by WEIGHT, on scales</text>
<text x="210" y="${254-0.8*160}" font-size="12" fill="${C.mute}">Above this a warm cylinder can become hydraulically full and burst.</text>
<text x="210" y="150" font-size="13" fill="${C.ink}">Grey body, yellow shoulder = UK recovery cylinder</text>
<text x="210" y="172" font-size="13" fill="${C.ink}">Dedicated to one refrigerant and labelled</text>
<text x="210" y="194" font-size="13" fill="${C.ink}">In test date, evacuated before use, float switch as backup only</text>
<text x="210" y="216" font-size="13" fill="${C.ink}">Never refill a disposable cylinder</text>
</svg>`,

pushpull: `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${box(30,100,160,80,"System","charged with liquid","#e1f0f6",C.cold)}
${box(240,30,160,60,"Recovery unit","oil‑less compressor","#fff",C.ink)}
${box(450,100,160,80,"Recovery cylinder","on scales","#fff",C.ink)}
<path d="M190,150 L442,150" stroke="${C.cold}" stroke-width="5" fill="none" marker-end="url(#ahc)"/>
<text x="320" y="172" text-anchor="middle" font-size="12" font-weight="700" fill="${C.cold}">LIQUID pushed into the cylinder</text>
<path d="M560,100 L560,60 L408,60" stroke="${C.hot}" stroke-width="3" fill="none" marker-end="url(#ahh)"/>
<path d="M240,60 L80,60 L80,92" stroke="${C.hot}" stroke-width="3" fill="none" marker-end="url(#ahh)"/>
<text x="320" y="20" text-anchor="middle" font-size="12" fill="${C.hot}">VAPOUR pulled from the top of the cylinder and pushed into the system</text>
<text x="320" y="215" text-anchor="middle" font-size="12" fill="${C.mute}">Fast for large charges. Finish with normal vapour recovery to pull the system below atmospheric pressure.</text>
</svg>`,

vacuum: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="110" x2="600" y2="110" stroke="${C.line}" stroke-width="6" stroke-linecap="round"/>
${[["760,000","atmosphere",40],["25,000","compound gauge reads ~29 inHg",220],["5,000","moisture still boiling off",390],["500","TARGET  ·  hold and watch",560]].map((p,i)=>`<circle cx="${p[2]}" cy="110" r="${i===3?12:9}" fill="${i===3?C.good:C.cold}"/><text x="${p[2]}" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ink}">${p[0]}</text><text x="${p[2]}" y="150" text-anchor="middle" font-size="11" fill="${C.mute}">${p[1]}</text>`).join("")}
<text x="320" y="30" text-anchor="middle" font-size="13" font-weight="700" fill="${C.ink}">Vacuum in microns (absolute pressure). Lower is deeper.</text>
<text x="320" y="200" text-anchor="middle" font-size="12" fill="${C.mute}">Vacuum rises fast after isolating the pump = leak.   Creeps up and stalls = moisture still present.   Stays put = dry and tight.</text>
</svg>`,

braze: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<rect x="60" y="80" width="420" height="40" rx="4" fill="#e9c9a7" stroke="${C.ink}" stroke-width="2"/>
<rect x="250" y="72" width="60" height="56" rx="4" fill="#d9a46e" stroke="${C.ink}" stroke-width="2"/>
<path d="M280,30 L280,70" stroke="${C.hot}" stroke-width="4" marker-end="url(#ahh)"/>
<text x="280" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="${C.hot}">torch on the joint</text>
<path d="M20,100 L58,100" stroke="${C.cold}" stroke-width="4" marker-end="url(#ahc)"/>
<text x="20" y="150" font-size="12" fill="${C.cold}" font-weight="700">OFN in, gentle flow</text>
<text x="20" y="166" font-size="11" fill="${C.mute}">through a regulator, barely felt on the back of the hand</text>
<path d="M482,100 L520,100" stroke="${C.cold}" stroke-width="4" marker-end="url(#ahc)"/>
<text x="540" y="104" font-size="12" fill="${C.cold}" font-weight="700">out, open</text>
<text x="330" y="180" text-anchor="middle" font-size="12" fill="${C.ink}">Nitrogen displaces the air, so no black copper‑oxide scale forms inside the pipe to block driers and expansion valves.</text>
</svg>`,

timeline: `<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg">
<line x1="40" y1="60" x2="600" y2="60" stroke="${C.line}" stroke-width="4"/>
${[[2010,"Virgin R22 banned for servicing",50],[2015,"Recycled R22 banned. Domestic fridges: no HFC ≥150 GWP. F‑Gas 517/2014 starts",160],[2020,"No new stationary refrigeration with HFC ≥2500 GWP. Service ban: no virgin ≥2500 GWP in systems ≥40 t CO2e",300],[2025,"Single splits <3 kg: no refrigerant ≥750 GWP",450],[2030,"Recycled/reclaimed ≥2500 GWP also banned for service",560]].map((t,i)=>`<circle cx="${t[2]}" cy="60" r="9" fill="${i%2?C.hot:C.cold}"/><text x="${t[2]}" y="40" text-anchor="middle" font-size="15" font-weight="700" fill="${C.ink}">${t[0]}</text>
<foreignObject x="${t[2]-55}" y="${80+(i%2)*70}" width="110" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:10px;line-height:1.3;color:${C.ink};text-align:center">${t[1]}</div></foreignObject>`).join("")}
</svg>`,


exam: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${box(20,40,170,110,"Course","1 to 2 days, workbook",C.soft,C.line)}
${box(235,40,170,110,"Theory test","multiple choice: numbers,","#e1f0f6",C.cold)}
<text x="320" y="128" text-anchor="middle" font-size="12" fill="${C.mute}">definitions, one‑step maths</text>
${box(450,40,170,110,"Practical","leak check, recover, test,","#fbe9e0",C.hot)}
<text x="535" y="128" text-anchor="middle" font-size="12" fill="${C.mute}">evacuate, charge, with questions</text>
<path d="M190,95 L227,95" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/>
<path d="M405,95 L442,95" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/>
<text x="320" y="185" text-anchor="middle" font-size="12" fill="${C.mute}">Pass both and you hold Category I: every activity, any charge size.</text>
</svg>`,

latent: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<line x1="60" y1="220" x2="610" y2="220" stroke="${C.ink}" stroke-width="2" marker-end="url(#ah)"/>
<line x1="60" y1="220" x2="60" y2="30" stroke="${C.ink}" stroke-width="2" marker-end="url(#ah)"/>
<text x="335" y="248" text-anchor="middle" font-size="12" fill="${C.mute}">heat added →</text>
<text x="20" y="130" font-size="12" fill="${C.mute}" transform="rotate(-90 20 130)">temperature →</text>
<polyline points="60,200 200,120 440,120 580,45" fill="none" stroke="${C.cold}" stroke-width="4"/>
<rect x="200" y="100" width="240" height="40" fill="${C.cold}" opacity=".12"/>
<text x="130" y="175" text-anchor="middle" font-size="12" fill="${C.ink}" font-weight="600">liquid warming</text>
<text x="130" y="190" text-anchor="middle" font-size="11" fill="${C.mute}">sensible heat</text>
<text x="320" y="92" text-anchor="middle" font-size="13" fill="${C.cold}" font-weight="700">BOILING: temperature stays flat</text>
<text x="320" y="160" text-anchor="middle" font-size="11" fill="${C.mute}">latent heat, the big slice of energy, no temperature change</text>
<text x="520" y="90" text-anchor="middle" font-size="12" fill="${C.ink}" font-weight="600">vapour warming</text>
<text x="520" y="105" text-anchor="middle" font-size="11" fill="${C.mute}">superheat</text>
<text x="200" y="235" text-anchor="middle" font-size="10" fill="${C.mute}">bubble point</text>
<text x="440" y="235" text-anchor="middle" font-size="10" fill="${C.mute}">dew point</text>
</svg>`,

manifold: `<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg">
<rect x="200" y="120" width="240" height="40" rx="8" fill="#9aa7ad" stroke="${C.ink}" stroke-width="2"/>
<circle cx="230" cy="80" r="52" fill="#fff" stroke="${C.cold}" stroke-width="6"/>
<circle cx="410" cy="80" r="52" fill="#fff" stroke="${C.bad}" stroke-width="6"/>
<path d="M230,80 L205,55" stroke="${C.ink}" stroke-width="3"/><path d="M410,80 L440,60" stroke="${C.ink}" stroke-width="3"/>
<text x="230" y="112" text-anchor="middle" font-size="9" fill="${C.mute}">vac · 0 · 20 bar</text>
<text x="410" y="112" text-anchor="middle" font-size="9" fill="${C.mute}">0 · 50 bar</text>
<circle cx="220" cy="168" r="10" fill="${C.cold}"/><circle cx="420" cy="168" r="10" fill="${C.bad}"/><circle cx="320" cy="168" r="10" fill="#f2c200"/>
<line x1="220" y1="178" x2="220" y2="215" stroke="${C.cold}" stroke-width="5"/><line x1="420" y1="178" x2="420" y2="215" stroke="${C.bad}" stroke-width="5"/><line x1="320" y1="178" x2="320" y2="215" stroke="#d9b000" stroke-width="5"/>
<text x="20" y="40" font-size="13" font-weight="700" fill="${C.cold}">BLUE: low side</text>
<text x="20" y="58" font-size="11" fill="${C.mute}">compound gauge, reads vacuum</text>
<text x="20" y="72" font-size="11" fill="${C.mute}">and pressure, to the suction port</text>
<text x="620" y="40" text-anchor="end" font-size="13" font-weight="700" fill="${C.bad}">RED: high side</text>
<text x="620" y="58" text-anchor="end" font-size="11" fill="${C.mute}">pressure gauge, to the discharge</text>
<text x="620" y="72" text-anchor="end" font-size="11" fill="${C.mute}">or liquid line port</text>
<text x="320" y="228" text-anchor="middle" font-size="11" fill="${C.mute}">yellow centre hose: cylinder, recovery unit or vacuum pump</text>
</svg>`,

families: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
${box(230,15,180,44,"Refrigerants","","#fff",C.ink)}
<path d="M320,59 L320,80 M130,80 L510,80 M130,80 L130,100 M320,80 L320,100 M510,80 L510,100" stroke="${C.line}" stroke-width="2" fill="none"/>
${box(40,100,180,56,"Contain chlorine","CFC · HCFC (R12, R22)","#fbe9e0",C.hot)}
${box(230,100,180,56,"Fluorine, no chlorine","HFC · HFO (R134a, R32, R1234yf)","#e1f0f6",C.cold)}
${box(420,100,180,56,"Natural","R290 · R600a · R744 · R717","#e4f3ea",C.good)}
<text x="130" y="180" text-anchor="middle" font-size="12" font-weight="700" fill="${C.hot}">Harm the ozone layer</text>
<text x="130" y="197" text-anchor="middle" font-size="11" fill="${C.mute}">ODS Regulation · banned</text>
<text x="320" y="180" text-anchor="middle" font-size="12" font-weight="700" fill="${C.cold}">Trap heat (high GWP)</text>
<text x="320" y="197" text-anchor="middle" font-size="11" fill="${C.mute}">F‑Gas Regulation · HFOs very low GWP</text>
<text x="510" y="180" text-anchor="middle" font-size="12" font-weight="700" fill="${C.good}">Low GWP, zero ODP</text>
<text x="510" y="197" text-anchor="middle" font-size="11" fill="${C.mute}">flammable, high pressure or toxic</text>
<text x="320" y="240" text-anchor="middle" font-size="12" fill="${C.ink}">Exam trap: R22 is an ozone depleting substance, not an F‑gas.</text>
</svg>`,

glide: `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<line x1="60" y1="200" x2="610" y2="200" stroke="${C.ink}" stroke-width="2" marker-end="url(#ah)"/>
<line x1="60" y1="200" x2="60" y2="30" stroke="${C.ink}" stroke-width="2" marker-end="url(#ah)"/>
<text x="335" y="228" text-anchor="middle" font-size="12" fill="${C.mute}">heat added at one fixed pressure →</text>
<text x="22" y="120" font-size="12" fill="${C.mute}" transform="rotate(-90 22 120)">temperature →</text>
<polyline points="60,185 180,135 420,135 560,60" fill="none" stroke="${C.mute}" stroke-width="3" stroke-dasharray="6 5"/>
<polyline points="60,185 180,140 420,110 560,60" fill="none" stroke="${C.hot}" stroke-width="4"/>
<line x1="180" y1="140" x2="180" y2="110" stroke="${C.hot}" stroke-width="1.5" stroke-dasharray="3 3"/>
<line x1="420" y1="140" x2="420" y2="110" stroke="${C.hot}" stroke-width="1.5" stroke-dasharray="3 3"/>
<path d="M440,140 L440,110" stroke="${C.hot}" stroke-width="2" marker-end="url(#ahh)"/><path d="M440,110 L440,140" stroke="${C.hot}" stroke-width="2" marker-end="url(#ahh)"/>
<text x="452" y="129" font-size="12" font-weight="700" fill="${C.hot}">glide</text>
<text x="180" y="160" text-anchor="middle" font-size="11" fill="${C.ink}">bubble point</text>
<text x="420" y="98" text-anchor="middle" font-size="11" fill="${C.ink}">dew point</text>
<text x="300" y="50" font-size="11" fill="${C.mute}">— — pure refrigerant or azeotrope: flat</text>
<text x="300" y="68" font-size="11" fill="${C.hot}">—— zeotropic blend (R407C): slopes while boiling</text>
</svg>`,

moisture: `<svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${["Moisture gets in","open pipe, wet POE oil, poor vacuum","Acid forms","water + refrigerant + POE + heat","Copper plating","copper dissolves, plates bearings","Compressor fails","burnt windings, seized"].reduce((a,_,i,arr)=>i%2?a:a+box(20+(i/2)*155,30,140,80,arr[i],"", i/2===3?"#fbe9e0":"#fff", i/2===3?C.bad:C.line)+`<text x="${90+(i/2)*155}" y="90" text-anchor="middle" font-size="10" fill="${C.mute}">${arr[i+1]}</text>`,"")}
${[0,1,2].map(i=>`<path d="M${160+i*155},70 L${172+i*155},70" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/>`).join("")}
<text x="320" y="138" text-anchor="middle" font-size="12" fill="${C.ink}">Break the chain early: cap pipes, seal oil, new drier, evacuate below 500 microns.</text>
</svg>`,

categories: `<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg">
${["Leak check","Recovery","Install / service"].map((h,i)=>`<text x="${235+i*135}" y="34" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}">${h}</text>`).join("")}
${[["I","Any","Any","Any"],["II","Any","< 3 kg*","< 3 kg*"],["III","No","< 3 kg*","No"],["IV","Any","No","No"]].map((r,i)=>{const y=50+i*40;return `<text x="60" y="${y+26}" font-size="18" font-weight="700" fill="${C.cold}">Cat ${r[0]}</text>`+r.slice(1).map((c,k)=>`<rect x="${175+k*135}" y="${y}" width="120" height="34" rx="5" fill="${c==="No"?C.soft:(c==="Any"?"#e4f3ea":"#fff3e0")}" stroke="${c==="No"?C.line:(c==="Any"?C.good:C.amber)}"/><text x="${235+k*135}" y="${y+22}" text-anchor="middle" font-size="12" font-weight="600" fill="${C.ink}">${c}</text>`).join("")}).join("")}
<text x="20" y="222" font-size="11" fill="${C.mute}">* or under 6 kg if hermetically sealed and labelled. Leak check in Cat II and IV means without breaking into the circuit.</text>
</svg>`,

label: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="120" y="20" width="400" height="160" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
<rect x="120" y="20" width="400" height="34" fill="${C.ink}"/>
<text x="320" y="43" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" letter-spacing="1">CONTAINS FLUORINATED GREENHOUSE GASES</text>
<text x="140" y="82" font-size="12" fill="${C.mute}">Refrigerant</text><text x="300" y="82" font-size="14" font-weight="700" fill="${C.ink}">R410A</text>
<text x="140" y="108" font-size="12" fill="${C.mute}">Charge</text><text x="300" y="108" font-size="14" font-weight="700" fill="${C.ink}">7.5 kg</text>
<text x="140" y="134" font-size="12" fill="${C.mute}">CO2 equivalent</text><text x="300" y="134" font-size="14" font-weight="700" fill="${C.ink}">15.66 tonnes</text>
<text x="140" y="160" font-size="12" fill="${C.mute}">GWP</text><text x="300" y="160" font-size="14" font-weight="700" fill="${C.ink}">2088</text>
<text x="500" y="160" text-anchor="end" font-size="10" fill="${C.mute}">hermetically sealed ☐</text>
</svg>`,

leakspots: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="60" width="200" height="120" rx="6" fill="#e1f0f6" stroke="${C.cold}" stroke-width="2"/><text x="160" y="125" text-anchor="middle" font-size="13" fill="${C.ink}">Indoor unit</text>
<rect x="380" y="60" width="200" height="120" rx="6" fill="#fbe9e0" stroke="${C.hot}" stroke-width="2"/><text x="480" y="118" text-anchor="middle" font-size="13" fill="${C.ink}">Outdoor unit</text><text x="480" y="136" text-anchor="middle" font-size="11" fill="${C.mute}">compressor · condenser</text>
<path d="M260,95 L380,95 M260,145 L380,145" stroke="${C.ink}" stroke-width="4"/>
${[[265,95,"flare nut"],[375,95,"flare nut"],[265,145,"flare nut"],[375,145,"flare nut"],[560,80,"service valve"],[560,160,"Schrader core and cap"],[430,175,"shaft seal"],[160,60,"brazed joints"],[320,120,"pipe rubbing on bracket"]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="${C.bad}" opacity=".85"/><circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#fff"/>`).join("")}
<text x="320" y="215" text-anchor="middle" font-size="12" fill="${C.ink}" font-weight="600">Red dots: where leaks usually are. Look for oil staining first.</text>
<text x="320" y="235" text-anchor="middle" font-size="11" fill="${C.mute}">Flare nuts, brazed joints, Schrader cores and missing caps, valve stems, the compressor shaft seal, pipes rubbing on brackets.</text>
</svg>`,

methods: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="295" height="180" rx="8" fill="#e1f0f6" stroke="${C.cold}" stroke-width="2"/>
<rect x="325" y="20" width="295" height="180" rx="8" fill="${C.soft}" stroke="${C.line}" stroke-width="2"/>
<text x="167" y="48" text-anchor="middle" font-size="14" font-weight="700" fill="${C.cold}">DIRECT: test the pipework</text>
<text x="472" y="48" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ink}">INDIRECT: read the system</text>
${["Electronic detector (≥ 5 g/yr, checked yearly)","Bubble solution on joints","UV dye and lamp","OFN standing pressure test"].map((t,i)=>`<text x="40" y="${80+i*28}" font-size="12" fill="${C.ink}">• ${t}</text>`).join("")}
${["Pressures and temperatures","Superheat and subcooling","Compressor running current","Oil level, liquid level, sight glass"].map((t,i)=>`<text x="345" y="${80+i*28}" font-size="12" fill="${C.ink}">• ${t}</text>`).join("")}
<text x="320" y="215" text-anchor="middle" font-size="11" fill="${C.mute}">Indirect readings point to a leak; a direct method finds it; bubbles confirm it.</text>
</svg>`,

waste: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${box(20,40,130,70,"System","recover (certified)","#e1f0f6",C.cold)}
${box(185,40,130,70,"Recovery cylinder","80%, labelled","#fff",C.ink)}
${box(350,40,130,70,"Registered carrier","consignment note","#fff",C.ink)}
${box(515,20,110,50,"Reclaim","to virgin spec","#e4f3ea",C.good)}
${box(515,90,110,50,"Destroy","mixed or unusable","#fbe9e0",C.bad)}
<path d="M150,75 L177,75 M315,75 L342,75" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/>
<path d="M480,65 L507,45 M480,85 L507,110" stroke="${C.ink}" stroke-width="3" fill="none" marker-end="url(#ah)"/>
<path d="M250,110 L250,150 L85,150 L85,118" stroke="${C.good}" stroke-width="3" fill="none" marker-end="url(#ah)"/>
<text x="168" y="170" text-anchor="middle" font-size="11" fill="${C.good}">recycled: back into the SAME owner's equipment only</text>
<text x="320" y="192" text-anchor="middle" font-size="11" fill="${C.mute}">Refrigerant and used oil are hazardous waste. Keep consignment notes for 3 years.</text>
</svg>`,

ptest: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<line x1="60" y1="160" x2="610" y2="160" stroke="${C.ink}" stroke-width="2" marker-end="url(#ah)"/>
<line x1="60" y1="160" x2="60" y2="20" stroke="${C.ink}" stroke-width="2" marker-end="url(#ah)"/>
<text x="20" y="95" font-size="11" fill="${C.mute}" transform="rotate(-90 20 95)">pressure</text>
<text x="335" y="185" text-anchor="middle" font-size="11" fill="${C.mute}">time →</text>
<polyline points="60,160 110,160 130,50 230,50 250,80 480,80 500,160 600,160" fill="none" stroke="${C.cold}" stroke-width="4"/>
<line x1="60" y1="80" x2="610" y2="80" stroke="${C.line}" stroke-dasharray="5 4"/>
<text x="180" y="40" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}">STRENGTH 1.1 × PS</text>
<text x="180" y="68" text-anchor="middle" font-size="10" fill="${C.mute}">short hold, proves it won't burst</text>
<text x="365" y="70" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}">TIGHTNESS at PS</text>
<text x="365" y="100" text-anchor="middle" font-size="10" fill="${C.mute}">long hold (often 24 h), temperature corrected, no drop</text>
<text x="612" y="76" text-anchor="end" font-size="10" fill="${C.mute}">PS</text>
<text x="550" y="140" text-anchor="middle" font-size="10" fill="${C.mute}">vent OFN, then evacuate</text>
</svg>`,

commission: `<svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${["Strength test","Tightness test","Evacuate","Charge by weight","Run and check","Label and record"].map((t,i)=>`<rect x="${15+i*105}" y="30" width="92" height="56" rx="6" fill="${i<2?"#e1f0f6":i<4?"#fff":"#e4f3ea"}" stroke="${i<2?C.cold:i<4?C.ink:C.good}" stroke-width="2"/><text x="${61+i*105}" y="${t.length>13?54:62}" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}">${t.split(" ")[0]}</text>${t.length>13?`<text x="${61+i*105}" y="70" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}">${t.split(" ").slice(1).join(" ")}</text>`:`<text x="${61+i*105}" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}">${t.split(" ").slice(1).join(" ")}</text>`}${i<5?`<path d="M${107+i*105},58 L${115+i*105},58" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/>`:""}`).join("")}
<text x="320" y="110" text-anchor="middle" font-size="11" fill="${C.mute}">OFN for the first two, vacuum pump and micron gauge for the third, scales for the fourth, thermometer and gauges for the fifth.</text>
</svg>`,

charge: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="150" width="200" height="22" rx="4" fill="#4a5a63"/><rect x="100" y="138" width="120" height="14" rx="2" fill="#15232b"/><text x="160" y="149" text-anchor="middle" font-size="9" fill="#7ef0a0" font-family="monospace">  7.50 kg</text>
<rect x="110" y="40" width="100" height="100" rx="12" fill="#cfd6da" stroke="${C.ink}" stroke-width="2"/><rect x="150" y="26" width="20" height="16" fill="${C.ink}"/>
<text x="160" y="95" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}">R410A</text>
<text x="300" y="60" font-size="13" font-weight="700" fill="${C.ink}">Charge by weight, not by feel</text>
<text x="300" y="84" font-size="11" fill="${C.ink}">nameplate charge + manufacturer's allowance per extra metre of pipe</text>
<text x="300" y="108" font-size="11" fill="${C.ink}">zeotropic blends: LIQUID from the cylinder (dip tube or inverted)</text>
<text x="300" y="132" font-size="11" fill="${C.ink}">liquid into the liquid line with the system off, or metered into suction</text>
<text x="300" y="156" font-size="11" fill="${C.ink}">then prove it with superheat and subcooling</text>
<text x="300" y="180" font-size="11" fill="${C.bad}" font-weight="600">never slug liquid into a running compressor</text>
</svg>`,

faults: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
${[["Low charge",["↓","↓","↑","↓"],"bubbles in glass",C.cold],["Overcharge",["↑","↑","↓","↑"],"high amps, floodback",C.hot],["Air in system",["–","↑↑","–","–"],"head above PT chart",C.amber],["Restriction",["↓","↓","↑","–"],"temp drop across drier",C.mute]].map((c,i)=>{const x=20+i*155;return `<rect x="${x}" y="20" width="140" height="220" rx="8" fill="#fff" stroke="${c[3]}" stroke-width="2"/><rect x="${x}" y="20" width="140" height="34" rx="8" fill="${c[3]}"/><text x="${x+70}" y="43" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${c[0]}</text>`+["Suction","Head","Superheat","Subcool"].map((l,k)=>`<text x="${x+14}" y="${84+k*34}" font-size="11" fill="${C.mute}">${l}</text><text x="${x+126}" y="${86+k*34}" text-anchor="end" font-size="20" font-weight="700" fill="${c[1][k]==="–"?C.mute:(c[1][k].includes("↑")?C.hot:C.cold)}">${c[1][k]}</text>`).join("")+`<text x="${x+70}" y="228" text-anchor="middle" font-size="10" fill="${C.ink}">${c[2]}</text>`}).join("")}
</svg>`,

heavy: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="40" y="30" width="560" height="170" fill="#fff" stroke="${C.ink}" stroke-width="2"/>
<rect x="42" y="130" width="556" height="68" fill="${C.cold}" opacity=".25"/><rect x="42" y="150" width="556" height="48" fill="${C.cold}" opacity=".25"/><rect x="42" y="172" width="556" height="26" fill="${C.cold}" opacity=".3"/>
<rect x="420" y="80" width="120" height="118" fill="#9aa7ad" stroke="${C.ink}"/><text x="480" y="110" text-anchor="middle" font-size="11" fill="#fff">condensing unit</text>
<circle cx="440" cy="135" r="6" fill="${C.bad}"/><text x="455" y="139" font-size="10" fill="${C.bad}">leak</text>
<g transform="translate(120,70)"><circle cx="0" cy="0" r="12" fill="${C.ink}"/><line x1="0" y1="12" x2="0" y2="70" stroke="${C.ink}" stroke-width="6"/><line x1="0" y1="30" x2="-22" y2="60" stroke="${C.ink}" stroke-width="5"/><line x1="0" y1="30" x2="22" y2="60" stroke="${C.ink}" stroke-width="5"/><line x1="0" y1="70" x2="-14" y2="120" stroke="${C.ink}" stroke-width="6"/><line x1="0" y1="70" x2="14" y2="120" stroke="${C.ink}" stroke-width="6"/></g>
<text x="200" y="60" font-size="13" font-weight="700" fill="${C.cold}">Refrigerant vapour is heavier than air</text>
<text x="200" y="78" font-size="11" fill="${C.ink}">it pools at floor level, in pits and cold stores, and pushes oxygen out</text>
<text x="200" y="96" font-size="11" fill="${C.ink}">no smell, no warning: ventilate, oxygen monitor, never alone</text>
<text x="320" y="215" text-anchor="middle" font-size="11" fill="${C.mute}">Plant rooms over a set charge need fixed detection and alarms under EN 378.</text>
</svg>`,

cylrules: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="20" width="295" height="185" rx="8" fill="#e4f3ea" stroke="${C.good}" stroke-width="2"/>
<rect x="325" y="20" width="295" height="185" rx="8" fill="#fbe6e4" stroke="${C.bad}" stroke-width="2"/>
<text x="167" y="48" text-anchor="middle" font-size="14" font-weight="700" fill="${C.good}">DO</text>
<text x="472" y="48" text-anchor="middle" font-size="14" font-weight="700" fill="${C.bad}">NEVER</text>
${["Keep upright and secured","Fit valve caps for transport","Store cool, ventilated, out of sun","Warm with heater belt or water < 40 °C","Check the test date"].map((t,i)=>`<text x="40" y="${78+i*26}" font-size="12" fill="${C.ink}">✓ ${t}</text>`).join("")}
${["Heat with a naked flame","Fill a recovery cylinder past 80%","Refill a disposable cylinder","Mix refrigerants in one cylinder","Use oxygen or air to pressurise"].map((t,i)=>`<text x="345" y="${78+i*26}" font-size="12" fill="${C.ink}">✗ ${t}</text>`).join("")}
</svg>`,

record: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
<rect x="60" y="15" width="520" height="230" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>
<text x="80" y="42" font-size="13" font-weight="700" fill="${C.ink}">F‑GAS EQUIPMENT RECORD</text><text x="560" y="42" text-anchor="end" font-size="10" fill="${C.mute}">keep 5 years · operator and contractor</text>
<line x1="60" y1="52" x2="580" y2="52" stroke="${C.ink}"/>
${[["Equipment","Cold room pack, plant room 2"],["Refrigerant / charge","R404A · 30 kg · 117.7 t CO2e"],["Leak check interval","6 months (no fixed detection)"],["Date · result · engineer","08/11/2026 · no leak · J. Smith, Cat I, Acme Ltd (REFCOM)"],["Gas added","0 kg (last top‑up 2.0 kg reclaimed, 03/2026, from X Reclaim Ltd)"],["Gas recovered","—"],["Decommissioning","—"]].map((r,i)=>`<text x="80" y="${78+i*24}" font-size="11" fill="${C.mute}">${r[0]}</text><text x="250" y="${78+i*24}" font-size="11" fill="${C.ink}">${r[1]}</text><line x1="80" y1="${84+i*24}" x2="560" y2="${84+i*24}" stroke="${C.line}" stroke-dasharray="2 3"/>`).join("")}
</svg>`,


liquidline: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<path d="M20,100 L620,100" stroke="${C.hot}" stroke-width="6"/>
${box(60,60,110,80,"Receiver","stores liquid","#fff",C.ink)}
${box(230,60,110,80,"Filter drier","moisture, acid, dirt","#fff",C.ink)}
<circle cx="420" cy="100" r="36" fill="#fff" stroke="${C.ink}" stroke-width="2"/><circle cx="420" cy="100" r="24" fill="#e1f0f6"/><circle cx="412" cy="92" r="3" fill="#fff" stroke="${C.cold}"/><circle cx="426" cy="106" r="3" fill="#fff" stroke="${C.cold}"/>
<text x="420" y="160" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}">Sight glass</text><text x="420" y="175" text-anchor="middle" font-size="11" fill="${C.mute}">clear = full liquid</text>
<path d="M530,70 L560,100 L530,130 Z M590,70 L560,100 L590,130 Z" fill="#f2c200" stroke="${C.ink}" stroke-width="2"/><rect x="552" y="40" width="16" height="30" fill="${C.ink}"/>
<text x="560" y="160" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}">Expansion valve</text><text x="560" y="175" text-anchor="middle" font-size="11" fill="${C.mute}">pressure drops here</text>
<text x="20" y="30" font-size="12" fill="${C.hot}" font-weight="700">Liquid line, from condenser →</text>
</svg>`,

heatpump: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${box(30,70,150,80,"Indoor coil","","#fff",C.ink)}
${box(460,70,150,80,"Outdoor coil","","#fff",C.ink)}
<rect x="270" y="80" width="100" height="60" rx="8" fill="#f2c200" stroke="${C.ink}" stroke-width="2"/><text x="320" y="106" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}">4‑way</text><text x="320" y="122" text-anchor="middle" font-size="11" font-weight="700" fill="${C.ink}">valve</text>
<path d="M180,95 L262,95" stroke="${C.hot}" stroke-width="5" marker-end="url(#ahh)"/><path d="M378,125 L452,125" stroke="${C.cold}" stroke-width="5" marker-end="url(#ahc)"/>
<text x="105" y="40" text-anchor="middle" font-size="12" font-weight="700" fill="${C.hot}">WINTER: condenser, heats the room</text>
<text x="105" y="190" text-anchor="middle" font-size="12" font-weight="700" fill="${C.cold}">SUMMER: evaporator, cools the room</text>
<text x="535" y="40" text-anchor="middle" font-size="12" font-weight="700" fill="${C.cold}">WINTER: evaporator, takes heat from outside air</text>
<text x="535" y="190" text-anchor="middle" font-size="12" font-weight="700" fill="${C.hot}">SUMMER: condenser, dumps heat outside</text>
<text x="320" y="40" text-anchor="middle" font-size="11" fill="${C.mute}">the valve swaps which coil gets the hot gas</text>
<text x="320" y="190" text-anchor="middle" font-size="11" fill="${C.mute}">compressor and expansion device stay the same</text>
</svg>`,

gwpbars: `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg">
${[["R744 CO2",1,C.good],["R290",3,C.good],["R1234yf",4,C.good],["R32",675,C.amber],["R134a",1430,C.amber],["R407C",1774,C.hot],["R22",1810,C.hot],["R410A",2088,C.hot],["R404A",3922,C.bad]].map((r,i)=>{const y=20+i*25;const w=Math.max(3,r[1]/3922*430);return `<text x="95" y="${y+15}" text-anchor="end" font-size="12" font-weight="600" fill="${C.ink}">${r[0]}</text><rect x="105" y="${y}" width="${w}" height="19" rx="3" fill="${r[2]}" opacity=".8"/><text x="${115+w}" y="${y+15}" font-size="12" font-family="monospace" fill="${C.ink}">${r[1]}</text>`}).join("")}
<line x1="105" y1="15" x2="105" y2="245" stroke="${C.line}"/>
<line x1="${105+2500/3922*430}" y1="15" x2="${105+2500/3922*430}" y2="245" stroke="${C.bad}" stroke-dasharray="5 4"/><text x="${110+2500/3922*430}" y="245" font-size="10" fill="${C.bad}">GWP 2500 ban line</text>
<line x1="${105+750/3922*430}" y1="15" x2="${105+750/3922*430}" y2="245" stroke="${C.amber}" stroke-dasharray="5 4"/><text x="${110+750/3922*430}" y="245" font-size="10" fill="${C.amber}">750 split AC line</text>
</svg>`,

rrr: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${box(20,40,180,90,"RECOVERED","taken out of the system","#fff",C.ink)}
${box(230,40,180,90,"RECYCLED","filtered, oil and water removed","#e1f0f6",C.cold)}
${box(440,40,180,90,"RECLAIMED","reprocessed to virgin spec","#e4f3ea",C.good)}
<path d="M200,85 L222,85 M410,85 L432,85" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/>
<text x="110" y="160" text-anchor="middle" font-size="11" fill="${C.mute}">in a cylinder, nothing else done</text>
<text x="320" y="160" text-anchor="middle" font-size="11" fill="${C.mute}">reuse only in the same owner's kit</text>
<text x="530" y="160" text-anchor="middle" font-size="11" fill="${C.mute}">can be sold and used anywhere</text>
<text x="320" y="190" text-anchor="middle" font-size="12" font-weight="700" fill="${C.bad}">MIXED refrigerants cannot be reclaimed: destruction, at your cost</text>
</svg>`,

tworegs: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">
<path d="M160,20 L260,45 L250,140 Q160,200 70,140 L60,45 Z" fill="#e1f0f6" stroke="${C.cold}" stroke-width="3"/>
<path d="M480,20 L580,45 L570,140 Q480,200 390,140 L380,45 Z" fill="#fbe9e0" stroke="${C.hot}" stroke-width="3"/>
<text x="160" y="80" text-anchor="middle" font-size="18" font-weight="700" fill="${C.cold}">F‑GAS</text>
<text x="160" y="102" text-anchor="middle" font-size="11" fill="${C.ink}">GB version of EU 517/2014</text>
<text x="160" y="120" text-anchor="middle" font-size="11" fill="${C.ink}">HFCs: R134a, R32, R410A, R404A</text>
<text x="160" y="138" text-anchor="middle" font-size="11" fill="${C.ink}">cuts greenhouse gas emissions</text>
<text x="480" y="80" text-anchor="middle" font-size="18" font-weight="700" fill="${C.hot}">ODS</text>
<text x="480" y="102" text-anchor="middle" font-size="11" fill="${C.ink}">GB version of EC 1005/2009</text>
<text x="480" y="120" text-anchor="middle" font-size="11" fill="${C.ink}">CFCs and HCFCs: R12, R22</text>
<text x="480" y="138" text-anchor="middle" font-size="11" fill="${C.ink}">protects the ozone layer</text>
<text x="320" y="212" text-anchor="middle" font-size="12" fill="${C.mute}">Enforced in GB by the Environment Agency, Natural Resources Wales and SEPA</text>
</svg>`,

duties: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
${box(30,60,200,100,"OPERATOR","owner or occupier","#fff3e0",C.amber)}
${box(410,60,200,100,"CONTRACTOR","the undertaking","#e1f0f6",C.cold)}
<path d="M230,95 L402,95" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/><text x="320" y="88" text-anchor="middle" font-size="11" fill="${C.ink}">checks both certificates</text>
<path d="M410,125 L238,125" stroke="${C.ink}" stroke-width="3" marker-end="url(#ah)"/><text x="320" y="145" text-anchor="middle" font-size="11" fill="${C.ink}">does the work, hands over records</text>
<text x="130" y="185" text-anchor="middle" font-size="11" fill="${C.mute}">legally responsible for leak checks,</text><text x="130" y="200" text-anchor="middle" font-size="11" fill="${C.mute}">records, repairs, certified people</text>
<text x="510" y="185" text-anchor="middle" font-size="11" fill="${C.mute}">company certificate (REFCOM etc.)</text><text x="510" y="200" text-anchor="middle" font-size="11" fill="${C.mute}">+ engineer's personnel certificate</text>
</svg>`,

n2test: `<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<rect x="40" y="50" width="60" height="150" rx="14" fill="#444" stroke="${C.ink}" stroke-width="2"/><rect x="62" y="32" width="16" height="20" fill="${C.ink}"/><text x="70" y="130" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">OFN</text>
<circle cx="130" cy="60" r="16" fill="#fff" stroke="${C.ink}" stroke-width="2"/><text x="130" y="95" text-anchor="middle" font-size="10" fill="${C.mute}">regulator</text>
<path d="M78,45 L114,55" stroke="${C.ink}" stroke-width="3"/>
<path d="M146,60 L260,60 L260,110" stroke="#f2c200" stroke-width="4" fill="none"/>
<circle cx="260" cy="130" r="22" fill="#fff" stroke="${C.bad}" stroke-width="4"/><path d="M260,130 L270,116" stroke="${C.ink}" stroke-width="2"/><text x="260" y="175" text-anchor="middle" font-size="10" fill="${C.mute}">gauge</text>
<path d="M282,130 L340,130" stroke="#f2c200" stroke-width="4"/>
${box(340,80,260,100,"System","pipework and coils, no refrigerant","#e1f0f6",C.cold)}
<text x="470" y="210" text-anchor="middle" font-size="12" fill="${C.ink}" font-weight="600">Pressurise, note pressure and temperature, wait, compare.</text>
</svg>`,

sightglass: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
${[["CLEAR","full column of liquid: good","#e1f0f6",C.good,0],["BUBBLES","flash gas: low charge or restriction","#e1f0f6",C.bad,6],["WET","indicator changed colour: change the drier","#fff3c4",C.amber,0]].map((g,i)=>{const cx=110+i*210;return `<circle cx="${cx}" cy="80" r="50" fill="#fff" stroke="${C.ink}" stroke-width="3"/><circle cx="${cx}" cy="80" r="36" fill="${g[2]}"/>${Array.from({length:g[4]},(_,k)=>`<circle cx="${cx-20+(k%3)*18}" cy="${68+Math.floor(k/3)*20}" r="4" fill="#fff" stroke="${C.cold}"/>`).join("")}${i===2?`<circle cx="${cx}" cy="80" r="10" fill="#f2c200"/>`:""}<text x="${cx}" y="155" text-anchor="middle" font-size="14" font-weight="700" fill="${g[3]}">${g[0]}</text><text x="${cx}" y="175" text-anchor="middle" font-size="11" fill="${C.mute}">${g[1]}</text>`}).join("")}
</svg>`,

hotwork: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">${arrowDefs}
<path d="M60,120 L300,120" stroke="#d9a46e" stroke-width="14"/>
<path d="M180,40 L180,100" stroke="${C.hot}" stroke-width="5" marker-end="url(#ahh)"/><path d="M165,45 Q180,10 195,45" fill="${C.hot}" opacity=".7"/>
<text x="60" y="170" font-size="12" fill="${C.ink}" font-weight="600">Pipe still holding refrigerant</text>
<text x="330" y="60" font-size="13" font-weight="700" fill="${C.bad}">HEAT + HFC = HYDROGEN FLUORIDE</text>
<text x="330" y="82" font-size="11" fill="${C.ink}">toxic, corrosive gas; plus molten metal blown out of the joint</text>
<text x="330" y="115" font-size="12" font-weight="700" fill="${C.good}">BEFORE ANY FLAME</text>
<text x="330" y="135" font-size="11" fill="${C.ink}">recover · purge with OFN · prove zero pressure</text>
<text x="330" y="153" font-size="11" fill="${C.ink}">clear flammables · extinguisher · hot work permit</text>
<text x="330" y="171" font-size="11" fill="${C.ink}">fire watch after you finish</text>
</svg>`,

a2l: `<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg">
<path d="M80,160 Q60,110 100,80 Q90,120 120,120 Q130,90 150,70 Q150,120 180,110 Q200,140 160,160 Z" fill="${C.amber}" opacity=".85"/><path d="M110,160 Q100,130 125,115 Q130,140 150,135 Q160,150 140,160 Z" fill="#f2c200"/>
<text x="130" y="190" text-anchor="middle" font-size="12" font-weight="700" fill="${C.ink}">R32 · R1234yf · R454B</text>
${["Needs a rich leak AND a spark to burn","Slow flame, but it does burn","No ignition sources in the work area","Spark‑free tools, rated recovery unit and detector","Charge limits by room size: EN 378","Ventilate before and during work"].map((t,i)=>`<text x="230" y="${45+i*26}" font-size="12" fill="${C.ink}">• ${t}</text>`).join("")}
</svg>`,

co2e: `<svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="30" width="600" height="60" rx="8" fill="${C.soft}" stroke="${C.line}"/>
<text x="320" y="68" text-anchor="middle" font-size="22" font-weight="700" fill="${C.ink}">kg of refrigerant  ×  GWP  ÷  1000  =  tonnes CO2e</text>
<text x="320" y="120" text-anchor="middle" font-size="14" fill="${C.mute}">Example: 12 kg of R410A  →  12 × 2088 = 25,056 kg  →  25.1 tonnes CO2e  →  leak check every 12 months</text>
</svg>`,
};
module.exports = figures;
