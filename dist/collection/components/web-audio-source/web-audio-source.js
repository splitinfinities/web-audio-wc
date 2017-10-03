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
export { WebAudioSource };
