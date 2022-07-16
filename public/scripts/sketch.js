"use strict";

const MAX_X = 700;
const MAX_Y = 500;
const WIDTH = 5;
const CANVAS_MARGIN = WIDTH + 2;
// --
const PARAMS_DIV_ID = "params";
const CANVAS_PARENT_DIV = "canvas";
const BACKGROUND_COLOR = "#212121";

function setup() {
   const canvas = createCanvas(MAX_X, MAX_Y);
   canvas.parent(CANVAS_PARENT_DIV);

   restart();
}

function draw() {
   for (let i = 0; i < params["cicles-per-frame"]; i++) {
      nextGeneration();
   }

   // draw
   background(BACKGROUND_COLOR);
   drawPoints();
   drawBestIndividual();

   // UI update
   const generationDisplayText = "Generation: " + generation;
}

function drawBestIndividual() {
   for (let i = 0; i < cities.length; i++) {
      // connection
      const indexOne = globalBest.cities[i];
      const indexTwo = globalBest.cities[(i + 1) % cities.length];
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
