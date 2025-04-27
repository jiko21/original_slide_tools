import type { Element, ElementContent, Root, RootContent } from 'hast';
import type { Raw } from 'mdast-util-to-hast';
import path from 'path';
import { type Transformer } from 'unified';

export function convertAssetUrl(): Transformer {
  function addClass (items: Root | RootContent | Element | ElementContent | Raw) {
    if (items.type === 'root') {
      (items as Root).children.forEach(element => {
        addClass(element);
      });
    } else if ((items as Element).tagName === 'img' || (items as Element).tagName === 'video') {
      (items as Element).properties.src = path.join('/assets/', (items as Element).properties.src as string)
    } else if (items.type === 'element') {
      (items as unknown as Root).children.forEach((element) => {
        addClass(element);
      });
    }
  };
  return (items) => addClass(items as Root);
}