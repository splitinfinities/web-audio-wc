export declare class WebAudioSource {
    element: HTMLElement;
    webAudioWrapper: HTMLElement;
    src: string;
    name: string;
    inert: boolean;
    midikey: number;
    midichannel: number;
    status: string;
    effectsvolume: number;
    context: AudioContext;
    masterGain: GainNode;
    wetGain: GainNode;
    dryGain: GainNode;
    channelGain: GainNode;
    effects: Array<object>;
    source: AudioBufferSourceNode;
    buffer: AudioBuffer;
    entry: string;
    getBuffer(): AudioBuffer;
    webAudio(): HTMLElement;
    gain(place?: string): GainNode;
    play(): void;
    assignBuffer(webAudio: any, buffer: any): void;
    prepareEffects(): void;
}
