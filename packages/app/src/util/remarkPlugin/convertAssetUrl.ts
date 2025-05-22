import type { Element, Node } from 'hast';
import path from 'path';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

export function isElement(node: Node | Element): node is Element {
  return 'tagName' in node;
}

export function convertAssetUrl(): Transformer {

  return (items) => {
    visit(items, (node) => {
      if (isElement(node) && (node.tagName === 'img' || node.tagName === 'video')) {
        node.properties.src = path.join('/assets/', node.properties.src as string)
      }
    });
  };
}
