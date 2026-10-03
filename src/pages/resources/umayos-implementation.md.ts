import type { APIRoute } from 'astro';
import readme from '../../../docs/implementation/README.md?raw';
import architecture from '../../../docs/implementation/ARCHITECTURE.md?raw';
import contracts from '../../../docs/implementation/CONTRACTS.md?raw';
import learning from '../../../docs/implementation/LEARNING.md?raw';
import scientist from '../../../docs/implementation/SCIENTIST.md?raw';
import plan from '../../../docs/implementation/PLAN.md?raw';
import startHere from '../../../docs/implementation/START_HERE.md?raw';

// A fixed public allowlist keeps future private notes out of the download.
const documents: Record<string, string> = {
  'README.md': readme, 'ARCHITECTURE.md': architecture, 'CONTRACTS.md': contracts,
  'LEARNING.md': learning, 'SCIENTIST.md': scientist, 'PLAN.md': plan, 'START_HERE.md': startHere,
};
const anchor = (name: string) => `resource-${name.replace('.md', '').toLowerCase()}`;

export const GET: APIRoute = () => {
  const body = Object.entries(documents).map(([name, document]) => {
    // Preserve usable links when the pack is downloaded as one portable file.
    const linked = document.replace(/\]\(([^)]+\.md(?:#[^)]*)?)\)/g, (match, target: string) => {
      if (/^(https?:|#|\/)/.test(target)) return match;
      const filename = target.split('#')[0] ?? target;
      if (filename in documents) return `](#${anchor(filename)})`;
      return `](${new URL(target, 'https://github.com/aserdargun/umayos/blob/main/docs/implementation/').href})`;
    });
    return `<!-- Source: docs/implementation/${name} -->\n\n<a id="${anchor(name)}"></a>\n\n${linked.trim()}`;
  }).join('\n\n---\n\n');
  return new Response(`# UMAY OS · İnşa kaynak paketi\n\nKamuya uygun tasarım ve geliştirme kaynakları · 3 Ekim 2026\n\nBu dosya çalışan runtime veya şirket verisi içermez.\n\n${body}\n`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
