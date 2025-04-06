import { readFile } from 'fs/promises';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const load: PageServerLoad = async () => {
  const baseFile = await readFile('../../slides/index.md');
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(baseFile)
  const splitFiles = String(file).split('<hr>');
  return {splitFiles};
}