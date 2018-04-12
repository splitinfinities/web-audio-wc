var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BufferLoader } from '../../bufferloader';
import { forEach, delay } from '../../helpers';
import webmidi from 'webmidi';
export class WebAudio {
    constructor() {
        this.name = "web_audio";
        this.prepared = false;
        this.midi = false;
        this.sources = [];
        this.keys = {};
    }
    source(name) {
        return this.sources[name];
    }
    is_prepared() {
        return this.prepared;
    }
    /******************
     * Private behavior
     **/
    componentDidLoad() {
        this.connect_debugger();
        this.connect_context();
        this.gain = this.context.createGain();
        this.connect_visualizers();
        this.connect_sources();
        this.connect_midi();
    }
    connect_context() {
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
    }
    connect_sources() {
        this.build_sources();
    }
    build_sources() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log("Building sources");
            this._sources = this.element.querySelectorAll('web-audio-source');
            if (this._sources) {
                this.externalFiles = [];
                forEach(this._sources, (index, source) => {
                    this.log(`Preparing #${index}: ${source.name}`);
                    this.sources[source.name] = source;
                    let bufferLoader = new BufferLoader(this.context, [source.src], (bufferList) => {
                        this.cache_sources(bufferList, source);
                    });
                    bufferLoader.load();
                }, this);
            }
            else {
                this.log('You need to mount a <web-audio-source> inside the <web-audio> tag!');
            }
        });
    }
    cache_sources(bufferList, source) {
        return __awaiter(this, void 0, void 0, function* () {
            yield delay(20);
            bufferList.forEach((item) => {
                this.log(`Caching ${source.name}`);
                if (this.midi) {
                    this.log(`Assigned ${source.name} to midi key ${source.midikey}, channel ${source.midichannel}`);
                    if (this.keys[source.midichannel] == undefined) {
                        this.keys[source.midichannel] = [];
                    }
                    this.keys[source.midichannel][source.midikey] = source;
                }
                this._currentSource = source;
                this._currentSource.assignBuffer(this, item);
                this.log(`Source ${source.name} is ready`);
            });
            this._currentSource = null;
            this.prepared = true;
        });
    }
    connect_visualizers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield delay(20);
            this.visualizers = document.querySelectorAll(`web-audio-visualizer[for="${this.name}"]`);
            if (this.visualizers) {
                this.log(`Attaching visualizers`);
                forEach(this.visualizers, (index, visualizer) => {
                    if (index === 0) {
                        visualizer = visualizer.connect(this.context, this.context.destination);
                    }
                    else {
                        visualizer = visualizer.connect(this.context, this.previousVisualizer.analyser);
                    }
                    this.previousVisualizer = visualizer;
                }, this);
            }
            else {
                this.log(`No visualizers for ${this.name}`);
            }
            if (this.visualizers.length >= 1) {
                this.gain.connect(this.previousVisualizer.analyser);
            }
            else {
                this.gain.connect(this.context.destination);
            }
        });
    }
    connect_debugger() {
        this.debugger = document.querySelector(`web-audio-debugger[for="${this.name}"]`);
        this.log("Connected debugger");
    }
    log(string) {
        if (this.debugger) {
            this.debugger.addHistory(string);
        }
    }
    connect_midi() {
        if (this.midi) {
            webmidi.enable((err) => {
                if (err) {
                    this.log("Midi couldn't be enabled." + err);
                }
                else {
                    this.log("Midi is enabled");
                }
                var input = webmidi.inputs[0];
                if (input) {
                    input.addListener('noteon', 'all', (e) => {
                        this.log(`KEY: Channel: ${e.channel}, Note: ${e.note.number}, Name: ${e.note.name}, Oct: ${e.note.octave}`);
                        if (this.keys[e.channel]) {
                            this.keys[e.channel][e.note.number].gain().value = (e.data[2] / 175);
                            this.keys[e.channel][e.note.number].play();
                        }
                    });
                    input.addListener('pitchbend', 'all', (e) => {
                        this.log(`PITCH: Channel: ${e.channel}, Value: ${e.value}`);
                    });
                    // Listen to control change message on all channels
                    input.addListener('controlchange', 'all', (e) => {
                        this.log(`CTRL: Channel: ${e.channel}, controller: ${e.controller.number}, Value: ${e.value}`);
                        var event = new CustomEvent('midi-controller-update', { detail: e });
                        document.dispatchEvent(event);
                    });
                    this.log("Listeners added for notes, pitch bend, and controllers.");
                }
            });
        }
    }
    static get is() { return "web-audio"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "_currentSource": { "state": true }, "_sources": { "state": true }, "autoplay": { "type": "Any", "attr": "autoplay" }, "context": { "state": true }, "debugger": { "state": true }, "element": { "elementRef": true }, "externalFiles": { "state": true }, "gain": { "state": true }, "is_prepared": { "method": true }, "keys": { "state": true }, "midi": { "type": "Any", "attr": "midi" }, "name": { "type": String, "attr": "name" }, "prepared": { "state": true }, "previousVisualizer": { "state": true }, "source": { "method": true }, "sources": { "state": true }, "visualizerNodes": { "state": true }, "visualizers": { "state": true } }; }
}
