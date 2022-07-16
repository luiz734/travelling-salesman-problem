"use strict";

let bestFitness = Infinity;
let globalBest = [];
let cities = [];
let distanceTable = [];
let generation = 0;
let population = [];

class Point {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
}

class Individual {
   constructor(values) {
      this.cities = values;
      if (!values) {
         this.cities = shuffle([...Array(cities.length).keys()]);
      }
      this.calcFitness();
   }
   calcFitness() {
      console.assert(distanceTable, "distance table not initialized");
      this.fitness = 0;
      for (let i = 0; i < cities.length; i++) {
         const cityIndexOne = this.cities[i % this.cities.length];
         const cityIndexTwo = this.cities[(i + 1) % this.cities.length];
         this.fitness += distanceTable[cityIndexOne][cityIndexTwo];
      }
   }
   swapCities(a, b) {
      console.assert(this.cities, "Cities not initialized");
      const tmp = this.cities[a];
      this.cities[a] = this.cities[b];
      this.cities[b] = tmp;
   }
}

function nextGeneration() {
   let nextPopulation = [];

   for (let i = 0; i < population.length; i++) {
      const [parentA, parentB] = weightedRandomChoices(2);
      let child = reproduce(parentA, parentB);

      if (random() < params["mutation-rate"]) {
         mutate(child);
      }

      nextPopulation.push(child);
   }

   const generationBest = bestIndividual();
   if (generationBest.fitness < bestFitness) {
      globalBest = generationBest;
      bestFitness = globalBest.fitness;
   }
   population = nextPopulation;
   generation += 1;
}
function tournamentSelection(k) {
   // https://en.wikipedia.org/wiki/Tournament_selection

   let bestIndex = null;
   for (let i = 0; i < k; i++) {
      const indexA = floor(random(0, population.length));
      const randIndividualA = population[indexA];
      const indexAIsBetter =
         bestIndex == null ||
         randIndividualA.fitness < population[bestIndex].fitness;

      if (indexAIsBetter) {
         bestIndex = indexA;
      }
   }
   return bestIndex;
}

function weightedRandomChoices(amount) {
   let parents = [];

   let i = 0;
   while (i < amount) {
      const tournamentWinner = tournamentSelection(
         floor(sqrt(population.length))
      );
      const parentCandidate = population[tournamentWinner];

      if (false === parents.includes(parentCandidate)) {
         parents.push(parentCandidate);
         i += 1;
      }
   }

   return [...parents];
}

function mutate(individual) {
   for (let i = 0; i < cities.length / 5; i++) {
      const randomIndexOne = floor(random(1, cities.length - 1));
      const randomIndexTwo = floor(random(1, cities.length - 1));
      individual.swapCities(randomIndexOne, randomIndexTwo);
      individual.calcFitness();
   }
}

function bestIndividual() {
   let best = population[0];
   for (let i = 1; i < population.length; i++) {
      const fitness = population[i].fitness;
      if (fitness < best.fitness) {
         best = population[i];
      }
   }
   return best;
}

function reproduce(parentA, parentB) {
   const n = cities.length;
   const startPosition = floor(random(0, n - 2));
   const endPosition = floor(random(startPosition + 1, n));
   const parentASlice = parentA.cities.slice(startPosition, endPosition);
   const parentBSlice = parentB.cities.filter((current) => {
      const cityNotInA = !parentASlice.includes(current);
      return cityNotInA;
   });
   const child = parentASlice.concat(parentBSlice);

   return new Individual(child);
}

function recreatePoints() {
   cities = [];
   for (let i = 0; i < params["total-cities"]; i++) {
      let p = new Point(
         random(0 + CANVAS_MARGIN, MAX_X - CANVAS_MARGIN),
         random(0 + CANVAS_MARGIN, MAX_Y - CANVAS_MARGIN)
      );
      cities.push(p);
   }
}

function recreatePopulation() {
   generation = 0;
   bestFitness = Infinity;
   population = [];
   for (let i = 0; i < params["population-size"]; i++) {
      population.push(new Individual());
   }
}

function restart() {
   recreatePoints();
   recreateDistanceTable();
   recreatePopulation();
}

function recreateDistanceTable() {
   console.assert(cities, "cities not initialized");
   distanceTable = [];
   for (let i = 0; i < cities.length; i++) {
      distanceTable.push([]);
      for (let j = 0; j < cities.length; j++) {
         const p1 = cities[i];
         const p2 = cities[j];
         distanceTable[i].push(dist(p1.x, p1.y, p2.x, p2.y));
      }
   }
}
