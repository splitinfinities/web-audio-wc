/*! Built with http://stenciljs.com */
const { h } = window.webaudio;

class WebAudioVisualizerShader {
    render() {
        return ('');
    }
    static get is() { return "web-audio-visualizer-shader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "type": { "type": String, "attr": "type" } }; }
    static get style() { return "web-audio-visualizer-shader[data-web-audio-visualizer-shader] {\n  display: none; }"; }
}

export { WebAudioVisualizerShader };
