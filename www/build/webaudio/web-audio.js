/*! Built with http://stenciljs.com */
webaudio.loadComponents(

/**** module id (dev mode) ****/
"web-audio",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var BufferLoader = /** @class */ (function () {
    function BufferLoader(context, urlList, callback) {
        this.loadBuffer = function (url, index) {
            // Load buffer asynchronously
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            var loader = this;
            request.onload = function () {
                // Asynchronously decode the audio file data in request.response
                loader.context.decodeAudioData(request.response, function (buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount == loader.urlList.length)
                        loader.onload(loader.bufferList);
                }, function (error) {
                    console.error('decodeAudioData error', error);
                });
            };
            request.onerror = function () {
                alert('BufferLoader: XHR error');
            };
            request.send();
        };
        this.load = function () {
            for (var i = 0; i < this.urlList.length; ++i) {
                this.loadBuffer(this.urlList[i], i);
            }
        };
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = new Array();
        this.loadCount = 0;
    }
    return BufferLoader;
}());

// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};
// assert for testing
var assert = function (condition, message) {
    if (!condition) {
        throw message || "Assertion failed!";
    }
    return (condition);
};

var WebAudio = /** @class */ (function () {
    function WebAudio() {
        this.name = "web_audio";
        this.sources = [];
    }
    WebAudio.prototype.options = function () {
        return "nice!";
    };
    /******************
     * Private behavior
     **/
    WebAudio.prototype.componentDidLoad = function () {
        this.connect_context();
        this.gain = this.context.createGain();
        this.connect_visualizers();
        this.connect_sources();
        this.connect_sequencers();
        this.connect_debugger();
    };
    WebAudio.prototype.connect_context = function () {
        var AudioContext = window.AudioContext // Default
            || window.webkitAudioContext // Safari and old versions of Chrome
            || window.audio_context;
        if (AudioContext) {
            // Do whatever you want using the Web Audio API
            window.audio_context = new AudioContext;
            // ...
        }
        else {
            // Web Audio API is not supported
            // Alert the user
            console.error("The Web Audio API is not supported by your browser. ");
        }
        this.context = window.audio_context;
    };
    WebAudio.prototype.connect_sources = function () {
        this.build_sources();
    };
    WebAudio.prototype.build_sources = function () {
        var _this = this;
        this._sources = this.element.querySelectorAll('web-audio-source');
        this.externalFiles = [];
        forEach(this._sources, function (index, source) {
            _this.sources[source.name] = source;
            if (_this.midi) {
                _this.keys[source.midi] = source;
            }
            var bufferLoader = new BufferLoader(_this.context, [source.src], function (bufferList) {
                _this.cache_sources(bufferList, source);
            });
            bufferLoader.load();
        }, this);
    };
    WebAudio.prototype.cache_sources = function (bufferList, source) {
        var _this = this;
        bufferList.forEach(function (item) {
            _this._currentSource = source;
            _this._currentSource.assignBuffer(_this.context, _this.gain, item);
        });
        this._currentSource = null;
        this.prepared = true;
    };
    WebAudio.prototype.connect_visualizers = function () {
        var _this = this;
        this.visualizers = document.querySelectorAll("web-audio-visualizer[name=\"" + this.name + "\"]");
        if (this.visualizers) {
            forEach(this.visualizers, function (visualizer, index) {
                if (index === 0) {
                    visualizer.connect(_this.context, _this.context.destination);
                }
                else {
                    visualizer.connect(_this.context, _this.previousVisualizer.analyser);
                }
                _this.previousVisualizer = visualizer;
            }, this);
        }
        else {
            console.info('No visualizers bound to this web-audio instance');
        }
        if (this.visualizers.length >= 1) {
            this.gain.connect(this.previousVisualizer.analyser);
        }
        else {
            this.gain.connect(this.context.destination);
        }
    };
    WebAudio.prototype.connect_sequencers = function () {
        console.log("connect_sequencers");
    };
    WebAudio.prototype.connect_debugger = function () {
        console.log("connect_debugger");
    };
    WebAudio.prototype.render = function () {
        return (h("p", 0, t("I'm the parent")));
    };
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

var buildBiquadFilterNode = function (context, effectWC) {
    var biquadFilter = context.createBiquadFilter();
    biquadFilter.type = effectWC.method;
    biquadFilter.gain.value = 1.0;
    responsiveTo(biquadFilter, effectWC);
    return biquadFilter;
};
var buildDelayNode = function (context, effectWC) {
    var delay = context.createDelay(5.0);
    delay.delayTime.value = 3.0;
    responsiveTo(delay, effectWC);
    return delay;
};
var buildReverbNode = function (context, effectWC) {
    var convolver = context.createConvolver();
    responsiveTo(convolver, effectWC);
    return convolver;
};
// Private
var responsiveTo = function (effect, effectWC) {
    if (effectWC.responds === "mouse") {
        biquadResponsiveToMouse(effect);
    }
    else {
        effect.frequency.value = effectWC.value;
    }
};
var biquadResponsiveToMouse = function (effect) {
    var _this = this;
    document.addEventListener('mouse-update', function (e) {
        if (_this.axis === "x") {
            effect.frequency.value = (e.detail.toLeft * 1.5) || 1000;
        }
        else if (_this.axis === "x-reverse") {
            effect.frequency.value = (e.detail.toRight * 1.5) || 1000;
        }
        else if (_this.axis === "y") {
            effect.frequency.value = (e.detail.toTop * 1.5) || 1000;
        }
        else if (_this.axis === "y-reverse") {
            effect.frequency.value = (e.detail.toBottom * 1.5) || 1000;
        }
        else if (_this.axis === "bi") {
            effect.frequency.value = ((e.detail.toRight + e.detail.toTop)) || 1000;
        }
        else if (_this.axis === "bi-reverse") {
            effect.frequency.value = ((e.detail.toLeft + e.detail.toRight)) || 1000;
        }
    }, false);
};

var WebAudioEffect = /** @class */ (function () {
    function WebAudioEffect() {
        this.method = "lowshelf";
        this.value = 1.0;
    }
    WebAudioEffect.prototype.attachEffect = function (context) {
        this.context = context;
        if (assert(this.type, "\"" + this.type + "\" is not a valid effect - Routing around to masterGain.\"")) {
            if (this.type === "panner") {
                // make a PannerNode
            }
            else if (this.type === "listener") {
                // make a AudioListener
            }
            else if (this.type === "reverb") {
                // make a ConvolverNode
                this.effect = buildReverbNode(this.context, this);
            }
            else if (this.type === "filter") {
                // make a BiquadFilterNode
                this.effect = buildBiquadFilterNode(this.context, this);
            }
            else if (this.type === "delay") {
                // make a DelayNode
                this.effect = buildDelayNode(this.context, this);
            }
            else if (this.type === "compression") {
                // make a DynamicsCompressorNode
            }
            else if (this.type === "distortion") {
                // make a WaveShaperNode
            }
        }
        return this.effect;
    };
    WebAudioEffect.prototype.effects = function () {
        return ["panner", "listener", "reverb", "delay", "compression", "distortion", "filter"];
    };
    WebAudioEffect.prototype.render = function () {
        return (h("p", 0, t("I'm an effect of "),
            this.type));
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
        this.status = "paused";
        this.effects = [];
    }
    WebAudioSource.prototype.play = function () {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        if (Object.keys(this.effects).length > 0) {
            this.source.connect(this.preGain);
        }
        else {
            this.source.connect(this.postGain);
        }
        this.source.start(0);
    };
    WebAudioSource.prototype.assignBuffer = function (context, masterGain, buffer) {
        var _this = this;
        console.log(this.context);
        this.context = context;
        this.masterGain = masterGain;
        this.buffer = buffer;
        this.prepareEffects();
        if (Object.keys(this.effects).length > 0) {
            // Make the source and gain
            this.preGain = this.context.createGain();
            var previous_1 = "";
            Object.keys(this.effects).reverse().forEach(function (element, index) {
                if (index === 0) {
                    _this.preGain.connect(_this.effects[element]);
                }
                else {
                    _this.effects[previous_1].connect(_this.effects[element]);
                }
                previous_1 = element;
            });
            this.postGain = this.context.createGain();
            this.effects[previous_1].connect(this.postGain);
            this.postGain.connect(this.masterGain);
        }
        else {
            this.postGain = this.context.createGain();
            this.postGain.connect(this.masterGain);
        }
    };
    WebAudioSource.prototype.prepareEffects = function () {
        if (this.element.parentElement.nodeName !== "WEB-AUDIO") {
            var element = this.element.parentElement;
            while (element.nodeName !== "WEB-AUDIO") {
                console.log(element.getAttribute("name"));
                this.effects[element.getAttribute("name")] = element.attachEffect(this.context);
                element = element.parentElement;
            }
        }
    };
    WebAudioSource.prototype.render = function () {
        return (h("p", 0, t("I'm an source")));
    };
    return WebAudioSource;
}());

var WebAudioVisualizer = /** @class */ (function () {
    function WebAudioVisualizer() {
        this.for = "web_audio";
    }
    WebAudioVisualizer.prototype.render = function () {
        return (h("canvas", { "a": { "id": "canvas" } }));
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
  [ "_currentSource", /** state **/ 5 ],
  [ "_sources", /** state **/ 5 ],
  [ "autoplay", /** prop **/ 1 ],
  [ "context", /** state **/ 5 ],
  [ "element", /** element ref **/ 7 ],
  [ "externalFiles", /** state **/ 5 ],
  [ "gain", /** state **/ 5 ],
  [ "keys", /** state **/ 5 ],
  [ "midi", /** prop **/ 1 ],
  [ "name", /** prop **/ 1 ],
  [ "options", /** method **/ 6 ],
  [ "prepared", /** state **/ 5 ],
  [ "previousVisualizer", /** state **/ 5 ],
  [ "sources", /** state **/ 5 ],
  [ "visualizerNodes", /** state **/ 5 ],
  [ "visualizers", /** state **/ 5 ]
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
  [ "attachEffect", /** method **/ 6 ],
  [ "child", /** state **/ 5 ],
  [ "context", /** state **/ 5 ],
  [ "effect", /** state **/ 5 ],
  [ "method", /** prop **/ 1 ],
  [ "parent", /** state **/ 5 ],
  [ "type", /** prop **/ 1 ],
  [ "value", /** prop **/ 1, /** type number **/ 2 ]
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
  [ "assignBuffer", /** method **/ 6 ],
  [ "buffer", /** state **/ 5 ],
  [ "context", /** state **/ 5 ],
  [ "effects", /** state **/ 5 ],
  [ "element", /** element ref **/ 7 ],
  [ "entry", /** state **/ 5 ],
  [ "masterGain", /** state **/ 5 ],
  [ "midiChannel", /** prop **/ 1, /** type number **/ 2 ],
  [ "midiKey", /** prop **/ 1, /** type number **/ 2 ],
  [ "name", /** prop **/ 1 ],
  [ "play", /** method **/ 6 ],
  [ "postGain", /** state **/ 5 ],
  [ "preGain", /** state **/ 5 ],
  [ "source", /** state **/ 5 ],
  [ "src", /** prop **/ 1 ],
  [ "status", /** state **/ 5 ]
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
  [ "analyser", /** prop **/ 1 ],
  [ "context", /** prop **/ 1 ],
  [ "for", /** prop **/ 1 ]
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