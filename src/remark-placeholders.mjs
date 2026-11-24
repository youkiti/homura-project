import { formUrl, date, status } from './site-config.mjs';

export default function placeholders() {
  return (tree, file) => {
    const lang = file.data.astro?.frontmatter?.lang ?? 'ja';
    const values = { FORM_URL: formUrl, DATE: date, STATUS: status[lang] };

    function visit(node) {
      if (node.type === 'paragraph' && node.children?.some(
        (child) => child.type === 'text' && child.value.includes('{{STATUS}}'),
      )) {
        node.data = { ...node.data, hProperties: { className: ['call-status'] } };
      }
      for (const field of ['value', 'url']) {
        if (typeof node[field] === 'string') {
          node[field] = node[field].replace(/\{\{(FORM_URL|DATE|STATUS)\}\}/g,
            (match, key) => values[key] ?? match);
        }
      }
      if (node.type === 'table') {
        node.data = { ...node.data, hProperties: { tabindex: 0 } };
      }
      node.children?.forEach(visit);
    }

    visit(tree);
  };
}
