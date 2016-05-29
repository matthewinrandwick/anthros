"use strict";


goog.require('Model');
goog.require('Place');

/* global Model */
/* global render */
/* global evaluate */

/**
 * @param {!Model} model
 * @param {string} name
 * @return {!Place}
 */
var pop1 = function(model, name) {
  var p = model.addPlace({name: name});
  model.addReplicas(10, {place: p, kind: [Kind.male, Kind.person, Kind.adult]});
  model.addReplicas(10, {place: p, kind: [Kind.female, Kind.person, Kind.adult]});
  model.addReplicas(50, {place: p, kind: [Kind.forest]});
  model.addReplicas(200, {place: p, kind: [Kind.game]});
  return p;
};


var init = function() {
  var model = new Model();

  pop1(model, "Mesopotamia");
  pop1(model, "Zagros mountains");
  pop1(model, "Egypt");

  tick(model);
  console.log(model);
};


/**
 * @param {!Model} model
 */
var tick = function(model) {
  render(model);
  evaluate(model);
  window.setTimeout(function() {tick(model); }, 100);
};
