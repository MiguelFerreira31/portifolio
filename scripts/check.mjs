// Checagens estáticas do portfólio: sintaxe JS, JSON-LD e arquivos referenciados no HTML.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const errors = [];

function walk(dir) {
    return readdirSync(dir).flatMap(f => {
        const p = join(dir, f);
        return statSync(p).isDirectory() ? walk(p) : [p];
    });
}

for (const f of walk('assets').filter(f => f.endsWith('.js'))) {
    try {
        execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' });
    } catch (e) {
        errors.push(`JS inválido: ${f}\n${e.stderr}`);
    }
}

const html = readFileSync('index.html', 'utf8');

for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
        JSON.parse(m[1]);
    } catch (e) {
        errors.push(`JSON-LD inválido: ${e.message}`);
    }
}

for (const m of html.matchAll(/(?:src|href)="(?!https?:|#|mailto:|tel:|data:)([^"?#]+)/g)) {
    if (!existsSync(m[1])) errors.push(`Arquivo referenciado não existe: ${m[1]}`);
}

for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt']) {
    if (!existsSync(f)) errors.push(`Faltando: ${f}`);
}

if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
}
console.log('ok');
