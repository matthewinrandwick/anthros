"use strict";

goog.provide('addDom');
goog.provide('dom');
goog.provide('render');

goog.require('goog.dom');


/**
 * @param {string} name
 * @param {Object=} opt_attrs
 * @param {string=} opt_text
 * @return {Element}
 */
var dom = function(name, opt_attrs, opt_text) {
  return goog.dom.createDom(name, opt_attrs, opt_text);
};

/**
 * @param {string} name
 * @param {Object=} opt_attrs
 * @param {string=} opt_text
 */
var addDom = function(name, opt_attrs, opt_text) {
  document.body.appendChild(dom(name, opt_attrs, opt_text));
};

/**
 * @param {!Model} model
 */
var render = function(model) {
  document.body.innerHTML = '';
  addDom('h1', {}, 'Anthros');
  if (model.year < 0) {
    addDom('div', {}, String(-model.year) + 'BC');
  } else {
    addDom('div', {}, String(model.year + 1) + 'AD');
  }

  var outer = dom('table');
  var outerRow = dom('tr');
  outer.appendChild(outerRow);

  for (var place in model.placeKindCard) {
    var outerCol = dom('td', {class: 'place-table'});
    outerCol.appendChild(dom('span', {}, place));
    var kinds = model.placeKindCard[place];
    var table = dom('table');
    for (var kind in kinds) {
      var tr = dom('tr');
      var len = Object.keys(kinds[kind]).length;
      tr.appendChild(dom('td', {class: 'kind'}, kind));
      tr.appendChild(dom('td', {}, String(len)));
      table.appendChild(tr);
    }
    outerCol.appendChild(table);
    outerRow.appendChild(outerCol);
  }

  document.body.appendChild(outer);
};
