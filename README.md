# anthros
A world simulator.

## What is this?

It's a world, simulated like a card game, with rules that would be way too complex to
play practically. Think Conway's Game of Life but with more interesting rules, and with
a graph for a world instead of a grid.

## Can I see it run?

Browse to https://cdn.rawgit.com/matthewinrandwick/anthros/master/index.html


## Basic Concepts

### Cards

Cards are objects in the game. Everything is a card, whether it's a place, a
person, a flock of sheep etc.

### Places

Places hold cards, and adjoin other places, forming a map. Places themselves
are cards, so they can have properties such as land mass, the current season
etc.

### Kinds

A card can have one or more kinds. When a card is of a certain kind, certain
rules apply to it. For example, an adult can chop down forests to make lumber.
Only an adult woman can have children.

### Rules

Rules apply to all cards of a particular kind, and execute once per time
increment. Often, rules will change cards from one kind to another. For example,
chopping down a forest removes its `forest` kind, and adds a `lumber` kind.

## What's planned?

### Interaction between locations

Currently, each place is hermetic. Once I add logic to adjoin places, I should
be able to add rules whereby populations move from one location to another when
food becomes scarce. This would be interesting because currently populations
periodically die out, so this would repopulate these regions. We could also
start the map with unpopulated regions that people gradually move into.

### Routing

Once places are joined, I'll add some pathing logic, so that populations can go
trading in one location, then find their way home again, if they aren't killed
along the way. I'll do this with a shortest-path algorithm of some kind.

### Graphics, Bells & Whistles

Instead of numbers, it will be cool to model certain cards with graphics and
overlay them in a nice way, to build up a kind of collage. The places can be
laid out graphically like a map too.
