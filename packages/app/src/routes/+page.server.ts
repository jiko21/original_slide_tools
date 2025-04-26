import type { ExternalCss } from '$lib';
import destr from 'destr';
import { readFile } from 'fs/promises';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { appendStyle } from '../util';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const load: PageServerLoad = async () => {
  const baseFile = await readFile('../../slides/index.md');
  const styleJson =destr<ExternalCss>((await readFile('../../slides/style.json')).toString());
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(appendStyle, { style: styleJson })
    .process(baseFile)
  const splitFiles = String(file).split('<hr>');
  return {splitFiles, globalStyle: styleJson.global};
}