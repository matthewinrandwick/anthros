"use strict";

let dom = function(name, attrs, text) {
  return goog.dom.createDom(name, attrs, text);
}

let addDom = function(name, attrs, text) {
  document.body.appendChild(dom(name, attrs, text));
}

let render = function(model) {
  document.body.innerHTML = '';
  addDom('h1', {}, 'Anthros');
  if (model.year < 0) {
    addDom('div', {}, String(-model.year) + 'BC');
  } else {
    addDom('div', {}, String(model.year + 1) + 'AD');
  }

  let outer = dom('table');
  let outerRow = dom('tr');
  outer.appendChild(outerRow);

  for (let place in model.placeKindCard) {
    let outerCol = dom('td', {class: 'place-table'});
    outerCol.appendChild(dom('span', {}, place));
    let kinds = model.placeKindCard[place];
    let table = dom('table');
    for (let kind in kinds) {
      let tr = dom('tr');
      let len = Object.keys(kinds[kind]).length;
      tr.appendChild(dom('td', {class: 'kind'}, kind));
      tr.appendChild(dom('td', {}, String(len)));
      table.appendChild(tr);
    }
    outerCol.appendChild(table);
    outerRow.appendChild(outerCol);
  }

  document.body.appendChild(outer);
};
