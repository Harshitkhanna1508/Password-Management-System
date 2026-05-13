const puppeteer = require('puppeteer');
const axios = require('axios');

(async () => {
  try {
    const email = `test${Date.now()}@example.com`;
    const password = 'TestPassword123!';
    
    // Register user via API directly
    const res = await axios.post('http://localhost:5001/api/auth/register', { email, password });
    const { token, user } = res.data;
    console.log('Registered user. Token:', token.substring(0, 10) + '...');

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

    // Go to the app to set localStorage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    await page.evaluate((t) => {
      localStorage.setItem('token', t);
    }, token);

    // Now go to the dashboard!
    console.log('Navigating to dashboard...');
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
    
    const html = await page.content();
    console.log('Dashboard HTML length:', html.length);
    if (html.length < 1000) {
      console.log('PAGE SEEMS BLANK!');
      console.log(html);
    }
    
    await page.screenshot({ path: 'dashboard_debug_direct.png' });
    
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err.message);
  }
})();
