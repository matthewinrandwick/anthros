"use strict";

var percentOdds = function(p) {
  return Math.random() < p / 100;
};

var objLen = function(obj) {
  return Object.keys(obj).length;
};

var oneOf = function(elems) {
  return elems[Math.floor(Math.random() * elems.length)]
};

var randomKey = function(obj) {
  return oneOf(Object.keys(obj));
};
