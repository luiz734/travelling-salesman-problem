const params = {
   "total-cities": 30,
   "population-size": 400,
   "mutation-rate": 0.02,
   "cicles-per-frame": 1,
};

$(document).ready(function () {
   buildUIGroup("#global-params", GLOBAL_PARAMS);
   buildUIGroup("#algorithm-params", GENETIC_PARAMS);

   $("#btn-new").click(restart);
   $("#btn-reset").click(recreatePopulation);

   $(".radio-alg").each(function () {
      $(this).change(onAlgorithmChanged);
   });

   setRangeChangedEvent("total-cities");
   setRangeChangedEvent("population-size");
   setRangeChangedEvent("mutation-rate");
   setRangeChangedEvent("cicles-per-frame");
});

function onAlgorithmChanged() {
   // $("#ga").css("background", "#212121");
   // $("#sa").css("background", "#212121");
   $("#ga").toggleClass("radio-selected");
   $("#sa").toggleClass("radio-selected");

   switch ($(this).val()) {
      case "ga":
         // $("#ga").toggleClass("radio-selected");
         break;
      case "sa":
         // $("#sa").toggleClass("radio-selected");
         break;
   }
}

function setRangeChangedEvent(paramName) {
   $("#range-" + paramName).on("input change", function () {
      const newValue = $(this).val();
      $("#display-" + paramName).html(newValue);
      params[paramName] = newValue;
      param = newValue;
      restart();
   });
}
const GLOBAL_PARAMS = [
   createParam("Total Cities", 1, 100, 1, 30),
   createParam("Cicles per Frame", 1, 100, 1, 1),
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
      <label class="box small-box range-label" for="ga-pop-size">${caption}</label>
    </div>
    <input id="range-${parseId(caption)}" class="box" name="range-${parseId(
   caption
)}"type="range" min="${min}" max="${max}" step="${step}" value="${initialValue}" >
  </div>
  <div class="container v-container small-box">
    <labem id="display-${parseId(caption)}" 
     class="box number-display" for="">${initialValue}</label>
  </div>
</div>`;

const buildButton = ({}) => ``;

function parseId(caption) {
   console.log(caption);
   return caption.toLowerCase().replace(/\s/g, "-");
}
