const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const pages = [
  { url: 'http://localhost:3001', name: 'home' },
  { url: 'http://localhost:3001/visuals', name: 'visuals' },
  { url: 'http://localhost:3001/about', name: 'about' },
  { url: 'http://localhost:3001/projects/studio-nord', name: 'project-detail' }
];

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  for (const page of pages) {
    console.log(`\nVisiting ${page.url}...`);
    const browserPage = await browser.newPage();
    
    // Set viewport to a reasonable desktop size
    await browserPage.setViewport({ width: 1920, height: 1080 });
    
    try {
      await browserPage.goto(page.url, { 
        waitUntil: 'networkidle2',
        timeout: 10000 
      });
      
      // Wait a bit for any animations or dynamic content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Take full page screenshot
      const screenshotPath = path.join(screenshotsDir, `${page.name}.png`);
      await browserPage.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      
      console.log(`✓ Screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`✗ Error capturing ${page.url}:`, error.message);
    }
    
    await browserPage.close();
  }

  await browser.close();
  console.log('\n✓ All screenshots captured!');
})();
