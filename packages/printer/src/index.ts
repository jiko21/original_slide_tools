import { chromium } from 'playwright';

(async() => {
  const browser = await chromium.launch({
    headless: true,
  })
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: '../../page.pdf', format: 'A4' });

  await page.close();
  await browser.close();
})();
