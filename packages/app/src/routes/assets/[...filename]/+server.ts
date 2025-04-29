import type { RequestHandler } from '@sveltejs/kit';
import { readFile } from 'fs/promises';

export const GET: RequestHandler = async (ctx) => {
  const targetDir = process.env["TARGET_DIR"] ?? "";

  const targetFile = await readFile(`${targetDir}/${ctx.params.filename}`);
  return new Response(targetFile)
}