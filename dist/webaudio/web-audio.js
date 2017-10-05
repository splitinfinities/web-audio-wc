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
var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WebAudio = /** @class */ (function () {
    function WebAudio() {
        this.name = "web_audio";
        this.prepared = false;
        this.sources = [];
    }
    WebAudio.prototype.source = function (name) {
        return this.sources[name];
    };
    WebAudio.prototype.is_prepared = function () {
        return this.prepared;
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(300)];
                    case 1:
                        _a.sent();
                        this.visualizers = document.querySelectorAll("web-audio-visualizer[for=\"" + this.name + "\"]");
                        if (this.visualizers) {
                            forEach(this.visualizers, function (index, visualizer) {
                                if (index === 0) {
                                    visualizer = visualizer.connect(_this.context, _this.context.destination);
                                }
                                else {
                                    visualizer = visualizer.connect(_this.context, _this.previousVisualizer.analyser);
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
                        return [2 /*return*/];
                }
            });
        });
    };
    WebAudio.prototype.connect_sequencers = function () {
        console.log("connect_sequencers");
    };
    WebAudio.prototype.connect_debugger = function () {
        console.log("connect_debugger");
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
        biquadResponsiveToMouse(effect, effectWC);
    }
    else {
        effect.frequency.value = effectWC.value;
    }
};
var handleMouseMove = function (event) {
    var dot, eventDoc, doc, body, pageX, pageY;
    event = event || window.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }
    window.mousePos = {
        toTop: event.pageY,
        toRight: (window.innerWidth - event.pageX),
        toBottom: (window.innerHeight - event.pageY),
        toLeft: event.pageX,
    };
};
var getMousePosition = function () {
    if (window.mousePos) {
        var event = new CustomEvent('mouse-update', { detail: window.mousePos });
        document.dispatchEvent(event);
    }
};
var biquadResponsiveToMouse = function (effect, effectWC) {
    document.addEventListener('mouse-update', function (e) {
        if (effectWC.axis === "x") {
            effect.frequency.value = (e.detail.toLeft * 1.5) || 1000;
        }
        else if (effectWC.axis === "x-reverse") {
            effect.frequency.value = (e.detail.toRight * 1.5) || 1000;
        }
        else if (effectWC.axis === "y") {
            effect.frequency.value = (e.detail.toTop * 1.5) || 1000;
        }
        else if (effectWC.axis === "y-reverse") {
            effect.frequency.value = (e.detail.toBottom * 1.5) || 1000;
        }
        else if (effectWC.axis === "bi") {
            effect.frequency.value = ((e.detail.toRight + e.detail.toTop)) || 1000;
        }
        else if (effectWC.axis === "bi-reverse") {
            effect.frequency.value = ((e.detail.toLeft + e.detail.toRight)) || 1000;
        }
    }, false);
    (function () {
        if (!window.mouseInitialized) {
            window.mouseInitialized = true;
            document.onmousemove = handleMouseMove;
            setInterval(getMousePosition, 100); // setInterval repeats every X ms
        }
    })();
};

var WebAudioEffect = /** @class */ (function () {
    function WebAudioEffect() {
        this.method = "lowshelf";
        this.value = 1.0;
        this.responds = null;
        this.axis = "x";
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
        this.name = "web_audio_sequencer";
        this.autoplay = false;
        this.taps = 4;
        this.context = function () { return window.audio_context; };
        this.noteTime = 0.0;
        this.currentTap = 0;
        this.totalPlayTime = 0.0;
        this.custom = function () {
            console.log('boop');
        };
    }
    WebAudioSequencer.prototype.componentDidLoad = function () {
        if (this.autoplay) {
            this.play();
        }
    };
    WebAudioSequencer.prototype.schedule = function () {
        var _this = this;
        var currentTime = this.context().currentTime;
        // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
        currentTime -= this.startTime;
        while (this.noteTime < currentTime + 0.005) {
            this.totalPlayTime = this.noteTime + this.startTime;
            if (this.currentTap === 0) {
                this.iterations++;
            }
            this.custom();
            this.advance();
        }
        this.timer = setTimeout(function () {
            _this.schedule();
        }, 0);
    };
    WebAudioSequencer.prototype.advance = function () {
        // Setting tempo to 60 BPM just for now
        var secondsPerBeat = 60 / this.tempo;
        this.currentTap++;
        if (this.currentTap == this.taps) {
            this.currentTap = 0;
        }
        // 0.25 because each square is a 16th note
        this.noteTime += 0.25 * secondsPerBeat;
    };
    WebAudioSequencer.prototype.play = function () {
        this.iterations = 0;
        this.startTime = this.context().currentTime + 0.005 || 0.005;
        this.schedule();
    };
    WebAudioSequencer.prototype.stop = function () {
        this.iterations = 0;
        this.startTime = null;
        this.currentTap = 0;
        clearTimeout(this.timer);
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
        this.type = "wave";
        this.smoothing = 0.9;
        this.size = 1024;
        this.width = 800;
        this.height = 800;
    }
    WebAudioVisualizer.prototype.componentDidLoad = function () {
        this.canvas = this.element.querySelector('canvas');
        // this.width = this.element.outerWidth
    };
    WebAudioVisualizer.prototype.connect = function (context, destination) {
        this.context = context;
        this.analyser = this.context.createAnalyser();
        this.analyser.connect(destination);
        this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
        this.times = new Uint8Array(this.analyser.frequencyBinCount);
        if (this.type === "webgl") {
            this.canvasCTX = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
            this.__prepareWebGL();
        }
        else {
            this.canvasCTX = this.canvas.getContext('2d');
        }
        requestAnimationFrame(this.draw.bind(this));
        return this;
    };
    WebAudioVisualizer.prototype.draw = function () {
        this.analyser.smoothingTimeConstant = this.smoothing;
        this.analyser.fftSize = this.size;
        // Get the frequency data from the currently playing music
        this.analyser.getByteFrequencyData(this.freqs);
        this.analyser.getByteTimeDomainData(this.times);
        if (this.type !== "webgl") {
            var width = Math.floor(this.freqs.length);
            this.canvas.width = width || this.width;
            this.canvas.height = this.height;
        }
        switch (this.type) {
            case "wave":
                this.wave();
                break;
            case "bars":
                this.bars();
                break;
            case "webgl":
                this.webgl();
                break;
        }
        requestAnimationFrame(this.draw.bind(this));
    };
    WebAudioVisualizer.prototype.wave = function () {
        // Draw the time domain chart.
        for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
            var value = this.times[i];
            var percent = value / 256;
            var height = this.height * percent;
            var offset = this.height - height - 0;
            var barWidth = this.width / this.analyser.frequencyBinCount;
            this.canvasCTX.fillStyle = 'black';
            this.canvasCTX.fillRect(i * barWidth, offset, 4, 4);
        }
    };
    WebAudioVisualizer.prototype.bars = function () {
        // Draw the frequency domain chart.
        for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
            var value = this.freqs[i];
            var percent = value / 256;
            var height = this.height * percent;
            var offset = this.height - height;
            var barWidth = (this.width / this.analyser.frequencyBinCount) + 1;
            var hue = i / this.analyser.frequencyBinCount * 360;
            this.canvasCTX.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            this.canvasCTX.fillRect(i * barWidth, offset, barWidth, height);
        }
    };
    WebAudioVisualizer.prototype.webgl = function () {
        this.canvasCTX.uniform1f(this.fragTime, this.context.currentTime);
        this.canvasCTX.fillStyle = 'black';
        this.__copyAudioDataToTexture();
        this.__renderQuad();
    };
    WebAudioVisualizer.prototype.getFrequencyValue = function (freq) {
        var nyquist = this.context.sampleRate / 2;
        var index = Math.round(freq / nyquist * this.freqs.length);
        return this.freqs[index];
    };
    WebAudioVisualizer.prototype.render = function () {
        return (h("canvas", { "a": { "id": "canvas" } }));
    };
    // Private
    WebAudioVisualizer.prototype.__prepareWebGL = function () {
        var vbo = this.canvasCTX.createBuffer();
        this.canvasCTX.bindBuffer(this.canvasCTX.ARRAY_BUFFER, vbo);
        var vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        this.canvasCTX.bufferData(this.canvasCTX.ARRAY_BUFFER, vertices, this.canvasCTX.STATIC_DRAW);
        this.canvasCTX.vertexAttribPointer(0, 2, this.canvasCTX.FLOAT, false, 0, 0);
        var vertex = this.element.querySelector('web-audio-visualizer-shader[type="vertex"]');
        this.vertex = vertex.innerText;
        var fragment = this.element.querySelector('web-audio-visualizer-shader[type="fragment"]');
        this.fragment = fragment.innerText;
        this.fragShader = this.__createShader();
        var fragPosition = this.canvasCTX.getAttribLocation(this.fragShader, 'position');
        this.canvasCTX.enableVertexAttribArray(fragPosition);
        this.fragTime = this.canvasCTX.getUniformLocation(this.fragShader, 'time');
        this.canvasCTX.uniform1f(this.fragTime, this.context.currentTime);
        var fragResolution = this.canvasCTX.getUniformLocation(this.fragShader, 'resolution');
        this.canvasCTX.uniform2f(fragResolution, this.width, this.height);
        this.fragSpectrumArray = new Uint8Array(4 * this.freqs.length);
        var fragSpectrum = this.__createTexture();
    };
    WebAudioVisualizer.prototype.__createShader = function () {
        var vertexShader = this.canvasCTX.createShader(this.canvasCTX.VERTEX_SHADER);
        this.canvasCTX.shaderSource(vertexShader, this.vertex);
        this.canvasCTX.compileShader(vertexShader);
        if (!this.canvasCTX.getShaderParameter(vertexShader, this.canvasCTX.COMPILE_STATUS)) {
            throw new Error(this.canvasCTX.getShaderInfoLog(vertexShader));
        }
        var fragmentShader = this.canvasCTX.createShader(this.canvasCTX.FRAGMENT_SHADER);
        this.canvasCTX.shaderSource(fragmentShader, this.fragment);
        this.canvasCTX.compileShader(fragmentShader);
        if (!this.canvasCTX.getShaderParameter(fragmentShader, this.canvasCTX.COMPILE_STATUS)) {
            throw new Error(this.canvasCTX.getShaderInfoLog(fragmentShader));
        }
        var shader = this.canvasCTX.createProgram();
        this.canvasCTX.attachShader(shader, vertexShader);
        this.canvasCTX.attachShader(shader, fragmentShader);
        this.canvasCTX.linkProgram(shader);
        this.canvasCTX.useProgram(shader);
        return shader;
    };
    WebAudioVisualizer.prototype.__createTexture = function () {
        var texture = this.canvasCTX.createTexture();
        this.canvasCTX.bindTexture(this.canvasCTX.TEXTURE_2D, texture);
        this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D, this.canvasCTX.TEXTURE_MIN_FILTER, this.canvasCTX.LINEAR);
        this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D, this.canvasCTX.TEXTURE_WRAP_S, this.canvasCTX.CLAMP_TO_EDGE);
        this.canvasCTX.texParameteri(this.canvasCTX.TEXTURE_2D, this.canvasCTX.TEXTURE_WRAP_T, this.canvasCTX.CLAMP_TO_EDGE);
        return texture;
    };
    WebAudioVisualizer.prototype.__copyAudioDataToTexture = function () {
        for (var i = 0; i < this.freqs.length; i++) {
            this.fragSpectrumArray[6 * i + 0] = this.freqs[i]; // R
            this.fragSpectrumArray[6 * i + 1] = this.freqs[i]; // G
            this.fragSpectrumArray[6 * i + 2] = this.freqs[i]; // B
            this.fragSpectrumArray[6 * i + 3] = 255; // A
        }
        this.canvasCTX.texImage2D(this.canvasCTX.TEXTURE_2D, 0, this.canvasCTX.RGBA, this.freqs.length, 1, 0, this.canvasCTX.RGBA, this.canvasCTX.UNSIGNED_BYTE, this.fragSpectrumArray);
    };
    WebAudioVisualizer.prototype.__renderQuad = function () {
        this.canvasCTX.drawArrays(this.canvasCTX.TRIANGLE_STRIP, 0, 4);
    };
    return WebAudioVisualizer;
}());

var WebAudioVisualizerShader = /** @class */ (function () {
    function WebAudioVisualizerShader() {
    }
    WebAudioVisualizerShader.prototype.render = function () {
        return ('');
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
  [ "is_prepared", /** method **/ 6 ],
  [ "keys", /** state **/ 5 ],
  [ "midi", /** prop **/ 1 ],
  [ "name", /** prop **/ 1 ],
  [ "prepared", /** state **/ 5 ],
  [ "previousVisualizer", /** state **/ 5 ],
  [ "source", /** method **/ 6 ],
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
  [ "axis", /** prop **/ 1 ],
  [ "child", /** state **/ 5 ],
  [ "context", /** state **/ 5 ],
  [ "effect", /** state **/ 5 ],
  [ "method", /** prop **/ 1 ],
  [ "parent", /** state **/ 5 ],
  [ "responds", /** prop **/ 1 ],
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
  [ "autoplay", /** prop **/ 1, /** type boolean **/ 1 ],
  [ "context", /** state **/ 5 ],
  [ "currentTap", /** state **/ 5 ],
  [ "custom", /** prop **/ 1 ],
  [ "iterations", /** state **/ 5 ],
  [ "name", /** prop **/ 1 ],
  [ "noteTime", /** state **/ 5 ],
  [ "play", /** method **/ 6 ],
  [ "startTime", /** state **/ 5 ],
  [ "stop", /** method **/ 6 ],
  [ "taps", /** prop **/ 1, /** type number **/ 2 ],
  [ "tempo", /** prop **/ 1, /** type number **/ 2 ],
  [ "timer", /** state **/ 5 ],
  [ "totalPlayTime", /** state **/ 5 ]
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
  [ "_bufferLength", /** state **/ 5 ],
  [ "_dataArray", /** state **/ 5 ],
  [ "analyser", /** state **/ 5 ],
  [ "canvas", /** state **/ 5 ],
  [ "canvasCTX", /** state **/ 5 ],
  [ "connect", /** method **/ 6 ],
  [ "context", /** state **/ 5 ],
  [ "element", /** element ref **/ 7 ],
  [ "for", /** prop **/ 1 ],
  [ "fragment", /** state **/ 5 ],
  [ "fragShader", /** state **/ 5 ],
  [ "fragSpectrumArray", /** state **/ 5 ],
  [ "fragTime", /** state **/ 5 ],
  [ "freqs", /** state **/ 5 ],
  [ "height", /** state **/ 5 ],
  [ "renderer", /** prop **/ 1 ],
  [ "size", /** prop **/ 1, /** type number **/ 2 ],
  [ "smoothing", /** prop **/ 1, /** type number **/ 2 ],
  [ "times", /** state **/ 5 ],
  [ "type", /** prop **/ 1 ],
  [ "vertex", /** state **/ 5 ],
  [ "vertexShader", /** state **/ 5 ],
  [ "width", /** state **/ 5 ]
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
  [ "type", /** prop **/ 1 ]
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