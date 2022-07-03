let cities = [];
let distanceTable = [];
let population = [];
let bestIndiv = [];
let bestFitness = Infinity;
let generation = 0;

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
      this.fitness = 0;
      for (let i = 0; i < cities.length; i++) {
         const cityIndexOne = this.cities[i % this.cities.length];
         const cityIndexTwo = this.cities[(i + 1) % this.cities.length];
         this.fitness += distanceTable[cityIndexOne][cityIndexTwo];
      }
   }
   swapCities(a, b) {
      const tmp = this.cities[a];
      this.cities[a] = this.cities[b];
      this.cities[b] = tmp;
   }
}

function weightedIndex(k) {
   // let weights = [];
   // let total = 0;
   // for (let i = 0; i < population.length; i++) {
   //    weights.push(1 / pow(population[i].fitness, 8));
   //    total += weights[i];
   // }
   // let atotal = 0;
   // for (let i = 0; i < population.length; i++) {
   //    weights[i] = weights[i] / total;
   //    atotal += weights[i];
   // }
   // const r = random();
   // let w = 0;
   // for (let i = 0; i < weights.length; i++) {
   //    w += weights[i];
   //    if (r < w) {
   //       return i;
   //    }
   // }
   // return weights.length - 1;
   // ----------------
   let bestIndex = null;
   for (let i = 0; i < k; i++) {
      const indexA = floor(random(0, population.length));
      const randIndividualA = population[indexA];

      if (
         bestIndex == null ||
         randIndividualA.fitness < population[bestIndex].fitness
      ) {
         bestIndex = indexA;
      }
   }
   return bestIndex;
   // const indexA = floor(random(0, population.length));
   // const indexB = floor(random(0, population.length));
   // const randIndividualA = population[indexA];
   // const randIndividualB = population[indexB];

   // if (randIndividualA.fitness < randIndividualB.fitness) {
   //    return indexA;
   // }
   return indexB;
}
function weightedRandomChoices(amount) {
   let parents = [];

   let i = 0;
   while (i < amount) {
      const newParent =
         population[weightedIndex(floor(sqrt(population.length)))];
      if (!parents.includes(newParent)) {
         parents.push(newParent);
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
      let current_fitness = population[i].fitness;
      if (current_fitness < best.fitness) {
         best = population[i];
      }
   }
   return best;
}
function reproduce(parentA, parentB) {
   let n = cities.length;
   let rng_start = floor(random(0, n - 2));
   let rng_end = floor(random(rng_start + 1, n));
   let child = parentA.cities.slice(rng_start, rng_end);
   for (let i = 0; i < cities.length; i++) {
      if (!child.includes(parentB.cities[i])) {
         child.push(parentB.cities[i]);
      }
   }
   return new Individual(child);
}
function recreatePoints() {
   cities = [];
   for (let i = 0; i < sliderTotalPoints.value(); i++) {
      let margin = WIDTH + 2;
      p = new Point(
         random(0 + margin, MAX_X - margin),
         random(0 + margin, MAX_Y - margin)
      );
      cities.push(p);
   }
}
function restart() {
   recreatePoints();
   recreateDistanceTable();

   // bestIndiv = null
   generation = 0;
   bestFitness = Infinity;
   population = [];
   for (let i = 0; i < sliderPopulationSize.value(); i++) {
      population.push(new Individual());
   }
}
function recreateDistanceTable() {
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
