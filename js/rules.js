"use strict";

goog.provide('Kind');
goog.provide('Rules');

goog.require('CardType');


/** @enum {string} */
var Kind = {
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
  food: 'food'
};

/* global Kind,percentOdds,objLen,Card,oneOf,randomKey */

/** @typedef Function(!CardType, !Model) */
var Rule;

/**
 * @type {Object<string, Object<string, Rule>>}
 */
var Rules = {

  aging: {
    person:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        if (!card.age) card.age = 0;
        card.age++;
        if (card.age > 50) model.swapKind(card, Kind.adult, Kind.elderly);
      },

    child:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        if (card.age > 12) model.swapKind(card, Kind.child, Kind.adult);
      },

    male:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        if (card.age > 70) model.removeCard(card);
      },

    female:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        if (card.age > 80) model.removeCard(card);
      }
  },

  birth: {
    female:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        if (
            card.age > 16 && card.age < 40 &&
            percentOdds(10) &&
            objLen(model.kindNearCard(Kind.person, card)) < 100) {
          model.addCard(Card({
            place: card.place,
            kind: [oneOf([Kind.male, Kind.female]), Kind.person, Kind.child],
          }));

          if (percentOdds(10)) {
            model.removeCard(card);
          }
        }
      },

    forest:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        if (percentOdds(2) && objLen(model.kindNearCard(Kind.forest, card)) < 50) {
          model.addCard(Card({place: card.place, kind: [Kind.forest]}));
        }
      },

    game:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        if (percentOdds(12) && objLen(model.kindNearCard(Kind.game, card)) < 400) {
          model.addCard(Card({place: card.place, kind: [Kind.game]}));
        }
      },
  },

  huntingAndGathering: {
    adult:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        var game = model.kindNearCard(Kind.game, card);
        for (var x = 0; x < 10; x++) {
          var people = model.kindNearCard(Kind.person, card);
          var food = model.kindNearCard(Kind.food, card);

          // Hunt until we have enough food.
          if (objLen(food) >= objLen(people)) {
            return;
          }

          // Game are too hard to kill when numbers are low.
          if (objLen(game) > 50) {
            model.swapKind(game[randomKey(game)], Kind.game, Kind.food);
          }
        }
      },

    person:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        var people = model.kindNearCard(Kind.person, card);
        var food = model.kindNearCard(Kind.food, card);

        for (var x = 0; x < 10; x++) {
          // Forage until we have enough food.
          if (objLen(food) >= objLen(people)) {
            return;
          }

          if (percentOdds(80)) {
            model.addCard(Card({
              place: card.place,
              kind: [Kind.food],
            }));
          }
        }
      },
  },

  eating: {
    person:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        // Without food, people die.
        var food = model.kindNearCard(Kind.food, card);
        if (!objLen(food)) {
          model.removeCard(card);
          return;
        }

        model.removeCard(food[randomKey(food)]);
      },
  },

  spoilage: {
    food:
      /** @param {!CardType} card @param {!Model} model */
      function(card, model) {
        model.removeCard(card);
      }
  },
};

/**
 * Evalutes the model.
 * @param {!Model} model
 */
var evaluate = function(model) {
  model.year++;

  // Javascript object iteration order is well-defined.
  for (var order in Rules) {

    // Evaluate rules.
    for (var kind in Rules[order]) {
      var fn = Rules[order][kind];
      var cards = model.kindCard[kind];
      if (!cards) continue;
      for (var id in cards) {
        fn(cards[id], model);
      }
    }
  }
};
