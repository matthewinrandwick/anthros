"use strict";

/**
 * @param {number} p
 * @return {boolean}
 */
var percentOdds = function(p) {
  return Math.random() < p / 100;
};

/**
 * @param {!Object} obj
 * @return {number}
 */
var objLen = function(obj) {
  if (obj === undefined) {
    throw Error('obj is undefined');
  }
  return Object.keys(obj).length;
};

/**
 * @param {Array<string>} elems
 * @return {string}
 */
var oneOf = function(elems) {
  return elems[Math.floor(Math.random() * elems.length)];
};

/**
 * @param {!Object} obj
 * @return {string}
 */
var randomKey = function(obj) {
  return oneOf(Object.keys(obj));
};
