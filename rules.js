"use strict";

var rules = {
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

    if (card.age > 80) model.removeCard(card);
  },

  forest: function(card, model) {
    if (percentOdds(2) && objLen(model.kindNearCard(Kind.forest, card)) < 50) {
      model.addCard(Card({place: card.place, kind: [Kind.forest]}));
    }
  },

  adult: function(card, model) {
    var forests = model.kindNearCard(Kind.forest, card);
    if (percentOdds(5) && objLen(forests) > 10) {
      model.swapKind(forests[randomKey(forests)], Kind.forest, Kind.lumber);
    }

  },

  lumber: function(card, model) {
    if (!card.age) card.age = 0;
    card.age++;
    if (card.age > 2) {
      model.removeCard(card);
    }
  },
};

// Evalutes the model.
var evaluate = function(model) {
  model.year++;

  // Evaluate rules.
  for (var kind in model.kindCard) {
    var cards = model.kindCard[kind];
    for (var id in cards) {
      var fn = rules[kind];
      if (fn) {
        rules[kind](cards[id], model);
      }
    }
  }
}
