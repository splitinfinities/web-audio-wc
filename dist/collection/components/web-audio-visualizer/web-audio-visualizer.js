var WebAudioVisualizer = /** @class */ (function () {
    function WebAudioVisualizer() {
        this.for = "web_audio";
    }
    WebAudioVisualizer.prototype.render = function () {
        return (h("canvas", { "a": { "id": "canvas" } }));
    };
    return WebAudioVisualizer;
}());
export { WebAudioVisualizer };
