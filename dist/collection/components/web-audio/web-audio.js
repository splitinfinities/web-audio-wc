import { BufferLoader } from '../../bufferloader';
import { forEach } from '../../helpers';
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
export { WebAudio };
