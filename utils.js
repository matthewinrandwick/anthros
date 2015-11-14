"use strict";

let percentOdds = function(p) {
  return Math.random() < p / 100;
};

let objLen = function(obj) {
  return Object.keys(obj).length;
};

let oneOf = function(elems) {
  return elems[Math.floor(Math.random() * elems.length)]
};

let randomKey = function(obj) {
  return oneOf(Object.keys(obj));
};
