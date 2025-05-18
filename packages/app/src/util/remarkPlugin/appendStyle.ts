import type { Element } from 'hast';
import type { Transformer } from 'unified';
import {visit} from 'unist-util-visit'

export type ExternalCss = Record<string, string>
interface Option {
  style: ExternalCss
}
export function appendStyle({ style }: Option): Transformer {
  return (items) => {
    visit(items, (node) => {
      if (node.type === 'element') {
        const appendClass = style[(node as Element).tagName];
        if (!appendClass) {
          return;
        }
        (node as Element).properties = {
          ...(node as Element).properties,
          className: `${appendClass} ${(node as Element)?.properties?.className || ''}`,
        };
      }
    })
  }
}
