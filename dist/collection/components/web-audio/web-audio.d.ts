import { WebAudioVisualizer } from '../web-audio-visualizer/web-audio-visualizer';
import { WebAudioSource } from '../web-audio-source/web-audio-source';
export declare class WebAudio {
    element: HTMLElement;
    name: string;
    prepared: Boolean;
    autoplay: Boolean;
    midi: Boolean;
    context: AudioContext;
    gain: GainNode;
    sources: Array<string>;
    _sources: NodeList;
    _currentSource: WebAudioSource;
    keys: Object;
    externalFiles: Array<string>;
    visualizers: NodeListOf<Element>;
    previousVisualizer: WebAudioVisualizer;
    visualizerNodes: Array<string>;
    source(name: any): string;
    is_prepared(): Boolean;
    /******************
     * Private behavior
     **/
    componentDidLoad(): void;
    connect_context(): void;
    connect_sources(): void;
    build_sources(): void;
    cache_sources(bufferList: any, source: any): Promise<void>;
    connect_visualizers(): Promise<void>;
    connect_debugger(): void;
    connect_midi(): void;
}
