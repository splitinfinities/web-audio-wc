export class WebAudioSource {
    constructor() {
        this.inert = false;
        this.midikey = 0;
        this.midichannel = 1;
        this.status = "paused";
        this.effectsvolume = 100;
        this.effects = [];
    }
    getBuffer() {
        return this.buffer;
    }
    webAudio() {
        return this.webAudioWrapper;
    }
    gain(place = "wet") {
        if (place === "wet") {
            return this.wetGain;
        }
        else if (place === "dry") {
            return this.dryGain;
        }
        else if (place === "channel") {
            return this.channelGain;
        }
    }
    play() {
        if (!this.inert) {
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;
            if (this.wetGain) {
                this.wetGain.gain.value = this.effectsvolume / 100;
                this.dryGain.gain.value = Math.abs((this.effectsvolume - 100) / 100);
            }
            else {
                this.dryGain.gain.value = 1;
            }
            if (this.wetGain) {
                this.source.connect(this.wetGain);
            }
            this.source.connect(this.dryGain);
            this.source.start(0);
        }
        else {
            throw "Cannot play inert media.";
        }
    }
    assignBuffer(webAudio, buffer) {
        this.webAudioWrapper = webAudio.element;
        this.context = webAudio.context;
        this.buffer = buffer;
        if (!this.inert) {
            this.masterGain = webAudio.gain;
            this.channelGain = this.context.createGain();
            this.prepareEffects();
            if (Object.keys(this.effects).length > 0) {
                // Make the source and gain
                this.wetGain = this.context.createGain();
                let previous = "";
                Object.keys(this.effects).reverse().forEach((element, index) => {
                    if (index === 0) {
                        this.wetGain.connect(this.effects[element]);
                    }
                    else {
                        this.effects[previous].connect(this.effects[element]);
                    }
                    previous = element;
                });
                this.effects[previous].connect(this.channelGain);
            }
            this.dryGain = this.context.createGain();
            this.dryGain.connect(this.channelGain);
            this.channelGain.connect(this.masterGain);
        }
    }
    prepareEffects() {
        if (this.element.parentElement.nodeName !== "WEB-AUDIO") {
            let element = this.element.parentElement;
            while (element.nodeName !== "WEB-AUDIO") {
                this.effects[element.getAttribute("name")] = element.attachEffect(this.context, this.element);
                element = element.parentElement;
            }
        }
    }
    static get is() { return "web-audio-source"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "assignBuffer": { "method": true }, "buffer": { "state": true }, "channelGain": { "state": true }, "context": { "state": true }, "dryGain": { "state": true }, "effects": { "state": true }, "effectsvolume": { "type": Number, "attr": "effectsvolume" }, "element": { "elementRef": true }, "entry": { "state": true }, "gain": { "method": true }, "getBuffer": { "method": true }, "inert": { "type": Boolean, "attr": "inert" }, "masterGain": { "state": true }, "midichannel": { "type": Number, "attr": "midichannel" }, "midikey": { "type": Number, "attr": "midikey" }, "name": { "type": String, "attr": "name" }, "play": { "method": true }, "source": { "state": true }, "src": { "type": String, "attr": "src" }, "status": { "state": true }, "webAudio": { "method": true }, "webAudioWrapper": { "state": true }, "wetGain": { "state": true } }; }
}
