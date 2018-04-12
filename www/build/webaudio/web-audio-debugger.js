/*! Built with http://stenciljs.com */
const { h } = window.webaudio;

class WebAudioDebugger {
    constructor() {
        this.history = [];
        this.count = 50;
    }
    addHistory(string) {
        let our_history = [
            string,
            ...this.history
        ];
        if (our_history.length > this.count) {
            this.history = our_history.slice(1, this.count);
        }
        else {
            this.history = our_history;
        }
    }
    render() {
        return (h("div", null, this.history.map((log) => h("div", null,
            h("p", null, log)))));
    }
    static get is() { return "web-audio-debugger"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "addHistory": { "method": true }, "count": { "type": Number, "attr": "count" }, "history": { "state": true } }; }
    static get style() { return "web-audio-debugger {\n  display: block;\n  position: fixed;\n  top: 0;\n  right: 0;\n  width: 160px;\n  height: 300px;\n  overflow: auto;\n  text-align: right;\n  padding: 1rem;\n  border: 2px solid black; }\n  web-audio-debugger p {\n    font-size: 12px;\n    margin: 0 0 1em 0; }"; }
}

export { WebAudioDebugger };
