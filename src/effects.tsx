export const buildBiquadFilterNode = function (context, effectWC) {
	const biquadFilter = context.createBiquadFilter();

	biquadFilter.type = effectWC.method;
	biquadFilter.gain.value = 1.0;

	responsiveTo(biquadFilter, effectWC)

	return biquadFilter;
}

export const buildDelayNode = function (context, effectWC) {
	const delay = context.createDelay(5.0);

	delay.delayTime.value = 3.0;

	responsiveTo(delay, effectWC)

	return delay;
}

export const buildReverbNode = function (context, effectWC) {
	const convolver = context.createConvolver();

	responsiveTo(convolver, effectWC)

	return convolver;
}



// Private
const responsiveTo = function (effect, effectWC) {
	if (effectWC.responds === "mouse") {
		biquadResponsiveToMouse(effect)
	} else {
		effect.frequency.value = effectWC.value;
	}
};

const biquadResponsiveToMouse = function (effect) {
	document.addEventListener('mouse-update', (e: CustomEvent) => {
		if (this.axis === "x") {
			effect.frequency.value = (e.detail.toLeft * 1.5) || 1000;
		} else if (this.axis === "x-reverse") {
			effect.frequency.value = (e.detail.toRight * 1.5) || 1000;
		} else if (this.axis === "y") {
			effect.frequency.value = (e.detail.toTop * 1.5) || 1000;
		} else if (this.axis === "y-reverse") {
			effect.frequency.value = (e.detail.toBottom * 1.5) || 1000;
		} else if (this.axis === "bi") {
			effect.frequency.value = ((e.detail.toRight + e.detail.toTop)) || 1000;
		} else if (this.axis === "bi-reverse") {
			effect.frequency.value = ((e.detail.toLeft + e.detail.toRight)) || 1000;
		}
	}, false);
}
