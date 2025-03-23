import { readFile } from 'fs/promises';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { Slide } from '~/components/Slide';
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const baseFile = await readFile('../../slides/index.md');
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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeIndex = Number(searchParams.get('p') ?? '1') - 1;
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const pages = Number(searchParams.get('p') ?? '1');
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (pages === 1) {
          break;
        }

        setSearchParams((prev) => {
          prev.set('p', String(pages - 1));
          return prev;
        });
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if (pages === loaderData.splitFiles.length) {
          break;
        }
        setSearchParams((prev) => {
          prev.set('p', String(pages + 1));
          return prev;
        });
        break;
      default:
        break;
    }
  }, [searchParams, setSearchParams, loaderData.splitFiles]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
  return <div className="relative">
    {loaderData.splitFiles.map((item, index) => (
      <Slide isActive={index === activeIndex} item={item} key={`${item}-${index}`} />
    ))}
  </div>;
}
