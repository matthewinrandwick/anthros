#ifndef DB_H
#define DB_H

#include <array>
#include <vector>

#include "./types.h"
#include "./kinds.h"

namespace anthros {

// Card models a card fragment. A card is made up of many consecutive fragments, each encoding information about a specific kind.
//
// Size is 8 bytes.
struct Card {
  // If true, the next entry refers to the same card.
  bool continues : 1;
  // If false, the entry is deleted and can be reused.
  bool active : 1;
  // If true, the next entry is of Attr type.
  bool continues_attr: 1;
  // An array index where the next Card of the same kind is.
  uint32 next_of_same_kind : 24;
  // How many replicas of the card this represents.
  uint32 count : 16;
  // What kind this fragment refers to.
  uint16 kind : 13;
};

// Attr defines key/value pairs associated with the card.
//
// Size is 8 bytes.
struct Attr {
  bool continues : 1;
  uint32 name : 16;
  uint32 value : 32;
};

// An entry in the vector is either a card or an attribute.
union Entry {
  Card card;
  Attr attr;
};

// Place models a location in the simulation.
struct Place {

  Place() {
  }

private:
  // Maps from a kind to the first card of that kind in 'cards'.
  std::array<int32, int(Kind::Total)> first_card_of_kind;

  // All entries in the place.
  std::vector<Entry> cards;

  // How many cards are of each kind.
  std::array<int32, int(Kind::Total)> kind_count;
};

}

#endif
