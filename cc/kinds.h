#ifndef KINDS_H
#define KINDS_H

namespace anthros {

enum class Kind : short int {
  Person,
  Man,
  Woman,
  Child,
  Adult,

  // Keeps track of total number of kinds.
  Total
};

}

#endif
