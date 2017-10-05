var WebAudioSource = /** @class */ (function () {
    function WebAudioSource() {
        this.inert = false;
        this.midikey = 0;
        this.midichannel = 1;
        this.status = "paused";
        this.effectsvolume = 100;
        this.effects = [];
    }
    WebAudioSource.prototype.getBuffer = function () {
        return this.buffer;
    };
    WebAudioSource.prototype.webAudio = function () {
        return this.webAudioWrapper;
    };
    WebAudioSource.prototype.gain = function (place) {
        if (place === void 0) { place = "wet"; }
        if (place === "wet") {
            return this.wetGain;
        }
        else if (place === "dry") {
            return this.dryGain;
        }
        else if (place === "channel") {
            return this.channelGain;
        }
    };
    WebAudioSource.prototype.play = function () {
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
    };
    WebAudioSource.prototype.assignBuffer = function (webAudio, buffer) {
        var _this = this;
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
                var previous_1 = "";
                Object.keys(this.effects).reverse().forEach(function (element, index) {
                    if (index === 0) {
                        _this.wetGain.connect(_this.effects[element]);
                    }
                    else {
                        _this.effects[previous_1].connect(_this.effects[element]);
                    }
                    previous_1 = element;
                });
                this.effects[previous_1].connect(this.channelGain);
            }
            this.dryGain = this.context.createGain();
            this.dryGain.connect(this.channelGain);
            this.channelGain.connect(this.masterGain);
        }
    };
    WebAudioSource.prototype.prepareEffects = function () {
        if (this.element.parentElement.nodeName !== "WEB-AUDIO") {
            var element = this.element.parentElement;
            while (element.nodeName !== "WEB-AUDIO") {
                this.effects[element.getAttribute("name")] = element.attachEffect(this.context, this.element);
                element = element.parentElement;
            }
        }
    };
    return WebAudioSource;
}());
export { WebAudioSource };
