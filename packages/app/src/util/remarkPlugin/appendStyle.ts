import type { ExternalCss } from "$lib";
import type { Node, Root } from 'mdast';
import { type Transformer } from 'unified';

interface Option {
  style: ExternalCss
}
export function appendStyle({ style }: Option): Transformer {
  function addClass (items: Node) {
    if (items.type === 'root') {
      (items as Root).children.forEach(element => {
        addClass(element);
      });
    } else if (items.type === 'element') {
      if ((items as any).tagName === 'hr') {
        return;
      }
      (items as any).properties = {
        ...(items as any).properties,
        class: style[(items as any).tagName],
      };
      (items as Root).children.forEach((element: Node) => {
        addClass(element);
      });
    }
  };
  return (items) => addClass(items);
}