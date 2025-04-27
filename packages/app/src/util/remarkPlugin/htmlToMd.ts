import type { Element, ElementContent, Root, RootContent } from 'hast';
import type { Raw } from 'mdast-util-to-hast';
import { type Transformer } from 'unified';

const HTMLOptionRegex =  /\s+(?:(?:(\w+?)=["|'](.+?)["|'])|(\w+))/gm;
const ImageOrVideoRegex = /^\s*<(img|video)/;

export function htmlToMd(): Transformer {
  function addClass (items:  Root |RootContent | Element | ElementContent | Raw) {
    if (items.type === 'root') {
      (items as Root).children.forEach(element => {
        addClass(element);
      });
    } else if (items.type === 'element') {
      (items satisfies ElementContent).children.forEach((element) => {
        addClass(element);
      });
    } else if (items.type === 'raw') {
      const tagResult = items.value.match(ImageOrVideoRegex);
      if (tagResult) {
        const tagName = tagResult[1];

        const properties = getAttr(items.value);

        const child = {
          type: "element",
          tagName: tagName,
          properties,
          children: [],
          position: items.position,
        } satisfies Element;

        items.value = '';
        (items as unknown as Element).tagName = "p";
        (items as unknown as Element).children = [child];
        (items as unknown as Element).type = "element";
      }
    }
  };
  return (items) => {
    addClass(items as Root);
  };
}

function getAttr(value: string) {
  return value.matchAll(HTMLOptionRegex).reduce<{[key:string]: string}>((rslt, item) => {
          if (item[1]) {
            rslt[item[1]] = item[2];
          } else {
            rslt[item[3]]= "true"
          }
          return rslt;
        }, {});
}