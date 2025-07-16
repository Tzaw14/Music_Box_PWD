let song;
let fft;
let playButton;
let playing = false;
let bgColor;

function preload() {
  song = loadSound('assets/IOTVO 1.mp3');
}

function setup() {
  let canvas = createCanvas(400, 200);
  canvas.parent('musicBox');
  playButton = select('#playButton');
  playButton.mousePressed(togglePlay);
  fft = new p5.FFT();
  fft.setInput(song);
  bgColor = color(33, 30, 52);
}

function draw() {
  let spectrum = fft.analyze();
  let vol = fft.getEnergy("bass");

  // Cambia el fondo según el volumen
  let pulse = map(vol, 0, 255, 0, 50);
  background(red(bgColor) + pulse, green(bgColor), blue(bgColor) + pulse);

  noStroke();
  for (let i = 0; i < spectrum.length; i += 20) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    fill(random(0, 255), 255 - spectrum[i], spectrum[i]);
    rect(x, height - h, width / 32, h);
  }
}

function togglePlay() {
  if (playing) {
    song.pause();
    playButton.html('▶ Reproducir');
  } else {
    song.loop();
    playButton.html('⏸ Pausar');
  }
  playing = !playing;
}