var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
import { BufferLoader } from '../../bufferloader';
import { forEach, delay } from '../../helpers';
import webmidi from 'webmidi';
var WebAudio = /** @class */ (function () {
    function WebAudio() {
        this.name = "web_audio";
        this.prepared = false;
        this.midi = false;
        this.sources = [];
        this.keys = {};
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
        this.connect_debugger();
        this.connect_context();
        this.gain = this.context.createGain();
        this.connect_visualizers();
        this.connect_sources();
        this.connect_midi();
    };
    WebAudio.prototype.connect_context = function () {
        var AudioContext = window.AudioContext
            || window.webkitAudioContext
            || window.audio_context;
        if (AudioContext) {
            window.audio_context = new AudioContext;
            this.log("Set window.audio_context");
        }
        else {
            this.log("The Web Audio API is not supported by your browser.");
        }
        this.context = window.audio_context;
        this.log("Connected to window.audio_context");
    };
    WebAudio.prototype.connect_sources = function () {
        this.build_sources();
    };
    WebAudio.prototype.build_sources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.log("Building sources");
                this._sources = this.element.querySelectorAll('web-audio-source');
                this.externalFiles = [];
                forEach(this._sources, function (index, source) {
                    _this.log("Preparing " + source.name);
                    _this.sources[source.name] = source;
                    var bufferLoader = new BufferLoader(_this.context, [source.src], function (bufferList) {
                        _this.cache_sources(bufferList, source);
                    });
                    bufferLoader.load();
                }, this);
                return [2 /*return*/];
            });
        });
    };
    WebAudio.prototype.cache_sources = function (bufferList, source) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        bufferList.forEach(function (item) {
                            _this.log("Caching " + source.name);
                            if (_this.midi) {
                                _this.log("Assigned " + source.name + " to midi key " + source.midikey + ", channel " + source.midichannel);
                                if (_this.keys[source.midichannel] == undefined) {
                                    _this.keys[source.midichannel] = [];
                                }
                                _this.keys[source.midichannel][source.midikey] = source;
                            }
                            _this._currentSource = source;
                            _this._currentSource.assignBuffer(_this, item);
                            _this.log("Source " + source.name + " is ready");
                        });
                        this._currentSource = null;
                        this.prepared = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    WebAudio.prototype.connect_visualizers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        this.visualizers = document.querySelectorAll("web-audio-visualizer[for=\"" + this.name + "\"]");
                        if (this.visualizers) {
                            this.log("Attaching visualizers");
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
                            this.log("No visualizers for " + this.name);
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
    WebAudio.prototype.connect_debugger = function () {
        this.debugger = document.querySelector("web-audio-debugger[for=\"" + this.name + "\"]");
        this.log("Connected debugger");
    };
    WebAudio.prototype.log = function (string) {
        if (this.debugger) {
            this.debugger.addHistory(string);
        }
    };
    WebAudio.prototype.connect_midi = function () {
        var _this = this;
        if (this.midi) {
            webmidi.enable(function (err) {
                if (err) {
                    _this.log("Midi couldn't be enabled." + err);
                }
                else {
                    _this.log("Midi is enabled");
                }
                var input = webmidi.inputs[0];
                if (input) {
                    input.addListener('noteon', 'all', function (e) {
                        _this.log("KEY: Channel: " + e.channel + ", Note: " + e.note.number + ", Name: " + e.note.name + ", Oct: " + e.note.octave);
                        if (_this.keys[e.channel]) {
                            _this.keys[e.channel][e.note.number].gain().value = (e.data[2] / 175);
                            _this.keys[e.channel][e.note.number].play();
                        }
                    });
                    input.addListener('pitchbend', 'all', function (e) {
                        _this.log("PITCH: Channel: " + e.channel + ", Value: " + e.value);
                    });
                    // Listen to control change message on all channels
                    input.addListener('controlchange', 'all', function (e) {
                        _this.log("CTRL: Channel: " + e.channel + ", controller: " + e.controller.number + ", Value: " + e.value);
                        var event = new CustomEvent('midi-controller-update', { detail: e });
                        document.dispatchEvent(event);
                    });
                    _this.log("Listeners added for notes, pitch bend, and controllers.");
                }
            });
        }
    };
    return WebAudio;
}());
export { WebAudio };
