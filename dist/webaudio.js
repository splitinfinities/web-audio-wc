/*! Built with http://stenciljs.com */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm, orgComponentOnReady) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // create a temporary array to store the resolves
    // before the core file has fully loaded
    App.$r = [];
    // add componentOnReady to HTMLElement.prototype
    orgComponentOnReady = HTMLElementPrototype.componentOnReady;
    HTMLElementPrototype.componentOnReady = function componentOnReady(cb) {
        const elm = this;
        // there may be more than one app on the window so
        // call original HTMLElement.prototype.componentOnReady
        // if one exists already
        orgComponentOnReady && orgComponentOnReady.call(elm);
        function executor(resolve) {
            if (App.$r) {
                // core file hasn't loaded yet
                // so let's throw it in this temporary queue
                // and when the core does load it'll handle these
                App.$r.push([elm, resolve]);
            }
            else {
                // core has finished loading because there's no temporary queue
                // call the core's logic to handle this
                App.componentOnReady(elm, resolve);
            }
        }
        if (cb) {
            // just a callback
            return executor(cb);
        }
        // callback wasn't provided, let's return a promise
        if (win.Promise) {
            // use native/polyfilled promise
            return new Promise(executor);
        }
        // promise may not have been polyfilled yet
        return { then: executor };
    };
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}


init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

})(window, document, "webaudio","webaudio",0,"webaudio.core.js","es5-build-disabled.js","hydrated",[["web-audio","web-audio",0,[["_currentSource",5],["_sources",5],["autoplay",1],["context",5],["debugger",5],["element",7],["externalFiles",5],["gain",5],["is_prepared",6],["keys",5],["midi",1],["name",1,0,1,2],["prepared",5],["previousVisualizer",5],["source",6],["sources",5],["visualizerNodes",5],["visualizers",5]],1],["web-audio-debugger","web-audio-debugger",1,[["addHistory",6],["count",1,0,1,4],["history",5]],1],["web-audio-effect","web-audio-effect",0,[["_use",5],["attachEffect",6],["axis",1,0,1,2],["context",5],["effect",5],["element",7],["method",1,0,1,2],["midicontroller",1,0,1,4],["parent",5],["responds",1,0,1,2],["source",5],["type",1,0,1,2],["use",1,0,1,2],["value",1,0,1,4]],1],["web-audio-sequencer","web-audio-sequencer",0,[["autoplay",1,0,1,3],["context",5],["currentTap",5],["custom",1],["iterations",5],["name",1,0,1,2],["noteTime",5],["play",6],["startTime",5],["stop",6],["taps",1,0,1,4],["tempo",1,0,1,4],["timer",5],["totalPlayTime",5]],1],["web-audio-source","web-audio",0,[["assignBuffer",6],["buffer",5],["channelGain",5],["context",5],["dryGain",5],["effects",5],["effectsvolume",1,0,1,4],["element",7],["entry",5],["gain",6],["getBuffer",6],["inert",1,0,1,3],["masterGain",5],["midichannel",1,0,1,4],["midikey",1,0,1,4],["name",1,0,1,2],["play",6],["source",5],["src",1,0,1,2],["status",5],["webAudio",6],["webAudioWrapper",5],["wetGain",5]],1],["web-audio-visualizer","web-audio-visualizer",1,[["_bufferLength",5],["_dataArray",5],["analyser",5],["canvas",5],["canvasCTX",5],["connect",6],["context",5],["element",7],["for",1,0,1,2],["fragShader",5],["fragSpectrumArray",5],["fragTime",5],["fragment",5],["freqs",5],["height",1,0,1,4],["renderer",1],["size",1,0,1,4],["smoothing",1,0,1,4],["times",5],["type",1,0,1,2],["vertex",5],["vertexShader",5],["width",1,0,1,4]]],["web-audio-visualizer-shader","web-audio-visualizer-shader",1,[["type",1,0,1,2]],1]],HTMLElement.prototype);