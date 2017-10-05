var WebAudioDebugger = /** @class */ (function () {
    function WebAudioDebugger() {
        this.history = [];
        this.count = 50;
    }
    WebAudioDebugger.prototype.addHistory = function (string) {
        var our_history = [
            string
        ].concat(this.history);
        if (our_history.length > this.count) {
            this.history = our_history.slice(1, this.count);
        }
        else {
            this.history = our_history;
        }
    };
    WebAudioDebugger.prototype.render = function () {
        return (h("div", 0, this.history.map(function (log) {
            return h("div", 0,
                h("p", 0, log));
        })));
    };
    return WebAudioDebugger;
}());
export { WebAudioDebugger };
