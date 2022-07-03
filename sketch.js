const MAX_X = 400;
const MAX_Y = 400;
const WIDTH = 5;
const DEFAULT_TOTAL_POINTS = 30;
const DEFAULT_POPULATION_SIZE = 1000;
const DEFAULT_MUTATION_RATE = 0.02;
const GENERATIONS_PER_FRAME = 1;

let sliderTotalPoints;
let sliderPopulationSize;
let sliderMutationRate;
let labelGeneration;

function buildSlider(caption, min, max, step, initialValue) {
   let format = (number) => {
      let isFloat = min <= 1;
      return number.toLocaleString("en-US", {
         minimumIntegerDigits: isFloat ? 1 : 2,
         minimumFractionDigits: isFloat ? 2 : 0,
         useGrouping: false,
      });
   };
   createSpan(caption + ": ");
   let label = createSpan(format(initialValue));
   let p5Elem = createSlider(min, max, initialValue, step);
   p5Elem.mouseMoved(() => {
      label.html(format(p5Elem.value()));
   });
   p5Elem.mouseClicked(() => {
      label.html(format(p5Elem.value()));
   });
   createP();

   return p5Elem;
}
function buildUI() {
   labelGeneration = createDiv("Generation: {}");
   sliderTotalPoints = buildSlider(
      "Total Cities",
      2,
      100,
      1,
      DEFAULT_TOTAL_POINTS
   );
   sliderPopulationSize = buildSlider(
      "Population Size",
      50,
      2000,
      50,
      DEFAULT_POPULATION_SIZE
   );
   sliderMutationRate = buildSlider(
      "Mutation Rate",
      0.0,
      1.0,
      0.01,
      DEFAULT_MUTATION_RATE
   );
   // sliderTotalPoints.value(DEFAULT_TOTAL_POINTS);
   let buttonRun = createButton("Run");
   buttonRun.mousePressed(restart);
}

function setup() {
   createCanvas(400, 400);
   // user
   buildUI();
   restart();
}

async function foo() {
   while (true) {
      generation++;
   }
}

function geneticAlgorithm() {
   let nextPopulation = [];

   for (let i = 0; i < population.length; i++) {
      const [parentA, parentB] = weightedRandomChoices(2);
      let child = reproduce(parentA, parentB);

      if (random() < sliderMutationRate.value()) {
         mutate(child);
      }

      nextPopulation.push(child);
   }

   const candidateBest = bestIndividual();
   if (candidateBest.fitness < bestFitness) {
      bestIndiv = candidateBest;
      bestFitness = bestIndiv.fitness;
   }
   population = nextPopulation;
   generation += 1;
}
function draw() {
   for (i = 0; i < GENERATIONS_PER_FRAME; i++) {
      geneticAlgorithm();
   }

   // draw
   background(0);
   fill(255);
   if (bestIndiv.cities.length != cities.length) {
      // this should never be called
      return;
   }
   for (let i = 0; i < cities.length; i++) {
      ellipse(cities[i].x, cities[i].y, WIDTH);

      // connection
      const indexOne = bestIndiv.cities[i];
      const indexTwo = bestIndiv.cities[(i + 1) % cities.length];
      const cityOne = cities[indexOne];
      const cityTwo = cities[indexTwo];

      stroke(255);
      line(cityOne.x, cityOne.y, cityTwo.x, cityTwo.y);
   }

   // UI update
   const generationDisplayText = "Generation: " + generation;
   labelGeneration.html(generationDisplayText);
}
