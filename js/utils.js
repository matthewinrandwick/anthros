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

/**
 * @param {number} value
 * @param {Array<number>} inRange
 * @param {Array<number>} outRange
 * @return {number}
 *
 * Translates a value from an input range into an output range, clamping at the
 * edges.
 */
var translate = function(value, inRange, outRange) {
  var n = inRange.length;
  if (outRange.length != n) throw Error('bad range for translate');
  if (n < 2) throw Error('at least two values required');

  for (var i = 1; i < n; i++) {
    var inLhs = inRange[i-1];
    var inRhs = inRange[i];
    var outLhs = outRange[i-1];
    var outRhs = outRange[i];

    var inWidth = inRhs - inLhs;
    var outWidth = outRhs - outLhs;
    var percentile = (value - inLhs) / inWidth;
    if (percentile < 0 || percentile > 1) {
      continue;
    }
    return outLhs + percentile * outWidth;
  }

  // Handle out-of-bounds.
  var sign = inRange[1] > inRange[0] ? 1 : -1;
  if (sign * value < sign * inRange[0]) {
    return outRange[0];
  }
  return outRange[n-1];
};
