"use strict";

goog.provide('Rules');

/* global Kind,percentOdds,objLen,Card,oneOf,randomKey */

var Rules = {

  aging: {
    person: function(card, model) {
      if (!card.age) card.age = 0;
      card.age++;
      if (card.age > 50) model.swapKind(card, Kind.adult, Kind.elderly);
    },

    child: function(card, model) {
      if (card.age > 12) model.swapKind(card, Kind.child, Kind.adult);
    },

    male: function(card, model) {
      if (card.age > 70) model.removeCard(card);
    },

    female: function(card, model) {
      if (card.age > 80) model.removeCard(card);
    }
  },

  birth: {
    female: function(card, model) {
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

    forest: function(card, model) {
      if (percentOdds(2) && objLen(model.kindNearCard(Kind.forest, card)) < 50) {
        model.addCard(Card({place: card.place, kind: [Kind.forest]}));
      }
    },

    game: function(card, model) {
      if (percentOdds(12) && objLen(model.kindNearCard(Kind.game, card)) < 400) {
        model.addCard(Card({place: card.place, kind: [Kind.game]}));
      }
    },
  },

  huntingAndGathering: {
    adult: function(card, model) {
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

    person: function(card, model) {
      var forest = model.kindNearCard(Kind.forest, card);
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
    person: function(card, model) {
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
    food: function(card, model) {
      model.removeCard(card);
    }
  },
};

// Evalutes the model.
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
