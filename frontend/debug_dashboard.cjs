const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

    console.log('Navigating to register...');
    await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle0' });
    
    const email = `test${Date.now()}@example.com`;
    console.log(`Registering with ${email}...`);
    
    await page.type('input[placeholder="John Doe"]', 'Test User');
    await page.type('input[placeholder="john@example.com"]', email);
    
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input[type="password"]');
      if (inputs.length >= 2) {
        inputs[0].value = 'Test1234!';
        inputs[1].value = 'Test1234!';
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
        inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      const checkbox = document.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.click();
      }
    });

    console.log('Submitting register form...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(e => console.log('Navigation timeout')),
      page.click('button[type="submit"]')
    ]);
    
    const url = page.url();
    console.log('Current URL:', url);
    
    const html = await page.content();
    if (html.includes('<div id="root"></div>') && html.length < 500) {
      console.log('Page is totally blank (only root div)!');
    } else {
      console.log('HTML rendered ok, size:', html.length);
    }
    
    await page.screenshot({ path: 'dashboard_debug.png' });
    
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
