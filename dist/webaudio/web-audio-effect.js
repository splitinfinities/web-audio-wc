/*! Built with http://stenciljs.com */
const { h } = window.webaudio;

import { assert } from './chunk1.js';

const buildBiquadFilterNode = function (context, effectWC) {
    const biquadFilter = context.createBiquadFilter();
    biquadFilter.type = effectWC.method;
    biquadFilter.gain.value = 1.0;
    responsiveTo(biquadFilter, effectWC);
    return biquadFilter;
};
const buildDelayNode = function (context, effectWC) {
    const delay = context.createDelay(5.0);
    delay.delayTime.value = 3.0;
    responsiveTo(delay, effectWC);
    return delay;
};
const buildReverbNode = function (context, effectWC) {
    const convolver = context.createConvolver();
    var source = effectWC._use;
    if (source.getBuffer()) {
        convolver.buffer = source.getBuffer();
    }
    // responsiveTo(convolver, effectWC)
    return convolver;
};
// Private
const responsiveTo = function (effect, effectWC) {
    if (effectWC.midicontroller !== false) {
        biquadResponsiveToMidi(effect, effectWC);
    }
    else if (effectWC.responds === "mouse") {
        biquadResponsiveToMouse(effect, effectWC);
    }
    else {
        effect.frequency.value = effectWC.value;
    }
};
const handleMouseMove = function (event) {
    let eventDoc, doc, body;
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
const getMousePosition = function () {
    if (window.mousePos) {
        var event = new CustomEvent('mouse-update', { detail: window.mousePos });
        document.dispatchEvent(event);
    }
};
const biquadResponsiveToMidi = function (effect, effectWC) {
    document.addEventListener('midi-controller-update', (e) => {
        if (effectWC.midicontroller === e.detail.controller.number) {
            effect.frequency.value = ((e.detail.value + 1) / 128) * 3000;
        }
    });
};
const biquadResponsiveToMouse = function (effect, effectWC) {
    document.addEventListener('mouse-update', (e) => {
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

class WebAudioEffect {
    constructor() {
        this.method = "lowshelf";
        this.value = 1.0;
        this.responds = null;
        this.midicontroller = 0;
        this.axis = "x";
    }
    attachEffect(context, source) {
        this.context = context;
        this.source = source;
        this._use = source.webAudio().querySelector(`web-audio-source[name=${this.use}]`);
        if (assert(this.type, `"${this.type}" is not a valid effect - Routing around to masterGain."`)) {
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
    }
    effects() {
        return ["panner", "listener", "reverb", "delay", "compression", "distortion", "filter"];
    }
    static get is() { return "web-audio-effect"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "_use": { "state": true }, "attachEffect": { "method": true }, "axis": { "type": String, "attr": "axis" }, "context": { "state": true }, "effect": { "state": true }, "element": { "elementRef": true }, "method": { "type": String, "attr": "method" }, "midicontroller": { "type": Number, "attr": "midicontroller" }, "parent": { "state": true }, "responds": { "type": String, "attr": "responds" }, "source": { "state": true }, "type": { "type": String, "attr": "type" }, "use": { "type": String, "attr": "use" }, "value": { "type": Number, "attr": "value" } }; }
}

export { WebAudioEffect };
