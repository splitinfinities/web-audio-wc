export class WebAudioSequencer {
    constructor() {
        this.name = "web_audio_sequencer";
        this.autoplay = false;
        this.taps = 4;
        this.context = () => { return window.audio_context; };
        this.noteTime = 0.0;
        this.currentTap = 0;
        this.totalPlayTime = 0.0;
        this.custom = () => {
            // do nothing
        };
    }
    componentDidLoad() {
        if (this.autoplay) {
            this.play();
        }
    }
    schedule() {
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
        this.timer = setTimeout(() => {
            this.schedule();
        }, 0);
    }
    advance() {
        // Setting tempo to 60 BPM just for now
        var secondsPerBeat = 60 / this.tempo;
        this.currentTap++;
        if (this.currentTap == this.taps) {
            this.currentTap = 0;
        }
        // 0.25 because each square is a 16th note
        this.noteTime += 0.25 * secondsPerBeat;
    }
    play() {
        this.iterations = 0;
        this.startTime = this.context().currentTime + 0.005 || 0.005;
        this.schedule();
    }
    stop() {
        this.iterations = 0;
        this.startTime = null;
        this.currentTap = 0;
        clearTimeout(this.timer);
    }
    static get is() { return "web-audio-sequencer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "autoplay": { "type": Boolean, "attr": "autoplay" }, "context": { "state": true }, "currentTap": { "state": true }, "custom": { "type": "Any", "attr": "custom" }, "iterations": { "state": true }, "name": { "type": String, "attr": "name" }, "noteTime": { "state": true }, "play": { "method": true }, "startTime": { "state": true }, "stop": { "method": true }, "taps": { "type": Number, "attr": "taps" }, "tempo": { "type": Number, "attr": "tempo" }, "timer": { "state": true }, "totalPlayTime": { "state": true } }; }
}
