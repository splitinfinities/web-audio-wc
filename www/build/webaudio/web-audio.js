/*! Built with http://stenciljs.com */
webaudio.loadComponents(

/**** module id (dev mode) ****/
"web-audio",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var WebAudio = /** @class */ (function () {
    function WebAudio() {
    }
    return WebAudio;
}());

var WebAudioDebugger = /** @class */ (function () {
    function WebAudioDebugger() {
    }
    WebAudioDebugger.prototype.render = function () {
        return (h("p", 0, t("I'm a debugger")));
    };
    return WebAudioDebugger;
}());

var WebAudioEffect = /** @class */ (function () {
    function WebAudioEffect() {
    }
    WebAudioEffect.prototype.render = function () {
        return (h("p", 0, t("I'm an effect")));
    };
    return WebAudioEffect;
}());

var WebAudioSequencer = /** @class */ (function () {
    function WebAudioSequencer() {
    }
    WebAudioSequencer.prototype.render = function () {
        return (h("p", 0, t("I'm an sequencer")));
    };
    return WebAudioSequencer;
}());

var WebAudioSource = /** @class */ (function () {
    function WebAudioSource() {
    }
    WebAudioSource.prototype.render = function () {
        return (h("p", 0, t("I'm an source")));
    };
    return WebAudioSource;
}());

var WebAudioVisualizer = /** @class */ (function () {
    function WebAudioVisualizer() {
    }
    WebAudioVisualizer.prototype.render = function () {
        return (h("p", 0, t("I'm a visualizer")));
    };
    return WebAudioVisualizer;
}());

var WebAudioVisualizerShader = /** @class */ (function () {
    function WebAudioVisualizerShader() {
    }
    WebAudioVisualizerShader.prototype.render = function () {
        return (h("p", 0, t("I'm a shader")));
    };
    return WebAudioVisualizerShader;
}());

exports['WEB-AUDIO'] = WebAudio;
exports['WEB-AUDIO-DEBUGGER'] = WebAudioDebugger;
exports['WEB-AUDIO-EFFECT'] = WebAudioEffect;
exports['WEB-AUDIO-SEQUENCER'] = WebAudioSequencer;
exports['WEB-AUDIO-SOURCE'] = WebAudioSource;
exports['WEB-AUDIO-VISUALIZER'] = WebAudioVisualizer;
exports['WEB-AUDIO-VISUALIZER-SHADER'] = WebAudioVisualizerShader;
},


/***************** web-audio *****************/
[
/** web-audio: tag **/
"WEB-AUDIO",

/** web-audio: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** web-audio: host **/
{},

/** web-audio: events **/
0 /* no events */,

/** web-audio: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-debugger *****************/
[
/** web-audio-debugger: tag **/
"WEB-AUDIO-DEBUGGER",

/** web-audio-debugger: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** web-audio-debugger: host **/
{},

/** web-audio-debugger: events **/
0 /* no events */,

/** web-audio-debugger: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-debugger: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-debugger: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-effect *****************/
[
/** web-audio-effect: tag **/
"WEB-AUDIO-EFFECT",

/** web-audio-effect: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** web-audio-effect: host **/
{},

/** web-audio-effect: events **/
0 /* no events */,

/** web-audio-effect: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-effect: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-effect: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-sequencer *****************/
[
/** web-audio-sequencer: tag **/
"WEB-AUDIO-SEQUENCER",

/** web-audio-sequencer: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** web-audio-sequencer: host **/
{},

/** web-audio-sequencer: events **/
0 /* no events */,

/** web-audio-sequencer: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-sequencer: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-sequencer: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-source *****************/
[
/** web-audio-source: tag **/
"WEB-AUDIO-SOURCE",

/** web-audio-source: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** web-audio-source: host **/
{},

/** web-audio-source: events **/
0 /* no events */,

/** web-audio-source: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-source: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-source: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-visualizer *****************/
[
/** web-audio-visualizer: tag **/
"WEB-AUDIO-VISUALIZER",

/** web-audio-visualizer: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** web-audio-visualizer: host **/
{},

/** web-audio-visualizer: events **/
0 /* no events */,

/** web-audio-visualizer: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-visualizer: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-visualizer: shadow **/
1 /* use shadow dom */

],

/***************** web-audio-visualizer-shader *****************/
[
/** web-audio-visualizer-shader: tag **/
"WEB-AUDIO-VISUALIZER-SHADER",

/** web-audio-visualizer-shader: members **/
[
  [ "first", /** prop **/ 1 ],
  [ "last", /** prop **/ 1 ]
],

/** web-audio-visualizer-shader: host **/
{},

/** web-audio-visualizer-shader: events **/
0 /* no events */,

/** web-audio-visualizer-shader: propWillChanges **/
0 /* no prop will change methods */,

/** web-audio-visualizer-shader: propDidChanges **/
0 /* no prop did change methods */,

/** web-audio-visualizer-shader: shadow **/
1 /* use shadow dom */

]
)