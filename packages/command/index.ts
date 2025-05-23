import { exec, execSync } from "child_process";
import { readFileSync, watchFile, writeFileSync } from "fs";
import path from "path";
import { chromium } from "playwright";
import { exit } from "process";
import { parseArgs } from "util";
import { setTimeout } from 'timers/promises';

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

if (!values.src) {
  console.error("target file is not found");
  exit(1);
}

const src = path.resolve(values.src);
const writeCss = () => {
  const targetStyle = values.style ? readFileSync(values.style).toString() : "";
  const baseCss = `
@import 'tailwindcss';

@page {
  size: 16in 9in;
  margin: auto;
}

@source "${src}";


${targetStyle}
  `
  writeFileSync("./packages/app/src/app.css", baseCss)
};

writeCss();

if (values.style) {
  watchFile(values.style, () => {
    writeCss();
  });
}

if (positionals.length < 3) {
  console.error("length of args should be 3");
  exit(1);
}
async function execBuild() {
  execSync(`bun --filter "app" build`, { env: {TARGET_DIR: src } });
  const proc = Bun.spawn(["bun", `--filter`, `app`, "preview"], {
    stdout: 'ignore',
    stderr: 'ignore',
    env: {
      ...process.env,
      TARGET_DIR: src,
    },
  });
  await setTimeout(6000);
  await print();
  process.kill(proc.pid,'SIGINT');
}

async function print() {
    const browser = await chromium.launch({
      headless: true,
    })
    const page = await browser.newPage();
    await page.goto("http://localhost:4173/");

    await page.emulateMedia({ media: 'print' });
    await page.pdf({ path: values.out, width: '16in', height: '9in', printBackground: true });

    await page.close();
    await browser.close();
}

switch(positionals[2]) {
  case "dev": {
    if (!values.src) {
      console.error("target file is not found");
      exit(1);
    }
    exec(`bun --filter "app" dev`, { env: { TARGET_DIR: src  } })
    break;
  }
  case "pdf": {
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
}
