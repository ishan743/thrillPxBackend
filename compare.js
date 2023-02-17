const { createCanvas, loadImage } = require("canvas");

(async () => {
  const image1 = await loadImage("./screenshot_dharamshala.jpg");
  const image2 = await loadImage("./screenshot_dharamshala.jpg");

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
})();
