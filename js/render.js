"use strict";

goog.provide('dom');
goog.provide('addDom');
goog.provide('render');

var dom = function(name, attrs, text) {
  return goog.dom.createDom(name, attrs, text);
};

var addDom = function(name, attrs, text) {
  document.body.appendChild(dom(name, attrs, text));
};

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
