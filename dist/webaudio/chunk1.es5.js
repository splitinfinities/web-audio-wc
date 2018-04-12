/*! Built with http://stenciljs.com */
webaudio.loadBundle("./chunk1.js", ["exports"], function (e) { window.webaudio.h, e.assert = function (e, n) { if (!e)
    throw n || "Assertion failed!"; return e; }, e.forEach = function (e, n, o) { for (var i = 0; i < e.length; i++)
    n.call(o, i, e[i]); }, e.delay = function (e) { return new Promise(function (n) { return setTimeout(n, e); }); }; });
