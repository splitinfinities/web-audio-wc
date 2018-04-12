export class WebAudioDebugger {
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
    static get style() { return "/**style-placeholder:web-audio-debugger:**/"; }
}
