/*! Built with http://stenciljs.com */
const { h } = window.webaudio;

// forEach method, could be shipped as part of an Object Literal/Module
const forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};
// assert for testing
const assert = function (condition, message) {
    if (!condition) {
        throw message || "Assertion failed!";
    }
    return (condition);
};
const delay = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export { assert, forEach, delay };
