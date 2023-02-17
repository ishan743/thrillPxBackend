const puppeteer = require("puppeteer");

(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 });

  const website_url =
    "https://www.thrillophilia.com/tours/tour-to-mini-switzerland-of-india-with-dharamshala";

  // Open URL in current page
  await page.goto(website_url, { waitUntil: "networkidle0" });

  // Capture screenshot
  await page.screenshot({
    path: "screenshot_dharamshala.jpg",
    fullPage: true,
  });

  // Close the browser instance
  await browser.close();
})();
