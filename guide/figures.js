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

co2e: `<svg viewBox="0 0 640 150" xmlns="http://www.w3.org/2000/svg">
<rect x="20" y="30" width="600" height="60" rx="8" fill="${C.soft}" stroke="${C.line}"/>
<text x="320" y="68" text-anchor="middle" font-size="22" font-weight="700" fill="${C.ink}">kg of refrigerant  ×  GWP  ÷  1000  =  tonnes CO2e</text>
<text x="320" y="120" text-anchor="middle" font-size="14" fill="${C.mute}">Example: 12 kg of R410A  →  12 × 2088 = 25,056 kg  →  25.1 tonnes CO2e  →  leak check every 12 months</text>
</svg>`,
};
module.exports = figures;
