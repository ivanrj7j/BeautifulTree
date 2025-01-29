const WIDTH = window.innerHeight;
const HEIGHT = window.innerHeight;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);

  b = new Branch(WIDTH/2, HEIGHT, HEIGHT/2.3, -Math.PI/2, 0, 10, 0.5, 0.9, 4, [252, 238, 12], [3, 216, 243]);
  b.draw();
  saveCanvas("infiniteTree", "png");
}