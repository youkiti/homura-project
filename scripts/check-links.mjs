import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const site = new URL('https://youkiti.github.io/homura-project/');
const files = [];
const errors = [];

async function walk(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) await walk(path.join(directory, entry.name), `${name}/`);
    else files.push(name);
  }
}

function decodeEntities(value) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (match, entity) => {
    if (entity[0] !== '#') return named[entity.toLowerCase()];
    const hex = entity[1].toLowerCase() === 'x';
    const code = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
    return code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

try {
  await walk(dist);
  const existing = new Set(files);
  const required = [
    'index.html', 'sr-data/index.html', 'sr-data/faq/index.html',
    'sr-data/contract/2026-11-10/index.html', 'en/index.html', 'en/sr-data/index.html',
  ];
  for (const name of required) {
    if (!existing.has(name)) errors.push(`Missing page: ${name}`);
  }

  let references = 0;
  let pages = 0;
  for (const name of files) {
    const bytes = await readFile(path.join(dist, name));
    if (bytes.includes(Buffer.from('{{'))) errors.push(`${name}: unresolved placeholder`);
    if (!name.endsWith('.html')) continue;
    pages++;
    const pagePath = name.replace(/index\.html$/, '');
    const pageUrl = new URL(pagePath, site);
    const html = bytes.toString('utf8').replace(/<!--[\s\S]*?-->/g, '');
    for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
      for (const attribute of tag[0].matchAll(/\s(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
        const reference = decodeEntities(attribute[1] ?? attribute[2] ?? attribute[3]);
        try {
          const target = new URL(reference, pageUrl);
          if (target.origin !== site.origin) continue;
          references++;
          const pathname = decodeURIComponent(target.pathname);
          if (!pathname.startsWith(site.pathname)) {
            // 完全な URL で書いた同じドメインの別サイト（例: 他のリポジトリの GitHub Pages）は外部リンクとして扱う。
            // base を付け忘れた相対・ルート相対のリンクだけを誤りとして拾う。
            if (/^[a-z][a-z0-9+.-]*:/i.test(reference)) {
              references--;
              continue;
            }
            errors.push(`${name}: outside base path: ${reference}`);
            continue;
          }
          const relative = pathname.slice(site.pathname.length);
          const candidates = relative.endsWith('/') || relative === ''
            ? [`${relative}index.html`]
            : [relative, `${relative}/index.html`];
          if (!candidates.some((candidate) => existing.has(candidate))) {
            errors.push(`${name}: missing target: ${reference}`);
          }
        } catch (error) {
          errors.push(`${name}: invalid URL ${reference}: ${error.message}`);
        }
      }
    }
  }

  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Checked ${pages} HTML pages and ${references} internal href/src references. No missing targets or unresolved placeholders.`);
  }
} catch (error) {
  console.error(`Link check failed: ${error.message}`);
  process.exitCode = 1;
}
