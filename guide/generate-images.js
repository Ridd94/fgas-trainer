// Generates the study-guide illustrations from guide/IMAGE-PROMPTS.md with the
// local ComfyUI server (Qwen-Image-Edit-2511 used as text-to-image).
//
//   node guide/generate-images.js                 all 38 pages
//   node guide/generate-images.js slug1 slug2     just these pages
//   node guide/generate-images.js --seed 7 slug   fixed seed (default: random)
//   node guide/generate-images.js --extra "..."   extra words appended to the prompt
//   --fast            8-step Lightning sampling (quicker, but no negative prompt)
//   --verbatim-style  use the style line exactly as written (see note below)
//
// Env: COMFY_URL (default http://127.0.0.1:8188). Seeds used are recorded in
// guide/images/seeds.json so any image can be reproduced.
const fs = require('fs');
const path = require('path');

const COMFY = process.env.COMFY_URL || 'http://127.0.0.1:8188';
const ROOT = path.join(__dirname, '..');
const W = 1664, H = 928; // ~16:9, multiples of 16, above the 1600x900 minimum

function parsePrompts() {
  const md = fs.readFileSync(path.join(__dirname, 'IMAGE-PROMPTS.md'), 'utf8').replace(/\r\n/g, '\n');
  const style = md.match(/## Style[^\n]*\n+> ([^\n]+)/)[1].trim();
  const pages = [];
  const re = /### (\d+)\. ([^\n]+)\n`(guide\/images\/([a-z0-9-]+)\.png)`\n+([^\n]+)/g;
  let m;
  while ((m = re.exec(md))) pages.push({ n: +m[1], title: m[2], file: m[3], slug: m[4], prompt: m[5].trim() });
  return { style, pages };
}

// Appended after each page prompt: image models love to paint the style line's
// hex codes and gauge digits as fake text.
const NO_TEXT = 'Absolutely no writing anywhere: every gauge face is plain white with only short tick marks and a needle and no digits, signs, labels, screens and plates are blank, and there are no colour swatches or legend boxes.';
const NEGATIVE = 'text, letters, numbers, digits, words, writing, hex codes, colour codes, colour swatches, palette swatches, legend boxes, labels, captions, gauge numbers, numbered dial, signage text, watermark, signature, logo, typography, infographic panels, garbled text';
// Full sampling (no Lightning LoRA) so the negative prompt actually applies.
let STEPS = 24, CFG = 4;

function workflow(text, seed, prefix) {
  return {
    1: { class_type: 'UnetLoaderGGUF', inputs: { unet_name: 'qwen-image-edit-2511-Q8_0.gguf' } },
    2: { class_type: 'CLIPLoader', inputs: { clip_name: 'qwen_2.5_vl_7b_fp8_scaled.safetensors', type: 'qwen_image', device: 'default' } },
    3: { class_type: 'VAELoader', inputs: { vae_name: 'qwen_image_vae.safetensors' } },
    4: { class_type: 'TextEncodeQwenImageEditPlus', inputs: { clip: ['2', 0], vae: ['3', 0], prompt: text } },
    5: { class_type: 'TextEncodeQwenImageEditPlus', inputs: { clip: ['2', 0], vae: ['3', 0], prompt: CFG > 1 ? NEGATIVE : '' } },
    6: { class_type: 'ModelSamplingAuraFlow', inputs: { model: ['1', 0], shift: 3.1 } },
    7: { class_type: 'CFGNorm', inputs: { model: ['6', 0], strength: 1 } },
    8: { class_type: 'LoraLoaderModelOnly', inputs: { model: ['7', 0], lora_name: 'Qwen-Image-Edit-2511-Lightning-8steps-V1.0-bf16.safetensors', strength_model: CFG > 1 ? 0 : 1 } },
    9: { class_type: 'EmptySD3LatentImage', inputs: { width: W, height: H, batch_size: 1 } },
    10: { class_type: 'KSampler', inputs: { model: ['8', 0], positive: ['4', 0], negative: ['5', 0], latent_image: ['9', 0], seed, steps: STEPS, cfg: CFG, sampler_name: 'euler', scheduler: 'simple', denoise: 1 } },
    11: { class_type: 'VAEDecode', inputs: { samples: ['10', 0], vae: ['3', 0] } },
    12: { class_type: 'SaveImage', inputs: { images: ['11', 0], filename_prefix: prefix } },
  };
}

async function run(wf) {
  const r = await (await fetch(COMFY + '/prompt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: wf }) })).json();
  if (r.error || (r.node_errors && Object.keys(r.node_errors).length)) throw new Error(JSON.stringify(r).slice(0, 1500));
  const id = r.prompt_id;
  for (;;) {
    await new Promise(res => setTimeout(res, 2000));
    const h = (await (await fetch(`${COMFY}/history/${id}`)).json())[id];
    if (!h) continue;
    if (h.status && h.status.status_str === 'error') throw new Error(JSON.stringify(h.status).slice(0, 1500));
    if (h.status && h.status.completed) {
      const img = Object.values(h.outputs).flatMap(o => o.images || [])[0];
      const q = new URLSearchParams({ filename: img.filename, subfolder: img.subfolder, type: img.type });
      return Buffer.from(await (await fetch(`${COMFY}/view?${q}`)).arrayBuffer());
    }
  }
}

(async () => {
  const args = process.argv.slice(2);
  let seed = null, extra = '', verbatimStyle = false;
  const slugs = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--seed') seed = +args[++i];
    else if (args[i] === '--extra') extra = ' ' + args[++i];
    else if (args[i] === '--fast') { STEPS = 8; CFG = 1; } // Lightning: ~4x quicker, ignores the negative prompt
    else if (args[i] === '--verbatim-style') verbatimStyle = true; // style line exactly as in IMAGE-PROMPTS.md
    else slugs.push(args[i]);
  }
  let { style, pages } = parsePrompts();
  // Reworded for generation (agreed with Luke, 2026-11-09). With the line as
  // written, the hex codes and "for cold and low pressure" get painted as fake
  // signs, "palette" gives colour-swatch blocks and "infographic" gives empty
  // callout boxes. Same colours, as plain words. Blue = cold / orange = hot is
  // carried by each page's own prompt.
  if (!verbatimStyle) {
    style = style
      .replace(/soft pastel palette \(light blue[^)]*\)/, 'coloured in soft pastel light blue, light orange, pale yellow and mint green')
      .replace('educational infographic illustration', 'educational illustration');
  }
  if (pages.length !== 38) console.warn(`warning: parsed ${pages.length} prompts, expected 38`);
  const todo = slugs.length ? pages.filter(p => slugs.includes(p.slug)) : pages;
  const missing = slugs.filter(s => !pages.some(p => p.slug === s));
  if (missing.length) throw new Error('unknown slug(s): ' + missing.join(', '));

  const seedsFile = path.join(ROOT, 'guide/images/seeds.json');
  const seeds = fs.existsSync(seedsFile) ? JSON.parse(fs.readFileSync(seedsFile, 'utf8')) : {};
  for (const p of todo) {
    const s = seed ?? Math.floor(Math.random() * 2 ** 31);
    const t0 = Date.now();
    const png = await run(workflow(`${style} ${p.prompt}${extra} ${NO_TEXT}`, s, `fgas-guide/${p.slug}`));
    fs.writeFileSync(path.join(ROOT, p.file), png);
    seeds[p.slug] = { seed: s, steps: STEPS, cfg: CFG, extra: extra.trim() || undefined };
    fs.writeFileSync(seedsFile, JSON.stringify(seeds, null, 2) + '\n');
    console.log(`${p.n}. ${p.slug}  seed ${s}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
})().catch(e => { console.error(e.message || e); process.exit(1); });
