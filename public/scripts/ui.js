const params = {
   totalCities: 30,
   populationSize: 400,
   mutationRate: 0.02,
   ciclerPerFrame: 1,
};

$(document).ready(function () {
   buildUIGroup("#global-params", GLOBAL_PARAMS);
   buildUIGroup("#algorithm-params", GENETIC_PARAMS);

   $("#btn-new").click(restart);
   $("#btn-reset").click(recreatePopulation);
});

const GLOBAL_PARAMS = [
   createParam("Total Cities", 1, 100, 1, 30),
   createParam("Cicles per Frame", 1, 1000, 1, 1),
];
const GENETIC_PARAMS = [
   createParam("Population Size", 50, 2000, 50, 400),
   createParam("Mutation Rate", 0.0, 1.0, 0.01, 0.02),
];

function createParam(caption, min, max, step, initialValue) {
   return {
      caption: caption,
      min: min,
      max: max,
      step: step,
      initialValue: initialValue,
   };
}

function buildUIGroup(parent, params) {
   $(parent).append(params.map(buildSlider).join(""));
}

const buildSlider = ({ caption, min, max, step, initialValue }) => `
<div class="input-group container box">
  <div class="container v-container box">
    <div class="container">
      <label class="box small-box" for="ga-pop-size">${caption}</label>
    </div>
    <input id="ga-pop-size" class="box" type="range" min="${min}" max="${max}" step="${step}" value="${initialValue}" >
  </div>
  <div class="container v-container small-box">
    <label id="value" class="box number-display" for="">${initialValue}</label>
  </div>
</div>`;

const buildButton = ({}) => ``;

function formatNumber(number) {
   let isFloat = min <= 1;
   return number.toLocaleString("en-US", {
      minimumIntegerDigits: isFloat ? 1 : 2,
      minimumFractionDigits: isFloat ? 2 : 0,
      useGrouping: false,
   });
}
