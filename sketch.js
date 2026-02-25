const size = {w: 400 * 2, h: 400};
let video;
let vals = [];
let slider;

function setup() {

  createCanvas(size.w, size.h + 48);
  video = createCapture(VIDEO, {flipped:true});
  video.size(74, 50);
  video.hide();

  slider = createSlider(-2, 3, 0, 0);
  slider.position(10, 440);

  let fileInput = createFileInput(handleFile);
  fileInput.position(10, 410);
}



function draw() {

  background(255);
  let videoImg = image(video, 3, 3, size.w / 2, size.h);
  vals = biasedDivision(10, slider.value());

  let charArr = [];
  let x = 0;
  let y = 0;

  // transale each pixel - for every px
  for (let i = 0; i < (74 * 48); i++) {

    charArr.push(selCharFromPixelValue(x, y, vals));
    
    x++
    if (x > (74 - 1)) {
      x = 0;
      y++;
      charArr.push("\n"); // line break to match row column distribution
    }

  }

  charArr = charArr.join("");

  const fontSize = 8.6;
  textFont("monospace");
  textSize(fontSize);
  textLeading(fontSize * 0.95);
  charText = text(charArr, size.w / 2 + 5, 15);


}

function biasedDivision(parts = 10, power = 1) {
  // Step 1: compute weights
  const weights = [];
  for (let i = 0; i <= parts; i++) {
    weights.push(Math.pow(parts + 1 - i, power));
  }

  // Step 2: normalize so they sum to 1
  const sum = weights.reduce((a, b) => a + b, 0);

  let tempArr = weights.map(w => w / sum);
  let resultArr = [];

  console.log(tempArr);

  for (let i = 0; i < tempArr.length; i++) {

    resultArr.push(0);
    for (let j = 0; j <= i; j++) {


      resultArr[i] += tempArr[j];
    }
  }


  console.log(resultArr);



  return resultArr;
}


// loading a file
function handleFile(file) {

  if (file.type === 'video') {
    // Remove old video if any
    if (video) {
      video.stop?.();
      video.remove();
    }

    // Create video from uploaded file
    video = createVideo(file.data);

    // Disable controls explicitly

    // Wait for metadata
    video.elt.onloadedmetadata = () => {
      video.size(74, 48);
      video.hide();
      video.attribute('controls', false);
      video.loop();
      video.play();
      video.volume(0);
    };

  } else {
    console.log('Not a video file');
  }

}

// pixel -> symbol
function selCharFromPixelValue(x, y, vals) {

  let pixel = video.get(x, y);
  pixel.pop();

  let pixelVal = pixel.reduce((acc, elem) => acc + elem, 0) / 765;
  let pixelChar;


  if (pixelVal < vals[0]) {
    pixelChar = '0';
  } else if (pixelVal < vals[1]) {
    pixelChar = 'O';
  } else if (pixelVal < vals[2]) {
    pixelChar = 'U';
  } else if (pixelVal < vals[3]) {
    pixelChar = '7';
  } else if (pixelVal < vals[4]) {
    pixelChar = '/';
  } else if (pixelVal < vals[5]) {
    pixelChar = 'º';
  } else if (pixelVal < vals[6]) {
    pixelChar = '>';
  } else if (pixelVal < vals[7]) {
    pixelChar = '~';
  } else if (pixelVal < vals[8]) {
    pixelChar = '.';
  } else {
    pixelChar = ' ';
  }

  return pixelChar;
}

function selEmojiFromPixelValue(x, y) {

  let pixel = video.get(x, y);
  pixel.pop();

  let pixelVal = pixel.reduce((acc, elem) => acc + elem, 0) / 765;
  let pixelChar;

  if (pixelVal < 0.1) {
    pixelChar = '⬛️';
  } else if (pixelVal < 0.2) {
    pixelChar = '🖤';
  } else if (pixelVal < 0.3) {
    pixelChar = '🎱';
  } else if (pixelVal < 0.4) {
    pixelChar = '🐝';
  } else if (pixelVal < 0.5) {
    pixelChar = '🌍';
  } else if (pixelVal < 0.6) {
    pixelChar = '😈';
  } else if (pixelVal < 0.7) {
    pixelChar = '🍓';
  } else if (pixelVal < 0.8) {
    pixelChar = '👽';
  } else if (pixelVal < 0.9) {
    pixelChar = '👻';
  } else {
    pixelChar = ' ';
  }

  return pixelChar;
}

// 178810380