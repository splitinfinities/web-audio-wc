// forEach method, could be shipped as part of an Object Literal/Module
export var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};
// assert for testing
export var assert = function (condition, message) {
    if (!condition) {
        throw message || "Assertion failed!";
    }
    return (condition);
};
export var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
