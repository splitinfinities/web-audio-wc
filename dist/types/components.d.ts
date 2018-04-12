import './stencil.core';
/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import './stencil.core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface WebAudioDebugger {
      'addHistory': (string: History) => void;
      'count': number;
    }
  }

  interface HTMLWebAudioDebuggerElement extends StencilComponents.WebAudioDebugger, HTMLStencilElement {}

  var HTMLWebAudioDebuggerElement: {
    prototype: HTMLWebAudioDebuggerElement;
    new (): HTMLWebAudioDebuggerElement;
  };
  interface HTMLElementTagNameMap {
    'web-audio-debugger': HTMLWebAudioDebuggerElement;
  }
  interface ElementTagNameMap {
    'web-audio-debugger': HTMLWebAudioDebuggerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'web-audio-debugger': JSXElements.WebAudioDebuggerAttributes;
    }
  }
  namespace JSXElements {
    export interface WebAudioDebuggerAttributes extends HTMLAttributes {
      'count'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WebAudioEffect {
      'attachEffect': (context: any, source: any) => string;
      'axis': string;
      'method': string;
      'midicontroller': number;
      'responds': string;
      'type': string;
      'use': string;
      'value': number;
    }
  }

  interface HTMLWebAudioEffectElement extends StencilComponents.WebAudioEffect, HTMLStencilElement {}

  var HTMLWebAudioEffectElement: {
    prototype: HTMLWebAudioEffectElement;
    new (): HTMLWebAudioEffectElement;
  };
  interface HTMLElementTagNameMap {
    'web-audio-effect': HTMLWebAudioEffectElement;
  }
  interface ElementTagNameMap {
    'web-audio-effect': HTMLWebAudioEffectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'web-audio-effect': JSXElements.WebAudioEffectAttributes;
    }
  }
  namespace JSXElements {
    export interface WebAudioEffectAttributes extends HTMLAttributes {
      'axis'?: string;
      'method'?: string;
      'midicontroller'?: number;
      'responds'?: string;
      'type'?: string;
      'use'?: string;
      'value'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WebAudioSequencer {
      'autoplay': boolean;
      'custom': Function;
      'name': string;
      'play': () => void;
      'stop': () => void;
      'taps': number;
      'tempo': number;
    }
  }

  interface HTMLWebAudioSequencerElement extends StencilComponents.WebAudioSequencer, HTMLStencilElement {}

  var HTMLWebAudioSequencerElement: {
    prototype: HTMLWebAudioSequencerElement;
    new (): HTMLWebAudioSequencerElement;
  };
  interface HTMLElementTagNameMap {
    'web-audio-sequencer': HTMLWebAudioSequencerElement;
  }
  interface ElementTagNameMap {
    'web-audio-sequencer': HTMLWebAudioSequencerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'web-audio-sequencer': JSXElements.WebAudioSequencerAttributes;
    }
  }
  namespace JSXElements {
    export interface WebAudioSequencerAttributes extends HTMLAttributes {
      'autoplay'?: boolean;
      'custom'?: Function;
      'name'?: string;
      'taps'?: number;
      'tempo'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WebAudioSource {
      'assignBuffer': (webAudio: any, buffer: any) => void;
      'effectsvolume': number;
      'gain': (place?: string) => GainNode;
      'getBuffer': () => AudioBuffer;
      'inert': boolean;
      'midichannel': number;
      'midikey': number;
      'name': string;
      'play': () => void;
      'src': string;
      'webAudio': () => HTMLElement;
    }
  }

  interface HTMLWebAudioSourceElement extends StencilComponents.WebAudioSource, HTMLStencilElement {}

  var HTMLWebAudioSourceElement: {
    prototype: HTMLWebAudioSourceElement;
    new (): HTMLWebAudioSourceElement;
  };
  interface HTMLElementTagNameMap {
    'web-audio-source': HTMLWebAudioSourceElement;
  }
  interface ElementTagNameMap {
    'web-audio-source': HTMLWebAudioSourceElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'web-audio-source': JSXElements.WebAudioSourceAttributes;
    }
  }
  namespace JSXElements {
    export interface WebAudioSourceAttributes extends HTMLAttributes {
      'effectsvolume'?: number;
      'inert'?: boolean;
      'midichannel'?: number;
      'midikey'?: number;
      'name'?: string;
      'src'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WebAudioVisualizerShader {
      'type': string;
    }
  }

  interface HTMLWebAudioVisualizerShaderElement extends StencilComponents.WebAudioVisualizerShader, HTMLStencilElement {}

  var HTMLWebAudioVisualizerShaderElement: {
    prototype: HTMLWebAudioVisualizerShaderElement;
    new (): HTMLWebAudioVisualizerShaderElement;
  };
  interface HTMLElementTagNameMap {
    'web-audio-visualizer-shader': HTMLWebAudioVisualizerShaderElement;
  }
  interface ElementTagNameMap {
    'web-audio-visualizer-shader': HTMLWebAudioVisualizerShaderElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'web-audio-visualizer-shader': JSXElements.WebAudioVisualizerShaderAttributes;
    }
  }
  namespace JSXElements {
    export interface WebAudioVisualizerShaderAttributes extends HTMLAttributes {
      'type'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WebAudioVisualizer {
      'connect': (context: AudioContext, destination: any) => this;
      'for': string;
      'height': number;
      'renderer': AnalyserNode;
      'size': number;
      'smoothing': number;
      'type': string;
      'width': number;
    }
  }

  interface HTMLWebAudioVisualizerElement extends StencilComponents.WebAudioVisualizer, HTMLStencilElement {}

  var HTMLWebAudioVisualizerElement: {
    prototype: HTMLWebAudioVisualizerElement;
    new (): HTMLWebAudioVisualizerElement;
  };
  interface HTMLElementTagNameMap {
    'web-audio-visualizer': HTMLWebAudioVisualizerElement;
  }
  interface ElementTagNameMap {
    'web-audio-visualizer': HTMLWebAudioVisualizerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'web-audio-visualizer': JSXElements.WebAudioVisualizerAttributes;
    }
  }
  namespace JSXElements {
    export interface WebAudioVisualizerAttributes extends HTMLAttributes {
      'for'?: string;
      'height'?: number;
      'renderer'?: AnalyserNode;
      'size'?: number;
      'smoothing'?: number;
      'type'?: string;
      'width'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WebAudio {
      'autoplay': Boolean;
      'is_prepared': () => Boolean;
      'midi': Boolean;
      'name': string;
      'source': (name: any) => string;
    }
  }

  interface HTMLWebAudioElement extends StencilComponents.WebAudio, HTMLStencilElement {}

  var HTMLWebAudioElement: {
    prototype: HTMLWebAudioElement;
    new (): HTMLWebAudioElement;
  };
  interface HTMLElementTagNameMap {
    'web-audio': HTMLWebAudioElement;
  }
  interface ElementTagNameMap {
    'web-audio': HTMLWebAudioElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'web-audio': JSXElements.WebAudioAttributes;
    }
  }
  namespace JSXElements {
    export interface WebAudioAttributes extends HTMLAttributes {
      'autoplay'?: Boolean;
      'midi'?: Boolean;
      'name'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
