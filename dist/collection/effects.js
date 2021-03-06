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
    var source = effectWC._use;
    if (source.getBuffer()) {
        convolver.buffer = source.getBuffer();
    }
    // responsiveTo(convolver, effectWC)
    return convolver;
};
// Private
var responsiveTo = function (effect, effectWC) {
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
var handleMouseMove = function (event) {
    var dot, eventDoc, doc, body, pageX, pageY;
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
var getMousePosition = function () {
    if (window.mousePos) {
        var event = new CustomEvent('mouse-update', { detail: window.mousePos });
        document.dispatchEvent(event);
    }
};
var biquadResponsiveToMidi = function (effect, effectWC) {
    document.addEventListener('midi-controller-update', function (e) {
        if (effectWC.midicontroller === e.detail.controller.number) {
            effect.frequency.value = ((e.detail.value + 1) / 128) * 3000;
        }
    });
};
var biquadResponsiveToMouse = function (effect, effectWC) {
    document.addEventListener('mouse-update', function (e) {
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
