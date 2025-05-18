import type { Element, Node } from 'hast';
import type { Raw } from 'mdast-util-to-hast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

const HTMLOptionRegex =  /\s+(?:(?:(\w+?)=["'](.+?)["'])|(\w+))/gm;
const ImageOrVideoRegex = /^\s*<(img|video)/;

function isTypeRaw(node: Node | Raw): node is Raw {
  return node.type === 'raw';
}

export function htmlToMd(): Transformer {
  return (items) => {
    visit(items, (node) => {
      if (isTypeRaw(node)) {
        const tagResult = node.value.match(ImageOrVideoRegex);
        if (tagResult) {
          const tagName = tagResult[1];
          const properties = getAttr(node.value);

          const child = {
            type: "element",
            tagName: tagName,
            properties,
            children: [],
            position: node.position,
          } satisfies Element;

          node.value = '';
          (node as unknown as Element).tagName = "p";
          (node as unknown as Element).children = [child];
          (node as unknown as Element).type = "element";
        }
      }
    });
  };
}

function getAttr(value: string) {
  return Array.from(value.matchAll(HTMLOptionRegex)).reduce<{[key:string]: string}>((rslt, item) => {
          if (item[1]) {
            rslt[item[1]] = item[2];
          } else {
            rslt[item[3]]= "true"
          }
          return rslt;
        }, {});
}
