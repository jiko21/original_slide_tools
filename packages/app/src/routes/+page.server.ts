import destr from 'destr';
import { readFile } from 'fs/promises';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { appendStyle, convertAssetUrl, htmlToMd, type ExternalCss } from '../util';
import type { PageServerLoad } from './$types';

export const prerender = true;
export const load: PageServerLoad = async () => {
  const targetDir = process.env["TARGET_DIR"] ?? "";
  const baseFile = await readFile(`${targetDir}/index.md`);
  const styleJson =destr<ExternalCss>((await readFile(`${targetDir}/style.json`)).toString());
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(htmlToMd)
    .use(appendStyle, { style: styleJson })
    .use(convertAssetUrl)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(baseFile)
  const splitFiles = String(file).split('<hr>');
  return {splitFiles, globalStyle: styleJson.global };
}
