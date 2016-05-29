"use strict";

goog.provide('Model');
goog.require('goog.object');

/**
 * Model represents a mapping between cards, places and kinds.
 *
 * @constructor
 * */
var Model = function() {
  /** @type {!Object<string,!Object<string,!CardType>>} */
  this.kindCard = {};
  /** @type {!Object<string, !Place>} */
  this.places = {};
  /** @type {!Object<string, !Object<string, !CardType>>} */
  this.placeKindCard = {};
  /** @type {number} */
  this.nextId = 1;
  /** @type {number} */
  this.year = -8000;
};

/**
 * @typedef {{name: string}}
 */
var Place;

/**
 * @typedef {{
 *    name: string,
 *    kind: !Object<string, string>,
 *    place: !Place
 *    }}
 */
var CardType;

/**
 * @param {!Place} place
 */
Model.prototype.addPlace = function(place) {
  this.places[place.name] = place;
  return place;
};

Model.prototype.addReplicas = function(n, card) {
  for (var i = 0; i < n; ++i) {
    var clone = /** @type !CardType */(goog.object.clone(card));
    this.addCard(Card(clone));
  }
};

Model.prototype.addCard = function(card) {
  if (!card.id) {
    card.id = card.name + '-' + this.nextId++;
  }
  var p = card.place.name;

  for (var k in card.kind) {
    {
      var d = this.kindCard[k];
      if (!d) {
        d = {};
        this.kindCard[k] = d;
      }
      d[card.id] = card;
    }

    {
      var d1 = this.placeKindCard[p];
      if (!d1) {
         d1 = {};
         this.placeKindCard[p] = d1;
      }
      var d2 = d1[k];
      if (!d2) {
        d2 = {};
        d1[k] = d2;
      }
      d2[card.id] = card;
    }
  }
};

Model.prototype.removeCard = function(card) {
  var p = card.place.name;

  for (var k in card.kind) {
    {
      var d = this.kindCard[k];
      if (!d) {
        continue;
      }
      delete d[card.id];
      if (Object.keys(d).length === 0) {
        delete this.kindCard[k];
      }
    }

    {
      var d1 = this.placeKindCard[p];
      if (!d1) {
        continue;
      }
      var d2 = d1[k];
      if (!d2) {
        continue;
      }
      delete d2[card.id];

      if (Object.keys(d2).length === 0) {
        delete d1[k];
      }

      if (Object.keys(d1).length === 0) {
        delete this.placeKindCard[p];
      }
    }
  }
};

Model.prototype.addKind = function(card, kind) {
  this.removeCard(card);
  card.kind[kind] = kind;
  this.addCard(card);
};

Model.prototype.removeKind = function(card, kind) {
  this.removeCard(card);
  delete card.kind[kind];
  this.addCard(card);
};

Model.prototype.swapKind = function(card, oldKind, newKind) {
  this.removeCard(card);
  delete card.kind[oldKind];
  card.kind[newKind] = newKind;
  this.addCard(card);
};

Model.prototype.kindNearCard = function(kind, card) {
  return this.placeKindCard[card.place.name][kind] || {};
};

/**
 * Card initializes a card.
 * @param {{
 *    name: (string|null|undefined),
 *    kind: (Array<string>|Object<string, string>),
 *    place: Place
 *    }} card
 * @returns {!CardType}
 */
function Card(card) {
  if (!card.place) {
    throw Error('card has no place');
  }
  if (card.kind === undefined) {
    throw Error('card has no kinds');
  }

  /** @type {!CardType} */
  var c = {
    name: !card.name ? card.kind.join() : card.name,
    kind: {},
    place: card.place
  };
  if (card.kind.length) {
    for (var i = 0; i < card.kind.length; ++i) {
      c.kind[card.kind[i]] = card.kind[i];
    }
  }
  return c;
}
