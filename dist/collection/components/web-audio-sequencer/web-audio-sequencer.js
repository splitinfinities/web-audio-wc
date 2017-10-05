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
            // do nothing
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
export { WebAudioSequencer };
