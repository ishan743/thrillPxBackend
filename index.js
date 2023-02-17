const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const puppeteer = require("puppeteer");
const { createCanvas, loadImage } = require("canvas");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/api/uploadImage", upload.single("file"), (req, res) => {
  console.log(req);
  const file = req.file;
  console.log("Image uploaded successfully:", file.filename);
  res.send("Image uploaded successfully");

  const domain = new URL(req.query.link).hostname;
  console.log(domain);

  create_image_from_link(req.query.link);
  compare_results(`./uploads/${file.filename}`, `./screenshots/${domain}.png`);
});

app.post("/api/uploadLink", (req, res) => {
  console.log(req);
  // res.json({ message: "link received" + req.body.link });
  create_image_from_link(req.body.link);
});

app.get;

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

async function create_image_from_link(url) {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 });

  const website_url = url;

  // Open URL in current page
  await page.goto(website_url, { waitUntil: "networkidle0" });

  const domain = new URL(url).hostname;
  // Capture screenshot
  await page.screenshot({
    path: `./screenshots/${domain}.png`,
    fullPage: true,
  });

  // Close the browser instance
  await browser.close();
}

async function compare_results(referenceImage, testImage) {
  const image1 = await loadImage(referenceImage);
  const image2 = await loadImage(testImage);

  const canvas1 = createCanvas(image1.width, image1.height);
  const context1 = canvas1.getContext("2d");
  context1.drawImage(image1, 0, 0);

  const canvas2 = createCanvas(image2.width, image2.height);
  const context2 = canvas2.getContext("2d");
  context2.drawImage(image2, 0, 0);

  const imageData1 = context1.getImageData(0, 0, canvas1.width, canvas1.height);
  const imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);

  let numPixelsSame = 0;
  for (let i = 0; i < imageData1.data.length; i += 4) {
    const r1 = imageData1.data[i];
    const g1 = imageData1.data[i + 1];
    const b1 = imageData1.data[i + 2];

    const r2 = imageData2.data[i];
    const g2 = imageData2.data[i + 1];
    const b2 = imageData2.data[i + 2];

    // Compare the RGB values
    if (r1 === r2 && g1 === g2 && b1 === b2) {
      numPixelsSame++;
    }
  }

  const totalPixels = imageData1.data.length / 4;
  const percentMatch = (numPixelsSame / totalPixels) * 100;

  console.log(`The two images are ${percentMatch}% the same`);
}
