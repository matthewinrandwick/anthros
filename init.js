"use strict";

let Kind = {
  male: 'male',
  female: 'female',
  person: 'person',
  adult: 'adult',
  child: 'child',
  elderly: 'elderly',

  farm: 'farm',
  forest: 'forest',
  lumber: 'lumber',
  game: 'game',
};

let pop1 = function(model, name) {
  let p = model.addPlace({name: name});
  model.addReplicas(10, {place: p, kind: [Kind.male, Kind.person, Kind.adult]});
  model.addReplicas(10, {place: p, kind: [Kind.female, Kind.person, Kind.adult]});
  model.addReplicas(50, {place: p, kind: [Kind.forest]});
  model.addReplicas(1, {place: p, kind: [Kind.game]});
  return p;
};


let init = function() {
  let model = new Model();

  pop1(model, "Mesopotamia");
  pop1(model, "Elamite mountains");
  pop1(model, "Egypt");

  tick(model);
  console.log(model);
}


let tick = function(model) {
  render(model);
  evaluate(model);
  window.setTimeout(function() {tick(model); }, 100);
};
