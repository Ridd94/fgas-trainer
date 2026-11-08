// Chapter content for the study guide. Plain HTML strings; figures referenced by key.
const chapters = [
{ n:1, title:"How the exam works", intro:"What City & Guilds 2079-11 actually tests, and how to use this guide alongside the practice app.", sections:[
 {h:"What 2079-11 is", body:`<p>The Level 2 Award in F-Gas and ODS Regulations, Category I, is the qualification that lets you legally work on any stationary refrigeration, air conditioning or heat pump system containing fluorinated greenhouse gases, whatever its charge size. It is the full ticket. Categories II, III and IV are cut-down versions limited by activity or charge.</p>
 <p>The course is normally one or two days. Assessment is in two parts: a <strong>multiple-choice theory test</strong> on the regulations, refrigerants, the refrigeration cycle, leak checking, recovery and safety, and a <strong>practical assessment</strong> where you demonstrate leak checking, recovery, pressure testing, evacuation and charging on a rig, with the assessor asking questions as you go.</p>`},
 {h:"What the theory test rewards", body:`<p>Most questions are about <strong>numbers and definitions</strong>: the 5, 50 and 500 tonne thresholds, the 3 kg and 6 kg category limits, GWP values, 80% cylinder fill, 500 microns, 5 years of records. The rest ask you to apply them: given a charge and a refrigerant, how often is the leak check? The maths is one multiplication and one division.</p>
 <p>Chapter 12 is a one-page list of every number you need. Learn that page and you have most of the marks.</p>`},
 {h:"How to use this guide", body:`<p>Read a chapter, then run that topic in the practice app. The app explains every wrong answer, and the dotted words open the same glossary printed at the back of this guide. Finish with two or three mock exams at 70% or better before test day.</p>
 <div class="callout"><strong>Great Britain versus the EU.</strong> GB kept EU Regulation 517/2014 as its own F-Gas Regulation after Brexit. The EU has since replaced it with Regulation 2024/573, which applies in Northern Ireland. The GB rules are what 2079-11 tests. Where an online resource quotes EU 2024/573 dates, treat them with care.</div>`}
]},

{ n:2, title:"The refrigeration cycle in pictures", intro:"Four components, two pressures, one job: move heat from where it is not wanted to where it does no harm.", sections:[
 {h:"The four components", fig:"cycle", body:`<p>Refrigerant goes round a closed loop. The <strong>compressor</strong> squeezes cool vapour into hot, high-pressure vapour. In the <strong>condenser</strong> that vapour gives its heat to the outside air and turns to warm liquid. The <strong>expansion device</strong> drops the pressure sharply, so the liquid can now boil at a low temperature. In the <strong>evaporator</strong> it does exactly that, soaking up heat from the room or the product, and returns to the compressor as cool vapour.</p>
 <p>Everything from the compressor outlet to the expansion device is the <strong>high side</strong>: hot, high pressure, read on the red gauge. Everything from the expansion device to the compressor inlet is the <strong>low side</strong>: cold, low pressure, read on the blue compound gauge.</p>`},
 {h:"Why it gets cold: latent heat", body:`<p>Heat that changes the temperature of something is <strong>sensible heat</strong>. Heat that changes its state, liquid to vapour or back, without changing temperature is <strong>latent heat</strong>, and there is far more of it per kilogram. Refrigeration works by boiling liquid in the evaporator (absorbing latent heat) and condensing vapour in the condenser (releasing it).</p>
 <p>A liquid boils at a temperature fixed by its pressure. Lower the pressure and it boils colder. That is all the expansion device does. For any refrigerant the relationship is printed on a <strong>pressure-temperature (PT) chart</strong>; reading a gauge pressure and converting it to a saturation temperature is the core skill of commissioning and fault finding.</p>`},
 {h:"Superheat and subcooling", fig:"shsc", body:`<p><strong>Superheat</strong> tells you the evaporator has boiled off every drop of liquid before the compressor. Measure the suction line temperature near the evaporator outlet, read the suction pressure, convert that to a saturation temperature, and subtract. Normal is 5 to 10 K. High superheat means a starved evaporator (low charge or restriction). Low or zero superheat means liquid is heading for the compressor.</p>
 <p><strong>Subcooling</strong> tells you a solid column of liquid is reaching the expansion device. Measure the liquid line temperature at the condenser outlet, convert the discharge pressure to a saturation temperature, and subtract the other way. Normal is 3 to 8 K. Low subcooling with bubbles in the sight glass means low charge. High subcooling with high head pressure means overcharge.</p>
 <p>On zeotropic blends use the <strong>dew point</strong> for superheat and the <strong>bubble point</strong> for subcooling.</p>`},
 {h:"The parts between the big four", body:`<ul>
 <li><strong>Receiver:</strong> stores liquid after the condenser; used for pump-down.</li>
 <li><strong>Filter drier:</strong> desiccant and a screen in the liquid line; traps moisture, acid and debris. Change it every time the system is opened.</li>
 <li><strong>Sight glass:</strong> a window in the liquid line. Clear is good; bubbles mean flash gas. Many have a moisture indicator that changes colour when wet.</li>
 <li><strong>Suction accumulator:</strong> catches liquid before the compressor.</li>
 <li><strong>HP and LP cut-outs:</strong> pressure switches that stop the compressor on excessive head pressure or on loss of charge.</li>
 <li><strong>Reversing valve:</strong> in a heat pump, swaps which coil is the condenser and which the evaporator.</li>
 <li><strong>Schrader valves:</strong> service ports. The core is a service aid; the <strong>cap</strong> is the real seal. Always refit caps.</li>
 </ul>`}
]},

{ n:3, title:"Refrigerants", intro:"Families, numbers, GWP, blends, safety classes and oils. Half the exam lives in this chapter.", sections:[
 {h:"The families", body:`<table><thead><tr><th>Family</th><th>Contains</th><th>Examples</th><th>Ozone (ODP)</th><th>Warming (GWP)</th><th>Regulated by</th></tr></thead><tbody>
 <tr><td>CFC</td><td>Cl, F, C</td><td>R11, R12</td><td>High</td><td>Very high</td><td>ODS Regulation (banned)</td></tr>
 <tr><td>HCFC</td><td>H, Cl, F, C</td><td>R22</td><td>Low but real</td><td>High (1810)</td><td>ODS Regulation (banned for service since 2015)</td></tr>
 <tr><td>HFC</td><td>H, F, C</td><td>R134a, R32, R410A, R404A</td><td>Zero</td><td>High</td><td>F-Gas Regulation</td></tr>
 <tr><td>HFO</td><td>H, F, C (unsaturated)</td><td>R1234yf, R1234ze</td><td>Zero</td><td>Very low (about 4)</td><td>F-Gas (listed, no quota)</td></tr>
 <tr><td>Natural</td><td>Hydrocarbons, CO2, ammonia</td><td>R290, R600a, R744, R717</td><td>Zero</td><td>0 to 3</td><td>Neither, but safety standards apply</td></tr>
 </tbody></table>
 <p>Chlorine is what harms ozone, so CFCs and HCFCs are <strong>ozone depleting substances</strong> under the ODS Regulation. Fluorine without chlorine does not touch ozone but traps heat, so HFCs are the <strong>F-gases</strong>. Exam trap: R22 is <em>not</em> an F-gas.</p>`},
 {h:"GWP: the numbers to learn", body:`<p>Global Warming Potential compares 1 kg of a gas to 1 kg of CO2 over 100 years. The regulation uses the IPCC Fourth Assessment Report (AR4) values. These five come up again and again:</p>
 <table class="nums"><thead><tr><th>Refrigerant</th><th>Type</th><th>GWP</th><th>Safety class</th></tr></thead><tbody>
 <tr><td>R32</td><td>Pure HFC</td><td>675</td><td>A2L</td></tr>
 <tr><td>R134a</td><td>Pure HFC</td><td>1430</td><td>A1</td></tr>
 <tr><td>R407C</td><td>Zeotropic HFC blend (R32/R125/R134a)</td><td>1774</td><td>A1</td></tr>
 <tr><td>R22</td><td>HCFC</td><td>1810</td><td>A1</td></tr>
 <tr><td>R410A</td><td>Near-azeotropic HFC blend (R32/R125)</td><td>2088</td><td>A1</td></tr>
 <tr><td>R404A</td><td>HFC blend</td><td>3922</td><td>A1</td></tr>
 <tr><td>R1234yf</td><td>HFO</td><td>4</td><td>A2L</td></tr>
 <tr><td>R290 propane</td><td>Hydrocarbon</td><td>3</td><td>A3</td></tr>
 <tr><td>R744 CO2</td><td>Natural</td><td>1</td><td>A1</td></tr>
 <tr><td>R717 ammonia</td><td>Natural</td><td>0</td><td>B2L</td></tr>
 </tbody></table>`},
 {h:"Blends and glide", body:`<p><strong>Zeotropic blends</strong> (R400 series: R407C, R410A, R404A) are mixtures whose parts boil at different temperatures. At a fixed pressure they start boiling at the <strong>bubble point</strong> and finish at the <strong>dew point</strong>; the gap is the <strong>temperature glide</strong>. R407C glides about 5 to 7 K; R410A so little (under 0.2 K) that it is called near-azeotropic.</p>
 <p>Because the parts separate, zeotropic blends are always <strong>charged as liquid</strong> from the cylinder. Taking vapour off the top draws the lighter components first and leaves the wrong mix in both the cylinder and the system. <strong>Azeotropic blends</strong> (R500 series: R507A) behave as one substance and have no glide.</p>`},
 {h:"Safety classes", fig:"safety", body:`<p>The letter is toxicity, the number is flammability. A2L refrigerants such as R32 will burn but need a concentrated leak and an ignition source, and the flame moves slowly. They still require spark-free tools, recovery equipment rated for flammables, ventilation and the charge limits in EN 378. A3 hydrocarbons are treated like LPG.</p>`},
 {h:"Oils", body:`<p>HFCs do not mix with mineral oil, so HFC systems use <strong>polyol ester (POE)</strong> oil. POE is strongly <strong>hygroscopic</strong>: it pulls moisture out of the air in minutes. Keep oil containers sealed, cap pipes, and keep systems open for the shortest time possible. Moisture plus POE plus heat makes acid, which attacks motor windings and causes <strong>copper plating</strong> on bearings.</p>`},
 {h:"Recovered, recycled, reclaimed", body:`<table><tbody>
 <tr><th>Recovered</th><td>Taken out of the system into a cylinder. Nothing else done.</td></tr>
 <tr><th>Recycled</th><td>Basic cleaning on site or in the van: oil separation, filtering, moisture removal. May go back into equipment of the <strong>same owner</strong>.</td></tr>
 <tr><th>Reclaimed</th><td>Reprocessed at a specialist facility to a virgin specification (AHRI 700). Can be sold and used anywhere.</td></tr>
 <tr><th>Mixed</th><td>Different refrigerants in one cylinder. Cannot be reclaimed. Sent for destruction at your cost. Never mix.</td></tr>
 </tbody></table>`}
]},

{ n:4, title:"The law: F-Gas and ODS", intro:"Who may do what, what the operator must do, and the ban dates that keep coming up.", sections:[
 {h:"Two regulations", body:`<p>The <strong>F-Gas Regulation</strong> (GB version of EU 517/2014) aims to cut emissions of fluorinated greenhouse gases. It sets personnel and company certification, leak checking, record keeping, labelling, the HFC phase-down and the equipment bans. The <strong>ODS Regulation</strong> (GB version of EC 1005/2009) controls ozone depleting substances such as R22: it banned virgin R22 for servicing from 2010 and recycled or reclaimed R22 from 1 January 2015. Systems may run on their existing R22 charge but cannot be topped up.</p>
 <p>In Great Britain the F-Gas rules are enforced by the <strong>Environment Agency</strong> in England, <strong>Natural Resources Wales</strong> and <strong>SEPA</strong> in Scotland. Health and safety and pressure systems are the HSE's business.</p>`},
 {h:"Personnel categories", body:`<table><thead><tr><th>Category</th><th>Leak check (no break-in)</th><th>Recovery</th><th>Install, maintain, service, repair, decommission</th></tr></thead><tbody>
 <tr><td><strong>I</strong> (2079-11)</td><td>Any size</td><td>Any size</td><td>Any size</td></tr>
 <tr><td><strong>II</strong></td><td>Any size</td><td>Under 3 kg (6 kg hermetic)</td><td>Under 3 kg (6 kg hermetic)</td></tr>
 <tr><td><strong>III</strong></td><td>No</td><td>Under 3 kg (6 kg hermetic)</td><td>No</td></tr>
 <tr><td><strong>IV</strong></td><td>Any size</td><td>No</td><td>No</td></tr>
 </tbody></table>
 <p>The 6 kg limit applies only to <strong>hermetically sealed</strong> systems that are labelled as such. Hermetically sealed means every refrigerant-containing part is joined by brazing, welding or a similar permanent method (capped valves and service ports allowed) and the tested leak rate is below 3 g per year.</p>`},
 {h:"Company certification", body:`<p>Certifying the engineer is not enough. Any <strong>undertaking</strong> (business) that installs, services, maintains, repairs or decommissions stationary refrigeration, air conditioning or heat pump equipment containing F-gas must hold a <strong>company certificate</strong> from an approved body such as REFCOM, Quidos or Bureau Veritas. An operator must check both certificates before letting a contractor work.</p>
 <p>Pre-charged, non-hermetically sealed equipment (a split air conditioner, for example) may only be sold to an end user with evidence that a certified undertaking will install it.</p>`},
 {h:"The operator's duties", body:`<p>The <strong>operator</strong> is whoever has actual control over how the equipment works, normally the owner or the business occupying the premises. The engineer does the work but the operator carries the legal duty to:</p>
 <ul><li>prevent leaks and have detected leaks repaired without undue delay, then re-checked within one month;</li>
 <li>have leak checks carried out at the right intervals by certified personnel;</li>
 <li>fit a leak detection system at 500 tonnes CO2e and above;</li>
 <li>keep records for five years and produce them on request;</li>
 <li>ensure recovery before disposal and use only certified people and companies.</li></ul>`},
 {h:"Labels", body:`<p>Equipment containing F-gas must carry a label stating that it contains fluorinated greenhouse gases, the refrigerant designation, the charge in kg <em>and</em> in tonnes CO2e, and the GWP. If you add gas on site, update the label.</p>`},
 {h:"Phase-down and bans", fig:"timeline", body:`<p>The <strong>HFC phase-down</strong> works through quotas on producers and importers, measured in tonnes CO2e, stepping down year by year. It does not ban HFCs outright; it makes high-GWP gas scarce and expensive so the market moves to lower-GWP alternatives.</p>
 <p>Alongside it sit specific bans. New stationary refrigeration with HFCs of GWP 2500 or more has been banned since 2020 (except equipment designed for below minus 50 degrees C). Since 2020 you may not service equipment with a charge of 40 tonnes CO2e or more using <strong>virgin</strong> HFCs of GWP 2500 or more; recycled or reclaimed gas is allowed until 2030. From 2025 single split air conditioners with under 3 kg may not use refrigerant of GWP 750 or more, which is why R32 replaced R410A.</p>`}
]},

{ n:5, title:"CO2 equivalent and leak checking", intro:"One formula, three thresholds, and the methods the assessor wants to see.", sections:[
 {h:"The formula", fig:"co2e", body:`<p>Every threshold in the regulation is in tonnes of CO2 equivalent, not kilograms, so a small charge of a high-GWP gas is caught sooner than a large charge of a low-GWP one. Work it out as kg times GWP, then divide by 1000.</p>
 <table class="nums"><thead><tr><th>System</th><th>Working</th><th>Tonnes CO2e</th><th>Leak check</th></tr></thead><tbody>
 <tr><td>3 kg R134a</td><td>3 × 1430 = 4290 kg</td><td>4.29</td><td>Under 5 t: no set interval</td></tr>
 <tr><td>5 kg R410A</td><td>5 × 2088 = 10,440 kg</td><td>10.44</td><td>Every 12 months</td></tr>
 <tr><td>1.3 kg R404A</td><td>1.3 × 3922 = 5099 kg</td><td>5.10</td><td>Every 12 months</td></tr>
 <tr><td>30 kg R404A</td><td>30 × 3922 = 117,660 kg</td><td>117.7</td><td>Every 6 months</td></tr>
 <tr><td>250 kg R410A</td><td>250 × 2088 = 522,000 kg</td><td>522</td><td>Every 3 months, detection system compulsory</td></tr>
 </tbody></table>
 <p>Going the other way: the 5 tonne threshold is reached by 1.27 kg of R404A, 2.39 kg of R410A, 3.50 kg of R134a or 7.41 kg of R32.</p>`},
 {h:"The intervals", fig:"ladder", body:`<p>A fixed leak detection system doubles each interval. Labelled hermetically sealed equipment starts at 10 tonnes instead of 5. The detection system itself must be checked every 12 months. After any leak repair, re-check within one month to prove the repair worked.</p>`},
 {h:"Direct and indirect methods", body:`<p><strong>Direct methods</strong> test the pipework itself: an electronic leak detector (sensitivity at least 5 g per year, checked every 12 months), bubble solution on joints, UV dye and lamp, or a standing pressure test with OFN. <strong>Indirect methods</strong> read the system: pressures, temperatures, compressor current, oil and liquid levels, the sight glass. A change in those points to a leak that you then confirm directly.</p>
 <p>Where to look first: anywhere oil has stained. Flare nuts, brazed joints, Schrader cores, valve stems, the compressor shaft seal, capillary rubbing on a bracket. Move the detector probe slowly <em>under</em> joints, because refrigerant is heavier than air. Confirm a hit with bubbles.</p>
 <p>On a nitrogen standing pressure test, allow for <strong>temperature</strong>. Pressure falls as the gas cools overnight, so compare corrected readings over a long enough period before calling it a leak.</p>`},
 {h:"What to do when you find one", body:`<p>Repair it. Topping up a known leaker instead of fixing it is an offence for the operator and the engineer. Sealants are not a repair. Record the leak, the repair, the gas added and the follow-up check in the equipment record.</p>`}
]},

{ n:6, title:"Recovery and disposal", intro:"Getting refrigerant out safely, keeping it clean, and moving it on legally.", sections:[
 {h:"When recovery is required", body:`<p>Before any work that opens the circuit, before decommissioning, and before equipment is scrapped. Deliberate venting is prohibited, and every technically and economically feasible step must be taken to avoid accidental release. Only a certified person may recover.</p>`},
 {h:"The recovery cylinder", fig:"cylinder", body:`<p>Weigh the cylinder on scales throughout and stop at <strong>80% of its rated capacity</strong>. Liquid expands when warm; an overfilled cylinder can become hydraulically full and burst. The float switch on the cylinder is a backup, not the method. Check the test date, evacuate the cylinder before use so it holds no air, and dedicate it to one refrigerant.</p>`},
 {h:"Methods", fig:"pushpull", body:`<p><strong>Vapour recovery</strong> through the suction port is simple but slow. <strong>Liquid recovery</strong> from the liquid line or receiver moves far more refrigerant per minute. <strong>Push-pull</strong> uses the recovery unit to pull vapour off the cylinder and push it into the system, driving liquid out into the cylinder; it suits large charges. Whichever you use, finish with vapour recovery until the system is below atmospheric pressure (a slight vacuum, as the recovery unit and regulation require) so almost nothing escapes when you open it. Break that vacuum with OFN before brazing.</p>
 <p>For A2L or A3 refrigerants the recovery machine must be rated for flammables, the area ventilated and ignition sources removed.</p>`},
 {h:"Where it goes", body:`<p>Recovered refrigerant and used compressor oil are <strong>hazardous waste</strong>. They travel with a <strong>registered waste carrier</strong> to a permitted facility under a <strong>hazardous waste consignment note</strong>, which both parties keep for three years. Recycled gas may go back into the same owner's equipment; anything else must be reclaimed by a licensed facility or destroyed. Never put recovered gas into a disposable cylinder, and never pour oil down a drain.</p>`}
]},

{ n:7, title:"Installation and commissioning", intro:"Test, evacuate, charge, run. In that order, every time.", sections:[
 {h:"Brazing with a nitrogen purge", fig:"braze", body:`<p>Heat copper in air and black copper-oxide scale forms inside the pipe. It breaks off and blocks driers, strainers and expansion valves. A gentle flow of <strong>oxygen-free nitrogen</strong> through the pipe while brazing displaces the air and keeps the bore clean. Copper-phosphorus rods are self-fluxing on copper to copper; copper to brass or steel needs a high-silver rod with flux, and the residue must be cleaned off.</p>
 <p>Never braze on a charged system. Recover, purge with OFN, confirm no pressure, clear flammables, have an extinguisher and a hot work permit, and keep a fire watch afterwards.</p>`},
 {h:"Pressure testing", body:`<p>Use <strong>oxygen-free nitrogen through a regulator</strong>. Never oxygen (explodes with oil), never compressed air (moisture, and an explosive mix with oil), never refrigerant alone. The <strong>strength test</strong> at 1.1 times the maximum allowable pressure (PS) proves the pipework will not burst. The <strong>tightness test</strong> at PS, held long enough and corrected for temperature, proves it does not leak. Both before any refrigerant goes in.</p>`},
 {h:"Evacuation", fig:"vacuum", body:`<p>Evacuating removes <strong>air</strong> (non-condensables that raise head pressure and waste energy) and <strong>moisture</strong> (which becomes acid and freezes at the expansion device). Under a deep vacuum water boils at room temperature and is pumped away. Use a two-stage pump, remove Schrader cores with a core tool to speed things up, and measure with an <strong>electronic micron gauge at the system</strong>, never the compound gauge. Pull below <strong>500 microns</strong>, isolate the pump, and watch. A fast rise is a leak; a slow creep that stalls is moisture; steady is good.</p>
 <p>On a wet system use <strong>triple evacuation</strong>: pull a vacuum, break it with OFN, pull again, break again, pull a third time. Change the vacuum pump oil often, because the moisture ends up in it and limits the vacuum the pump can reach.</p>`},
 {h:"Charging", body:`<p>Charge <strong>by weight</strong> on electronic scales: the nameplate charge plus the manufacturer's allowance for extra pipe length. Zeotropic blends go in as <strong>liquid</strong>. With the system off, liquid can go into the liquid line; with it running, meter liquid slowly into the suction so it flashes before the compressor. Never slug liquid into a running compressor. Then confirm with superheat and subcooling, not the other way round.</p>
 <div class="callout"><strong>Commissioning order:</strong> strength test, tightness test, evacuate, charge by weight, run, check superheat and subcooling, label, record.</div>`}
]},

{ n:8, title:"Reading the symptoms", intro:"Four faults account for most call-outs. Learn their fingerprints.", sections:[
 {h:"Symptom table", body:`<table><thead><tr><th>Fault</th><th>Suction pressure</th><th>Head pressure</th><th>Superheat</th><th>Subcooling</th><th>Sight glass</th><th>Other signs</th></tr></thead><tbody>
 <tr><th>Low charge</th><td>Low</td><td>Low</td><td>High</td><td>Low</td><td>Bubbles</td><td>Ice at TEV inlet, poor capacity, oil stains at the leak</td></tr>
 <tr><th>Overcharge</th><td>High</td><td>High</td><td>Low</td><td>High</td><td>Clear</td><td>High compressor current, liquid floodback, warm suction line not cold</td></tr>
 <tr><th>Non-condensables (air)</th><td>Normal</td><td>High, above PT chart for the liquid temperature</td><td>Normal</td><td>High-looking</td><td>Clear</td><td>Poor evacuation history, high discharge temperature</td></tr>
 <tr><th>Restriction (blocked drier or TEV)</th><td>Low</td><td>Low to normal</td><td>High</td><td>Normal to high</td><td>Bubbles after the restriction</td><td>Temperature drop across the drier, frost after the blockage</td></tr>
 <tr><th>Dirty condenser or fan failure</th><td>High</td><td>High</td><td>Normal</td><td>Normal to high</td><td>Clear</td><td>HP cut-out trips, condenser hot to touch</td></tr>
 </tbody></table>
 <p>Low charge and a restriction look alike on the gauges. The difference: a low charge gives low subcooling; a restriction leaves subcooling normal and shows a temperature change across the blocked component. Find the leak before adding gas.</p>`},
 {h:"Moisture", body:`<p>A wet system shows a colour change in the moisture indicator, intermittent cooling as ice forms and clears at the expansion device, acidic oil and eventually a failed compressor. Fit a new drier, evacuate properly, and find out how the moisture got in.</p>`}
]},

{ n:9, title:"Health and safety", intro:"Refrigerant is cold, heavy, under pressure, sometimes flammable, and poisonous in a flame.", sections:[
 {h:"The hazards", body:`<ul>
 <li><strong>Asphyxiation.</strong> Most refrigerants are heavier than air and odourless. A leak in a plant room, pit or cold store displaces oxygen at low level. Ventilate, use an oxygen monitor or fixed detection, never work alone in a suspected leak.</li>
 <li><strong>Frostbite.</strong> Liquid refrigerant flashes off well below 0 degrees C and freezes skin and eyes. Gloves and eye protection whenever you connect hoses, charge or recover.</li>
 <li><strong>Toxic decomposition.</strong> HFCs in a flame or on a hot surface break down to <strong>hydrogen fluoride</strong> and other corrosive gases. No brazing on charged systems, no smoking near leaks, good ventilation.</li>
 <li><strong>Pressure.</strong> Never heat a cylinder with a flame; use a heater belt or warm water under 40 degrees C. Never use oxygen or compressed air for testing. Keep cylinders upright, secured, capped, cool and ventilated, and carry them under ADR rules.</li>
 <li><strong>Flammability.</strong> A2L and A3 refrigerants need ignition sources removed, spark-free tools, rated recovery equipment and the charge limits of EN 378.</li>
 <li><strong>Ammonia (R717).</strong> B2L: toxic and mildly flammable, attacks copper, but its smell gives early warning.</li></ul>`},
 {h:"The paperwork that protects you", body:`<p><strong>COSHH</strong> requires an assessment of every substance you use, based on its <strong>safety data sheet</strong>. The <strong>Pressure Systems Safety Regulations 2000</strong> exempt refrigeration systems with compressor motor power of 25 kW or less; above that a written scheme of examination and periodic inspection are required. Brazing on site needs a <strong>hot work permit</strong>, an extinguisher to hand and a fire watch after the work.</p>`}
]},

{ n:10, title:"Records", intro:"Five years, both parties, and exactly what goes in.", sections:[
 {h:"What to record", body:`<p>For every piece of equipment subject to leak checks (5 tonnes CO2e or more, 10 for labelled hermetic), the record must show:</p>
 <ul><li>the type and quantity of F-gas installed;</li>
 <li>quantities added during installation, maintenance or because of leaks;</li>
 <li>whether any gas used was recycled or reclaimed, and the name and address of the facility;</li>
 <li>the quantity recovered;</li>
 <li>the identity of the undertaking that did the work;</li>
 <li>the dates and results of leak checks;</li>
 <li>on decommissioning, the measures taken to recover and dispose of the refrigerant.</li></ul>
 <p>Both the <strong>operator</strong> and the <strong>contractor</strong> keep the record for at least <strong>five years</strong>. Hazardous waste consignment notes are kept for <strong>three years</strong>. Update the equipment label whenever the charge changes.</p>`}
]},
];

const numbers = [
 ["3 kg / 6 kg hermetic","Charge limits for Category II and III work"],
 ["3 g per year","Max leak rate to count as hermetically sealed"],
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
 ["1.1 × PS","Strength test pressure with OFN"],
 ["5 to 10 K / 3 to 8 K","Typical superheat / subcooling"],
 ["40 °C","Maximum for warming a cylinder (no flames)"],
 ["25 kW","Compressor motor power above which PSSR written scheme applies"],
 ["2010 / 2015","Virgin R22 banned / recycled R22 banned"],
 ["2020","No new stationary refrigeration ≥2500 GWP; service ban on virgin ≥2500 GWP in ≥40 t CO2e systems"],
 ["2025","Single splits under 3 kg: no refrigerant ≥750 GWP"],
 ["2030","Recycled/reclaimed ≥2500 GWP also banned for service"],
 ["675 / 1430 / 1774 / 1810 / 2088 / 3922","GWP of R32 / R134a / R407C / R22 / R410A / R404A"],
 ["1 / 0","GWP of CO2 / ODP of all HFCs and HFOs"],
];

module.exports = { chapters, numbers };
