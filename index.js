import { exec, spawn } from 'node:child_process';

const abortController = new AbortController();
const bat = spawn("pnpm start", { shell: true });
setTimeout(async () => {
  let printProcess;
  try {
    printProcess = await exec('pnpm run pdf');
  } catch (e) {
    console.error(e);
  } finally {
  }
  printProcess.on('exit', async () => {
    await exec("pnpm stop");
    process.exit(0);
  });
}, 4000);