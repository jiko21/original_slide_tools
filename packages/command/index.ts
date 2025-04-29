import { exec } from "child_process";
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { exit } from "process";
import { parseArgs } from "util";

const {values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    src: {
      type: 'string',
    },
    out: {
      type: 'string',
    },
    style: {
      type: 'string',
    },
  },
  allowPositionals: true,
});

const targetStyle = values.style ? readFileSync(values.style).toString() : "";


const baseCss = `
@import 'tailwindcss';

@page {
  size: 16in 9in;
  margin: auto;
}

@source "${values.src}";


${targetStyle}
`

if (positionals.length < 3) {
  console.error("length of args should be 3");
  exit(1);
}

writeFileSync("./packages/app/src/app.css", baseCss)

async function execBuild() {
  execSync(`TARGET_DIR=${values.src} bun run build`);
  const proc = Bun.spawn(["bun", "run", "serve"], {
    stdout: 'ignore',
    stderr: 'ignore',
    env: {
      ...process.env,
      TARGET_DIR: values.src
    },
  })
  proc.unref();
  // spawn(`TARGET_DIR=${values.src} bun run start`, { shell: true });
  setTimeout(async () => {
    await print();
    process.kill(proc.pid,'SIGINT');
  }, 6000);
}

async function print() {
    const browser = await chromium.launch({
      headless: true,
    })
    // const context = await puppeteer.newContext();
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:4173/");
    await page.emulateMedia({ media: 'print' });
    await page.pdf({ path: './page.pdf', format: 'A4' });

    await page.close();
    await browser.close();
}

switch(positionals[2]) {
  case "dev": {
    if (!values.src) {
      console.error("target file is not found");
      exit(1);
    }
    exec(`TARGET_DIR=${values.src} bun run dev`)
    break;
  }
  case "build": {
    if (!values.src) {
      console.error("target file is not found");
      exit(1);
    }
    if (!values.out) {
      console.error("target file is not found");
      exit(1);
    }
    
    await execBuild();
    break;
  }
  // default:
  //   console.error(`${positionals[2]} is not registered. Use dev | build`);
  //   exit(1)
}