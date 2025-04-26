import type { RequestHandler } from '@sveltejs/kit';
import { readFile } from 'fs/promises';

export const GET: RequestHandler = async (ctx) => {
  const targetFile = await readFile(`../../slides/${ctx.params.filename}`);
  return new Response(targetFile)
}