/*! Built with http://stenciljs.com */
(function (window, document, appNamespace, publicPath, appCore, appCorePolyfilled, components, x, i) {
    'use strict';
    // create global namespace if it doesn't already exist

    (window[appNamespace] = window[appNamespace] || {}).components = components = components || [];
    // auto hide components until they been fully hydrated
    // reusing the "x" variable from the args for funzies
    x = document.createElement('style');
    x.setAttribute('data-styles', '');
    x.innerHTML = (components.map(function (c) {
        return c[0];
    }).join(',') + '{visibility:hidden}.💎{visibility:inherit}').toLowerCase();
    document.head.insertBefore(x, document.head.firstChild);
    // get this current script
    appNamespace = appNamespace.toLowerCase();
    x = document.scripts;
    for (i = x.length - 1; i >= 0; i--) {
        if (x[i].src && x[i].src.split('/').pop() === appNamespace + '.js') {
            publicPath = x[i].src.replace(appNamespace + '.js', appNamespace + '/');
            break;
        }
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    x = document.createElement('script');
    x.src = publicPath + (window.customElements && window.fetch ? appCore : appCorePolyfilled);
    x.setAttribute('data-path', publicPath);
    x.setAttribute('data-core', appCore);
    document.head.appendChild(x);
})(window, document, "webaudio","/build/webaudio/","webaudio.core.js","webaudio.core.pf.js",[["WEB-AUDIO","web-audio",{"$":"web-audio"},[["name",1]]],["WEB-AUDIO-DEBUGGER","web-audio",{"$":"web-audio"},[["first",1],["last",1]]],["WEB-AUDIO-EFFECT","web-audio",{"$":"web-audio"},[["axis",1],["method",1],["responds",1],["type",1],["value",1,2]]],["WEB-AUDIO-SEQUENCER","web-audio",{"$":"web-audio"},[["autoplay",1,1],["name",1],["taps",1,2],["tempo",1,2]]],["WEB-AUDIO-SOURCE","web-audio",{"$":"web-audio"},[["midiChannel",1,2],["midiKey",1,2],["name",1],["src",1]]],["WEB-AUDIO-VISUALIZER","web-audio",{"$":"web-audio"},[["for",1],["size",1,2],["smoothing",1,2],["type",1]]],["WEB-AUDIO-VISUALIZER-SHADER","web-audio",{"$":"web-audio"},[["type",1]]]]);