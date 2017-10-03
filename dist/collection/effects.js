export var buildBiquadFilterNode = function (context, effectWC) {
    var biquadFilter = context.createBiquadFilter();
    biquadFilter.type = effectWC.method;
    biquadFilter.gain.value = 1.0;
    responsiveTo(biquadFilter, effectWC);
    return biquadFilter;
};
export var buildDelayNode = function (context, effectWC) {
    var delay = context.createDelay(5.0);
    delay.delayTime.value = 3.0;
    responsiveTo(delay, effectWC);
    return delay;
};
export var buildReverbNode = function (context, effectWC) {
    var convolver = context.createConvolver();
    responsiveTo(convolver, effectWC);
    return convolver;
};
// Private
var responsiveTo = function (effect, effectWC) {
    if (effectWC.responds === "mouse") {
        biquadResponsiveToMouse(effect);
    }
    else {
        effect.frequency.value = effectWC.value;
    }
};
var biquadResponsiveToMouse = function (effect) {
    var _this = this;
    document.addEventListener('mouse-update', function (e) {
        if (_this.axis === "x") {
            effect.frequency.value = (e.detail.toLeft * 1.5) || 1000;
        }
        else if (_this.axis === "x-reverse") {
            effect.frequency.value = (e.detail.toRight * 1.5) || 1000;
        }
        else if (_this.axis === "y") {
            effect.frequency.value = (e.detail.toTop * 1.5) || 1000;
        }
        else if (_this.axis === "y-reverse") {
            effect.frequency.value = (e.detail.toBottom * 1.5) || 1000;
        }
        else if (_this.axis === "bi") {
            effect.frequency.value = ((e.detail.toRight + e.detail.toTop)) || 1000;
        }
        else if (_this.axis === "bi-reverse") {
            effect.frequency.value = ((e.detail.toLeft + e.detail.toRight)) || 1000;
        }
    }, false);
};
