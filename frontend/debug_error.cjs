const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle0' });
    
    const email = `test${Date.now()}@example.com`;
    
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
      if (checkbox) checkbox.click();
    });

    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 2000));
    
    const errorMsg = await page.evaluate(() => {
      const el = document.querySelector('.bg-red-500\\/10');
      return el ? el.innerText : 'No error message';
    });
    console.log('Error displayed on screen:', errorMsg);
    
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
