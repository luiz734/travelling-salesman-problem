const MAX_X = 700;
const MAX_Y = 500;
const WIDTH = 5;
// --
const DEFAULT_TOTAL_POINTS = 30;
const DEFAULT_POPULATION_SIZE = 1000;
const DEFAULT_MUTATION_RATE = 0.02;
// --
const PARAMS_DIV_ID = "params";
const CANVAS_PARENT_DIV = "canvas";

function setup() {
   const canvas = createCanvas(MAX_X, MAX_Y);
   canvas.parent(CANVAS_PARENT_DIV);

   // user
   restart();
}

function draw() {
   background("#212121");
   drawPoints();

   for (i = 0; i < params["cicles-per-frame"]; i++) {
      nextGeneration();
   }
   // draw
   drawBestIndividual();

   // UI update
   const generationDisplayText = "Generation: " + generation;
   // labelGeneration.html(generationDisplayText);
}
function drawBestIndividual() {
   for (let i = 0; i < cities.length; i++) {
      // connection
      const indexOne = bestIndiv.cities[i];
      const indexTwo = bestIndiv.cities[(i + 1) % cities.length];
      const cityOne = cities[indexOne];
      const cityTwo = cities[indexTwo];
      stroke(230);
      line(cityOne.x, cityOne.y, cityTwo.x, cityTwo.y);
   }
}
function drawPoints(i) {
   for (let i = 0; i < cities.length; i++) {
      fill(255);
      ellipse(cities[i].x, cities[i].y, WIDTH);
   }
}
