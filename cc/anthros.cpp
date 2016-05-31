#include <stdio.h>

#include "./db.h"
#include "./kinds.h"

namespace anthros {

int main() {
  printf("Anthros\n");
  // Check bit packing of data structure is efficient.
  printf("sizeof(Entry)=%lu\n", sizeof(Entry));

  Place p;

  return 0;
}

}

int main() {
  return anthros::main();
}
