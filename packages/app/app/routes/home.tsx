import { readFileSync } from 'fs';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const baseFile = readFileSync('../../slides/index.md').toString();
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(baseFile)
  const splitFiles = String(file).split('<hr>');
  return {
    splitFiles,
  };
}

export default function Home({
  loaderData
}: Route.ComponentProps) {
  return <div className="text-amber-300" dangerouslySetInnerHTML={{ __html: loaderData.splitFiles }} />;
}
