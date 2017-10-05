import { assert } from '../../helpers';
import { buildBiquadFilterNode, buildDelayNode, buildReverbNode } from '../../effects';
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
export { WebAudioEffect };
