const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle0' });
  
  await page.type('input[placeholder="John Doe"]', 'Test User');
  await page.type('input[placeholder="john@example.com"]', `test${Date.now()}@example.com`);
  
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('input[type="password"]');
    if (inputs.length >= 2) {
      inputs[0].value = 'Test1234!';
      inputs[1].value = 'Test1234!';
      inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  await page.click('button[type="submit"]');
  // Wait up to 5s for navigation
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => console.log('No navigation'));
  
  await page.screenshot({ path: 'after_register_screenshot.png' });
  
  // Also check dashboard
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'dashboard_screenshot.png' });

  console.log('Done.');
  await browser.close();
})();
