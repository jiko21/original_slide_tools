import { exec, spawn } from 'node:child_process';

const abortController = new AbortController();
const bat = spawn("make serve", { shell: true });
setTimeout(async () => {
  let printProcess;
  try {
    printProcess = await exec('pnpm run pdf');
  } catch (e) {
    console.error(e);
  } finally {
  }
  printProcess.on('exit', async () => {
    const stopJob = await exec("pnpm kill");
    stopJob.on('exit', () => {
      process.exit(0);
    })
  });
}, 4000);